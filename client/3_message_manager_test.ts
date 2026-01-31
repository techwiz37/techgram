import { assertEquals } from "../0_deps.ts";
import { InputError } from "../0_errors.ts";
import { assertInstanceOf } from "../0_test_deps.ts";
import { Api } from "../2_tl.ts";
import type { MessageEntity } from "../3_types.ts";
import { MessageManager } from "./3_message_manager.ts";

Deno.test("parseText() trims trailing whitespaces", async (t) => {
  const code = `\nconsole.log("Hello, world!");`;
  const expected = [
    code,
    [
      { type: "pre", offset: 0, length: code.length, language: "typescript" },
    ] as MessageEntity[],
  ];

  await t.step("null", () => {
    const text = `${code}

`; 
    assertEquals(MessageManager.parseText(text, [{ type: "pre", offset: 0, length: text.length, language: "typescript" }], null), expected);
  });

  await t.step("HTML", () => {
    const text = `<pre><code class="language-typescript">${code}

</code></pre>`; 
    assertEquals(MessageManager.parseText(text, [], "HTML"), expected);
  });

  await t.step("Markdown", () => {
    const text = `\`\`\`typescript
${code}

\`\`\``; 
    assertEquals(MessageManager.parseText(text, [], "Markdown"), expected);
  });
});

Deno.test("sendMediaGroup() disallows invalid media type combination", async () => {

  const messageManager = new MessageManager({ id: "" });
  const chatId = -1;

  try {
    await messageManager.sendMediaGroup(chatId, [{ animation: "" }]);
  } catch (err) {
    assertInstanceOf(err, InputError);
    assertEquals(err.message, "Media groups cannot consist of animations.");
  }

  try {
    await messageManager.sendMediaGroup(chatId, [{ document: "" }, { video: "" }]);
  } catch (err) {
    assertInstanceOf(err, InputError);
    assertEquals(err.message, "Media of the type document cannot be mixed with other types.");
  }

  try {
    await messageManager.sendMediaGroup(chatId, [{ video: "" }, { document: "" }]);
  } catch (err) {
    assertInstanceOf(err, InputError);
    assertEquals(err.message, "Media of the type video cannot be mixed with those of the type document.");
  }

  try {
    await messageManager.sendMediaGroup(chatId, [{ photo: "" }, { document: "" }]);
  } catch (err) {
    assertInstanceOf(err, InputError);
    assertEquals(err.message, "Media of the type photo cannot be mixed with those of the type document.");
  }
});

Deno.test("parseMessageLink()", async (t) => {
  const pml = (v: string) => MessageManager.parseMessageLink(v);

  await t.step("invalid URL", () => {
    assertEquals(pml("\xad"), null);
  });

  await t.step("invalid protocol", () => {
    assertEquals(pml("ftp:
  });

  await t.step("invalid host", () => {
    assertEquals(pml("http:
    assertEquals(pml("http:
  });

  await t.step("invalid part length", () => {
    assertEquals(pml("http:
    assertEquals(pml("http:
  });

  await t.step("numeric first part", () => {
    assertEquals(pml("http:
  });

  await t.step("invalid private part length", () => {
    assertEquals(pml("http:
    assertEquals(pml("http:
  });

  await t.step("invalid private first part", () => {
    assertEquals(pml("http:
    assertEquals(pml("http:
  });

  await t.step("invalid public part length", () => {
    assertEquals(pml("http:
  });

  await t.step("invalid public ID", () => {
    assertEquals(pml("http:
    assertEquals(pml("http:
    assertEquals(pml("http:
    assertEquals(pml("http:
    assertEquals(pml("http:
    assertEquals(pml("http:
    assertEquals(pml("http:
    assertEquals(pml("http:
  });

  await t.step("invalid public username", () => {
    assertEquals(pml("http:
    assertEquals(pml("http:
  });

  await t.step("valid links", () => {
    assertEquals(pml("http:
    assertEquals(pml("http:
    assertEquals(pml("http:
    assertEquals(pml("http:
  });
});
