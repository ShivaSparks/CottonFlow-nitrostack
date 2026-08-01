import { ExecutionContext } from '@nitrostack/core';
import { FactoryStateService } from './factory-state.service.js';
/**
 * Diagnostics Tools
 *
 * Provides tools for monitoring machine health, environmental conditions,
 * and production status. Integrates with real Open-Meteo API for humidity/temperature.
 */
export declare class DiagnosticsTools {
    private factoryState;
    constructor(factoryState: FactoryStateService);
    /**
     * Check machine health: vibration, temperature, RPM, predicted failure window
     */
    checkMachineHealth(input: {
        machineId: string;
    }, context: ExecutionContext): Promise<{
        success: boolean;
        error: string;
        machineId?: undefined;
        name?: undefined;
        status?: undefined;
        vibration?: undefined;
        vibrationTrend?: undefined;
        temperature?: undefined;
        rpm?: undefined;
        predictedFailureWindow?: undefined;
        lastMaintenanceDate?: undefined;
        isHealthy?: undefined;
        riskLevel?: undefined;
        imageUrl?: undefined;
    } | {
        success: boolean;
        machineId: string;
        name: string;
        status: string;
        vibration: number;
        vibrationTrend: string;
        temperature: number;
        rpm: number;
        predictedFailureWindow: number | null;
        lastMaintenanceDate: string;
        isHealthy: boolean;
        riskLevel: string;
        imageUrl: string;
        error?: undefined;
    }>;
    /**
     * Get environmental conditions for a zone using real Open-Meteo API
     * Falls back to fixture data if API fails
     */
    getEnvironmentalConditions(input: {
        zoneId: string;
    }, context: ExecutionContext): Promise<{
        success: boolean;
        error: string;
        zoneId?: undefined;
        name?: undefined;
        currentHumidity?: undefined;
        targetHumidity?: undefined;
        humidityTrend?: undefined;
        temperature?: undefined;
        isOptimal?: undefined;
        riskLevel?: undefined;
        dataSource?: undefined;
    } | {
        success: boolean;
        zoneId: string;
        name: string;
        currentHumidity: number;
        targetHumidity: number;
        humidityTrend: string;
        temperature: number;
        isOptimal: boolean;
        riskLevel: string;
        dataSource: string;
        error?: undefined;
    }>;
    /**
     * Get production status for a line: batch, priority, yarn breakage rate
     */
    getProductionStatus(input: {
        lineId: string;
    }, context: ExecutionContext): Promise<{
        success: boolean;
        error: string;
        lineId?: undefined;
        name?: undefined;
        zone?: undefined;
        status?: undefined;
        currentBatchId?: undefined;
        yarnBreakageRate?: undefined;
        yarnBreakageTrend?: undefined;
        isHealthy?: undefined;
        riskLevel?: undefined;
        associatedOrder?: undefined;
        imageUrl?: undefined;
    } | {
        success: boolean;
        lineId: string;
        name: string;
        zone: string;
        status: string;
        currentBatchId: string;
        yarnBreakageRate: number;
        yarnBreakageTrend: string;
        isHealthy: boolean;
        riskLevel: string;
        associatedOrder: {
            id: string;
            customerName: string;
            priority: string;
            quantity: number;
            dueDate: string;
            currentEta: string;
        } | null;
        imageUrl: string;
        error?: undefined;
    }>;
}
//# sourceMappingURL=diagnostics.tools.d.ts.map