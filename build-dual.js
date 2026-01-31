import { execSync } from "child_process";
import { existsSync, mkdirSync, writeFileSync, readFileSync, copyFileSync } from "fs";
import { join, dirname } from "path";

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

function checkDeno() {
  try {
    execSync("deno --version", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

async function buildWithDeno() {
  console.log("Using Deno to build...");
  
  try {
    console.log("Building ESM version...");
    execSync(
      `deno bundle mod.ts dist/esm/mod.js`,
      { stdio: "inherit" }
    );
    
    console.log("Building Worker ESM version...");
    execSync(
      `deno bundle worker.ts dist/esm/worker.js`,
      { stdio: "inherit" }
    );
    
    console.log("Converting ESM to CommonJS...");
    const esmMod = readFileSync("dist/esm/mod.js", "utf-8");
    const esmWorker = readFileSync("dist/esm/worker.js", "utf-8");
    
    const cjsMod = convertEsmToCjs(esmMod);
    const cjsWorker = convertEsmToCjs(esmWorker);
    
    writeFileSync("dist/cjs/mod.js", cjsMod);
    writeFileSync("dist/cjs/worker.js", cjsWorker);
    
    console.log("Build completed!");
    return true;
  } catch (error) {
    console.error("Deno build failed:", error.message);
    return false;
  }
}

function convertEsmToCjs(code) {
  let cjs = code;
  
  cjs = "Object.defineProperty(exports, '__esModule', { value: true });\n" + cjs;
  
  cjs = cjs.replace(/export\s+default\s+/g, "module.exports = ");
  cjs = cjs.replace(/export\s+\{\s*([^}]+)\s*\}/g, (match, exports) => {
    const items = exports.split(",").map(e => e.trim());
    return items.map(item => {
      const parts = item.split(" as ");
      const name = parts[0].trim();
      const alias = parts[1] ? parts[1].trim() : name;
      return `exports.${alias} = ${name};`;
    }).join("\n");
  });
  
  cjs = cjs.replace(/export\s+const\s+(\w+)\s*=/g, "exports.$1 = ");
  cjs = cjs.replace(/export\s+function\s+(\w+)/g, "exports.$1 = function $1");
  cjs = cjs.replace(/export\s+class\s+(\w+)/g, "exports.$1 = class $1");
  cjs = cjs.replace(/export\s+type\s+\w+/g, "");
  cjs = cjs.replace(/export\s+interface\s+\w+/g, "");
  
  cjs = cjs.replace(/import\s+(\w+)\s+from\s+['"]([^'"]+)['"]/g, (match, name, path) => {
    if (path.startsWith(".")) {
      return `const ${name} = require("${path.replace(/\.js$/, "")}");`;
    }
    return match;
  });
  
  cjs = cjs.replace(/import\s+\{\s*([^}]+)\s*\}\s+from\s+['"]([^'"]+)['"]/g, (match, imports, path) => {
    if (path.startsWith(".")) {
      const items = imports.split(",").map(e => e.trim());
      return items.map(item => {
        const parts = item.split(" as ");
        const name = parts[0].trim();
        const alias = parts[1] ? parts[1].trim() : name;
        return `const ${alias} = require("${path.replace(/\.js$/, "")}").${name};`;
      }).join("\n");
    }
    return match;
  });
  
  cjs = cjs.replace(/import\s+\*\s+as\s+(\w+)\s+from\s+['"]([^'"]+)['"]/g, (match, name, path) => {
    if (path.startsWith(".")) {
      return `const ${name} = require("${path.replace(/\.js$/, "")}");`;
    }
    return match;
  });
  
  cjs = cjs.replace(/import\s+type\s+.*?from\s+['"]([^'"]+)['"]/g, "");
  
  return cjs;
}

function updatePackageJson() {
  const packageJsonPath = "package.json";
  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
  
  packageJson.main = "./dist/cjs/mod.js";
  packageJson.module = "./dist/esm/mod.js";
  packageJson.types = "./mod.ts";
  
  packageJson.exports = {
    ".": {
      "import": {
        "types": "./mod.ts",
        "default": "./dist/esm/mod.js"
      },
      "require": {
        "types": "./mod.ts",
        "default": "./dist/cjs/mod.js"
      },
      "types": "./mod.ts"
    },
    "./worker": {
      "import": {
        "types": "./worker.ts",
        "default": "./dist/esm/worker.js"
      },
      "require": {
        "types": "./worker.ts",
        "default": "./dist/cjs/worker.js"
      },
      "types": "./worker.ts"
    }
  };
  
  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log("Updated package.json with dual exports");
}

async function main() {
  if (!checkDeno()) {
    console.error("ERROR: Deno tidak terinstall!");
    console.error("Install Deno: https://deno.land");
    console.error("Atau gunakan: winget install DenoLand.Deno");
    process.exit(1);
  }
  
  const success = await buildWithDeno();
  if (success) {
    updatePackageJson();
    console.log("\n✅ Build berhasil!");
    console.log("📦 ESM: dist/esm/");
    console.log("📦 CommonJS: dist/cjs/");
  } else {
    console.error("\n❌ Build gagal!");
    process.exit(1);
  }
}

main();
