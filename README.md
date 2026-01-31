<div align="center">

# Techgram

TypeScript/JavaScript library untuk membangun Telegram client di Node.js dan Bun

**📚 [Dokumentasi Lengkap](./docs.md)** | **💬 [Discussion Chat](https://t.me/techgramchat)** | **📢 [Channel](https://t.me/techwizch)** | **👨‍💻 [Developer](https://t.me/techwiz37)** | **📄 [License](#license)**

</div>

### Fitur Utama

- **Node.js & Bun.** Mendukung Node.js dan Bun dengan ESM dan CommonJS.
- **Type-safe.** Dibangun dengan TypeScript dengan type definitions yang akurat.
- **Mudah Digunakan.** Menyediakan high-level API di atas Telegram API.
- **Extensible.** Sistem middleware memungkinkan integrasi dengan kode eksternal.

> Catatan: Techgram belum mencapai versi 1.0.0. Meskipun dapat berjalan di production, kami saat ini tidak merekomendasikan untuk digunakan pada proyek-proyek kritis.

## Memulai

### Node.js

**Menggunakan Environment Variables (Tanpa CLI):**

```bash
export BOT_TOKEN="YOUR_BOT_TOKEN"
export API_ID=12345678
export API_HASH="your_api_hash"
```

```javascript
const { Client, StorageMemory } = require("@techwiz/techgram");

const client = new Client({
  apiId: parseInt(process.env.API_ID || "0"),
  apiHash: process.env.API_HASH || "",
  storage: new StorageMemory(),
});

await client.connect();
await client.start();

client.on("message", async (ctx) => {
  if (ctx.message.text === "/start") {
    await ctx.reply("Halo!");
  }
});
```

**Atau dengan Parameter Langsung:**

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

**Install dari GitHub:**

```json
{
  "dependencies": {
    "@techwiz/techgram": "github:techwiz37/techgram"
  }
}
```

```bash
npm install
```

### User Account (Bukan Bot)

**Menggunakan Environment Variables:**

```bash
export PHONE_NUMBER="+1234567890"
export VERIFICATION_CODE="12345"
export PASSWORD="your_password"
export API_ID=12345678
export API_HASH="your_api_hash"
```

```javascript
const { Client, StorageMemory } = require("@techwiz/techgram");

const client = new Client({
  apiId: parseInt(process.env.API_ID || "0"),
  apiHash: process.env.API_HASH || "",
  storage: new StorageMemory(),
});

await client.connect();
await client.start();

client.on("message", async (ctx) => {
  if (ctx.message.text === "/start") {
    await ctx.reply("Halo dari user account!");
  }
});
```

**Atau dengan Parameter Langsung:**

```javascript
const { Client, StorageMemory } = require("@techwiz/techgram");

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
  if (ctx.message.text === "/start") {
    await ctx.reply("Halo dari user account!");
  }
});
```

**Catatan:** Untuk user account, jika akun memiliki 2FA (Two-Factor Authentication), Anda perlu menyediakan `PASSWORD`. Jika tidak, cukup `PHONE_NUMBER` dan `VERIFICATION_CODE`.

### Bun

**Menggunakan Environment Variables:**

```bash
export BOT_TOKEN="YOUR_BOT_TOKEN"
export API_ID=12345678
export API_HASH="your_api_hash"
```

```javascript
import { Client, StorageMemory } from "@techwiz/techgram";

const client = new Client({
  apiId: parseInt(process.env.API_ID || "0"),
  apiHash: process.env.API_HASH || "",
  storage: new StorageMemory(),
});

await client.connect();
await client.start();

client.on("message", async (ctx) => {
  if (ctx.message.text === "/start") {
    await ctx.reply("Halo!");
  }
});
```

**Install dari GitHub:**

```bash
bun add github:techwiz37/techgram
```

### User Account (Bukan Bot)

**Menggunakan Environment Variables:**

```bash
export PHONE_NUMBER="+1234567890"
export VERIFICATION_CODE="12345"
export PASSWORD="your_password"
export API_ID=12345678
export API_HASH="your_api_hash"
```

```javascript
import { Client, StorageMemory } from "@techwiz/techgram";

const client = new Client({
  apiId: parseInt(process.env.API_ID || "0"),
  apiHash: process.env.API_HASH || "",
  storage: new StorageMemory(),
});

await client.connect();
await client.start();

client.on("message", async (ctx) => {
  if (ctx.message.text === "/start") {
    await ctx.reply("Halo dari user account!");
  }
});
```

**Atau dengan Parameter Langsung:**

```javascript
import { Client, StorageMemory } from "@techwiz/techgram";

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
  if (ctx.message.text === "/start") {
    await ctx.reply("Halo dari user account!");
  }
});
```

**Catatan:** Untuk user account, jika akun memiliki 2FA (Two-Factor Authentication), Anda perlu menyediakan `PASSWORD`. Jika tidak, cukup `PHONE_NUMBER` dan `VERIFICATION_CODE`.

## License

Techgram dibuat open-source di bawah GNU Lesser General Public License version 3, atau sesuai pilihan Anda, versi yang lebih baru. Lihat [COPYING](./COPYING) dan [COPYING.LESSER](./COPYING.LESSER) untuk detail lebih lanjut.
