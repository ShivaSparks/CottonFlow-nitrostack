interface Machine {
    id: string;
    name: string;
    type: string;
    lineId: string;
    status: string;
    vibration: number;
    vibrationTrend: string;
    temperature: number;
    rpm: number;
    predictedFailureWindow: number | null;
    lastMaintenanceDate: string;
    imageUrl: string;
}
interface Line {
    id: string;
    name: string;
    zone: string;
    status: string;
    currentBatchId: string;
    yarnBreakageRate: number;
    yarnBreakageTrend: string;
    imageUrl: string;
}
interface Order {
    id: string;
    customerName: string;
    priority: string;
    status: string;
    lineId: string | null;
    batchId: string | null;
    quantity: number;
    unit: string;
    dueDate: string;
    currentEta: string;
    imageUrl: string;
}
interface SparePart {
    id: string;
    name: string;
    type: string;
    machineType: string;
    quantity: number;
    reorderLevel: number;
    leadTime: number;
    imageUrl: string;
}
interface Zone {
    id: string;
    name: string;
    targetHumidity: number;
    currentHumidity: number;
    humidityTrend: string;
}
interface FactoryState {
    machines: Machine[];
    lines: Line[];
    orders: Order[];
    spareParts: SparePart[];
    zones: Zone[];
}
/**
 * Factory State Service
 *
 * Manages in-memory factory state loaded from fixtures/factory-state.json.
 * Provides methods to query and update machine health, production status,
 * environmental conditions, orders, and spare parts inventory.
 */
export declare class FactoryStateService {
    private state;
    constructor();
    private loadState;
    /**
     * Get machine health data by ID
     */
    getMachineHealth(machineId: string): Machine | null;
    /**
     * Get all machines
     */
    getAllMachines(): Machine[];
    /**
     * Get production status for a line
     */
    getLineProduction(lineId: string): Line | null;
    /**
     * Get all lines
     */
    getAllLines(): Line[];
    /**
     * Get zone environmental data
     */
    getZoneEnvironment(zoneId: string): Zone | null;
    /**
     * Get all zones
     */
    getAllZones(): Zone[];
    /**
     * Get active orders
     */
    getActiveOrders(): Order[];
    /**
     * Get order by ID
     */
    getOrder(orderId: string): Order | null;
    /**
     * Get spare part by ID
     */
    getSparePart(partId: string): SparePart | null;
    /**
     * Get all spare parts
     */
    getAllSpareParts(): SparePart[];
    /**
     * Update machine vibration (simulates trending)
     */
    updateMachineVibration(machineId: string, newVibration: number, trend: string): void;
    /**
     * Update zone humidity
     */
    updateZoneHumidity(zoneId: string, newHumidity: number): void;
    /**
     * Update line yarn breakage rate
     */
    updateLineBreakageRate(lineId: string, newRate: number): void;
    /**
     * Reassign production batch from one line to another
     */
    reassignBatch(fromLineId: string, toLineId: string, batchId: string): boolean;
    /**
     * Update order ETA
     */
    updateOrderEta(orderId: string, newEta: string): boolean;
    /**
     * Update spare part quantity
     */
    updateSparePartQuantity(partId: string, quantity: number): boolean;
    /**
     * Create a new production line
     */
    createLine(line: Line): void;
    /**
     * Get the full factory state (for resources)
     */
    getFullState(): FactoryState;
}
export {};
//# sourceMappingURL=factory-state.service.d.ts.map