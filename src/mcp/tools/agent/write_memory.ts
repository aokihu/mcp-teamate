/**
 * @file Write memory tool
 * @author aokihu <aokihu@gmail.com>
 * @license BSD-2
 * @version 1.0.0
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { AgentManager } from "../../../libs/agent";

export const writeMemoryTool = (mcpServer: McpServer) => {
  mcpServer.tool(
    "write_memory",
    "Write Memory",
    {
      id: z.string(),
      memory: z.string(),
    },
    async ({ id, memory }) => {
      AgentManager.getInstance().writeMemory(id, memory);
      return {
        content: [{ type: "text", text: "Memory written" }],
      };
    }
  );
};
