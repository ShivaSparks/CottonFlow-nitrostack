import { z } from '@nitrostack/core';
/**
 * Production Line Schema
 *
 * Defines the structure and validation for production line creation parameters.
 * Used by the createProductionLine tool to validate and type-check input.
 */
export declare const ProductionLineInputSchema: z.ZodObject<{
    name: z.ZodString;
    zoneId: z.ZodString;
    weather: z.ZodEnum<["rainy", "sunny", "humid", "dry"]>;
    lineId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    zoneId: string;
    weather: "rainy" | "sunny" | "humid" | "dry";
    lineId?: string | undefined;
}, {
    name: string;
    zoneId: string;
    weather: "rainy" | "sunny" | "humid" | "dry";
    lineId?: string | undefined;
}>;
export type ProductionLineInput = z.infer<typeof ProductionLineInputSchema>;
/**
 * Unit 4 Production Line Configuration
 *
 * Pre-configured schema for Unit 4 specifically.
 */
export declare const Unit4ProductionLineSchema: z.ZodObject<{
    name: z.ZodLiteral<"Unit 4">;
    zoneId: z.ZodString;
    weather: z.ZodEnum<["rainy", "sunny", "humid", "dry"]>;
    lineId: z.ZodDefault<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    name: "Unit 4";
    zoneId: string;
    lineId: string;
    weather: "rainy" | "sunny" | "humid" | "dry";
}, {
    name: "Unit 4";
    zoneId: string;
    weather: "rainy" | "sunny" | "humid" | "dry";
    lineId?: string | undefined;
}>;
export type Unit4ProductionLine = z.infer<typeof Unit4ProductionLineSchema>;
//# sourceMappingURL=production-line.schema.d.ts.map