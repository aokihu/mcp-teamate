/**
 * Add Memory
 * @author aokihu <aokihu@gmail.com>
 * @license BSD-2
 * @version 1.0.0
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { AgentManager } from "../../../libs/agent";

export const addMemoryTool = (mcpServer: McpServer) => {
  mcpServer.tool("Add Memory", "Add Memory", { id: z.string(), memory: z.string() }, async ({ id, memory }) => {
    const memoryId = AgentManager.getInstance().addMemory(id, memory);
    return {
      content: [{ type: "text", text: `Memory added with id: ${memoryId}` }],
    };
  });
};
