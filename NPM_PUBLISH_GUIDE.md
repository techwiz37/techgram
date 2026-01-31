# Panduan Publish ke NPM untuk @techgram/node

## Masalah Error 403

Jika Anda mendapat error:
```
npm error 403 403 Forbidden - PUT https://registry.npmjs.org/techgram
npm error 403 Two-factor authentication or granular access token with bypass 2fa enabled is required to publish packages.
```

Ini berarti Anda perlu setup 2FA atau menggunakan granular access token.

## Solusi

### Opsi 1: Enable Two-Factor Authentication (2FA) - RECOMMENDED

1. Login ke NPM: https://www.npmjs.com/login
2. Buka Settings: https://www.npmjs.com/settings/[username]/profile
3. Scroll ke bagian "Two-Factor Authentication"
4. Klik "Enable 2FA"
5. Pilih metode (Authenticator App atau SMS)
6. Scan QR code atau masukkan kode SMS
7. Simpan backup codes dengan aman!

Setelah 2FA enabled, Anda bisa publish dengan normal:
```bash
npm publish --access public
```

### Opsi 2: Gunakan Granular Access Token

1. Buka: https://www.npmjs.com/settings/[username]/tokens
2. Klik "Generate New Token"
3. Pilih "Granular Access Token"
4. Pilih scope: **Publish packages**
5. Pilih package: **@techgram/node** (atau semua packages)
6. Pilih permission: **Read and Publish**
7. Copy token yang dihasilkan

Gunakan token untuk login:
```bash
npm login --auth-type=legacy
# Username: [your-username]
# Password: [your-password]
# Email: [your-email]
# OTP: [masukkan token dari authenticator app jika 2FA enabled]
# Enter one-time password: [jika 2FA enabled]
```

Atau set token langsung:
```bash
npm config set //registry.npmjs.org/:_authToken YOUR_TOKEN_HERE
```

### Opsi 3: Publish dengan --access public

Untuk scoped package seperti `@techgram/node`, gunakan:
```bash
npm publish --access public
```

Ini akan membuat package public dan tidak memerlukan 2FA (tapi tetap recommended untuk security).

## Setup Package Name

Pastikan `package.json` menggunakan nama yang benar:

```json
{
  "name": "@techgram/node",
  "version": "0.1.0",
  "description": "Cross-runtime JavaScript library for building Telegram clients",
  "main": "mod.ts",
  "type": "module",
  "publishConfig": {
    "access": "public"
  }
}
```

Atau jika ingin private:
```json
{
  "name": "@techgram/node",
  "publishConfig": {
    "access": "restricted"
  }
}
```

## Langkah Publish

1. **Pastikan sudah login:**
```bash
npm whoami
```

2. **Pastikan package name benar:**
```bash
cat package.json | grep name
```

3. **Publish:**
```bash
npm publish --access public
```

Atau gunakan script:
```bash
bash run.sh
# Pilih opsi 3
```

## Troubleshooting

### Error: Package name already exists
- Package name `techgram` mungkin sudah ada
- Gunakan scoped package: `@techgram/node`
- Atau gunakan nama lain

### Error: 403 Forbidden
- Enable 2FA di NPM account
- Atau gunakan granular access token
- Atau pastikan menggunakan `--access public` untuk scoped package

### Error: 401 Unauthorized
- Login ulang: `npm login`
- Atau set token: `npm config set //registry.npmjs.org/:_authToken YOUR_TOKEN`

### Error: Package name invalid
- Scoped package harus format: `@scope/name`
- Scope harus sama dengan NPM username atau organization
- Contoh: jika username `techwiz37`, scope bisa `@techwiz37/node`

## Tips

1. **Selalu gunakan 2FA** untuk keamanan
2. **Gunakan scoped package** untuk menghindari nama conflict
3. **Test publish dengan `--dry-run`** sebelum publish sebenarnya:
   ```bash
   npm publish --dry-run
   ```
4. **Check package sebelum publish:**
   ```bash
   npm pack
   tar -tzf techgram-*.tgz | head
   ```

## Verifikasi Setelah Publish

1. Cek di NPM: https://www.npmjs.com/package/@techgram/node
2. Test install:
   ```bash
   npm install @techgram/node
   ```
3. Test import:
   ```typescript
   import { Client } from "@techgram/node";
   ```
