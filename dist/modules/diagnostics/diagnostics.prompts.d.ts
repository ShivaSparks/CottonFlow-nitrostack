import { ExecutionContext } from '@nitrostack/core';
import { FactoryStateService } from './factory-state.service.js';
/**
 * Diagnostics Prompts
 *
 * Provides reusable prompt templates for factory operations:
 * - daily-risk-briefing: Summarize all active risks
 * - incident-response-plan: Generate coordinated response plan
 * - shift-handover-report: Summarize status for next shift
 */
export declare class DiagnosticsPrompts {
    private factoryState;
    constructor(factoryState: FactoryStateService);
    /**
     * Prompt: daily-risk-briefing
     * Summarizes all active risks across the factory
     */
    dailyRiskBriefing(args: Record<string, unknown>, context: ExecutionContext): Promise<{
        role: "user";
        content: {
            type: "text";
            text: string;
        };
    }[]>;
    /**
     * Prompt: incident-response-plan
     * Generates a coordinated multi-department response plan for an incident
     */
    incidentResponsePlan(args: Record<string, unknown>, context: ExecutionContext): Promise<{
        role: "user";
        content: {
            type: "text";
            text: string;
        };
    }[]>;
    /**
     * Prompt: shift-handover-report
     * Summarizes factory status for shift handover
     */
    shiftHandoverReport(args: Record<string, unknown>, context: ExecutionContext): Promise<{
        role: "user";
        content: {
            type: "text";
            text: string;
        };
    }[]>;
}
//# sourceMappingURL=diagnostics.prompts.d.ts.map