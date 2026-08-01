var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ResourceDecorator as Resource, Injectable } from '@nitrostack/core';
import { FactoryStateService } from './factory-state.service.js';
/**
 * Diagnostics Resources
 *
 * Provides queryable MCP Resources for live factory state:
 * - factory://machines/{machineId}/status
 * - factory://lines/{lineId}/production
 * - factory://inventory/spare-parts
 * - factory://orders/active
 * - factory://environment/{zoneId}
 */
let DiagnosticsResources = class DiagnosticsResources {
    factoryState;
    constructor(factoryState) {
        this.factoryState = factoryState;
    }
    /**
     * Resource: factory://machines/{machineId}/status
     * Returns detailed status of a specific machine
     */
    async machineStatus({ machineId }, context) {
        context.logger.info(`Resource: fetching machine status for ${machineId}`);
        const machine = this.factoryState.getMachineHealth(machineId);
        if (!machine) {
            return {
                type: 'text',
                text: JSON.stringify({ error: `Machine ${machineId} not found` }, null, 2),
            };
        }
        return {
            type: 'text',
            text: JSON.stringify(machine, null, 2),
        };
    }
    /**
     * Resource: factory://lines/{lineId}/production
     * Returns production status of a specific line
     */
    async lineProduction({ lineId }, context) {
        context.logger.info(`Resource: fetching line production for ${lineId}`);
        const line = this.factoryState.getLineProduction(lineId);
        if (!line) {
            return {
                type: 'text',
                text: JSON.stringify({ error: `Line ${lineId} not found` }, null, 2),
            };
        }
        // Include associated machines and order
        const machines = this.factoryState.getAllMachines().filter(m => m.lineId === lineId);
        const order = this.factoryState.getActiveOrders().find(o => o.lineId === lineId);
        const result = {
            ...line,
            machines: machines.map(m => ({
                id: m.id,
                name: m.name,
                vibration: m.vibration,
                temperature: m.temperature,
                status: m.status,
            })),
            associatedOrder: order || null,
        };
        return {
            type: 'text',
            text: JSON.stringify(result, null, 2),
        };
    }
    /**
     * Resource: factory://inventory/spare-parts
     * Returns all spare parts inventory
     */
    async spareParts(context) {
        context.logger.info('Resource: fetching spare parts inventory');
        const parts = this.factoryState.getAllSpareParts();
        const inventory = {
            totalParts: parts.length,
            parts: parts.map(p => ({
                id: p.id,
                name: p.name,
                type: p.type,
                quantity: p.quantity,
                reorderLevel: p.reorderLevel,
                needsReorder: p.quantity <= p.reorderLevel,
                leadTime: p.leadTime,
            })),
            lowStockAlerts: parts.filter(p => p.quantity <= p.reorderLevel),
        };
        return {
            type: 'text',
            text: JSON.stringify(inventory, null, 2),
        };
    }
    /**
     * Resource: factory://orders/active
     * Returns all active orders
     */
    async activeOrders(context) {
        context.logger.info('Resource: fetching active orders');
        const orders = this.factoryState.getActiveOrders();
        const summary = {
            totalActive: orders.length,
            byPriority: {
                high: orders.filter(o => o.priority === 'high').length,
                medium: orders.filter(o => o.priority === 'medium').length,
                low: orders.filter(o => o.priority === 'low').length,
            },
            orders: orders.map(o => ({
                id: o.id,
                customerName: o.customerName,
                priority: o.priority,
                status: o.status,
                lineId: o.lineId,
                quantity: o.quantity,
                dueDate: o.dueDate,
                currentEta: o.currentEta,
            })),
        };
        return {
            type: 'text',
            text: JSON.stringify(summary, null, 2),
        };
    }
    /**
     * Resource: factory://environment/{zoneId}
     * Returns environmental conditions for a zone
     */
    async zoneEnvironment({ zoneId }, context) {
        context.logger.info(`Resource: fetching environment for zone ${zoneId}`);
        const zone = this.factoryState.getZoneEnvironment(zoneId);
        if (!zone) {
            return {
                type: 'text',
                text: JSON.stringify({ error: `Zone ${zoneId} not found` }, null, 2),
            };
        }
        // Include lines in this zone
        const lines = this.factoryState.getAllLines().filter(l => l.zone === zoneId);
        const result = {
            ...zone,
            lines: lines.map(l => ({
                id: l.id,
                name: l.name,
                status: l.status,
                yarnBreakageRate: l.yarnBreakageRate,
            })),
        };
        return {
            type: 'text',
            text: JSON.stringify(result, null, 2),
        };
    }
};
__decorate([
    Resource({
        uri: 'factory://machines/{machineId}/status',
        name: 'Machine Status',
        description: 'Get detailed status of a specific machine including health metrics',
        mimeType: 'application/json',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DiagnosticsResources.prototype, "machineStatus", null);
__decorate([
    Resource({
        uri: 'factory://lines/{lineId}/production',
        name: 'Line Production Status',
        description: 'Get production status of a specific line',
        mimeType: 'application/json',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DiagnosticsResources.prototype, "lineProduction", null);
__decorate([
    Resource({
        uri: 'factory://inventory/spare-parts',
        name: 'Spare Parts Inventory',
        description: 'Get current spare parts inventory status',
        mimeType: 'application/json',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DiagnosticsResources.prototype, "spareParts", null);
__decorate([
    Resource({
        uri: 'factory://orders/active',
        name: 'Active Orders',
        description: 'Get all active production orders',
        mimeType: 'application/json',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DiagnosticsResources.prototype, "activeOrders", null);
__decorate([
    Resource({
        uri: 'factory://environment/{zoneId}',
        name: 'Zone Environment',
        description: 'Get environmental conditions for a specific zone',
        mimeType: 'application/json',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DiagnosticsResources.prototype, "zoneEnvironment", null);
DiagnosticsResources = __decorate([
    Injectable({ deps: [FactoryStateService] }),
    __metadata("design:paramtypes", [FactoryStateService])
], DiagnosticsResources);
export { DiagnosticsResources };
//# sourceMappingURL=diagnostics.resources.js.map