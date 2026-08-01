import { z, ExecutionContext } from '@nitrostack/core';
import { FactoryStateService } from '../diagnostics/factory-state.service.js';
import { ProductionLineInputSchema } from './schemas/production-line.schema.js';
/**
 * Operations Tools
 *
 * Provides tools for coordinating factory operations including batch reassignment,
 * environmental adjustments, maintenance work orders, spare parts management,
 * manager notifications, and delivery estimate updates.
 */
export declare class OperationsTools {
    private factoryState;
    constructor(factoryState: FactoryStateService);
    /**
     * Coordinate incident response: orchestrates 5 sub-actions atomically
     * - Reassign production batch to healthy line
     * - Adjust environmental settings
     * - Create maintenance work order
     * - Notify managers
     * - Update delivery estimate
     */
    coordinateIncidentResponse(input: {
        machineId: string;
        zoneId: string;
        orderId: string;
        targetLineId?: string;
        targetHumidity?: number;
    }, context: ExecutionContext): Promise<{
        success: boolean;
        actions: Array<{
            action: string;
            status: string;
            details: unknown;
        }>;
        summary: string;
    }>;
    /**
     * Reassign production batch from one line to another
     */
    reassignProductionBatch(input: {
        fromLineId: string;
        toLineId: string;
        batchId: string;
    }, context: ExecutionContext): Promise<{
        success: boolean;
        fromLineId: string;
        toLineId: string;
        batchId: string;
        message: string;
    }>;
    /**
     * Adjust environmental settings for a zone
     */
    adjustEnvironmentalSettings(input: {
        zoneId: string;
        targetHumidity: number;
    }, context: ExecutionContext): Promise<{
        success: boolean;
        error: string;
        zoneId?: undefined;
        previousHumidity?: undefined;
        targetHumidity?: undefined;
        adjustmentRequired?: undefined;
        message?: undefined;
    } | {
        success: boolean;
        zoneId: string;
        previousHumidity: number;
        targetHumidity: number;
        adjustmentRequired: number;
        message: string;
        error?: undefined;
    }>;
    /**
     * Create a maintenance work order
     */
    createMaintenanceWorkOrder(input: {
        machineId: string;
        issueType: string;
        urgency: string;
    }, context: ExecutionContext): Promise<{
        success: boolean;
        error: string;
        workOrderId?: undefined;
        machineId?: undefined;
        machineName?: undefined;
        issueType?: undefined;
        urgency?: undefined;
        estimatedDuration?: undefined;
        createdAt?: undefined;
        status?: undefined;
        message?: undefined;
    } | {
        success: boolean;
        workOrderId: string;
        machineId: string;
        machineName: string;
        issueType: string;
        urgency: string;
        estimatedDuration: number;
        createdAt: string;
        status: string;
        message: string;
        error?: undefined;
    }>;
    /**
     * Check spare part availability
     */
    checkSparePartAvailability(input: {
        partId: string;
    }, context: ExecutionContext): Promise<{
        success: boolean;
        error: string;
        partId?: undefined;
        name?: undefined;
        type?: undefined;
        quantity?: undefined;
        reorderLevel?: undefined;
        available?: undefined;
        needsReorder?: undefined;
        leadTime?: undefined;
        message?: undefined;
    } | {
        success: boolean;
        partId: string;
        name: string;
        type: string;
        quantity: number;
        reorderLevel: number;
        available: boolean;
        needsReorder: boolean;
        leadTime: number;
        message: string;
        error?: undefined;
    }>;
    /**
     * Notify manager
     */
    notifyManager(input: {
        department: string;
        message: string;
        urgency: string;
    }, context: ExecutionContext): Promise<{
        success: boolean;
        notificationId: string;
        department: string;
        message: string;
        urgency: string;
        sentAt: string;
        deliveryMethod: string;
    }>;
    /**
     * Update delivery estimate for an order
     */
    updateDeliveryEstimate(input: {
        orderId: string;
        newEta: string;
    }, context: ExecutionContext): Promise<{
        success: boolean;
        error: string;
        orderId?: undefined;
        customerName?: undefined;
        previousEta?: undefined;
        newEta?: undefined;
        delayMinutes?: undefined;
        message?: undefined;
    } | {
        success: boolean;
        orderId: string;
        customerName: string;
        previousEta: string;
        newEta: string;
        delayMinutes: number;
        message: string;
        error?: undefined;
    }>;
    /**
     * Create a new production line
     */
    createProductionLine(input: z.infer<typeof ProductionLineInputSchema>, context: ExecutionContext): Promise<{
        success: boolean;
        error: string;
        line?: undefined;
        weatherImpact?: undefined;
    } | {
        success: boolean;
        line: {
            id: string;
            name: string;
            zone: string;
            status: string;
            currentBatchId: string;
            yarnBreakageRate: number;
            yarnBreakageTrend: string;
            imageUrl: string;
        };
        weatherImpact: {
            weather: "rainy" | "sunny" | "humid" | "dry";
            humidityAdjustment: number;
            newZoneHumidity: number | undefined;
            message: string;
        };
        error?: undefined;
    }>;
}
//# sourceMappingURL=operations.tools.d.ts.map