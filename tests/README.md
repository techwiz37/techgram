# Test untuk Techgram Library

Folder ini berisi test untuk memverifikasi bahwa library Techgram bisa digunakan untuk membuat bot dan userbot.

## File Test

### 1. `bot.test.js`
Test untuk functionality bot:
- ✅ Test koneksi bot
- ✅ Test getMe() untuk bot
- ✅ Test sendMessage() (jika TEST_CHAT_ID diset)

### 2. `userbot.test.js`
Test untuk functionality userbot:
- ✅ Test koneksi userbot
- ✅ Test getMe() untuk user
- ✅ Test getChats()

## Menjalankan Test

### Menjalankan Semua Test
```bash
npm test
# atau
node test_runner.js
```

### Menjalankan Test Bot Saja
```bash
node tests/bot.test.js
```

### Menjalankan Test Userbot Saja
```bash
node tests/userbot.test.js
```

## Environment Variables untuk Test

### Untuk Bot Test:
```bash
export BOT_TOKEN="your_bot_token"
export API_ID=12345678
export API_HASH="your_api_hash"
export TEST_CHAT_ID="123456789"  # Opsional, untuk test sendMessage
```

### Untuk Userbot Test:
```bash
export PHONE_NUMBER="+1234567890"
export VERIFICATION_CODE="12345"
export PASSWORD="your_password"  # Opsional jika tidak ada 2FA
export API_ID=12345678
export API_HASH="your_api_hash"
```

## Hasil Test

Test akan menampilkan:
- ✅ **Passed**: Test berhasil
- ❌ **Failed**: Test gagal
- ⚠️ **Skipped**: Test di-skip karena environment variables tidak diset

## Catatan

- Test akan di-skip jika environment variables tidak diset (tidak akan gagal)
- Test menggunakan `StorageMemory` untuk menghindari konflik session
- Test sendMessage memerlukan `TEST_CHAT_ID` (chat ID tujuan untuk test)
- Untuk mendapatkan chat ID, bisa gunakan bot seperti @userinfobot

## Troubleshooting

### Test di-skip
- Pastikan environment variables sudah diset dengan benar
- Test akan di-skip jika credentials tidak tersedia (ini normal)

### Test gagal
- Periksa credentials (BOT_TOKEN, API_ID, API_HASH)
- Pastikan koneksi internet stabil
- Periksa apakah bot/user account masih aktif

### Error: "VERIFICATION_CODE environment variable is required"
- Pastikan kode verifikasi sudah dikirim ke Telegram app
- Masukkan kode ke environment variable `VERIFICATION_CODE`

### Error: "PASSWORD environment variable is required"
- Akun Anda memiliki 2FA
- Masukkan password 2FA ke environment variable `PASSWORD`
