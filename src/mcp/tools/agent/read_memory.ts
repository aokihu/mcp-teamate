/**
 * Read Memory
 * @author aokihu <aokihu@gmail.com>
 * @license MIT
 * @version 1.0.0
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { AgentManager } from "../../../libs/agent";

export const readMemoryTool = (mcpServer: McpServer) => {
  mcpServer.tool(
    "read_memory",
    "Read Memory",
    {
      id: z.string(),
    },
    async ({ id }) => {
      const memory = AgentManager.getInstance().getMemory(id);
      return {
        content: [{ type: "text", text: memory ?? "No memory" }],
      };
    }
  );
};
