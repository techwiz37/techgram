import { execSync } from "child_process";

try {
  execSync("deno --version", { stdio: "ignore" });
  console.log("Building Techgram for Node.js...");
  execSync("npm run build:node", { stdio: "inherit" });
} catch (e) {
  console.log("⚠️  Deno tidak terinstall. Build akan gagal.");
  console.log("   Install Deno: https://deno.land");
  console.log("   Atau gunakan tsx/ts-node untuk development.");
}
