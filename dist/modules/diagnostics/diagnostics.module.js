var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nitrostack/core';
import { DiagnosticsTools } from './diagnostics.tools.js';
import { DiagnosticsResources } from './diagnostics.resources.js';
import { DiagnosticsPrompts } from './diagnostics.prompts.js';
import { FactoryStateService } from './factory-state.service.js';
let DiagnosticsModule = class DiagnosticsModule {
};
DiagnosticsModule = __decorate([
    Module({
        name: 'diagnostics',
        description: 'Factory diagnostics module for monitoring machine health, environmental conditions, and production status',
        controllers: [DiagnosticsTools, DiagnosticsResources, DiagnosticsPrompts],
        providers: [FactoryStateService],
    })
], DiagnosticsModule);
export { DiagnosticsModule };
//# sourceMappingURL=diagnostics.module.js.map