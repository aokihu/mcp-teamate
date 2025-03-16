import { Database } from "bun:sqlite";
import { join } from "path";
import { mkdir } from "node:fs/promises";

// 数据库实例
let db: Database;

/**
 * 初始化数据库
 */
export async function initDatabase() {
  // 确保data目录存在
  const dataDir = join(process.cwd(), "data");
  const dbFile = Bun.file(join(dataDir, "memory.db"));

  // 如果数据库文件不存在，创建data目录
  if (!(await dbFile.exists())) {
    await mkdir(dataDir, { recursive: true });
  }

  // 设置数据库路径
  db = new Database(dbFile.name);

  // 创建代理记忆表
  db.run(`
        CREATE TABLE IF NOT EXISTS agent_memory (
            id TEXT PRIMARY KEY,
            memory TEXT NOT NULL,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
}

/**
 * 写入代理记忆
 */
export function writeMemory(id: string, memory: string): void {
  const stmt = db.prepare(`
        INSERT OR REPLACE INTO agent_memory (id, memory, updated_at)
        VALUES (?, ?, CURRENT_TIMESTAMP)
    `);
  stmt.run(id, memory);
}

/**
 * 读取代理记忆
 */
export function readMemory(id: string): string | null {
  const stmt = db.prepare("SELECT memory FROM agent_memory WHERE id = ?");
  const result = stmt.get(id) as { memory: string } | null;
  return result ? result.memory : null;
}

/**
 * 删除代理记忆
 */
export function deleteMemory(id: string): void {
  const stmt = db.prepare("DELETE FROM agent_memory WHERE id = ?");
  stmt.run(id);
}

/**
 * 关闭数据库连接
 */
export function closeDatabase(): void {
  db.close();
}
