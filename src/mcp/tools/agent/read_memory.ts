/**
 * Read Memory
 * @author aokihu <aokihu@gmail.com>
 * @license BSD-2
 * @version 1.1.0
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { AgentManager } from "../../../libs/agent";

export const readMemoryTool = (mcpServer: McpServer) => {
  mcpServer.tool(
    "read_memory",
    "Read Memory. This tool is used to read the all memories of the agent.",
    {
      id: z.string(),
    },
    async ({ id }) => {
      const memories = AgentManager.getInstance().getMemory(id);
      return {
        content: memories.map((x) => ({ type: "text", text: `<<${x.id}>>\n${x.memory}` })),
      };
    }
  );
};
