import { existsSync, readFileSync } from "fs";
import { join } from "path";

const distEsm = join("dist", "esm", "mod.js");
const distCjs = join("dist", "cjs", "mod.js");

if (existsSync(distEsm) && existsSync(distCjs)) {
  const esmContent = readFileSync(distEsm, "utf-8");
  const cjsContent = readFileSync(distCjs, "utf-8");
  
  if (esmContent.length > 100 && cjsContent.length > 100) {
    console.log("✅ Techgram pre-built files found. Ready to use!");
    process.exit(0);
  }
}

console.log("⚠️  Techgram: Pre-built files not found!");
console.log("");
console.log("Library ini perlu di-build dulu:");
console.log("  1. Run: npm run build");
console.log("  2. Commit dist/ ke GitHub: git add dist/ && git commit -m 'Add dist files' && git push");
console.log("");
console.log("Lihat BUILD_INSTRUCTIONS.md untuk detail lengkap.");
process.exit(0);
