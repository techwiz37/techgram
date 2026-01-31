/**
 * Contoh penggunaan Techgram untuk Bot
 * 
 * Cara menggunakan:
 * 1. Set environment variables:
 *    export BOT_TOKEN="your_bot_token"
 *    export API_ID=12345678
 *    export API_HASH="your_api_hash"
 * 
 * 2. Atau edit file ini dan isi langsung:
 *    - botToken
 *    - apiId
 *    - apiHash
 * 
 * 3. Jalankan: node examples/bot_example.js
 */

const { Client, StorageMemory } = require("../script/mod.js");

async function main() {
  console.log("🤖 Starting Telegram Bot...\n");

  // Konfigurasi - bisa dari environment variables atau langsung
  const apiId = parseInt(process.env.API_ID || "0");
  const apiHash = process.env.API_HASH || "";
  const botToken = process.env.BOT_TOKEN || "";

  if (!apiId || !apiHash || !botToken) {
    console.error("❌ Error: API_ID, API_HASH, dan BOT_TOKEN harus diset!");
    console.error("\nCara set environment variables:");
    console.error("  Windows (PowerShell):");
    console.error("    $env:API_ID='12345678'");
    console.error("    $env:API_HASH='your_api_hash'");
    console.error("    $env:BOT_TOKEN='your_bot_token'");
    console.error("\n  Linux/Mac:");
    console.error("    export API_ID=12345678");
    console.error("    export API_HASH='your_api_hash'");
    console.error("    export BOT_TOKEN='your_bot_token'");
    process.exit(1);
  }

  // Buat client dengan storage memory (untuk testing)
  // Untuk production, gunakan StorageLocalStorage
  const client = new Client({
    apiId: apiId,
    apiHash: apiHash,
    storage: new StorageMemory(),
  });

  try {
    // Connect dan start bot
    console.log("📡 Connecting to Telegram...");
    await client.connect();
    
    console.log("🔐 Authenticating bot...");
    await client.start({
      botToken: botToken
    });

    // Get bot info
    const me = await client.getMe();
    console.log(`\n✅ Bot berhasil terhubung!`);
    console.log(`   Bot ID: ${me.id}`);
    console.log(`   Username: @${me.username || "N/A"}`);
    console.log(`   First Name: ${me.firstName || "N/A"}\n`);

    // Handler untuk pesan
    client.on("message", async (ctx) => {
      const message = ctx.message;
      const text = message.text || "";

      console.log(`📨 Pesan diterima dari ${message.from?.firstName || "Unknown"}: ${text}`);

      // Handler command /start
      if (text === "/start") {
        await ctx.reply("Halo! Saya adalah bot Telegram yang dibuat dengan Techgram! 🤖\n\nGunakan /help untuk melihat perintah yang tersedia.");
      }
      // Handler command /help
      else if (text === "/help") {
        await ctx.reply(
          "📋 Perintah yang tersedia:\n\n" +
          "/start - Memulai bot\n" +
          "/help - Menampilkan bantuan\n" +
          "/info - Informasi bot\n" +
          "/echo <pesan> - Echo pesan\n" +
          "/ping - Test koneksi"
        );
      }
      // Handler command /info
      else if (text === "/info") {
        const chat = await client.getChat(message.chat.id);
        await ctx.reply(
          `ℹ️ Informasi Bot:\n\n` +
          `Bot ID: ${me.id}\n` +
          `Username: @${me.username || "N/A"}\n` +
          `Chat ID: ${message.chat.id}\n` +
          `Chat Type: ${chat.type || "N/A"}`
        );
      }
      // Handler command /echo
      else if (text.startsWith("/echo ")) {
        const echoText = text.substring(6);
        if (echoText) {
          await ctx.reply(`Echo: ${echoText}`);
        } else {
          await ctx.reply("❌ Gunakan: /echo <pesan>");
        }
      }
      // Handler command /ping
      else if (text === "/ping") {
        const startTime = Date.now();
        await ctx.reply("Pong! 🏓");
        const latency = Date.now() - startTime;
        await ctx.reply(`Latency: ${latency}ms`);
      }
      // Handler untuk pesan teks biasa
      else if (text && !text.startsWith("/")) {
        await ctx.reply(`Anda mengirim: "${text}"`);
      }
    });

    // Handler untuk callback query (inline buttons)
    client.on("update:callbackQuery", async (ctx) => {
      console.log(`🔘 Callback query: ${ctx.callbackQuery.data}`);
      await ctx.answerCallbackQuery({ text: "Tombol diklik!" });
    });

    // Handler untuk error
    client.on("error", (error) => {
      console.error("❌ Error:", error);
    });

    console.log("✅ Bot siap menerima pesan!\n");
    console.log("Tekan Ctrl+C untuk menghentikan bot.\n");

  } catch (error) {
    console.error("❌ Error:", error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on("SIGINT", async () => {
  console.log("\n\n👋 Menghentikan bot...");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("\n\n👋 Menghentikan bot...");
  process.exit(0);
});

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
