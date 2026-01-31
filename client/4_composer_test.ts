import type { Animation, Message } from "../3_types.ts";
import { Composer } from "./4_composer.ts";

Deno.test("types", () => {
  const composer = new Composer();

  composer.on("message", (ctx) => {
    const _msg: Message = ctx.msg;
    const _message: Message = ctx.update.message;
  });

  composer.on("editedMessage", (ctx) => {
    const _msg: Message = ctx.msg;
    const _editedMessage: Message = ctx.update.editedMessage;
  }).use((ctx) => {
    const _msg: Message = ctx.msg;
    const _editedMessage: Message = ctx.update.editedMessage;
  });

  composer.on("message:animation", (ctx) => {
    const _animation: Animation = ctx.msg.animation;
  });
});
