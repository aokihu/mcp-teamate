/**
 * Add Memory
 * @author aokihu <aokihu@gmail.com>
 * @license BSD-2
 * @version 2.0.0
 */

import type { FastMCP } from "fastmcp";
import { z } from "zod";
import { AgentManager } from "../../../libs/agent";

export const addMemoryTool = (mcpServer: FastMCP) => {
  mcpServer.addTool({
    name: "add_memory",
    description: "Add Memory",
    parameters: z.object({ id: z.string(), memory: z.string() }),
    execute: async ({ id, memory }) => {
      const memoryId = AgentManager.getInstance().addMemory(id, memory);
      return {
        content: [{ type: "text", text: `Memory added with id: ${memoryId}` }],
      };
    },
  });
};
