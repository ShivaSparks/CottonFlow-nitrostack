import { ExecutionContext } from '@nitrostack/core';
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
export declare class DiagnosticsResources {
    private factoryState;
    constructor(factoryState: FactoryStateService);
    /**
     * Resource: factory://machines/{machineId}/status
     * Returns detailed status of a specific machine
     */
    machineStatus({ machineId }: {
        machineId: string;
    }, context: ExecutionContext): Promise<{
        type: "text";
        text: string;
    }>;
    /**
     * Resource: factory://lines/{lineId}/production
     * Returns production status of a specific line
     */
    lineProduction({ lineId }: {
        lineId: string;
    }, context: ExecutionContext): Promise<{
        type: "text";
        text: string;
    }>;
    /**
     * Resource: factory://inventory/spare-parts
     * Returns all spare parts inventory
     */
    spareParts(context: ExecutionContext): Promise<{
        type: "text";
        text: string;
    }>;
    /**
     * Resource: factory://orders/active
     * Returns all active orders
     */
    activeOrders(context: ExecutionContext): Promise<{
        type: "text";
        text: string;
    }>;
    /**
     * Resource: factory://environment/{zoneId}
     * Returns environmental conditions for a zone
     */
    zoneEnvironment({ zoneId }: {
        zoneId: string;
    }, context: ExecutionContext): Promise<{
        type: "text";
        text: string;
    }>;
}
//# sourceMappingURL=diagnostics.resources.d.ts.map