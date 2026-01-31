import type { Api } from "../2_tl.js";
import type { Update } from "../3_types.js";
export interface UpdateProcessor<U extends Api.Update, P extends boolean = false> {
    canHandleUpdate(update: Api.Update): update is U;
    handleUpdate(update: U): P extends false ? Update | null : Promise<Update | null>;
}
//# sourceMappingURL=0_update_processor.d.ts.map