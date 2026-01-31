import { build } from "esbuild";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

console.log("Building Techgram for Node.js (ESM + CommonJS)...");

const distDir = "dist";
const distEsmDir = join(distDir, "esm");
const distCjsDir = join(distDir, "cjs");

if (!existsSync(distDir)) {
  mkdirSync(distDir, { recursive: true });
}
if (!existsSync(distEsmDir)) {
  mkdirSync(distEsmDir, { recursive: true });
}
if (!existsSync(distCjsDir)) {
  mkdirSync(distCjsDir, { recursive: true });
}

async function buildEsm() {
  console.log("Building ESM version...");
  await build({
    entryPoints: ["mod.ts"],
    bundle: true,
    platform: "node",
    target: "node18",
    format: "esm",
    outfile: "dist/esm/mod.js",
    external: ["lru-cache", "mime-types"],
    banner: {
      js: "// @ts-nocheck",
    },
  });

  await build({
    entryPoints: ["worker.ts"],
    bundle: true,
    platform: "node",
    target: "node18",
    format: "esm",
    outfile: "dist/esm/worker.js",
    external: ["lru-cache", "mime-types"],
    banner: {
      js: "// @ts-nocheck",
    },
  });
}

async function buildCjs() {
  console.log("Building CommonJS version...");
  await build({
    entryPoints: ["mod.ts"],
    bundle: true,
    platform: "node",
    target: "node18",
    format: "cjs",
    outfile: "dist/cjs/mod.js",
    external: ["lru-cache", "mime-types"],
    banner: {
      js: "// @ts-nocheck",
    },
  });

  await build({
    entryPoints: ["worker.ts"],
    bundle: true,
    platform: "node",
    target: "node18",
    format: "cjs",
    outfile: "dist/cjs/worker.js",
    external: ["lru-cache", "mime-types"],
    banner: {
      js: "// @ts-nocheck",
    },
  });
}

async function main() {
  try {
    await buildEsm();
    await buildCjs();
    console.log("\n✅ Build berhasil!");
    console.log("📦 ESM: dist/esm/");
    console.log("📦 CommonJS: dist/cjs/");
    console.log("\n⚠️  PENTING: Commit dist/ folder ke GitHub agar user bisa langsung pakai!");
  } catch (error) {
    console.error("\n❌ Build gagal:", error.message);
    process.exit(1);
  }
}

main();
