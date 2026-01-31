/**
 * Test untuk Bot Functionality
 * 
 * Test ini memeriksa apakah library bisa digunakan untuk membuat bot.
 * 
 * Catatan: Test ini memerlukan environment variables:
 * - BOT_TOKEN
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

async function testBotConnection() {
  log('\n🧪 Test 1: Bot Connection', 'blue');
  
  const apiId = parseInt(process.env.API_ID || "0");
  const apiHash = process.env.API_HASH || "";
  const botToken = process.env.BOT_TOKEN || "";

  if (!apiId || !apiHash || !botToken) {
    log('⚠️  Test di-skip: Environment variables tidak diset', 'yellow');
    log('   Set BOT_TOKEN, API_ID, dan API_HASH untuk menjalankan test', 'yellow');
    return { passed: true, skipped: true };
  }

  try {
    const client = new Client({
      apiId: apiId,
      apiHash: apiHash,
      storage: new StorageMemory(),
    });

    await client.connect();
    await client.start({ botToken: botToken });
    
    const me = await client.getMe();
    
    if (me && me.id) {
      log(`✅ Bot berhasil terhubung! Bot ID: ${me.id}`, 'green');
      await client.disconnect();
      return { passed: true, skipped: false };
    } else {
      log('❌ Bot terhubung tapi tidak bisa mendapatkan info', 'red');
      await client.disconnect();
      return { passed: false, skipped: false };
    }
  } catch (error) {
    log(`❌ Error: ${error.message}`, 'red');
    return { passed: false, skipped: false, error: error.message };
  }
}

async function testBotSendMessage() {
  log('\n🧪 Test 2: Bot Send Message', 'blue');
  
  const apiId = parseInt(process.env.API_ID || "0");
  const apiHash = process.env.API_HASH || "";
  const botToken = process.env.BOT_TOKEN || "";
  const testChatId = process.env.TEST_CHAT_ID || "";

  if (!apiId || !apiHash || !botToken) {
    log('⚠️  Test di-skip: Environment variables tidak diset', 'yellow');
    return { passed: true, skipped: true };
  }

  if (!testChatId) {
    log('⚠️  Test di-skip: TEST_CHAT_ID tidak diset', 'yellow');
    log('   Set TEST_CHAT_ID untuk test mengirim pesan', 'yellow');
    return { passed: true, skipped: true };
  }

  try {
    const client = new Client({
      apiId: apiId,
      apiHash: apiHash,
      storage: new StorageMemory(),
    });

    await client.connect();
    await client.start({ botToken: botToken });
    
    // Test send message
    const testMessage = `Test message dari Techgram Bot - ${new Date().toISOString()}`;
    await client.sendMessage(parseInt(testChatId), testMessage);
    
    log(`✅ Pesan berhasil dikirim ke chat ${testChatId}`, 'green');
    await client.disconnect();
    return { passed: true, skipped: false };
  } catch (error) {
    log(`❌ Error: ${error.message}`, 'red');
    return { passed: false, skipped: false, error: error.message };
  }
}

async function testBotGetMe() {
  log('\n🧪 Test 3: Bot Get Me', 'blue');
  
  const apiId = parseInt(process.env.API_ID || "0");
  const apiHash = process.env.API_HASH || "";
  const botToken = process.env.BOT_TOKEN || "";

  if (!apiId || !apiHash || !botToken) {
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
    await client.start({ botToken: botToken });
    
    const me = await client.getMe();
    
    if (me && me.isBot === true) {
      log(`✅ getMe() berhasil! Bot: @${me.username || "N/A"}`, 'green');
      await client.disconnect();
      return { passed: true, skipped: false };
    } else {
      log('❌ getMe() tidak mengembalikan bot info yang benar', 'red');
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
  log('🚀 Running Bot Tests', 'blue');
  log('='.repeat(50), 'blue');

  const results = [];

  // Run tests
  results.push(await testBotConnection());
  results.push(await testBotGetMe());
  results.push(await testBotSendMessage());

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
