import { assertEquals } from "../0_deps.ts";
import { rleDecode, rleEncode } from "./0_rle.ts";
import { encodeText } from "./0_text.ts";

Deno.test("rleEncode", () => {
  const actual = rleEncode(encodeText("\x00".repeat(1000) + "\x01"));
  const expected = new Uint8Array([0, 255, 0, 255, 0, 255, 0, 235, 1]);
  assertEquals(actual, expected);
});

Deno.test("rleDecode", () => {
  const actual = rleDecode(new Uint8Array([0, 255, 0, 255, 0, 200, 3, 2, 1, 0, 2]));
  const expected = new Uint8Array([...encodeText("\x00".repeat(710)), 3, 2, 1, 0, 0]);
  assertEquals(actual, expected);
});
