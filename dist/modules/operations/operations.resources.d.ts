import { ExecutionContext } from '@nitrostack/core';
/**
 * Operations Resources
 *
 * Provides queryable resources for operations state.
 * Currently minimal as most state is managed through diagnostics resources.
 */
export declare class OperationsResources {
    activeWorkOrders(context: ExecutionContext): Promise<{
        type: "text";
        text: string;
    }>;
    recentNotifications(context: ExecutionContext): Promise<{
        type: "text";
        text: string;
    }>;
}
//# sourceMappingURL=operations.resources.d.ts.map