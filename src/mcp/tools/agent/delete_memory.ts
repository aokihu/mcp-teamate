/**
 * Delete Memory
 * @author aokihu <aokihu@gmail.com>
 * @license BSD-2
 * @version 1.0.0
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { AgentManager } from "../../../libs/agent";

export const deleteMemoryTool = (mcpServer: McpServer) => {
  mcpServer.tool("Delete Memory", "Delete Memory", { id: z.string() }, async ({ id }) => {
    AgentManager.getInstance().deleteMemory(id);
    return {
      content: [{ type: "text", text: "Memory deleted" }],
    };
  });
};
