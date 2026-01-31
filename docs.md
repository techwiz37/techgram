# Dokumentasi Techgram

Dokumentasi lengkap untuk library Techgram - Cross-runtime JavaScript library untuk membangun Telegram client.

**💬 [Discussion Chat](https://t.me/techgramchat)** | **📢 [Channel](https://t.me/techwizch)** | **👨‍💻 [Developer](https://t.me/techwiz37)** | **📖 [API Reference](https://deno.land/x/techgram/mod.ts)**

## Daftar Isi

1. [Instalasi](#instalasi)
2. [Koneksi & Autentikasi](#koneksi--autentikasi)
3. [Mengirim Pesan](#mengirim-pesan)
4. [Menerima Update](#menerima-update)
5. [Manajemen Chat](#manajemen-chat)
6. [Manajemen File](#manajemen-file)
7. [Inline Query & Callback Query](#inline-query--callback-query)
8. [Manajemen User & Profile](#manajemen-user--profile)
9. [Manajemen Channel & Group](#manajemen-channel--group)
10. [Forum & Topic](#forum--topic)
11. [Story & Media](#story--media)
12. [Video Chat & Live Stream](#video-chat--live-stream)
13. [Payment & Invoice](#payment--invoice)
14. [Reactions](#reactions)
15. [Poll & Voting](#poll--voting)
16. [Bot Commands](#bot-commands)
17. [Scheduled Messages](#scheduled-messages)
18. [Voice Transcription](#voice-transcription)
19. [Link Preview](#link-preview)
20. [Mini App](#mini-app)
21. [Saved Messages](#saved-messages)
22. [Common Chats](#common-chats)
23. [Inactive Chats](#inactive-chats)
24. [Boosts](#boosts)
25. [Sticker Set](#sticker-set)
26. [Business Connection](#business-connection)
27. [Utility Functions](#utility-functions)

---

## Instalasi

### Node.js

**Instalasi dari GitHub:**

Techgram saat ini tersedia melalui GitHub. Install menggunakan:

```bash
npm install github:techwiz37/techgram
```

Atau tambahkan di `package.json`:
```json
{
  "dependencies": {
    "@techgram/node": "github:techwiz37/techgram"
  }
}
```

Install dari branch/tag tertentu:
```bash
npm install github:techwiz37/techgram#main
npm install github:techwiz37/techgram#v0.1.0
```

**Persyaratan:**
- Node.js versi 18.0.0 atau lebih baru
- **Mendukung ESM dan CommonJS!** Library otomatis memilih format yang tepat
- **PENTING: Harus build setelah install!**

**⚠️ Build Otomatis**

Library ini akan **otomatis di-build** setelah install melalui `postinstall` script di package.json. Build akan mengkonversi semua file TypeScript (.ts) ke JavaScript (.js) yang bisa dijalankan Node.js.

**Jika build otomatis gagal, build manual:**
```bash
cd node_modules/@techgram/node
npm install  # Install esbuild dan dependencies
npm run build  # Build TypeScript ke JavaScript
```

**Mengapa perlu build?**
- Library ini menggunakan TypeScript (.ts files)
- Node.js tidak bisa langsung menjalankan .ts files dari node_modules
- Build akan mengkonversi semua .ts ke .js yang bisa dijalankan Node.js
- Build otomatis via `postinstall` script setelah `npm install`

**Setup package.json:**

**ES Modules (ESM):**
```json
{
  "name": "my-telegram-bot",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "@techgram/node": "github:techwiz37/techgram"
  }
}
```

**CommonJS:**
```json
{
  "name": "my-telegram-bot",
  "version": "1.0.0",
  "type": "commonjs",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "@techgram/node": "github:techwiz37/techgram"
  }
}
```

**Import (ESM):**
```typescript
import { Client, StorageMemory } from "@techgram/node";
```

**Require (CommonJS):**
```javascript
const { Client, StorageMemory } = require("@techgram/node");
```

**Contoh Lengkap:**
```typescript
import { Client, StorageMemory } from "@techgram/node";

const client = new Client({
  apiId: 12345678,
  apiHash: "your_api_hash",
  storage: new StorageMemory(),
});

await client.connect();
await client.start({
  botToken: "YOUR_BOT_TOKEN"
});

client.on("message", async (ctx) => {
  if (ctx.message.text === "/start") {
    await ctx.reply("Halo!");
  }
});
```

### Deno
```typescript
import { Client } from "https://deno.land/x/techgram/mod.ts";
```

### Browser
```html
<script type="module">
  import { Client } from "https://esm.sh/jsr/@techgram/techgram";
</script>
```

### Bun
```bash
bun add github:techwiz37/techgram
```

Atau di `package.json`:
```json
{
  "dependencies": {
    "@techgram/node": "github:techwiz37/techgram"
  }
}
```

```typescript
import { Client } from "@techgram/node";
```

---

## Koneksi & Autentikasi

### Membuat Client

**Deno:**
```typescript
import { Client, StorageMemory } from "https://deno.land/x/techgram/mod.ts";

const client = new Client({
  apiId: 12345678,
  apiHash: "your_api_hash",
  storage: new StorageMemory(),
});
```

**Node.js:**
```typescript
import { Client, StorageMemory } from "@techgram/node";

const client = new Client({
  apiId: 12345678,
  apiHash: "your_api_hash",
  storage: new StorageMemory(),
});
```

### Koneksi ke Server

```typescript
await client.connect();
```

### Autentikasi Bot (Tanpa CLI Input)

**Cara 1: Langsung Pass Bot Token**

**Deno:**
```typescript
import { Client, StorageMemory } from "https://deno.land/x/techgram/mod.ts";

const client = new Client({
  apiId: 12345678,
  apiHash: "your_api_hash",
  storage: new StorageMemory(),
});

await client.connect();
await client.start({
  botToken: "YOUR_BOT_TOKEN"
});

const me = await client.getMe();
console.log("Bot:", me.username);
```

**Node.js:**
```typescript
import { Client, StorageMemory } from "@techgram/node";

const client = new Client({
  apiId: 12345678,
  apiHash: "your_api_hash",
  storage: new StorageMemory(),
});

await client.connect();
await client.start({
  botToken: "YOUR_BOT_TOKEN"
});

const me = await client.getMe();
console.log("Bot:", me.username);
```

**Cara 2: Menggunakan Environment Variable**

```bash
export BOT_TOKEN="YOUR_BOT_TOKEN"
```

**Deno:**
```typescript
import { Client, StorageMemory } from "https://deno.land/x/techgram/mod.ts";

const client = new Client({
  apiId: 12345678,
  apiHash: "your_api_hash",
  storage: new StorageMemory(),
});

await client.connect();
await client.start();
```

**Node.js:**
```typescript
import { Client, StorageMemory } from "@techgram/node";

const client = new Client({
  apiId: 12345678,
  apiHash: "your_api_hash",
  storage: new StorageMemory(),
});

await client.connect();
await client.start();
```

**Cara 3: Menggunakan Deno.env atau process.env**

**Deno:**
```typescript
import { Client, StorageMemory } from "https://deno.land/x/techgram/mod.ts";

const client = new Client({
  apiId: 12345678,
  apiHash: "your_api_hash",
  storage: new StorageMemory(),
});

await client.connect();
await client.start({
  botToken: Deno.env.get("BOT_TOKEN") || process.env.BOT_TOKEN || ""
});
```

### Autentikasi User (Tanpa CLI Input)

**Node.js:**
```typescript
import { Client, StorageMemory } from "@techgram/node";

const client = new Client({
  apiId: 12345678,
  apiHash: "your_api_hash",
  storage: new StorageMemory(),
});

await client.connect();
await client.start({
  botToken: Deno.env.get("BOT_TOKEN") || process.env.BOT_TOKEN || ""
});
```

### Autentikasi User (Tanpa CLI Input)

**Cara 1: Langsung Pass Credentials**

**Deno:**
```typescript
import { Client, StorageMemory } from "https://deno.land/x/techgram/mod.ts";

const client = new Client({
  apiId: 12345678,
  apiHash: "your_api_hash",
  storage: new StorageMemory(),
});

await client.connect();
await client.start({
  phone: "+1234567890",
  code: "12345",
  password: "your_password"
});

const me = await client.getMe();
console.log("User:", me.firstName);
```

**Cara 2: Menggunakan Environment Variables**

```bash
export PHONE_NUMBER="+1234567890"
export VERIFICATION_CODE="12345"
export PASSWORD="your_password"
```

```typescript
import { Client, StorageMemory } from "https://deno.land/x/techgram/mod.ts";

const client = new Client({
  apiId: 12345678,
  apiHash: "your_api_hash",
  storage: new StorageMemory(),
});

await client.connect();
await client.start();
```

**Cara 3: Menggunakan Callback untuk Code & Password (Dynamic)**

```typescript
import { Client, StorageMemory } from "https://deno.land/x/techgram/mod.ts";

const client = new Client({
  apiId: 12345678,
  apiHash: "your_api_hash",
  storage: new StorageMemory(),
});

await client.connect();
await client.start({
  phone: "+1234567890",
  code: async () => {
    return "12345";
  },
  password: async (hint) => {
    return "your_password";
  }
});
```

**Cara 4: Menggunakan Deno.env atau process.env**

```typescript
import { Client, StorageMemory } from "https://deno.land/x/techgram/mod.ts";

const client = new Client({
  apiId: 12345678,
  apiHash: "your_api_hash",
  storage: new StorageMemory(),
});

await client.connect();
await client.start({
  phone: Deno.env.get("PHONE_NUMBER") || process.env.PHONE_NUMBER || "",
  code: Deno.env.get("VERIFICATION_CODE") || process.env.VERIFICATION_CODE || "",
  password: Deno.env.get("PASSWORD") || process.env.PASSWORD || ""
});
```

**Catatan Penting:**
- Tidak perlu input CLI lagi, semua credentials bisa di-pass langsung atau via environment variables
- Jika `params` tidak diberikan dan environment variables tidak ada, akan throw error yang jelas
- Password hanya diperlukan jika akun memiliki 2FA enabled

### Mengirim Kode Verifikasi

```typescript
await client.sendCode("+1234567890");
```

### Mengecek Kode Verifikasi

```typescript
const result = await client.checkCode("12345");
if (result.type === "signed_in") {
  console.log("Berhasil login!");
} else if (result.type === "password_required") {
  const password = await client.checkPassword("your_password");
}
```

### Mengecek Password (2FA)

```typescript
const hint = await client.getPasswordHint();
const result = await client.checkPassword("your_password");
```

### Export & Import Auth String

```typescript
const authString = await client.exportAuthString();
await client.importAuthString(authString);
```

### Sign Out

```typescript
await client.signOut();
```

### Disconnect

```typescript
await client.disconnect();
```

### Mendapatkan Info User Saat Ini

```typescript
const me = await client.getMe();
console.log(me.firstName, me.lastName);
```

---

## Mengirim Pesan

### Mengirim Pesan Teks

```typescript
const message = await client.sendMessage(chatId, "Halo dunia!");
```

### Mengirim Pesan dengan Parse Mode

```typescript
const message = await client.sendMessage(chatId, "**Bold** dan *italic*", {
  parseMode: "markdown"
});
```

### Mengirim Pesan dengan Reply

```typescript
const message = await client.sendMessage(chatId, "Ini adalah reply", {
  replyTo: { messageId: 123 }
});
```

### Mengirim Foto

```typescript
const message = await client.sendPhoto(chatId, "path/to/photo.jpg", {
  caption: "Ini adalah foto",
  parseMode: "markdown"
});
```

### Mengirim Dokumen

```typescript
const message = await client.sendDocument(chatId, "path/to/file.pdf", {
  caption: "Ini adalah dokumen"
});
```

### Mengirim Video

```typescript
const message = await client.sendVideo(chatId, "path/to/video.mp4", {
  caption: "Ini adalah video",
  duration: 60,
  width: 1920,
  height: 1080
});
```

### Mengirim Audio

```typescript
const message = await client.sendAudio(chatId, "path/to/audio.mp3", {
  title: "Judul Lagu",
  performer: "Nama Artis",
  duration: 180
});
```

### Mengirim Voice Note

```typescript
const message = await client.sendVoice(chatId, "path/to/voice.ogg", {
  caption: "Pesan suara"
});
```

### Mengirim Sticker

```typescript
const message = await client.sendSticker(chatId, "path/to/sticker.webp");
```

### Mengirim Video Note (Round Video)

```typescript
const message = await client.sendVideoNote(chatId, "path/to/video_note.mp4", {
  length: 240,
  duration: 10
});
```

### Mengirim Animation (GIF)

```typescript
const message = await client.sendAnimation(chatId, "path/to/animation.gif", {
  caption: "Ini adalah GIF"
});
```

### Mengirim Lokasi

```typescript
const message = await client.sendLocation(chatId, -6.2088, 106.8456, {
  horizontalAccuracy: 10
});
```

### Mengirim Kontak

```typescript
const message = await client.sendContact(chatId, "John", "+1234567890", {
  lastName: "Doe"
});
```

### Mengirim Venue

```typescript
const message = await client.sendVenue(
  chatId,
  -6.2088,
  106.8456,
  "Nama Tempat",
  "Alamat Tempat"
);
```

### Mengirim Dice

```typescript
const message = await client.sendDice(chatId, {
  emoji: "🎲"
});
```

### Mengirim Poll

```typescript
const message = await client.sendPoll(
  chatId,
  "Pertanyaan?",
  ["Opsi 1", "Opsi 2", "Opsi 3"],
  {
    type: "quiz",
    correctOptionIndex: 0
  }
);
```

### Mengirim Media Group

```typescript
const messages = await client.sendMediaGroup(chatId, [
  { type: "photo", media: "photo1.jpg" },
  { type: "photo", media: "photo2.jpg" }
]);
```

### Mengirim Pesan dengan Keyboard

```typescript
const message = await client.sendMessage(chatId, "Pilih opsi:", {
  replyMarkup: {
    type: "inlineKeyboard",
    inlineKeyboard: [[
      { text: "Tombol 1", callbackData: "btn1" },
      { text: "Tombol 2", callbackData: "btn2" }
    ]]
  }
});
```

### Mengirim Pesan dengan Reply Keyboard

```typescript
const message = await client.sendMessage(chatId, "Pilih:", {
  replyMarkup: {
    type: "keyboard",
    keyboard: [[
      { text: "Opsi 1" },
      { text: "Opsi 2" }
    ]],
    resizeKeyboard: true
  }
});
```

### Mengirim Pesan yang Dijadwalkan

```typescript
const message = await client.sendMessage(chatId, "Pesan terjadwal", {
  sendAt: Date.now() + 3600000
});
```

### Mengirim Pesan dengan Self Destruct

```typescript
const message = await client.sendPhoto(chatId, "photo.jpg", {
  selfDestruct: { type: "timer", seconds: 60 }
});
```

---

## Menerima Update

### Handler untuk Pesan Baru

```typescript
client.on("message", async (ctx) => {
  console.log("Pesan baru:", ctx.message.text);
});
```

### Handler untuk Pesan yang Diedit

```typescript
client.on("editedMessage", async (ctx) => {
  console.log("Pesan diedit:", ctx.editedMessage.text);
});
```

### Handler untuk Callback Query

```typescript
client.on("callbackQuery", async (ctx) => {
  await ctx.answerCallbackQuery({ text: "Diklik!" });
  console.log("Callback data:", ctx.callbackQuery.data);
});
```

### Handler untuk Inline Query

```typescript
client.on("inlineQuery", async (ctx) => {
  await ctx.answerInlineQuery([{
    type: "article",
    id: "1",
    title: "Hasil 1",
    inputMessageContent: { type: "text", text: "Ini hasil 1" }
  }]);
});
```

### Handler untuk Update Lainnya

```typescript
client.on("chatMemberUpdated", async (ctx) => {
  console.log("Member berubah:", ctx.chatMemberUpdated);
});

client.on("poll", async (ctx) => {
  console.log("Poll update:", ctx.poll);
});

client.on("story", async (ctx) => {
  console.log("Story baru:", ctx.story);
});

client.on("chatJoinRequest", async (ctx) => {
  console.log("Join request:", ctx.chatJoinRequest);
});

client.on("preCheckoutQuery", async (ctx) => {
  console.log("Pre checkout:", ctx.preCheckoutQuery);
});
```

### Filter Pesan

```typescript
client.on("message:text", async (ctx) => {
  console.log("Hanya pesan teks");
});

client.on("message:photo", async (ctx) => {
  console.log("Hanya pesan foto");
});

client.on("message:document", async (ctx) => {
  console.log("Hanya pesan dokumen");
});

client.on("message:video", async (ctx) => {
  console.log("Hanya pesan video");
});

client.on("message", async (ctx) => {
  if (ctx.message.text?.startsWith("/start")) {
    await ctx.reply("Halo!");
  }
});
```

### Filter dengan Predicate

```typescript
client.filter(
  (ctx) => ctx.message?.from?.id === 123456789,
  async (ctx) => {
    console.log("Pesan dari user tertentu");
  }
);
```

### Branch Handler

```typescript
client.branch(
  (ctx) => ctx.message?.text === "/start",
  async (ctx) => {
    await ctx.reply("Start!");
  },
  async (ctx) => {
    await ctx.reply("Bukan start");
  }
);
```

### Middleware

```typescript
client.use(async (ctx, next) => {
  console.log("Sebelum handler");
  await next();
  console.log("Setelah handler");
});
```

### Middleware dengan Filter

```typescript
client.use(async (ctx, next) => {
  if (ctx.message?.from?.id === 123456789) {
    await next();
  }
});
```

### Context Reply

```typescript
client.on("message", async (ctx) => {
  await ctx.reply("Balasan");
  await ctx.replyPhoto("photo.jpg");
  await ctx.replyDocument("file.pdf");
});
```

---

## Manajemen Chat

### Mendapatkan Daftar Chat

```typescript
const chats = await client.getChats();
```

### Mendapatkan Info Chat

```typescript
const chat = await client.getChat(chatId);
```

### Mendapatkan History Chat

```typescript
const messages = await client.getHistory(chatId, {
  limit: 50
});
```

### Membaca Pesan

```typescript
await client.readMessages(chatId, messageId);
```

### Mencari Pesan

```typescript
const messages = await client.searchMessages({
  chatId: chatId,
  query: "kata kunci",
  limit: 20
});
```

### Mengedit Pesan

```typescript
await client.editMessageText(chatId, messageId, "Pesan baru");
```

### Mengedit Caption

```typescript
await client.editMessageCaption(chatId, messageId, {
  caption: "Caption baru"
});
```

### Menghapus Pesan

```typescript
await client.deleteMessage(chatId, messageId);
```

### Menghapus Banyak Pesan

```typescript
await client.deleteMessages(chatId, [1, 2, 3]);
```

### Pin Pesan

```typescript
await client.pinMessage(chatId, messageId);
```

### Unpin Pesan

```typescript
await client.unpinMessage(chatId, messageId);
```

### Forward Pesan

```typescript
await client.forwardMessage(fromChatId, toChatId, messageId);
```

### Forward Banyak Pesan

```typescript
await client.forwardMessages(fromChatId, toChatId, [1, 2, 3]);
```

### Mengirim Chat Action

```typescript
await client.sendChatAction(chatId, "typing");
```

### Join Chat

```typescript
await client.joinChat(chatId);
```

### Leave Chat

```typescript
await client.leaveChat(chatId);
```

### Membuat Group

```typescript
const chat = await client.createGroup("Nama Group", {
  users: [userId1, userId2]
});
```

### Membuat Supergroup

```typescript
const chat = await client.createSupergroup("Nama Supergroup", {
  description: "Deskripsi"
});
```

### Membuat Channel

```typescript
const chat = await client.createChannel("Nama Channel", {
  description: "Deskripsi channel"
});
```

### Mengatur Foto Chat

```typescript
await client.setChatPhoto(chatId, "path/to/photo.jpg");
```

### Menghapus Foto Chat

```typescript
await client.deleteChatPhoto(chatId);
```

### Mengatur Deskripsi Chat

```typescript
await client.setChatDescription(chatId, "Deskripsi baru");
```

### Mengatur Judul Chat

```typescript
await client.setChatTitle(chatId, "Judul Baru");
```

### Mengatur Message TTL

```typescript
await client.setMessageTtl(chatId, 86400);
```

### Archive Chat

```typescript
await client.archiveChat(chatId);
```

### Archive Banyak Chat

```typescript
await client.archiveChats([chatId1, chatId2]);
```

### Unarchive Chat

```typescript
await client.unarchiveChat(chatId);
```

### Unarchive Banyak Chat

```typescript
await client.unarchiveChats([chatId1, chatId2]);
```

### Mendapatkan Chat Settings

```typescript
const settings = await client.getChatSettings(chatId);
```

### Enable Business Bots

```typescript
await client.enableBusinessBots(chatId);
```

### Disable Business Bots

```typescript
await client.disableBusinessBots(chatId);
```

### Set Slow Mode

```typescript
await client.setSlowMode(chatId, { seconds: 30 });
```

### Disable Slow Mode

```typescript
await client.disableSlowMode(chatId);
```

### Set Member List Visibility

```typescript
await client.setMemberListVisibility(chatId, true);
```

### Set Topics Enabled

```typescript
await client.setTopicsEnabled(chatId, true, true);
```

### Set Antispam Enabled

```typescript
await client.setAntispamEnabled(chatId, true);
```

### Set Signatures Enabled

```typescript
await client.setSignaturesEnabled(chatId, true);
```

### Delete Chat

```typescript
await client.deleteChat(chatId);
```

### Mendapatkan Discussion Chat Suggestions

```typescript
const suggestions = await client.getDiscussionChatSuggestions();
```

### Set Discussion Chat

```typescript
await client.setDiscussionChat(chatId, discussionChatId);
```

### Transfer Chat Ownership

```typescript
await client.transferChatOwnership(chatId, userId, "password");
```

### Open Chat

```typescript
await client.openChat(chatId);
```

### Close Chat

```typescript
await client.closeChat(chatId);
```

### Add Chat Member

```typescript
const failed = await client.addChatMember(chatId, userId, {
  forwardLimit: 100
});
```

### Add Chat Members

```typescript
const failed = await client.addChatMembers(chatId, [userId1, userId2]);
```

### Delete Chat Member Messages

```typescript
await client.deleteChatMemberMessages(chatId, memberId);
```

---

## Manajemen File

### Download File

```typescript
for await (const chunk of client.download(fileId)) {
  console.log("Chunk:", chunk);
}
```

### Download dengan Progress

```typescript
const file = await client.download(fileId, {
  progressId: "progress-1"
});

client.on("downloadProgress", (ctx) => {
  if (ctx.progressId === "progress-1") {
    console.log(`Progress: ${ctx.progress}%`);
  }
});
```

### Upload File

```typescript
const message = await client.sendDocument(chatId, "path/to/file.pdf");
```

### Download Chunk

```typescript
const chunk = await client.downloadChunk(fileId, {
  offset: 0,
  chunkSize: 1024
});
```

---

## Inline Query & Callback Query

### Handler Inline Query

```typescript
client.on("inlineQuery", async (ctx) => {
  await ctx.answerInlineQuery([
    {
      type: "article",
      id: "1",
      title: "Hasil 1",
      description: "Deskripsi hasil 1",
      inputMessageContent: {
        type: "text",
        text: "Ini adalah hasil 1"
      }
    },
    {
      type: "photo",
      id: "2",
      photoUrl: "https://example.com/photo.jpg",
      thumbnailUrl: "https://example.com/thumb.jpg"
    }
  ]);
});
```

### Handler Callback Query

```typescript
client.on("callbackQuery", async (ctx) => {
  if (ctx.callbackQuery.data === "btn1") {
    await ctx.answerCallbackQuery({ text: "Tombol diklik!" });
    await ctx.editMessageText("Pesan diupdate!");
  }
});
```

### Answer Callback Query

```typescript
await client.answerCallbackQuery(callbackQueryId, {
  text: "Berhasil!",
  alert: true
});
```

### Send Callback Query

```typescript
const answer = await client.sendCallbackQuery(botId, messageId, {
  text: "Pertanyaan?"
});
```

### Send Inline Query

```typescript
const answer = await client.sendInlineQuery(botId, chatId, {
  query: "pencarian"
});
```

---

## Manajemen User & Profile

### Update Profile

```typescript
await client.updateProfile({
  firstName: "Nama Depan",
  lastName: "Nama Belakang",
  bio: "Bio saya"
});
```

### Set Birthday

```typescript
await client.setBirthday({
  birthday: {
    day: 1,
    month: 1,
    year: 2000
  }
});
```

### Set Emoji Status

```typescript
await client.setEmojiStatus("emoji_id", {
  until: Date.now() + 86400000
});
```

### Set Name Color

```typescript
await client.setNameColor(0xFF0000, {
  customEmojiId: "emoji_id"
});
```

### Set Profile Color

```typescript
await client.setProfileColor(0x00FF00);
```

### Set Location

```typescript
await client.setLocation({
  latitude: -6.2088,
  longitude: 106.8456,
  address: "Alamat"
});
```

### Set Personal Channel

```typescript
await client.setPersonalChannel({
  chatId: channelId
});
```

### Set My Name (Bot)

```typescript
await client.setMyName({
  name: "Nama Bot",
  languageCode: "id"
});
```

### Set My Description (Bot)

```typescript
await client.setMyDescription({
  description: "Deskripsi bot",
  languageCode: "id"
});
```

### Set My Short Description (Bot)

```typescript
await client.setMyShortDescription({
  shortDescription: "Deskripsi pendek",
  languageCode: "id"
});
```

### Get My Name (Bot)

```typescript
const name = await client.getMyName({
  languageCode: "id"
});
```

### Get My Description (Bot)

```typescript
const description = await client.getMyDescription({
  languageCode: "id"
});
```

### Get My Short Description (Bot)

```typescript
const shortDescription = await client.getMyShortDescription({
  languageCode: "id"
});
```

### Show Username

```typescript
await client.showUsername(userId, "username");
```

### Hide Username

```typescript
await client.hideUsername(userId, "username");
```

### Reorder Usernames

```typescript
await client.reorderUsernames(userId, ["username1", "username2"]);
```

### Set Online Status

```typescript
await client.setOnline(true);
```

---

## Manajemen Channel & Group

### Mendapatkan Member Chat

```typescript
const members = await client.getChatMembers(chatId);
```

### Mendapatkan Info Member

```typescript
const member = await client.getChatMember(chatId, userId);
```

### Ban Member

```typescript
await client.banChatMember(chatId, userId, {
  until: Date.now() + 86400000,
  deleteMessages: true
});
```

### Unban Member

```typescript
await client.unbanChatMember(chatId, userId);
```

### Kick Member

```typescript
await client.kickChatMember(chatId, userId);
```

### Set Chat Member Rights

```typescript
await client.setChatMemberRights(chatId, userId, {
  rights: {
    canSendMessages: true,
    canSendMedia: true,
    canSendPolls: false
  }
});
```

### Promote Chat Member

```typescript
await client.promoteChatMember(chatId, userId, {
  canDeleteMessages: true,
  canManageChat: true,
  title: "Admin"
});
```

### Mendapatkan Administrator

```typescript
const admins = await client.getChatAdministrators(chatId);
```

### Membuat Invite Link

```typescript
const link = await client.createInviteLink(chatId, {
  title: "Link Undangan",
  expireAt: Date.now() + 86400000,
  limit: 100
});
```

### Mendapatkan Invite Links

```typescript
const links = await client.getCreatedInviteLinks(chatId);
```

### Set Chat Sticker Set

```typescript
await client.setChatStickerSet(chatId, "sticker_set_name");
```

### Delete Chat Sticker Set

```typescript
await client.deleteChatStickerSet(chatId);
```

### Set Available Reactions

```typescript
await client.setAvailableReactions(chatId, "all");
```

### Enable Join Requests

```typescript
await client.enableJoinRequests(chatId);
```

### Disable Join Requests

```typescript
await client.disableJoinRequests(chatId);
```

### Mendapatkan Join Requests

```typescript
const requests = await client.getJoinRequests(chatId);
```

### Approve Join Request

```typescript
await client.approveJoinRequest(chatId, userId);
```

### Decline Join Request

```typescript
await client.declineJoinRequest(chatId, userId);
```

---

## Story & Media

### Membuat Story

```typescript
const story = await client.createStory(chatId, {
  type: "photo",
  photo: "path/to/photo.jpg"
}, {
  caption: "Caption story",
  privacy: {
    type: "contacts"
  }
});
```

### Mendapatkan Stories

```typescript
const stories = await client.getStories(chatId, [storyId1, storyId2]);
```

### Mendapatkan Story

```typescript
const story = await client.getStory(chatId, storyId);
```

### Menghapus Story

```typescript
await client.deleteStory(chatId, storyId);
```

### Menghapus Banyak Stories

```typescript
await client.deleteStories(chatId, [storyId1, storyId2]);
```

### Menambahkan Story ke Highlights

```typescript
await client.addStoryToHighlights(chatId, storyId);
```

### Menambahkan Banyak Stories ke Highlights

```typescript
await client.addStoriesToHighlights(chatId, [storyId1, storyId2]);
```

### Menghapus Story dari Highlights

```typescript
await client.removeStoryFromHighlights(chatId, storyId);
```

### Menghapus Banyak Stories dari Highlights

```typescript
await client.removeStoriesFromHighlights(chatId, [storyId1, storyId2]);
```

---

## Video Chat & Live Stream

### Start Video Chat

```typescript
const videoChat = await client.startVideoChat(chatId, {
  title: "Video Chat"
});
```

### Join Video Chat

```typescript
const joinUrl = await client.joinVideoChat(videoChatId, params, {
  audio: true,
  video: true
});
```

### Leave Video Chat

```typescript
await client.leaveVideoChat(videoChatId);
```

### Mendapatkan Video Chat

```typescript
const videoChat = await client.getVideoChat(videoChatId);
```

### Join Live Stream

```typescript
await client.joinLiveStream(streamId);
```

### Mendapatkan Live Stream Channels

```typescript
const channels = await client.getLiveStreamChannels(streamId);
```

### Download Live Stream Segment

```typescript
const segment = await client.downloadLiveStreamSegment(
  streamId,
  channelId,
  scale,
  timestamp
);
```

---

## Payment & Invoice

### Mengirim Invoice

```typescript
const message = await client.sendInvoice(chatId, "Judul", "Deskripsi", "payload", "USD", [
  { label: "Item 1", amount: 1000 },
  { label: "Item 2", amount: 2000 }
]);
```

### Answer Pre Checkout Query

```typescript
await client.answerPreCheckoutQuery(preCheckoutQueryId, true);
```

### Refund Star Payment

```typescript
await client.refundStarPayment(userId, telegramPaymentChargeId);
```

---

## Reactions

### Menambahkan Reaction

```typescript
await client.addReaction(chatId, messageId, "👍");
```

### Menghapus Reaction

```typescript
await client.removeReaction(chatId, messageId, "👍");
```

### Set Reactions

```typescript
await client.setReactions(chatId, messageId, ["👍", "❤️"], {
  big: true
});
```

### Mendapatkan Message Reactions

```typescript
const reactions = await client.getMessageReactions(chatId, messageId);
```

---

## Poll & Voting

### Vote Poll

```typescript
await client.vote(chatId, messageId, [0, 1]);
```

### Retract Vote

```typescript
await client.retractVote(chatId, messageId);
```

### Stop Poll

```typescript
const poll = await client.stopPoll(chatId, messageId);
```

### Handler Poll Update

```typescript
client.on("poll", async (ctx) => {
  console.log("Poll diupdate:", ctx.poll);
});
```

---

## Forum & Topic

### Membuat Topic

```typescript
const topic = await client.createTopic(chatId, "Judul Topic", {
  iconColor: 0xFF0000
});
```

### Mengedit Topic

```typescript
const topic = await client.editTopic(chatId, topicId, "Judul Baru", {
  iconColor: 0x00FF00
});
```

### Menghapus Topic

```typescript
await client.deleteTopic(chatId, topicId);
```

### Hide General Topic

```typescript
await client.hideGeneralTopic(chatId);
```

### Show General Topic

```typescript
await client.showGeneralTopic(chatId);
```

### Close Topic

```typescript
await client.closeTopic(chatId, topicId);
```

### Reopen Topic

```typescript
await client.reopenTopic(chatId, topicId);
```

### Pin Topic

```typescript
await client.pinTopic(chatId, topicId);
```

### Unpin Topic

```typescript
await client.unpinTopic(chatId, topicId);
```

### Mengirim Pesan ke Topic

```typescript
await client.sendMessage(chatId, "Pesan", {
  messageThreadId: topicId
});
```

---

## Bot Commands

### Set My Commands

```typescript
await client.setMyCommands([
  { command: "start", description: "Mulai bot" },
  { command: "help", description: "Bantuan" }
], {
  scope: { type: "default" }
});
```

### Get My Commands

```typescript
const commands = await client.getMyCommands();
```

---

## Scheduled Messages

### Mengirim Pesan Terjadwal

```typescript
const message = await client.sendMessage(chatId, "Pesan terjadwal", {
  sendAt: Date.now() + 3600000
});
```

### Mendapatkan Scheduled Messages

```typescript
const messages = await client.getScheduledMessages(chatId);
```

### Mengirim Scheduled Message

```typescript
const message = await client.sendScheduledMessage(chatId, scheduledMessageId);
```

### Menghapus Scheduled Message

```typescript
await client.deleteScheduledMessage(chatId, scheduledMessageId);
```

### Menghapus Scheduled Messages

```typescript
await client.deleteScheduledMessages(chatId, [1, 2, 3]);
```

---

## Voice Transcription

### Transcribe Voice

```typescript
const transcription = await client.transcribeVoice(chatId, messageId);
console.log(transcription.text);
```

---

## Link Preview

### Mendapatkan Link Preview

```typescript
const preview = await client.getLinkPreview("https://example.com", {
  url: "https://example.com"
});
```

### Mengirim Pesan dengan Link Preview

```typescript
await client.sendMessage(chatId, "Check this: https://example.com", {
  linkPreview: {
    url: "https://example.com"
  }
});
```

---

## Mini App

### Open Mini App

```typescript
const miniApp = await client.openMiniApp(botId, chatId, {
  startParam: "param"
});
```

---

## Saved Messages

### Mendapatkan Saved Messages

```typescript
const messages = await client.getSavedMessages(chatId, {
  limit: 50
});
```

### Mendapatkan Saved Chats

```typescript
const savedChats = await client.getSavedChats();
```

---

## Common Chats

### Mendapatkan Common Chats

```typescript
const chats = await client.getCommonChats(userId);
```

---

## Inactive Chats

### Mendapatkan Inactive Chats

```typescript
const inactiveChats = await client.getInactiveChats();
```

---

## Boosts

### Set Boosts Required

```typescript
await client.setBoostsRequiredToCircumventRestrictions(chatId, 10);
```

---

## Sticker Set

### Mendapatkan Sticker Set

```typescript
const stickerSet = await client.getStickerSet("sticker_set_name");
```

### Mendapatkan Custom Emoji Stickers

```typescript
const stickers = await client.getCustomEmojiStickers("emoji_id");
```

---

## Business Connection

### Mendapatkan Business Connection

```typescript
const connection = await client.getBusinessConnection(connectionId);
```

---

## Utility Functions

### Get Random ID

```typescript
import { getRandomId } from "https://deno.land/x/techgram/mod.ts";
const id = getRandomId();
```

### Get Color from Peer ID

```typescript
import { getColorFromPeerId } from "https://deno.land/x/techgram/mod.ts";
const color = getColorFromPeerId(peerId);
```

### Get Color Name

```typescript
import { getColorName } from "https://deno.land/x/techgram/mod.ts";
const colorName = getColorName(color);
```

### Invoke API Langsung

```typescript
const result = await client.invoke({
  _: "messages.getChats",
  hash: 0
});
```

### Get Input Peer

```typescript
const inputPeer = await client.getInputPeer(chatId);
```

### Get Input Channel

```typescript
const inputChannel = await client.getInputChannel(channelId);
```

### Get Input User

```typescript
const inputUser = await client.getInputUser(userId);
```

### Mendapatkan Network Statistics

```typescript
const stats = await client.getNetworkStatistics();
```

### Mendapatkan Contacts

```typescript
const contacts = await client.getContacts();
```

### Add Contact

```typescript
await client.addContact(userId, {
  firstName: "Nama",
  lastName: "Belakang"
});
```

### Delete Contact

```typescript
await client.deleteContact(userId);
```

### Delete Contacts

```typescript
await client.deleteContacts([userId1, userId2]);
```

### Block User

```typescript
await client.blockUser(userId);
```

### Unblock User

```typescript
await client.unblockUser(userId);
```

### Mendapatkan Translations

```typescript
const translations = await client.getTranslations();
```

### Mendapatkan Gifts

```typescript
const gifts = await client.getGifts();
```

### Mendapatkan Claimed Gifts

```typescript
const claimedGifts = await client.getClaimedGifts();
```

### Mengirim Gift

```typescript
await client.sendGift(chatId, giftId, {
  message: "Selamat ulang tahun!"
});
```

### Mendapatkan Gift

```typescript
const gift = await client.getGift("gift_slug");
```

### Sell Gift

```typescript
await client.sellGift(userId, messageId);
```

### Resolve Message Link

```typescript
const message = await client.resolveMessageLink("https://t.me/username/123");
```

### Start Bot

```typescript
const message = await client.startBot(botId, {
  startParam: "param"
});
```

### Get Progress ID

```typescript
const progressId = await client.getProgressId();
```

### Handler Upload Progress

```typescript
client.on("uploadProgress", (ctx) => {
  console.log(`Upload: ${ctx.progress}%`);
});
```

### Handler Download Progress

```typescript
client.on("downloadProgress", (ctx) => {
  console.log(`Download: ${ctx.progress}%`);
});
```

---

## Contoh Lengkap

### Contoh Bot Lengkap (Tanpa CLI Input)

**Deno:**
```typescript
import { Client, StorageMemory } from "https://deno.land/x/techgram/mod.ts";

const client = new Client({
  apiId: 12345678,
  apiHash: "your_api_hash",
  storage: new StorageMemory(),
});

await client.connect();
await client.start({
  botToken: "YOUR_BOT_TOKEN"
});

client.on("message", async (ctx) => {
  if (ctx.message.text === "/start") {
    await ctx.reply("Halo! Selamat datang di bot ini.");
  } else if (ctx.message.text === "/help") {
    await ctx.reply("Ini adalah bantuan.");
  }
});

client.on("callbackQuery", async (ctx) => {
  if (ctx.callbackQuery.data === "btn1") {
    await ctx.answerCallbackQuery({ text: "Diklik!" });
    await ctx.reply("Tombol diklik!");
  }
});
```

**Node.js:**

**1. Setup Project:**
```bash
npm init -y
npm install github:techwiz37/techgram
```

**2. package.json:**
```json
{
  "type": "module",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "@techgram/node": "github:techwiz37/techgram"
  }
}
```

**3. index.js:**
```typescript
import { Client, StorageMemory } from "@techgram/node";

const client = new Client({
  apiId: 12345678,
  apiHash: "your_api_hash",
  storage: new StorageMemory(),
});

await client.connect();
await client.start({
  botToken: "YOUR_BOT_TOKEN"
});

client.on("message", async (ctx) => {
  if (ctx.message.text === "/start") {
    await ctx.reply("Halo! Selamat datang di bot ini.");
  } else if (ctx.message.text === "/help") {
    await ctx.reply("Ini adalah bantuan.");
  }
});

client.on("callbackQuery", async (ctx) => {
  if (ctx.callbackQuery.data === "btn1") {
    await ctx.answerCallbackQuery({ text: "Diklik!" });
    await ctx.reply("Tombol diklik!");
  }
});
```

**4. Jalankan:**
```bash
npm start
# atau
node index.js
```

### Contoh User Client Lengkap (Tanpa CLI Input)

**Deno:**
```typescript
import { Client, StorageMemory } from "https://deno.land/x/techgram/mod.ts";

const client = new Client({
  apiId: 12345678,
  apiHash: "your_api_hash",
  storage: new StorageMemory(),
});

await client.connect();
await client.start({
  phone: "+1234567890",
  code: "12345",
  password: "your_password"
});

client.on("message", async (ctx) => {
  console.log("Pesan baru:", ctx.message.text);
  await ctx.reply("Pesan diterima!");
});

await client.sendMessage(chatId, "Halo dari user client!");
```

**Node.js:**
```typescript
import { Client, StorageMemory } from "@techgram/node";

const client = new Client({
  apiId: 12345678,
  apiHash: "your_api_hash",
  storage: new StorageMemory(),
});

await client.connect();
await client.start({
  phone: "+1234567890",
  code: "12345",
  password: "your_password"
});

client.on("message", async (ctx) => {
  console.log("Pesan baru:", ctx.message.text);
  await ctx.reply("Pesan diterima!");
});

await client.sendMessage(chatId, "Halo dari user client!");
```

### Contoh Menggunakan Environment Variables

**Deno:**
```typescript
import { Client, StorageMemory } from "https://deno.land/x/techgram/mod.ts";

const client = new Client({
  apiId: parseInt(Deno.env.get("API_ID") || process.env.API_ID || "0"),
  apiHash: Deno.env.get("API_HASH") || process.env.API_HASH || "",
  storage: new StorageMemory(),
});

await client.connect();
await client.start();

client.on("message", async (ctx) => {
  await ctx.reply("Halo!");
});
```

**Node.js:**
```typescript
import { Client, StorageMemory } from "@techgram/node";

const client = new Client({
  apiId: parseInt(process.env.API_ID || "0"),
  apiHash: process.env.API_HASH || "",
  storage: new StorageMemory(),
});

await client.connect();
await client.start();

client.on("message", async (ctx) => {
  await ctx.reply("Halo!");
});
```

**File .env:**
```
API_ID=12345678
API_HASH=your_api_hash
BOT_TOKEN=YOUR_BOT_TOKEN
```

---

## Error Handling

```typescript
try {
  await client.sendMessage(chatId, "Pesan");
} catch (error) {
  if (error instanceof TelegramError) {
    console.log("Error Telegram:", error.errorMessage);
  } else {
    console.log("Error lain:", error);
  }
}
```

---

## Storage

### Storage Memory

```typescript
import { StorageMemory } from "https://deno.land/x/techgram/mod.ts";

const client = new Client({
  storage: new StorageMemory()
});
```

### Storage Local Storage

```typescript
import { StorageLocalStorage } from "https://deno.land/x/techgram/mod.ts";

const client = new Client({
  storage: new StorageLocalStorage()
});
```

### Storage Indexed DB

```typescript
import { StorageIndexedDb } from "https://deno.land/x/techgram/mod.ts";

const client = new Client({
  storage: new StorageIndexedDb()
});
```

---

## Tips & Best Practices

1. Selalu handle error dengan try-catch
2. Gunakan storage yang sesuai dengan environment
3. Simpan auth string untuk login ulang yang lebih cepat
4. Gunakan middleware untuk logging atau validasi
5. Gunakan filter untuk handler yang spesifik
6. Jangan lupa disconnect saat aplikasi ditutup

---

## Environment Variables

- `BOT_TOKEN`: Token bot untuk autentikasi bot
- `PHONE_NUMBER`: Nomor telepon untuk autentikasi user
- `VERIFICATION_CODE`: Kode verifikasi untuk autentikasi user
- `PASSWORD`: Password 2FA untuk autentikasi user (opsional)

---

## License

Techgram dibuat open-source di bawah GNU Lesser General Public License version 3.
