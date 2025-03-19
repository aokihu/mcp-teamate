/**
 * Database
 * @author aokihu <aokihu@gmail.com>
 * @license BSD-2
 * @version 2.0.0
 */

import { Database } from "bun:sqlite";
import { join } from "path";
import { mkdir } from "node:fs/promises";

// Database instance
let db: Database;

/**
 * Initialize Database
 */
export async function initDatabase() {
  // Ensure data directory exists
  const dataDir = join(process.cwd(), "data");
  const dbFile = Bun.file(join(dataDir, "memory.db"));

  // If database file does not exist, create data directory
  if (!(await dbFile.exists())) {
    await mkdir(dataDir, { recursive: true });
  }

  // Set database path
  db = new Database(dbFile.name);

  // Create agent memory table
  // Table structure
  // id: Memory ID, primary key, auto increment
  // memory: Agent memory, text type, not null
  // agent_id: AI agent ID
  // timestamp: Timestamp
  db.run(`
        CREATE TABLE IF NOT EXISTS agent_memory (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            memory TEXT NOT NULL,
            agent_id TEXT NOT NULL,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
}

/**
 * Add Agent Memory
 * @param agentId - Agent ID, unique, other agents will use this id to communicate with each other
 * @param memory - Memory, e.g. "I am a UI Designer"
 * @returns {number} - Memory ID
 */
export function addMemory(agentId: string, memory: string): number {
  const stmt = db.prepare(
    "INSERT OR REPLACE INTO agent_memory (memory, agent_id, timestamp) VALUES (?, ?, CURRENT_TIMESTAMP)"
  );
  const result = stmt.run(memory, agentId);
  return result.lastInsertRowid as number;
}

/**
 * Read Agent Memory
 * @param agentId - Agent ID, unique, other agents will use this id to communicate with each other
 * @returns {Array} - Memory List
 */
export function readMemory(agentId: string): {
  id: number;
  memory: string;
  timestamp: string;
}[] {
  const stmt = db.prepare("SELECT id, memory, timestamp FROM agent_memory WHERE agent_id = ?");
  const result = stmt.all(agentId) as {
    id: number;
    memory: string;
    timestamp: string;
  }[];
  return result;
}

/**
 * Delete Agent Memory
 * @param id - Memory ID
 */
export function deleteMemory(id: number): void {
  const stmt = db.prepare("DELETE FROM agent_memory WHERE id = ?");
  stmt.run(id);
}

/**
 * Close Database Connection
 */
export function closeDatabase(): void {
  db.close();
}
