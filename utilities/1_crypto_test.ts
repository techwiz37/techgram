import { assertEquals } from "../0_deps.ts";
import { CTR } from "./1_crypto.ts";
import { __getCtr256StateValues, createCtr256State, ctr256, type Ctr256State, destroyCtr256State, init as initTgCrypto } from "jsr:@roj/tgcrypto@0.4.1";

const key = new Uint8Array(32);
const iv = new Uint8Array(16);

Deno.test("equality", async () => {
  await initTgCrypto();
  const ctr = new CTR(await CTR.importKey(key), iv);
  const ctrOld = new CTROld(key, iv);

  for (let i = 0; i < 10_000; ++i) {
    const payload = new Uint8Array(i + 1);
    const ctrResult = await ctr.call(payload);
    const ctrOldResult = new Uint8Array(payload);
    ctrOld.call(ctrOldResult);
    assertEquals(ctrResult, ctrOldResult);

    const ctrOld_state = __getCtr256StateValues(ctrOld.state);
    assertEquals(ctr._state.iv, ctrOld_state.iv);
  }
});

class CTROld {
  #key: Uint8Array;
  #state: Ctr256State;

  get state() {
    return this.#state;
  }

  constructor(key: Uint8Array, iv: Uint8Array) {
    this.#state = createCtr256State(iv);
    this.#key = key;
  }

  call(data: Uint8Array) {
    ctr256(data, this.#key, this.#state);
  }

  destroy() {
    destroyCtr256State(this.#state);
  }
}
