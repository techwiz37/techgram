import { build } from "esbuild";
import { execSync } from "child_process";
import { existsSync, mkdirSync } from "fs";

console.log("Building Techgram for Node.js...");

if (!existsSync("dist")) {
  mkdirSync("dist", { recursive: true });
}

try {
  console.log("Installing esbuild...");
  execSync("npm install --save-dev esbuild", { stdio: "inherit" });
} catch (e) {
  console.log("esbuild mungkin sudah terinstall");
}

async function buildFiles() {
  try {
    const { glob } = await import("glob");
    const allTsFiles = await glob("**/*.ts", {
      ignore: ["node_modules/**", "dist/**", "**/*.test.ts", "**/*_test.ts", "build-node.js", "run.sh", "run.ps1"],
    });

    console.log(`Found ${allTsFiles.length} TypeScript files to compile...`);

    console.log("Building all TypeScript files...");
    await build({
      entryPoints: allTsFiles,
      bundle: false,
      platform: "node",
      target: "node18",
      format: "esm",
      outdir: "dist",
      sourcemap: true,
      allowOverwrite: true,
      loader: {
        ".ts": "ts",
      },
      tsconfig: "./tsconfig.json",
    });

    console.log("Build completed! Output: dist/");
    console.log("Package.json akan otomatis di-update untuk point ke dist/");
  } catch (error) {
    console.error("Build failed:", error);
    console.error("Trying alternative build method...");
    
    try {
      const { execSync } = await import("child_process");
      console.log("Using tsc as fallback...");
      execSync("npx tsc --project tsconfig.json", { stdio: "inherit" });
      console.log("Build completed with tsc!");
    } catch (tscError) {
      console.error("Both build methods failed!");
      console.error("Please install TypeScript: npm install -g typescript");
      process.exit(1);
    }
  }
}

buildFiles();
