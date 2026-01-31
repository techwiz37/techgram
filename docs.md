# Dokumentasi Techgram

Dokumentasi lengkap untuk library Techgram - TypeScript/JavaScript library untuk membangun Telegram client di Node.js dan Bun.

**💬 [Discussion Chat](https://t.me/techgramchat)** | **📢 [Channel](https://t.me/techwizch)** | **👨‍💻 [Developer](https://t.me/techwiz37)** | **📖 [README](./README.md)**

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

### Node.js & Bun

**1. Setup `package.json`:**

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
    "@techwiz/techgram": "github:techwiz37/techgram"
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
    "@techwiz/techgram": "github:techwiz37/techgram"
  }
}
```

**2. Install dependencies:**
```bash
npm install
```

**3. Buat file `index.js`:**

**ESM:**
```javascript
import { Client, StorageMemory } from "@techwiz/techgram";

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

**CommonJS:**
```javascript
const { Client, StorageMemory } = require("@techwiz/techgram");

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

**4. Jalankan:**

```bash
npm start
```

---

## Koneksi & Autentikasi

### Menggunakan Environment Variables (Tanpa CLI)

Techgram mendukung autentikasi tanpa input CLI menggunakan environment variables.

**Untuk Bot:**
```bash
export BOT_TOKEN="YOUR_BOT_TOKEN"
export API_ID=12345678
export API_HASH="your_api_hash"
```

**Untuk User:**
```bash
export PHONE_NUMBER="+1234567890"
export VERIFICATION_CODE="12345"
export PASSWORD="your_password"
export API_ID=12345678
export API_HASH="your_api_hash"
```

**Contoh dengan Environment Variables:**

```javascript
import { Client, StorageMemory } from "@techwiz/techgram";

const client = new Client({
  apiId: parseInt(process.env.API_ID || "0"),
  apiHash: process.env.API_HASH || "",
  storage: new StorageMemory(),
});

await client.connect();
await client.start();
```

### Autentikasi Bot

```javascript
await client.start({
  botToken: "YOUR_BOT_TOKEN"
});
```

### Autentikasi User

```javascript
await client.start({
  phone: "+1234567890",
  code: "12345",
  password: "your_password"
});
```

### Manual Sign In

```javascript
await client.sendCode("+1234567890");
const result = await client.checkCode("12345");

if (result.type === "password_required") {
  const hint = await client.getPasswordHint();
  const passwordResult = await client.checkPassword("your_password");
}
```

### Export & Import Auth

```javascript
const authString = await client.exportAuthString();
await client.importAuthString(authString);
```

---

## Mengirim Pesan

### Mengirim Pesan Teks

```javascript
await client.sendMessage(chatId, "Halo dunia!");
```

### Mengirim Pesan dengan Format

```javascript
await client.sendMessage(chatId, "**Bold** dan *italic*", {
  parseMode: "markdown"
});
```

### Mengirim Foto

```javascript
await client.sendPhoto(chatId, "path/to/photo.jpg", {
  caption: "Ini adalah foto"
});
```

### Mengirim Video

```javascript
await client.sendVideo(chatId, "path/to/video.mp4", {
  caption: "Ini adalah video",
  duration: 60
});
```

### Mengirim Dokumen

```javascript
await client.sendDocument(chatId, "path/to/file.pdf", {
  caption: "Ini adalah dokumen"
});
```

### Mengirim Audio

```javascript
await client.sendAudio(chatId, "path/to/audio.mp3", {
  caption: "Ini adalah audio",
  duration: 120,
  performer: "Artist",
  title: "Song Title"
});
```

### Mengirim Voice

```javascript
await client.sendVoice(chatId, "path/to/voice.ogg", {
  caption: "Ini adalah voice message",
  duration: 30
});
```

### Mengirim Sticker

```javascript
await client.sendSticker(chatId, "path/to/sticker.webp");
```

### Mengirim Lokasi

```javascript
await client.sendLocation(chatId, -6.2088, 106.8456, {
  livePeriod: 3600
});
```

### Mengirim Kontak

```javascript
await client.sendContact(chatId, "+1234567890", "John Doe");
```

### Mengirim Venue

```javascript
await client.sendVenue(chatId, -6.2088, 106.8456, {
  title: "Lokasi",
  address: "Alamat lengkap"
});
```

### Mengirim Inline Query

```javascript
await client.sendInlineQuery(chatId, "query", {
  offset: "0"
});
```

### Mengirim Poll

```javascript
await client.sendPoll(chatId, "Pertanyaan?", ["Opsi 1", "Opsi 2", "Opsi 3"], {
  isAnonymous: false,
  allowsMultipleAnswers: true
});
```

### Mengirim Dice

```javascript
await client.sendDice(chatId);
```

### Mengirim Media Group

```javascript
await client.sendMediaGroup(chatId, [
  { type: "photo", media: "photo1.jpg" },
  { type: "photo", media: "photo2.jpg" },
  { type: "video", media: "video.mp4" }
]);
```

### Edit Pesan

```javascript
await client.editMessageText(chatId, messageId, "Pesan yang sudah diubah");
await client.editMessageCaption(chatId, messageId, { caption: "Caption baru" });
```

### Hapus Pesan

```javascript
await client.deleteMessage(chatId, messageId);
await client.deleteMessages(chatId, [messageId1, messageId2]);
```

### Forward Pesan

```javascript
await client.forwardMessages(chatId, fromChatId, [messageId]);
```

### Pin Pesan

```javascript
await client.pinMessage(chatId, messageId);
await client.unpinMessage(chatId, messageId);
```

### Scheduled Messages

```javascript
await client.sendMessage(chatId, "Pesan terjadwal", {
  scheduleDate: new Date(Date.now() + 3600000)
});
```

---

## Menerima Update

### Handler Pesan

```javascript
client.on("message", async (ctx) => {
  await ctx.reply("Pesan diterima!");
});
```

### Handler Pesan Teks

```javascript
client.on("message:text", async (ctx) => {
  if (ctx.message.text === "/start") {
    await ctx.reply("Halo!");
  }
});
```

### Handler Pesan Foto

```javascript
client.on("message:photo", async (ctx) => {
  await ctx.reply("Foto diterima!");
});
```

### Handler Pesan Video

```javascript
client.on("message:video", async (ctx) => {
  await ctx.reply("Video diterima!");
});
```

### Handler Update Lainnya

```javascript
client.on("update:messageReaction", async (ctx) => {
  console.log("Reaction diterima");
});

client.on("update:callbackQuery", async (ctx) => {
  await ctx.answerCallbackQuery();
});

client.on("update:inlineQuery", async (ctx) => {
  await ctx.answerInlineQuery([]);
});
```

### Middleware

```javascript
client.use(async (ctx, next) => {
  console.log("Sebelum handler");
  await next();
  console.log("Setelah handler");
});
```

### Filter

```javascript
client.on("message:text", async (ctx) => {
  if (ctx.message.text.startsWith("/")) {
    await ctx.reply("Ini adalah command");
  }
});
```

---

## Manajemen Chat

### Mendapatkan Informasi Chat

```javascript
const chat = await client.getChat(chatId);
console.log(chat.title);
```

### Membuat Group

```javascript
const group = await client.createGroup("Nama Group", [userId1, userId2]);
```

### Membuat Channel

```javascript
const channel = await client.createChannel("Nama Channel", {
  description: "Deskripsi channel"
});
```

### Membuat Supergroup

```javascript
const supergroup = await client.createSupergroup("Nama Supergroup", {
  description: "Deskripsi supergroup"
});
```

### Send Chat Action

```javascript
await client.sendChatAction(chatId, "typing");
await client.sendChatAction(chatId, "upload_photo");
await client.sendChatAction(chatId, "record_voice");
```

### Mengubah Foto Chat

```javascript
await client.setChatPhoto(chatId, "path/to/photo.jpg");
```

### Mengubah Deskripsi Chat

```javascript
await client.setChatDescription(chatId, "Deskripsi baru");
```

### Mengubah Title Chat

```javascript
await client.setChatTitle(chatId, "Title baru");
```

### Archive & Unarchive

```javascript
await client.archiveChat(chatId);
await client.unarchiveChat(chatId);
```

### Mute & Unmute

```javascript
await client.muteChat(chatId, { until: new Date(Date.now() + 3600000) });
await client.unmuteChat(chatId);
```

### Get Chats

```javascript
const chats = await client.getChats();
```

### Get History

```javascript
const messages = await client.getHistory(chatId, {
  limit: 100
});
```

### Search Messages

```javascript
const messages = await client.searchMessages(chatId, {
  query: "kata kunci"
});
```

### Open Chat

```javascript
await client.openChat(chatId);
```

---

## Manajemen File

### Download File

```javascript
for await (const chunk of client.download(fileId)) {
  console.log("Chunk diterima:", chunk.length);
}
```

### Download dengan Progress

```javascript
client.on("downloadProgress", (ctx) => {
  console.log(`Progress: ${ctx.progress}%`);
});

for await (const chunk of client.download(fileId, {
  progressId: "download-1"
})) {
}
```

### Upload File

```javascript
const message = await client.sendDocument(chatId, "path/to/file.pdf");
```

### Upload dengan Progress

```javascript
client.on("uploadProgress", (ctx) => {
  console.log(`Upload progress: ${ctx.progress}%`);
});

await client.sendDocument(chatId, "path/to/file.pdf", {
  progressId: "upload-1"
});
```

---

## Inline Query & Callback Query

### Handler Inline Query

```javascript
client.on("update:inlineQuery", async (ctx) => {
  await ctx.answerInlineQuery([
    {
      type: "article",
      id: "1",
      title: "Hasil 1",
      inputMessageContent: {
        type: "text",
        text: "Ini adalah hasil 1"
      }
    }
  ]);
});
```

### Handler Callback Query

```javascript
client.on("update:callbackQuery", async (ctx) => {
  if (ctx.callbackQuery.data === "button1") {
    await ctx.answerCallbackQuery({ text: "Tombol diklik!" });
    await ctx.editMessageText("Pesan diubah");
  }
});
```

### Inline Keyboard

```javascript
await client.sendMessage(chatId, "Pilih opsi:", {
  replyMarkup: {
    type: "inlineKeyboard",
    inlineKeyboard: [[
      { text: "Tombol 1", callbackData: "btn1" },
      { text: "Tombol 2", callbackData: "btn2" }
    ]]
  }
});
```

### Reply Keyboard

```javascript
await client.sendMessage(chatId, "Pilih opsi:", {
  replyMarkup: {
    type: "keyboard",
    keyboard: [[
      { text: "Tombol 1" },
      { text: "Tombol 2" }
    ]]
  }
});
```

---

## Manajemen User & Profile

### Mendapatkan Informasi User

```javascript
const me = await client.getMe();
console.log(me.firstName, me.lastName);
```

### Update Profile

```javascript
await client.updateProfile({
  firstName: "John",
  lastName: "Doe",
  bio: "Bio saya"
});
```

### Set Birthday

```javascript
await client.setBirthday({
  day: 1,
  month: 1,
  year: 1990
});
```

### Set Emoji Status

```javascript
await client.setEmojiStatus("emoji_id");
```

### Set User Emoji Status

```javascript
await client.setUserEmojiStatus(userId, "emoji_id");
```

### Set Name Color

```javascript
await client.setNameColor(0xFF0000);
```

### Set Profile Color

```javascript
await client.setProfileColor(0x00FF00);
```

### Set Location

```javascript
await client.setLocation({
  latitude: -6.2088,
  longitude: 106.8456
});
```

### Set Online Status

```javascript
await client.setOnline(true);
```

### Set Personal Channel

```javascript
await client.setPersonalChannel(channelId);
```

### Set My Description

```javascript
await client.setMyDescription({
  description: "Deskripsi saya"
});
```

### Get My Description

```javascript
const description = await client.getMyDescription();
```

### Set My Short Description

```javascript
await client.setMyShortDescription({
  shortDescription: "Deskripsi singkat"
});
```

### Get My Short Description

```javascript
const shortDescription = await client.getMyShortDescription();
```

### Username Management

```javascript
await client.showUsername(chatId, "username");
await client.hideUsername(chatId, "username");
await client.reorderUsernames(chatId, ["username1", "username2"]);
await client.hideUsernames(chatId);
```

### Block & Unblock User

```javascript
await client.blockUser(userId);
await client.unblockUser(userId);
```

### Contacts Management

```javascript
const contacts = await client.getContacts();
await client.addContact(userId, {
  firstName: "John",
  lastName: "Doe",
  phone: "+1234567890"
});
await client.deleteContact(userId);
await client.deleteContacts([userId1, userId2]);
```

---

## Manajemen Channel & Group

### Mendapatkan Member

```javascript
const members = await client.getChatMembers(chatId);
```

### Add Member

```javascript
await client.addChatMember(chatId, userId);
```

### Ban Member

```javascript
await client.banChatMember(chatId, userId);
```

### Promote Member

```javascript
await client.promoteChatMember(chatId, userId, {
  canDeleteMessages: true,
  canRestrictMembers: true
});
```

### Set Chat Member Rights

```javascript
await client.setChatMemberRights(chatId, userId, {
  canSendMessages: true,
  canSendMedia: true,
  canSendPolls: true
});
```

### Set Signatures Enabled

```javascript
await client.setSignaturesEnabled(chatId, true);
```

### Invite Link

```javascript
const link = await client.createInviteLink(chatId);
const links = await client.getCreatedInviteLinks(chatId);
```

### Join Requests

```javascript
const requests = await client.getJoinRequests(chatId);
await client.approveJoinRequests(chatId, [userId]);
await client.declineJoinRequests(chatId, [userId]);
```

---

## Forum & Topic

### Membuat Topic

```javascript
const topic = await client.createTopic(chatId, "Nama Topic");
```

### Edit Topic

```javascript
await client.editTopic(chatId, topicId, {
  title: "Title baru"
});
```

### Hapus Topic

```javascript
await client.deleteTopic(chatId, topicId);
```

### Pin Topic

```javascript
await client.pinTopic(chatId, topicId);
```

---

## Story & Media

### Membuat Story

```javascript
await client.createStory({
  content: {
    type: "photo",
    photo: "path/to/photo.jpg"
  },
  privacy: {
    type: "contacts"
  }
});
```

### Hapus Story

```javascript
await client.deleteStory(storyId);
```

### Mendapatkan Story

```javascript
const stories = await client.getStories(userId);
```

---

## Video Chat & Live Stream

### Start Video Chat

```javascript
await client.startVideoChat(chatId);
```

### Join Video Chat

```javascript
await client.joinVideoChat(chatId, {
  inviteHash: "hash"
});
```

### Schedule Video Chat

```javascript
await client.scheduleVideoChat(chatId, {
  startDate: new Date(Date.now() + 3600000)
});
```

### Download Live Stream

```javascript
await client.downloadLiveStreamSegment(chatId, {
  time: 0,
  scale: 1
});
```

### Leave Video Chat

```javascript
await client.leaveVideoChat(videoChatId);
```

### Get Video Chat

```javascript
const videoChat = await client.getVideoChat(videoChatId);
```

### Get Live Stream Channels

```javascript
const channels = await client.getLiveStreamChannels(videoChatId);
```

---

## Payment & Invoice

### Mengirim Invoice

```javascript
await client.sendInvoice(chatId, {
  title: "Produk",
  description: "Deskripsi produk",
  payload: "payload",
  providerToken: "token",
  currency: "USD",
  prices: [
    { label: "Item", amount: 1000 }
  ]
});
```

### Handler Pre Checkout Query

```javascript
client.on("update:preCheckoutQuery", async (ctx) => {
  await ctx.answerPreCheckoutQuery({ ok: true });
});
```

### Handler Successful Payment

```javascript
client.on("message:successfulPayment", async (ctx) => {
  console.log("Pembayaran berhasil:", ctx.message.successfulPayment);
});
```

### Refund Star Payment

```javascript
await client.refundStarPayment(userId, telegramPaymentChargeId);
```

---

## Reactions

### Add Reaction

```javascript
await client.addReaction(chatId, messageId, "👍");
```

### Remove Reaction

```javascript
await client.removeReaction(chatId, messageId, "👍");
```

### Set Reactions

```javascript
await client.setReactions(chatId, messageId, ["👍", "❤️"]);
```

### Get Message Reactions

```javascript
const reactions = await client.getMessageReactions(chatId, messageId);
```

---

## Poll & Voting

### Mengirim Poll

```javascript
await client.sendPoll(chatId, "Pertanyaan?", ["Opsi 1", "Opsi 2"], {
  isAnonymous: false,
  allowsMultipleAnswers: true,
  closeDate: new Date(Date.now() + 86400000)
});
```

### Stop Poll

```javascript
await client.stopPoll(chatId, messageId);
```

### Handler Poll Answer

```javascript
client.on("update:pollAnswer", async (ctx) => {
  console.log("Poll dijawab:", ctx.pollAnswer);
});
```

---

## Bot Commands

### Set Commands

```javascript
await client.setMyCommands([
  { command: "start", description: "Mulai bot" },
  { command: "help", description: "Bantuan" }
]);
```

### Get Commands

```javascript
const commands = await client.getMyCommands();
```

### Handler Command

```javascript
client.on("message:text", async (ctx) => {
  if (ctx.message.text === "/start") {
    await ctx.reply("Halo!");
  }
});
```

---

## Scheduled Messages

### Mengirim Pesan Terjadwal

```javascript
await client.sendMessage(chatId, "Pesan terjadwal", {
  scheduleDate: new Date(Date.now() + 3600000)
});
```

---

## Voice Transcription

### Transcribe Voice

```javascript
const transcription = await client.transcribeVoice(chatId, messageId);
console.log(transcription.text);
```

---

## Link Preview

### Get Link Preview

```javascript
const preview = await client.getLinkPreview("https://example.com");
```

### Disable Link Preview

```javascript
await client.sendMessage(chatId, "https://example.com", {
  linkPreview: { disabled: true }
});
```

---

## Mini App

### Open Mini App

```javascript
await client.openMiniApp(chatId, "app_url");
```

---

## Saved Messages

### Get Saved Messages

```javascript
const messages = await client.getSavedMessages();
```

### Get Saved Chats

```javascript
const chats = await client.getSavedChats();
```

---

## Common Chats

### Get Common Chats

```javascript
const chats = await client.getCommonChats(userId);
```

---

## Inactive Chats

### Get Inactive Chats

```javascript
const chats = await client.getInactiveChats();
```

---

## Boosts

### Get Boosts

```javascript
const boosts = await client.getBoosts(chatId);
```

---

## Sticker Set

### Get Sticker Set

```javascript
const set = await client.getStickerSet("set_name");
```

---

## Business Connection

### Get Business Connection

```javascript
const connection = await client.getBusinessConnection("connection_id");
```

---

## Translations

### Get Translations

```javascript
const translations = await client.getTranslations({
  languages: ["en", "id"]
});
```

---

## Gifts

### Get Gifts

```javascript
const gifts = await client.getGifts();
```

### Send Gift

```javascript
await client.sendGift(chatId, giftId);
```

### Sell Gift

```javascript
await client.sellGift(userId, messageId);
```

### Get Claimed Gifts

```javascript
const claimedGifts = await client.getClaimedGifts(chatId);
```

---

## Utility Functions

### Get Random ID

```javascript
import { getRandomId } from "@techwiz/techgram";
const id = getRandomId();
```

### Check Password

```javascript
import { checkPassword } from "@techwiz/techgram";
const isValid = await checkPassword(password, hash);
```

---

## Error Handling

```javascript
try {
  await client.sendMessage(chatId, "Pesan");
} catch (error) {
  if (error instanceof InputError) {
    console.log("Input error:", error.message);
  } else {
    console.log("Error lain:", error);
  }
}
```

---

## Best Practices

1. **Gunakan Environment Variables** untuk credentials
2. **Handle Errors** dengan try-catch
3. **Gunakan Storage** yang sesuai (Memory untuk testing, persistent untuk production)
4. **Rate Limiting** - jangan spam request
5. **Cleanup** - disconnect client saat tidak digunakan

---

**Selamat menggunakan Techgram! 🚀**
