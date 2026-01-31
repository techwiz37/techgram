import type { C } from "./1_types.js";
export declare class NetworkStatisticsManager {
    #private;
    constructor(c: C);
    getNetworkStatistics(): Promise<{
        messages: {
            sent: number;
            received: number;
        };
        cdn: {
            sent: number;
            received: number;
        };
    }>;
    getTransportReadWriteCallback(cdn: boolean): {
        read: (count: number) => void;
        write: (count: number) => void;
    };
}
//# sourceMappingURL=2_network_statistics_manager.d.ts.map