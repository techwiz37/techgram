import { assertThrows } from "../0_test_deps.ts";
import { kilobyte, megabyte } from "../1_utilities.ts";
import { FileManager } from "./2_file_manager.ts";

Deno.test("validateChunkSize", async (t) => {
  const MAX = 512 * kilobyte;
  await t.step("max", () => {
    assertThrows(() => FileManager.validateChunkSize(1 * megabyte, MAX));
  });
  await t.step("0", () => {
    assertThrows(() => FileManager.validateChunkSize(0, MAX));
  });
  await t.step("<0", () => {
    assertThrows(() => FileManager.validateChunkSize(-128 * kilobyte, MAX));
  });
  await t.step("floating point", () => {
    assertThrows(() => FileManager.validateChunkSize(127.9 * kilobyte, MAX));
  });
  await t.step("not divisible by 1024", () => {
    assertThrows(() => FileManager.validateChunkSize(130 * (kilobyte + 1), MAX));
  });
  await t.step("ok", () => {
    FileManager.validateChunkSize(128 * kilobyte, MAX);
  });
});
