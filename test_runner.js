#!/usr/bin/env node

/**
 * Test Runner untuk Techgram Library
 * Menjalankan test untuk bot dan userbot functionality
 */

const { spawn } = require('child_process');
const path = require('path');

const tests = [
  { name: 'Bot Test', file: 'tests/bot.test.js' },
  { name: 'Userbot Test', file: 'tests/userbot.test.js' }
];

async function runTest(testFile) {
  return new Promise((resolve, reject) => {
    console.log(`\n🧪 Running: ${testFile.name}...\n`);
    
    const node = spawn('node', [testFile.file], {
      stdio: 'inherit',
      shell: true,
      cwd: __dirname
    });

    node.on('close', (code) => {
      if (code === 0) {
        console.log(`\n✅ ${testFile.name} passed!\n`);
        resolve();
      } else {
        console.log(`\n❌ ${testFile.name} failed with code ${code}\n`);
        reject(new Error(`Test failed with code ${code}`));
      }
    });

    node.on('error', (err) => {
      console.error(`\n❌ Error running ${testFile.name}:`, err.message);
      reject(err);
    });
  });
}

async function main() {
  console.log('🚀 Techgram Test Runner\n');
  console.log('='.repeat(50));

  const results = {
    passed: 0,
    failed: 0
  };

  for (const test of tests) {
    try {
      await runTest(test);
      results.passed++;
    } catch (error) {
      results.failed++;
      // Continue with other tests
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('\n📊 Test Results:');
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(`📝 Total: ${results.passed + results.failed}\n`);

  if (results.failed > 0) {
    process.exit(1);
  } else {
    console.log('🎉 All tests passed!\n');
    process.exit(0);
  }
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
