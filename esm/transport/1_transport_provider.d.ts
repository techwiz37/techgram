import type { Connection } from "../2_connection.js";
import type { Transport } from "./0_transport.js";
export type DC = "1" | "2" | "3" | "4" | "5" | "1-test" | "2-test" | "3-test";
export declare function getDcIps(dc: DC, version: "ipv4" | "ipv6"): [string, ...string[]];
export interface TransportProviderParams {
    dc: DC;
    cdn: boolean;
}
export type TransportProvider = (params: TransportProviderParams) => {
    connection: Connection;
    transport: Transport;
    dcId: number;
};
export declare function getDcId(dc: DC, cdn: boolean): number;
export declare function getDc(dcId: number): DC;
//# sourceMappingURL=1_transport_provider.d.ts.map