var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nitrostack/core';
import { OperationsTools } from './operations.tools.js';
import { OperationsResources } from './operations.resources.js';
import { OperationsPrompts } from './operations.prompts.js';
import { FactoryStateService } from '../diagnostics/factory-state.service.js';
let OperationsModule = class OperationsModule {
};
OperationsModule = __decorate([
    Module({
        name: 'operations',
        description: 'Factory operations module for coordinating incident response, batch reassignment, maintenance, and notifications',
        controllers: [OperationsTools, OperationsResources, OperationsPrompts],
        providers: [FactoryStateService],
    })
], OperationsModule);
export { OperationsModule };
//# sourceMappingURL=operations.module.js.map