import { Api } from "../2_tl.js";
import { type Update } from "../3_types.js";
import type { UpdateProcessor } from "./0_update_processor.js";
import type { C } from "./1_types.js";
declare const businessConnectionManagerUpdates: readonly ["updateBotBusinessConnect"];
type BusinessConnectionManagerUpdate = Api.Types[(typeof businessConnectionManagerUpdates)[number]];
export declare class BusinessConnectionManager implements UpdateProcessor<BusinessConnectionManagerUpdate, true> {
    #private;
    constructor(c: C);
    getBusinessConnection(id: string): Promise<import("../3_types.js").BusinessConnection>;
    canHandleUpdate(update: Api.Update): update is BusinessConnectionManagerUpdate;
    handleUpdate(update: BusinessConnectionManagerUpdate): Promise<Update>;
}
export {};
//# sourceMappingURL=2_business_connection_manager.d.ts.map