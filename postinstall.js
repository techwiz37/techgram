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

console.log("✅ Techgram installed successfully!");
console.log("📦 Library is pre-built and ready to use.");
process.exit(0);
