import { assertEquals } from "../0_deps.ts";
import { K } from "./0_storage_operations.ts";

Deno.test("key parts", () => {

  assertEquals(K.session.serverSalt(), ["session.serverSalt"]);

  assertEquals(K.updates.state(), ["updates.state"]);
  assertEquals(K.updates.all(), ["updates.updates"]);
  assertEquals(K.updates.updates(123n), ["updates.updates", 123n]);
  assertEquals(K.updates.update(123n, 1n), ["updates.updates", 123n, 1n]);

  assertEquals(K.cache.stickerSetNames(), ["cache.stickerSetNames"]);
  assertEquals(K.cache.stickerSetName(123n, 0n), ["cache.stickerSetNames", 123n, 0n]);
  assertEquals(K.cache.files(), ["cache.files"]);
  assertEquals(K.cache.file(123n), ["cache.files", 123n]);
  assertEquals(K.cache.fileParts(), ["cache.fileParts"]);
  assertEquals(K.cache.filePart(123n, 0), ["cache.fileParts", 123n, 0]);
  assertEquals(K.cache.customEmojiDocuments(), ["cache.customEmojiDocuments"]);
  assertEquals(K.cache.customEmojiDocument(123n), ["cache.customEmojiDocuments", 123n]);

  assertEquals(K.messages.messages(123), ["messages.messages", 123]);
  assertEquals(K.messages.message(123, 1), ["messages.messages", 123, 1]);
  assertEquals(K.messages.allMessageRefs(), ["messages.messageRefs"]);
  assertEquals(K.messages.messageRef(1), ["messages.messageRefs", 1]);
});
