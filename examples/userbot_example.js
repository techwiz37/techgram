/**
 * Contoh penggunaan Techgram untuk Userbot
 * 
 * Cara menggunakan:
 * 1. Set environment variables:
 *    export PHONE_NUMBER="+1234567890"
 *    export VERIFICATION_CODE="12345"
 *    export PASSWORD="your_password"  # Opsional jika tidak ada 2FA
 *    export API_ID=12345678
 *    export API_HASH="your_api_hash"
 * 
 * 2. Atau edit file ini dan isi langsung:
 *    - phone
 *    - code
 *    - password (opsional)
 *    - apiId
 *    - apiHash
 * 
 * 3. Jalankan: node examples/userbot_example.js
 * 
 * Catatan: Untuk user account dengan 2FA, password diperlukan.
 */

const { Client, StorageMemory, StorageLocalStorage } = require("../script/mod.js");
const path = require("path");

async function main() {
  console.log("👤 Starting Telegram Userbot...\n");

  // Konfigurasi - bisa dari environment variables atau langsung
  const apiId = parseInt(process.env.API_ID || "0");
  const apiHash = process.env.API_HASH || "";
  const phone = process.env.PHONE_NUMBER || "";
  const code = process.env.VERIFICATION_CODE || "";
  const password = process.env.PASSWORD || "";

  if (!apiId || !apiHash) {
    console.error("❌ Error: API_ID dan API_HASH harus diset!");
    console.error("\nCara set environment variables:");
    console.error("  Windows (PowerShell):");
    console.error("    $env:API_ID='12345678'");
    console.error("    $env:API_HASH='your_api_hash'");
    console.error("    $env:PHONE_NUMBER='+1234567890'");
    console.error("    $env:VERIFICATION_CODE='12345'");
    console.error("    $env:PASSWORD='your_password'  # Opsional");
    process.exit(1);
  }

  // Untuk userbot, lebih baik gunakan StorageLocalStorage untuk persistensi
  // Storage akan disimpan di folder 'sessions'
  const storagePath = path.join(process.cwd(), "sessions", "userbot");
  const storage = new StorageLocalStorage(storagePath);

  // Buat client
  const client = new Client({
    apiId: apiId,
    apiHash: apiHash,
    storage: storage,
  });

  try {
    // Connect
    console.log("📡 Connecting to Telegram...");
    await client.connect();

    // Start authentication
    console.log("🔐 Authenticating user...");
    
    if (phone && code) {
      // Jika sudah ada phone dan code dari environment
      await client.start({
        phone: phone,
        code: code,
        password: password || undefined
      });
    } else {
      // Jika tidak ada, akan menggunakan interactive mode
      // atau throw error jika tidak ada environment variables
      await client.start();
    }

    // Get user info
    const me = await client.getMe();
    console.log(`\n✅ Userbot berhasil terhubung!`);
    console.log(`   User ID: ${me.id}`);
    console.log(`   Username: @${me.username || "N/A"}`);
    console.log(`   First Name: ${me.firstName || "N/A"}`);
    console.log(`   Last Name: ${me.lastName || "N/A"}`);
    console.log(`   Phone: ${me.phone || "N/A"}\n`);

    // Handler untuk pesan
    client.on("message", async (ctx) => {
      const message = ctx.message;
      const text = message.text || "";

      // Skip pesan dari diri sendiri
      if (message.from?.id === me.id) {
        return;
      }

      console.log(`📨 Pesan diterima dari ${message.from?.firstName || "Unknown"}: ${text}`);

      // Handler command /start
      if (text === "/start") {
        await ctx.reply("Halo! Saya adalah userbot Telegram yang dibuat dengan Techgram! 👤\n\nGunakan /help untuk melihat perintah yang tersedia.");
      }
      // Handler command /help
      else if (text === "/help") {
        await ctx.reply(
          "📋 Perintah yang tersedia:\n\n" +
          "/start - Memulai userbot\n" +
          "/help - Menampilkan bantuan\n" +
          "/info - Informasi userbot\n" +
          "/me - Informasi akun saya\n" +
          "/chats - Daftar chat\n" +
          "/echo <pesan> - Echo pesan"
        );
      }
      // Handler command /info
      else if (text === "/info") {
        const chat = await client.getChat(message.chat.id);
        await ctx.reply(
          `ℹ️ Informasi Userbot:\n\n` +
          `User ID: ${me.id}\n` +
          `Username: @${me.username || "N/A"}\n` +
          `Chat ID: ${message.chat.id}\n` +
          `Chat Type: ${chat.type || "N/A"}`
        );
      }
      // Handler command /me
      else if (text === "/me") {
        await ctx.reply(
          `👤 Informasi Akun:\n\n` +
          `ID: ${me.id}\n` +
          `Username: @${me.username || "N/A"}\n` +
          `Nama: ${me.firstName || ""} ${me.lastName || ""}\n` +
          `Phone: ${me.phone || "N/A"}\n` +
          `Is Bot: ${me.isBot ? "Yes" : "No"}`
        );
      }
      // Handler command /chats
      else if (text === "/chats") {
        try {
          const chats = await client.getChats();
          const chatList = chats.slice(0, 10).map((chat, idx) => {
            const title = chat.title || `${chat.firstName || ""} ${chat.lastName || ""}`.trim() || "Unknown";
            return `${idx + 1}. ${title}`;
          }).join("\n");
          
          await ctx.reply(
            `💬 Daftar Chat (10 pertama):\n\n${chatList}\n\n` +
            `Total: ${chats.length} chats`
          );
        } catch (error) {
          await ctx.reply(`❌ Error: ${error.message}`);
        }
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
      // Handler untuk pesan teks biasa
      else if (text && !text.startsWith("/")) {
        // Auto-reply untuk demo (bisa dihapus)
        // await ctx.reply(`Anda mengirim: "${text}"`);
      }
    });

    // Handler untuk update lainnya
    client.on("update:messageReaction", async (ctx) => {
      console.log(`👍 Reaction diterima pada pesan ${ctx.messageId}`);
    });

    // Handler untuk error
    client.on("error", (error) => {
      console.error("❌ Error:", error);
    });

    console.log("✅ Userbot siap menerima pesan!\n");
    console.log("Tekan Ctrl+C untuk menghentikan userbot.\n");

  } catch (error) {
    console.error("❌ Error:", error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    
    // Jika error terkait authentication
    if (error.message.includes("VERIFICATION_CODE") || error.message.includes("PASSWORD")) {
      console.error("\n💡 Tips:");
      console.error("   - Pastikan VERIFICATION_CODE sudah diset");
      console.error("   - Jika akun memiliki 2FA, pastikan PASSWORD sudah diset");
      console.error("   - Verifikasi kode dari Telegram app");
    }
    
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on("SIGINT", async () => {
  console.log("\n\n👋 Menghentikan userbot...");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("\n\n👋 Menghentikan userbot...");
  process.exit(0);
});

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
