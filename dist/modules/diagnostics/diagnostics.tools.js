var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ToolDecorator as Tool, z, Injectable, Widget } from '@nitrostack/core';
import { FactoryStateService } from './factory-state.service.js';
/**
 * Diagnostics Tools
 *
 * Provides tools for monitoring machine health, environmental conditions,
 * and production status. Integrates with real Open-Meteo API for humidity/temperature.
 */
let DiagnosticsTools = class DiagnosticsTools {
    factoryState;
    constructor(factoryState) {
        this.factoryState = factoryState;
    }
    /**
     * Check machine health: vibration, temperature, RPM, predicted failure window
     */
    async checkMachineHealth(input, context) {
        context.logger.info(`Checking machine health for ${input.machineId}`);
        const machine = this.factoryState.getMachineHealth(input.machineId);
        if (!machine) {
            return {
                success: false,
                error: `Machine ${input.machineId} not found`,
            };
        }
        const isHealthy = machine.vibration < 5 && machine.temperature < 75;
        const riskLevel = machine.vibration > 7 ? 'critical' : machine.vibration > 5 ? 'warning' : 'normal';
        context.logger.info(`Machine ${input.machineId} status: vibration=${machine.vibration}, temp=${machine.temperature}, risk=${riskLevel}`);
        return {
            success: true,
            machineId: machine.id,
            name: machine.name,
            status: machine.status,
            vibration: machine.vibration,
            vibrationTrend: machine.vibrationTrend,
            temperature: machine.temperature,
            rpm: machine.rpm,
            predictedFailureWindow: machine.predictedFailureWindow,
            lastMaintenanceDate: machine.lastMaintenanceDate,
            isHealthy,
            riskLevel,
            imageUrl: machine.imageUrl,
        };
    }
    /**
     * Get environmental conditions for a zone using real Open-Meteo API
     * Falls back to fixture data if API fails
     */
    async getEnvironmentalConditions(input, context) {
        context.logger.info(`Getting environmental conditions for zone ${input.zoneId}`);
        const zone = this.factoryState.getZoneEnvironment(input.zoneId);
        if (!zone) {
            return {
                success: false,
                error: `Zone ${input.zoneId} not found`,
            };
        }
        let realHumidity = zone.currentHumidity;
        let realTemperature = 22; // Default fallback
        try {
            // Call real Open-Meteo API (free, no auth required)
            // Using a central factory location (e.g., North Carolina textile hub)
            const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=35.7796&longitude=-78.6382&current=temperature_2m,relative_humidity_2m&timezone=America/New_York');
            if (response.ok) {
                const data = await response.json();
                if (data.current) {
                    realHumidity = data.current.relative_humidity_2m ?? zone.currentHumidity;
                    realTemperature = data.current.temperature_2m ?? 22;
                    context.logger.info(`Real API data: humidity=${realHumidity}%, temp=${realTemperature}°C`);
                }
            }
        }
        catch (error) {
            context.logger.info(`Open-Meteo API call failed, using fixture data: ${error}`);
            // Fall back to fixture data
        }
        // Update zone with real data
        this.factoryState.updateZoneHumidity(input.zoneId, realHumidity);
        const isOptimal = realHumidity >= zone.targetHumidity - 5 && realHumidity <= zone.targetHumidity + 5;
        const riskLevel = realHumidity < 40 ? 'critical' : realHumidity < 50 ? 'warning' : 'normal';
        context.logger.info(`Zone ${input.zoneId} conditions: humidity=${realHumidity}%, target=${zone.targetHumidity}%, risk=${riskLevel}`);
        return {
            success: true,
            zoneId: zone.id,
            name: zone.name,
            currentHumidity: realHumidity,
            targetHumidity: zone.targetHumidity,
            humidityTrend: zone.humidityTrend,
            temperature: realTemperature,
            isOptimal,
            riskLevel,
            dataSource: 'open-meteo-api',
        };
    }
    /**
     * Get production status for a line: batch, priority, yarn breakage rate
     */
    async getProductionStatus(input, context) {
        context.logger.info(`Getting production status for line ${input.lineId}`);
        const line = this.factoryState.getLineProduction(input.lineId);
        if (!line) {
            return {
                success: false,
                error: `Line ${input.lineId} not found`,
            };
        }
        // Get the order associated with this line
        const order = this.factoryState.getActiveOrders().find(o => o.lineId === input.lineId);
        const isHealthy = line.yarnBreakageRate < 2;
        const riskLevel = line.yarnBreakageRate > 3.5 ? 'critical' : line.yarnBreakageRate > 2.5 ? 'warning' : 'normal';
        context.logger.info(`Line ${input.lineId} status: breakage=${line.yarnBreakageRate}%, batch=${line.currentBatchId}, risk=${riskLevel}`);
        return {
            success: true,
            lineId: line.id,
            name: line.name,
            zone: line.zone,
            status: line.status,
            currentBatchId: line.currentBatchId,
            yarnBreakageRate: line.yarnBreakageRate,
            yarnBreakageTrend: line.yarnBreakageTrend,
            isHealthy,
            riskLevel,
            associatedOrder: order ? {
                id: order.id,
                customerName: order.customerName,
                priority: order.priority,
                quantity: order.quantity,
                dueDate: order.dueDate,
                currentEta: order.currentEta,
            } : null,
            imageUrl: line.imageUrl,
        };
    }
};
__decorate([
    Tool({
        name: 'checkMachineHealth',
        description: 'Check the health status of a specific machine including vibration, temperature, RPM, and predicted failure window',
        inputSchema: z.object({
            machineId: z.string().describe('The machine ID to check (e.g., M-12)'),
        }),
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DiagnosticsTools.prototype, "checkMachineHealth", null);
__decorate([
    Tool({
        name: 'getEnvironmentalConditions',
        description: 'Get current environmental conditions (humidity, temperature) for a factory zone. Uses real Open-Meteo weather API as a proxy for factory climate sensors.',
        inputSchema: z.object({
            zoneId: z.string().describe('The zone ID (e.g., zone-1)'),
        }),
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DiagnosticsTools.prototype, "getEnvironmentalConditions", null);
__decorate([
    Tool({
        name: 'getProductionStatus',
        description: 'Get current production status for a line including batch ID, order priority, and yarn breakage rate',
        inputSchema: z.object({
            lineId: z.string().describe('The production line ID (e.g., L-1)'),
        }),
    }),
    Widget({ route: 'factory-dashboard' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DiagnosticsTools.prototype, "getProductionStatus", null);
DiagnosticsTools = __decorate([
    Injectable({ deps: [FactoryStateService] }),
    __metadata("design:paramtypes", [FactoryStateService])
], DiagnosticsTools);
export { DiagnosticsTools };
//# sourceMappingURL=diagnostics.tools.js.map