/**
 * 写入代理记忆
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export const writeMemoryTool = (mcpServer: McpServer, serverUrl: string) => {
  mcpServer.tool(
    "write_memory",
    "写入代理记忆",
    {
      id: z.string(),
      memory: z.string(),
    },
    async ({ id, memory }) => {
      const response = await fetch(serverUrl + "/agent/memory", {
        method: "POST",
        body: JSON.stringify({ id, memory }),
      });
      const data = await response.json();
      if (data.code === "success") {
        return {
          content: [{ type: "text", text: "写入代理记忆成功" }],
        };
      } else {
        return {
          content: [{ type: "text", text: "写入代理记忆失败" }],
        };
      }
    }
  );
};
