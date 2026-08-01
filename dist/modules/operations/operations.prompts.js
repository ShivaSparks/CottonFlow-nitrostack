var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { PromptDecorator as Prompt } from '@nitrostack/core';
/**
 * Operations Prompts
 *
 * Provides reusable prompt templates for operations coordination.
 */
export class OperationsPrompts {
    async operationsHelp(args, context) {
        context.logger.info('Generating operations help prompt');
        const help = `
# Operations Tools Help

## Available Operations Tools

### coordinateIncidentResponse
Orchestrates a complete incident response across multiple departments:
- Reassigns production batch to healthy line
- Adjusts environmental settings (humidity)
- Creates maintenance work order
- Notifies all relevant managers
- Updates delivery estimate

**Usage**: coordinateIncidentResponse(machineId, zoneId, orderId, targetLineId?, targetHumidity?)

### reassignProductionBatch
Moves a production batch from one line to another.

**Usage**: reassignProductionBatch(fromLineId, toLineId, batchId)

### adjustEnvironmentalSettings
Adjusts humidity levels in a factory zone.

**Usage**: adjustEnvironmentalSettings(zoneId, targetHumidity)

### createMaintenanceWorkOrder
Creates a high-priority maintenance work order.

**Usage**: createMaintenanceWorkOrder(machineId, issueType, urgency)

### checkSparePartAvailability
Checks if a spare part is in stock.

**Usage**: checkSparePartAvailability(partId)

### notifyManager
Sends a notification to a department manager.

**Usage**: notifyManager(department, message, urgency)

### updateDeliveryEstimate
Updates the delivery estimate for an order.

**Usage**: updateDeliveryEstimate(orderId, newEta)

## Common Workflows

### Incident Response Workflow
1. Use diagnostics tools to identify the problem
2. Call coordinateIncidentResponse to execute all corrective actions
3. Monitor via resources to verify completion

### Batch Reassignment Workflow
1. Identify healthy target line
2. Call reassignProductionBatch
3. Notify customer via updateDeliveryEstimate

### Maintenance Workflow
1. Create work order via createMaintenanceWorkOrder
2. Check spare parts via checkSparePartAvailability
3. Notify maintenance team via notifyManager
`;
        return [
            {
                role: 'user',
                content: {
                    type: 'text',
                    text: help,
                },
            },
        ];
    }
}
__decorate([
    Prompt({
        name: 'operations-help',
        description: 'Help with operations tools and workflows',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OperationsPrompts.prototype, "operationsHelp", null);
//# sourceMappingURL=operations.prompts.js.map