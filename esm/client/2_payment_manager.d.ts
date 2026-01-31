import { Api } from "../2_tl.js";
import { type ID, type Update } from "../3_types.js";
import type { AnswerPreCheckoutQueryParams } from "./0_params.js";
import type { UpdateProcessor } from "./0_update_processor.js";
import type { C } from "./1_types.js";
declare const paymentManagerUpdates: readonly ["updateBotPrecheckoutQuery"];
type PaymentManagerUpdate = Api.Types[(typeof paymentManagerUpdates)[number]];
export declare class PaymentManager implements UpdateProcessor<PaymentManagerUpdate> {
    #private;
    constructor(c: C);
    canHandleUpdate(update: Api.Update): update is PaymentManagerUpdate;
    handleUpdate(update: PaymentManagerUpdate): Update | null;
    answerPreCheckoutQuery(preCheckoutQueryId: string, ok: boolean, params?: AnswerPreCheckoutQueryParams): Promise<void>;
    refundStarPayment(userId: ID, telegramPaymentChargeId: string): Promise<void>;
}
export {};
//# sourceMappingURL=2_payment_manager.d.ts.map