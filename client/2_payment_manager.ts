import { InputError } from "../0_errors.ts";
import { Api } from "../2_tl.ts";
import { constructPreCheckoutQuery, type ID, type Update } from "../3_types.ts";
import type { AnswerPreCheckoutQueryParams } from "./0_params.ts";
import type { UpdateProcessor } from "./0_update_processor.ts";
import type { C } from "./1_types.ts";

const paymentManagerUpdates = [
  "updateBotPrecheckoutQuery",
] as const;

type PaymentManagerUpdate = Api.Types[(typeof paymentManagerUpdates)[number]];

export class PaymentManager implements UpdateProcessor<PaymentManagerUpdate> {
  #c: C;

  constructor(c: C) {
    this.#c = c;
  }

  canHandleUpdate(update: Api.Update): update is PaymentManagerUpdate {
    return Api.isOneOf(paymentManagerUpdates, update);
  }

  handleUpdate(update: PaymentManagerUpdate): Update | null {
    if (Api.is("updateBotPrecheckoutQuery", update)) {
      const preCheckoutQuery = constructPreCheckoutQuery(update, this.#c.getPeer);
      return { preCheckoutQuery };
    }

    return null;
  }

  async answerPreCheckoutQuery(preCheckoutQueryId: string, ok: boolean, params?: AnswerPreCheckoutQueryParams) {
    this.#c.storage.assertBot("answerPreCheckoutQuery");
    if (!ok && !params?.error) {
      throw new InputError("error is required when ok is false");
    }
    const queryId = BigInt(preCheckoutQueryId);
    if (!queryId) {
      throw new InputError("Invalid pre-checkout query ID");
    }
    await this.#c.invoke({ _: "messages.setBotPrecheckoutResults", query_id: queryId, error: params?.error, success: ok ? true : undefined });
  }

  async refundStarPayment(userId: ID, telegramPaymentChargeId: string) {
    this.#c.storage.assertBot("refundStarPayment");
    await this.#c.invoke({ _: "payments.refundStarsCharge", user_id: await this.#c.getInputUser(userId), charge_id: telegramPaymentChargeId });
  }
}
