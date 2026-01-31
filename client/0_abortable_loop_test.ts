import { assertEquals, delay } from "../0_deps.ts";
import { AbortableLoop } from "./0_abortable_loop.ts";

const MS = 10;
const ITERATIONS = 10;
const MARGIN = 100;

Deno.test("AbortableLoop", async (t) => {
  await t.step("start", async () => {
    const array = new Array<number>();
    let c = 0;
    const loop = new AbortableLoop(async (loop, signal) => {
      await delay(MS, { signal });
      array.push(c);
      if (++c >= ITERATIONS) {
        loop.abort();
      }
    }, () => {});
    loop.start();
    loop.start();
    await delay(MS * ITERATIONS + MARGIN);
    assertEquals(array, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
});
