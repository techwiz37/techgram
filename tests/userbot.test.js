/**
 * Test untuk Userbot Functionality
 * 
 * Test ini memeriksa apakah library bisa digunakan untuk membuat userbot.
 * 
 * Catatan: Test ini memerlukan environment variables:
 * - PHONE_NUMBER
 * - VERIFICATION_CODE
 * - PASSWORD (opsional, jika akun memiliki 2FA)
 * - API_ID
 * - API_HASH
 * 
 * Jika tidak ada, test akan di-skip dengan pesan warning.
 */

const { Client, StorageMemory } = require("../script/mod.js");

// Colors untuk output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function testUserbotConnection() {
  log('\n🧪 Test 1: Userbot Connection', 'blue');
  
  const apiId = parseInt(process.env.API_ID || "0");
  const apiHash = process.env.API_HASH || "";
  const phone = process.env.PHONE_NUMBER || "";
  const code = process.env.VERIFICATION_CODE || "";

  if (!apiId || !apiHash) {
    log('⚠️  Test di-skip: API_ID dan API_HASH tidak diset', 'yellow');
    return { passed: true, skipped: true };
  }

  if (!phone || !code) {
    log('⚠️  Test di-skip: PHONE_NUMBER dan VERIFICATION_CODE tidak diset', 'yellow');
    log('   Set PHONE_NUMBER, VERIFICATION_CODE, dan PASSWORD (jika ada 2FA) untuk menjalankan test', 'yellow');
    return { passed: true, skipped: true };
  }

  try {
    const client = new Client({
      apiId: apiId,
      apiHash: apiHash,
      storage: new StorageMemory(),
    });

    await client.connect();
    
    const password = process.env.PASSWORD || undefined;
    await client.start({
      phone: phone,
      code: code,
      password: password
    });
    
    const me = await client.getMe();
    
    if (me && me.id && !me.isBot) {
      log(`✅ Userbot berhasil terhubung! User ID: ${me.id}`, 'green');
      await client.disconnect();
      return { passed: true, skipped: false };
    } else {
      log('❌ Userbot terhubung tapi tidak bisa mendapatkan info user', 'red');
      await client.disconnect();
      return { passed: false, skipped: false };
    }
  } catch (error) {
    log(`❌ Error: ${error.message}`, 'red');
    if (error.message.includes("VERIFICATION_CODE") || error.message.includes("PASSWORD")) {
      log('   💡 Pastikan VERIFICATION_CODE dan PASSWORD (jika ada 2FA) sudah benar', 'yellow');
    }
    return { passed: false, skipped: false, error: error.message };
  }
}

async function testUserbotGetMe() {
  log('\n🧪 Test 2: Userbot Get Me', 'blue');
  
  const apiId = parseInt(process.env.API_ID || "0");
  const apiHash = process.env.API_HASH || "";
  const phone = process.env.PHONE_NUMBER || "";
  const code = process.env.VERIFICATION_CODE || "";

  if (!apiId || !apiHash || !phone || !code) {
    log('⚠️  Test di-skip: Environment variables tidak diset', 'yellow');
    return { passed: true, skipped: true };
  }

  try {
    const client = new Client({
      apiId: apiId,
      apiHash: apiHash,
      storage: new StorageMemory(),
    });

    await client.connect();
    
    const password = process.env.PASSWORD || undefined;
    await client.start({
      phone: phone,
      code: code,
      password: password
    });
    
    const me = await client.getMe();
    
    if (me && me.isBot === false) {
      log(`✅ getMe() berhasil! User: @${me.username || "N/A"} (${me.firstName || ""} ${me.lastName || ""})`, 'green');
      await client.disconnect();
      return { passed: true, skipped: false };
    } else {
      log('❌ getMe() tidak mengembalikan user info yang benar', 'red');
      await client.disconnect();
      return { passed: false, skipped: false };
    }
  } catch (error) {
    log(`❌ Error: ${error.message}`, 'red');
    return { passed: false, skipped: false, error: error.message };
  }
}

async function testUserbotGetChats() {
  log('\n🧪 Test 3: Userbot Get Chats', 'blue');
  
  const apiId = parseInt(process.env.API_ID || "0");
  const apiHash = process.env.API_HASH || "";
  const phone = process.env.PHONE_NUMBER || "";
  const code = process.env.VERIFICATION_CODE || "";

  if (!apiId || !apiHash || !phone || !code) {
    log('⚠️  Test di-skip: Environment variables tidak diset', 'yellow');
    return { passed: true, skipped: true };
  }

  try {
    const client = new Client({
      apiId: apiId,
      apiHash: apiHash,
      storage: new StorageMemory(),
    });

    await client.connect();
    
    const password = process.env.PASSWORD || undefined;
    await client.start({
      phone: phone,
      code: code,
      password: password
    });
    
    const chats = await client.getChats();
    
    if (Array.isArray(chats)) {
      log(`✅ getChats() berhasil! Total chats: ${chats.length}`, 'green');
      await client.disconnect();
      return { passed: true, skipped: false };
    } else {
      log('❌ getChats() tidak mengembalikan array', 'red');
      await client.disconnect();
      return { passed: false, skipped: false };
    }
  } catch (error) {
    log(`❌ Error: ${error.message}`, 'red');
    return { passed: false, skipped: false, error: error.message };
  }
}

async function runAllTests() {
  log('\n' + '='.repeat(50), 'blue');
  log('🚀 Running Userbot Tests', 'blue');
  log('='.repeat(50), 'blue');

  const results = [];

  // Run tests
  results.push(await testUserbotConnection());
  results.push(await testUserbotGetMe());
  results.push(await testUserbotGetChats());

  // Summary
  log('\n' + '='.repeat(50), 'blue');
  log('📊 Test Results:', 'blue');
  log('='.repeat(50), 'blue');

  const passed = results.filter(r => r.passed && !r.skipped).length;
  const failed = results.filter(r => !r.passed && !r.skipped).length;
  const skipped = results.filter(r => r.skipped).length;

  log(`✅ Passed: ${passed}`, 'green');
  if (failed > 0) {
    log(`❌ Failed: ${failed}`, 'red');
  }
  if (skipped > 0) {
    log(`⚠️  Skipped: ${skipped}`, 'yellow');
  }
  log(`📝 Total: ${results.length}`, 'blue');

  if (failed > 0) {
    log('\n❌ Some tests failed!', 'red');
    process.exit(1);
  } else {
    log('\n✅ All tests passed!', 'green');
    process.exit(0);
  }
}

// Run tests
runAllTests().catch((error) => {
  log(`\n❌ Fatal error: ${error.message}`, 'red');
  if (error.stack) {
    console.error(error.stack);
  }
  process.exit(1);
});
