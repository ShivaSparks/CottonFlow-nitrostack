var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nitrostack/core';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/**
 * Factory State Service
 *
 * Manages in-memory factory state loaded from fixtures/factory-state.json.
 * Provides methods to query and update machine health, production status,
 * environmental conditions, orders, and spare parts inventory.
 */
let FactoryStateService = class FactoryStateService {
    state;
    constructor() {
        this.state = this.loadState();
    }
    loadState() {
        try {
            // Load from fixtures directory at project root
            const fixturesPath = path.join(__dirname, '../../..', 'fixtures', 'factory-state.json');
            const data = fs.readFileSync(fixturesPath, 'utf-8');
            return JSON.parse(data);
        }
        catch (error) {
            throw new Error(`Failed to load factory state: ${error}`);
        }
    }
    /**
     * Get machine health data by ID
     */
    getMachineHealth(machineId) {
        return this.state.machines.find(m => m.id === machineId) || null;
    }
    /**
     * Get all machines
     */
    getAllMachines() {
        return this.state.machines;
    }
    /**
     * Get production status for a line
     */
    getLineProduction(lineId) {
        return this.state.lines.find(l => l.id === lineId) || null;
    }
    /**
     * Get all lines
     */
    getAllLines() {
        return this.state.lines;
    }
    /**
     * Get zone environmental data
     */
    getZoneEnvironment(zoneId) {
        return this.state.zones.find(z => z.id === zoneId) || null;
    }
    /**
     * Get all zones
     */
    getAllZones() {
        return this.state.zones;
    }
    /**
     * Get active orders
     */
    getActiveOrders() {
        return this.state.orders.filter(o => o.status === 'in-progress' || o.status === 'queued');
    }
    /**
     * Get order by ID
     */
    getOrder(orderId) {
        return this.state.orders.find(o => o.id === orderId) || null;
    }
    /**
     * Get spare part by ID
     */
    getSparePart(partId) {
        return this.state.spareParts.find(p => p.id === partId) || null;
    }
    /**
     * Get all spare parts
     */
    getAllSpareParts() {
        return this.state.spareParts;
    }
    /**
     * Update machine vibration (simulates trending)
     */
    updateMachineVibration(machineId, newVibration, trend) {
        const machine = this.state.machines.find(m => m.id === machineId);
        if (machine) {
            machine.vibration = newVibration;
            machine.vibrationTrend = trend;
            // Predict failure window based on vibration
            if (newVibration > 7) {
                machine.predictedFailureWindow = Math.max(15, 120 - (newVibration * 10));
            }
        }
    }
    /**
     * Update zone humidity
     */
    updateZoneHumidity(zoneId, newHumidity) {
        const zone = this.state.zones.find(z => z.id === zoneId);
        if (zone) {
            const oldHumidity = zone.currentHumidity;
            zone.currentHumidity = newHumidity;
            zone.humidityTrend = newHumidity > oldHumidity ? 'rising' : newHumidity < oldHumidity ? 'falling' : 'stable';
        }
    }
    /**
     * Update line yarn breakage rate
     */
    updateLineBreakageRate(lineId, newRate) {
        const line = this.state.lines.find(l => l.id === lineId);
        if (line) {
            const oldRate = line.yarnBreakageRate;
            line.yarnBreakageRate = newRate;
            line.yarnBreakageTrend = newRate > oldRate ? 'rising' : newRate < oldRate ? 'falling' : 'stable';
        }
    }
    /**
     * Reassign production batch from one line to another
     */
    reassignBatch(fromLineId, toLineId, batchId) {
        const fromLine = this.state.lines.find(l => l.id === fromLineId);
        const toLine = this.state.lines.find(l => l.id === toLineId);
        const order = this.state.orders.find(o => o.batchId === batchId);
        if (!fromLine || !toLine || !order) {
            return false;
        }
        // Move batch to new line
        fromLine.currentBatchId = '';
        toLine.currentBatchId = batchId;
        order.lineId = toLineId;
        return true;
    }
    /**
     * Update order ETA
     */
    updateOrderEta(orderId, newEta) {
        const order = this.state.orders.find(o => o.id === orderId);
        if (order) {
            order.currentEta = newEta;
            return true;
        }
        return false;
    }
    /**
     * Update spare part quantity
     */
    updateSparePartQuantity(partId, quantity) {
        const part = this.state.spareParts.find(p => p.id === partId);
        if (part) {
            part.quantity = quantity;
            return true;
        }
        return false;
    }
    /**
     * Create a new production line
     */
    createLine(line) {
        this.state.lines.push(line);
    }
    /**
     * Get the full factory state (for resources)
     */
    getFullState() {
        return this.state;
    }
};
FactoryStateService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], FactoryStateService);
export { FactoryStateService };
//# sourceMappingURL=factory-state.service.js.map