<div align="center">

# 🚀 Techgram

**Library TypeScript/JavaScript untuk Membangun Telegram Client di Node.js & Bun**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-LGPL%203.0-green.svg?style=for-the-badge)](./COPYING.LESSER)

**📚 [Lihat Dokumentasi Lengkap](./docs.md)** | **💬 [Discussion Chat](https://t.me/techgramchat)** | **📢 [Channel](https://t.me/techwizch)** | **👨‍💻 [Developer](https://t.me/techwiz37)**

</div>

---

## ✨ Mengapa Memilih Techgram?

Techgram adalah library modern yang dirancang khusus untuk membangun Telegram client dengan mudah dan powerful. Dibangun dengan TypeScript untuk memberikan pengalaman development yang lebih baik dan type-safe.

### 🎯 Keunggulan Utama

- **🌐 Node.js & Bun Ready** - Dibangun khusus untuk Node.js dan Bun dengan dukungan ESM dan CommonJS. Siap pakai tanpa setup tambahan!

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

**1. Setup `package.json`:**

Tambahkan dependency di `package.json`:
```json
{
  "dependencies": {
    "@techgram/node": "github:techwiz37/techgram"
  }
}
```

**2. Install dependencies:**
```bash
npm install
```

**Persyaratan:**
- Node.js versi 18.0.0 atau lebih baru, atau Bun.js
- Library otomatis mendukung ESM dan CommonJS
- TypeScript support (opsional)

**Catatan:** Library sudah pre-built dan siap digunakan. File `dist/` sudah di-commit ke GitHub, jadi tidak perlu build manual.

**Untuk ES Modules (ESM):**
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

**Untuk CommonJS:**
```json
{
  "type": "commonjs",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "@techgram/node": "github:techwiz37/techgram"
  }
}
```

5. Buat file `index.js` atau `index.ts`:

**ESM:**
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
  await ctx.reply("Halo!");
});
```

5. Jalankan:

**Node.js:**
```bash
npm start
```

**Bun:**
```bash
bun run index.js
```

### Menggunakan Environment Variables

**Setup environment variables:**
```bash
export BOT_TOKEN="YOUR_BOT_TOKEN"
export API_ID=12345678
export API_HASH="your_api_hash"
```

**Atau buat file `.env`:**
```
BOT_TOKEN=YOUR_BOT_TOKEN
API_ID=12345678
API_HASH=your_api_hash
```

**Contoh dengan environment variables:**

**ESM:**
```javascript
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

**CommonJS:**
```javascript
const { Client, StorageMemory } = require("@techgram/node");

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
- **Node.js** - ESM dan CommonJS support

---

## 📝 Contoh Kode

Semua contoh menggunakan `@techgram/node` untuk Node.js:

### Handler dengan Filter

```typescript
import { Client, StorageMemory } from "@techgram/node";

const client = new Client({
  apiId: 12345678,
  apiHash: "your_api_hash",
  storage: new StorageMemory(),
});

await client.connect();
await client.start({ botToken: "YOUR_BOT_TOKEN" });

client.on("message:text", async (ctx) => {
  await ctx.reply("Ini adalah pesan teks!");
});

client.on("message:photo", async (ctx) => {
  await ctx.reply("Ini adalah foto!");
});
```

### Middleware

```typescript
import { Client, StorageMemory } from "@techgram/node";

const client = new Client({
  apiId: 12345678,
  apiHash: "your_api_hash",
  storage: new StorageMemory(),
});

await client.connect();
await client.start({ botToken: "YOUR_BOT_TOKEN" });

client.use(async (ctx, next) => {
  console.log("Sebelum handler");
  await next();
  console.log("Setelah handler");
});
```

### Inline Keyboard

```typescript
import { Client, StorageMemory } from "@techgram/node";

const client = new Client({
  apiId: 12345678,
  apiHash: "your_api_hash",
  storage: new StorageMemory(),
});

await client.connect();
await client.start({ botToken: "YOUR_BOT_TOKEN" });

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
import { Client, StorageMemory } from "@techgram/node";

const client = new Client({
  apiId: 12345678,
  apiHash: "your_api_hash",
  storage: new StorageMemory(),
});

await client.connect();
await client.start({ botToken: "YOUR_BOT_TOKEN" });

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

[📚 Dokumentasi Lengkap](./docs.md) | [💬 Discussion Chat](https://t.me/techgramchat) | [📢 Channel](https://t.me/techwizch) | [👨‍💻 Developer](https://t.me/techwiz37)

</div>
