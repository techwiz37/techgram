import { build } from "esbuild";
import { execSync } from "child_process";
import { existsSync, mkdirSync, writeFileSync, readFileSync } from "fs";
import { join } from "path";

console.log("Building Techgram for Node.js...");

if (!existsSync("dist")) {
  mkdirSync("dist", { recursive: true });
}

try {
  console.log("Checking esbuild...");
  execSync("npm install --save-dev esbuild glob", { stdio: "inherit" });
} catch (e) {
  console.log("Dependencies mungkin sudah terinstall");
}

async function buildFiles() {
  try {
    const { glob } = await import("glob");
    const allTsFiles = await glob("**/*.ts", {
      ignore: ["node_modules/**", "dist/**", "**/*.test.ts", "**/*_test.ts", "build-node.js", "run.sh", "run.ps1", "build-node.sh", "build-node.ps1"],
    });

    console.log(`Found ${allTsFiles.length} TypeScript files to compile...`);

    console.log("Building entry points with esbuild...");
    
    await build({
      entryPoints: ["mod.ts", "worker.ts"],
      bundle: true,
      platform: "node",
      target: "node18",
      format: "esm",
      outdir: "dist",
      outExtension: { ".js": ".js" },
      sourcemap: true,
      allowOverwrite: true,
      external: [],
      loader: {
        ".ts": "ts",
      },
    });

    const packageJsonPath = "package.json";
    const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
    
    if (packageJson.main !== "./dist/mod.js") {
      packageJson.main = "./dist/mod.js";
      packageJson.exports = {
        ".": {
          "import": "./dist/mod.js",
          "types": "./mod.ts"
        },
        "./worker": {
          "import": "./dist/worker.js",
          "types": "./worker.ts"
        }
      };
      writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      console.log("Updated package.json");
    }

    console.log("Build completed! Output: dist/");
  } catch (error) {
    console.error("Build failed with esbuild:", error.message);
    console.error("Error details:", error);
    process.exit(1);
  }
}

buildFiles();
