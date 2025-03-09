/**
 * 读取代理记忆
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export const readMemoryTool = (mcpServer: McpServer, serverUrl: string) => {
  mcpServer.tool(
    "read_memory",
    "读取代理记忆",
    {
      id: z.string(),
    },
    async ({ id }) => {
      const response = await fetch(serverUrl + "/agent/memory?id=" + id);
      const data = await response.json();
      if (data.code === "success") {
        return {
          content: [{ type: "text", text: data.data.memory }],
        };
      } else {
        return {
          content: [{ type: "text", text: "读取代理记忆失败" }],
        };
      }
    }
  );
};
