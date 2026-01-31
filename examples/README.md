# Contoh Penggunaan Techgram

Folder ini berisi contoh-contoh penggunaan library Techgram untuk membuat bot dan userbot.

## File yang Tersedia

### 1. `bot_example.js`
Contoh penggunaan Techgram untuk membuat **Telegram Bot**.

**Cara menggunakan:**
```bash
# Set environment variables
export BOT_TOKEN="your_bot_token"
export API_ID=12345678
export API_HASH="your_api_hash"

# Jalankan
node examples/bot_example.js
```

**Fitur yang ditampilkan:**
- Koneksi ke Telegram
- Autentikasi bot
- Handler pesan
- Command handler (/start, /help, /info, /echo, /ping)
- Callback query handler

### 2. `userbot_example.js`
Contoh penggunaan Techgram untuk membuat **Telegram Userbot**.

**Cara menggunakan:**
```bash
# Set environment variables
export PHONE_NUMBER="+1234567890"
export VERIFICATION_CODE="12345"
export PASSWORD="your_password"  # Opsional jika tidak ada 2FA
export API_ID=12345678
export API_HASH="your_api_hash"

# Jalankan
node examples/userbot_example.js
```

**Fitur yang ditampilkan:**
- Koneksi ke Telegram
- Autentikasi user account
- Handler pesan
- Command handler (/start, /help, /info, /me, /chats, /echo)
- Menggunakan StorageLocalStorage untuk persistensi session

## Mendapatkan API Credentials

### API_ID dan API_HASH
1. Buka https://my.telegram.org
2. Login dengan nomor telepon Anda
3. Masuk ke "API development tools"
4. Buat aplikasi baru
5. Copy `api_id` dan `api_hash`

### BOT_TOKEN
1. Buka https://t.me/BotFather di Telegram
2. Kirim command `/newbot`
3. Ikuti instruksi untuk membuat bot
4. Copy token yang diberikan

### VERIFICATION_CODE
- Kode verifikasi akan dikirim ke Telegram app Anda setelah menjalankan script
- Masukkan kode tersebut ke environment variable `VERIFICATION_CODE`

### PASSWORD (2FA)
- Hanya diperlukan jika akun Anda memiliki Two-Factor Authentication (2FA)
- Masukkan password 2FA Anda ke environment variable `PASSWORD`

## Environment Variables

### Untuk Bot:
- `BOT_TOKEN` - Token bot dari BotFather
- `API_ID` - API ID dari my.telegram.org
- `API_HASH` - API Hash dari my.telegram.org

### Untuk Userbot:
- `PHONE_NUMBER` - Nomor telepon dengan format internasional (contoh: +6281234567890)
- `VERIFICATION_CODE` - Kode verifikasi dari Telegram app
- `PASSWORD` - Password 2FA (opsional, hanya jika akun memiliki 2FA)
- `API_ID` - API ID dari my.telegram.org
- `API_HASH` - API Hash dari my.telegram.org

## Windows PowerShell

```powershell
$env:BOT_TOKEN="your_bot_token"
$env:API_ID="12345678"
$env:API_HASH="your_api_hash"
node examples/bot_example.js
```

## Linux/Mac

```bash
export BOT_TOKEN="your_bot_token"
export API_ID=12345678
export API_HASH="your_api_hash"
node examples/bot_example.js
```

## Troubleshooting

### Error: "API_ID, API_HASH, dan BOT_TOKEN harus diset!"
- Pastikan environment variables sudah diset dengan benar
- Gunakan format yang benar (API_ID harus angka)

### Error: "VERIFICATION_CODE environment variable is required"
- Pastikan kode verifikasi sudah dikirim ke Telegram app
- Masukkan kode ke environment variable `VERIFICATION_CODE`

### Error: "PASSWORD environment variable is required"
- Akun Anda memiliki 2FA
- Masukkan password 2FA ke environment variable `PASSWORD`

### Error: "PhoneNumberInvalid"
- Pastikan nomor telepon menggunakan format internasional
- Contoh: +6281234567890 (bukan 081234567890)

## Catatan

- Untuk testing, contoh menggunakan `StorageMemory` (tidak persist)
- Untuk production, gunakan `StorageLocalStorage` untuk menyimpan session
- Jangan commit file `.env` atau credentials ke repository
- Session userbot akan disimpan di folder `sessions/`
