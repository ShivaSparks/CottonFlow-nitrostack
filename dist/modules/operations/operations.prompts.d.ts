import { ExecutionContext } from '@nitrostack/core';
/**
 * Operations Prompts
 *
 * Provides reusable prompt templates for operations coordination.
 */
export declare class OperationsPrompts {
    operationsHelp(args: Record<string, unknown>, context: ExecutionContext): Promise<{
        role: "user";
        content: {
            type: "text";
            text: string;
        };
    }[]>;
}
//# sourceMappingURL=operations.prompts.d.ts.map