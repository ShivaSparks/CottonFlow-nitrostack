var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ResourceDecorator as Resource } from '@nitrostack/core';
/**
 * Operations Resources
 *
 * Provides queryable resources for operations state.
 * Currently minimal as most state is managed through diagnostics resources.
 */
export class OperationsResources {
    async activeWorkOrders(context) {
        context.logger.info('Resource: fetching active work orders');
        // In a real system, this would query a database
        // For now, return a template structure
        const workOrders = {
            total: 0,
            orders: [],
            message: 'Work orders are created dynamically via createMaintenanceWorkOrder tool',
        };
        return {
            type: 'text',
            text: JSON.stringify(workOrders, null, 2),
        };
    }
    async recentNotifications(context) {
        context.logger.info('Resource: fetching recent notifications');
        const notifications = {
            total: 0,
            notifications: [],
            message: 'Notifications are sent dynamically via notifyManager tool',
        };
        return {
            type: 'text',
            text: JSON.stringify(notifications, null, 2),
        };
    }
}
__decorate([
    Resource({
        uri: 'factory://operations/work-orders',
        name: 'Active Work Orders',
        description: 'Get list of active maintenance work orders',
        mimeType: 'application/json',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OperationsResources.prototype, "activeWorkOrders", null);
__decorate([
    Resource({
        uri: 'factory://operations/notifications',
        name: 'Recent Notifications',
        description: 'Get recent notifications sent to managers',
        mimeType: 'application/json',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OperationsResources.prototype, "recentNotifications", null);
//# sourceMappingURL=operations.resources.js.map