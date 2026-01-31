<div align="center">

# 🚀 Techgram

**Library JavaScript Cross-Runtime untuk Membangun Telegram Client yang Powerful & Modern**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Deno](https://img.shields.io/badge/Deno-000000?style=for-the-badge&logo=deno&logoColor=white)](https://deno.land/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-LGPL%203.0-green.svg?style=for-the-badge)](./COPYING.LESSER)

**📚 [Lihat Dokumentasi Lengkap](./docs.md)** | **💬 [Discussion Chat](https://t.me/TechgramChat)** | **📖 [API Reference](https://deno.land/x/techgram/mod.ts)**

</div>

---

## ✨ Mengapa Memilih Techgram?

Techgram adalah library modern yang dirancang khusus untuk membangun Telegram client dengan mudah dan powerful. Dibangun dengan TypeScript untuk memberikan pengalaman development yang lebih baik dan type-safe.

### 🎯 Keunggulan Utama

- **🌐 Cross-Runtime Support** - Berjalan di Node.js, Deno, Browser, dan Bun tanpa perubahan kode. Satu kode, berjalan di mana saja!

- **🛡️ Type-Safe & Modern** - Dibangun dengan TypeScript dengan type definitions yang akurat. Auto-complete dan type checking yang lengkap untuk pengalaman coding yang lebih baik.

- **⚡ High-Level API** - API yang mudah digunakan dan intuitif. Tidak perlu memahami detail teknis Telegram API, cukup gunakan method yang sudah disediakan.

- **🔌 Extensible Middleware** - Sistem middleware yang fleksibel memungkinkan Anda mengintegrasikan kode eksternal dengan mudah. Buat custom handler, filter, dan middleware sesuai kebutuhan.

- **🌍 Web-First Approach** - Mengutamakan Web APIs daripada runtime-specific APIs, membuat kode lebih portable dan modern.

- **📦 Zero CLI Dependency** - Tidak perlu input CLI untuk autentikasi! Gunakan environment variables atau pass credentials langsung. Perfect untuk production dan automation.

- **🚀 Production Ready** - Fitur lengkap untuk semua kebutuhan Telegram: messages, media, groups, channels, stories, video chat, payments, dan banyak lagi!

- **💾 Flexible Storage** - Mendukung berbagai storage backend: Memory, LocalStorage, IndexedDB, dan custom storage sesuai kebutuhan Anda.

---

## 🚀 Quick Start

### Instalasi

**Node.js:**
```bash
npm install @techgram/node
```

**Deno:**
```typescript
import { Client, StorageMemory } from "https://deno.land/x/techgram/mod.ts";
```

**Browser:**
```html
<script type="module">
  import { Client } from "https://esm.sh/jsr/@techgram/techgram";
</script>
```

**Bun:**
```bash
bun add @techgram/node
```

### Contoh Sederhana - Bot

```typescript
import { Client, StorageMemory } from "mod.ts";

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
    await ctx.reply("Halo! Selamat datang! 🎉");
  }
});
```

### Contoh Sederhana - User Client

```typescript
import { Client, StorageMemory } from "mod.ts";

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
});
```

### Menggunakan Environment Variables (Tanpa CLI!)

```bash
export BOT_TOKEN="YOUR_BOT_TOKEN"
export API_ID=12345678
export API_HASH="your_api_hash"
```

```typescript
import { Client, StorageMemory } from "mod.ts";

const client = new Client({
  apiId: parseInt(Deno.env.get("API_ID") || process.env.API_ID || "0"),
  apiHash: Deno.env.get("API_HASH") || process.env.API_HASH || "",
  storage: new StorageMemory(),
});

await client.connect();
await client.start();
```

---

## 🎨 Fitur-Fitur Lengkap

Techgram menyediakan semua fitur yang Anda butuhkan untuk membangun Telegram client:

### 📨 Messaging
- ✅ Mengirim semua jenis pesan (text, photo, video, audio, document, dll)
- ✅ Edit dan delete pesan
- ✅ Forward dan pin pesan
- ✅ Scheduled messages
- ✅ Message reactions
- ✅ Poll & voting
- ✅ Voice transcription

### 👥 Chat Management
- ✅ Manajemen group dan channel
- ✅ Member management (ban, kick, promote)
- ✅ Invite links
- ✅ Chat settings & permissions
- ✅ Forum & topics
- ✅ Archive & unarchive

### 📱 Media & Stories
- ✅ Upload & download file dengan progress tracking
- ✅ Story creation & management
- ✅ Media groups
- ✅ Link preview

### 🎥 Video & Live Stream
- ✅ Video chat
- ✅ Live streaming
- ✅ Schedule video chat

### 💰 Payments & Business
- ✅ Invoice & payments
- ✅ Business connections
- ✅ Star payments

### 🎯 Advanced Features
- ✅ Inline queries
- ✅ Callback queries
- ✅ Bot commands
- ✅ Mini apps
- ✅ Saved messages
- ✅ Contacts management
- ✅ Translations
- ✅ Gifts

**Dan masih banyak lagi!** Lihat [dokumentasi lengkap](./docs.md) untuk semua fitur yang tersedia.

---

## 📚 Dokumentasi

Untuk dokumentasi lengkap dengan contoh penggunaan semua fitur dan function, silakan lihat:

### 📖 [Dokumentasi Lengkap (docs.md)](./docs.md)

Dokumentasi mencakup:
- ✅ Instalasi untuk semua runtime
- ✅ Koneksi & autentikasi (bot & user tanpa CLI)
- ✅ Semua jenis pengiriman pesan
- ✅ Handler untuk semua jenis update
- ✅ Manajemen chat, file, user, channel, group
- ✅ Forum & topic management
- ✅ Story & media handling
- ✅ Video chat & live stream
- ✅ Payment & invoice
- ✅ Reactions, poll, bot commands
- ✅ Scheduled messages
- ✅ Voice transcription
- ✅ Dan semua fitur lainnya!

**Semua contoh dalam bahasa Indonesia dengan penjelasan yang jelas!**

---

## 🎯 Use Cases

Techgram cocok untuk berbagai use case:

- 🤖 **Telegram Bots** - Buat bot yang powerful dengan mudah
- 👤 **User Clients** - Aplikasi client untuk user account
- 📊 **Automation Tools** - Otomasi tugas-tugas Telegram
- 🔄 **Data Sync** - Sinkronisasi data dari Telegram
- 📱 **Custom Clients** - Buat custom Telegram client sesuai kebutuhan
- 🎮 **Game Bots** - Bot untuk game dan interaktif
- 💼 **Business Tools** - Tools untuk business automation
- 📢 **Broadcast Tools** - Tools untuk broadcast message

---

## 🛠️ Tech Stack

- **TypeScript** - Type-safe development
- **Modern JavaScript** - ES6+ features
- **Web APIs** - Portable dan modern
- **Cross-Runtime** - Node.js, Deno, Browser, Bun

---

## 📝 Contoh Kode

### Handler dengan Filter

```typescript
client.on("message:text", async (ctx) => {
  await ctx.reply("Ini adalah pesan teks!");
});

client.on("message:photo", async (ctx) => {
  await ctx.reply("Ini adalah foto!");
});
```

### Middleware

```typescript
client.use(async (ctx, next) => {
  console.log("Sebelum handler");
  await next();
  console.log("Setelah handler");
});
```

### Inline Keyboard

```typescript
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

### Download File dengan Progress

```typescript
for await (const chunk of client.download(fileId, {
  progressId: "download-1"
})) {
  // Process chunk
}

client.on("downloadProgress", (ctx) => {
  if (ctx.progressId === "download-1") {
    console.log(`Progress: ${ctx.progress}%`);
  }
});
```

**Lihat [docs.md](./docs.md) untuk lebih banyak contoh!**

---

## 🤝 Contributing

Kontribusi sangat diterima! Silakan buat issue atau pull request.

---

## 📄 License

Techgram dibuat open-source di bawah **GNU Lesser General Public License version 3**, atau sesuai pilihan Anda, versi yang lebih baru.

Lihat [COPYING](./COPYING) dan [COPYING.LESSER](./COPYING.LESSER) untuk detail lebih lanjut.

---

## ⚠️ Catatan

> **Note:** Techgram belum mencapai versi 1.0.0. Meskipun dapat berjalan di production, kami saat ini tidak merekomendasikan untuk digunakan pada proyek-proyek kritis.

---

<div align="center">

**Dibuat dengan ❤️ untuk komunitas Telegram**

**⭐ Star repository ini jika Techgram membantu Anda!**

[📚 Dokumentasi Lengkap](./docs.md) | [💬 Discussion](https://t.me/TechgramChat) | [📖 API Reference](https://deno.land/x/techgram/mod.ts)

</div>
