import { zip } from "compressing";
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";

const PLATFORMS = [
  { name: "linux", target: "linux-x64" },
  { name: "macos", target: "darwin-x64" },
  { name: "windows", target: "win-x64" },
];

const DIST_DIR = "dist";
const BUILD_DIR = "build";
const PROJECT_NAME = "mcp-teamate";

async function main() {
  // 创建必要的目录
  if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR);
  }
  if (!fs.existsSync(BUILD_DIR)) {
    fs.mkdirSync(BUILD_DIR);
  }

  // 为每个平台编译和打包
  for (const platform of PLATFORMS) {
    console.log(`\n📦 构建 ${platform.name} 版本...`);

    // 设置环境变量
    const env = { ...process.env, BUN_TARGET: platform.target };

    // 运行bun build
    const buildResult = spawnSync(
      "bun",
      ["build", "./src/index.ts", "--compile", "--outfile", `${BUILD_DIR}/${PROJECT_NAME}`],
      { env }
    );

    if (buildResult.error || buildResult.status !== 0) {
      console.error(`❌ ${platform.name} 构建失败:`, buildResult.error || buildResult.stderr.toString());
      continue;
    }

    // 准备打包文件
    const files = [
      { source: `${BUILD_DIR}/${PROJECT_NAME}`, target: PROJECT_NAME + (platform.name === "windows" ? ".exe" : "") },
      { source: "README.md", target: "README.md" },
      { source: "README_zh.md", target: "README_zh.md" },
      { source: "LICENSE", target: "LICENSE" },
    ];

    // 创建临时目录
    const tempDir = `${BUILD_DIR}/${platform.name}`;
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true });
    }
    fs.mkdirSync(tempDir);

    // 复制文件到临时目录
    for (const file of files) {
      if (fs.existsSync(file.source)) {
        fs.copyFileSync(file.source, `${tempDir}/${file.target}`);
      }
    }

    // 创建zip文件
    const zipFileName = `${DIST_DIR}/${PROJECT_NAME}-${platform.name}.zip`;
    console.log(`📦 正在打包 ${zipFileName}...`);

    try {
      await zip.compressDir(tempDir, zipFileName);
      console.log(`✅ ${platform.name} 版本打包完成`);
    } catch (error) {
      console.error(`❌ ${platform.name} 打包失败:`, error);
    }

    // 清理临时目录
    fs.rmSync(tempDir, { recursive: true });
  }

  // 清理构建目录
  fs.rmSync(BUILD_DIR, { recursive: true });
  console.log("\n🎉 所有平台构建完成！");
}

main().catch(console.error);
