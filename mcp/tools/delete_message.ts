/**
 * 删除消息
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export const deleteMessageTool = (mcpServer: McpServer, serverUrl: string) => {
  mcpServer.tool(
    "delete_message",
    "删除消息,删除后无法恢复",
    {
      id: z.string(),
    },
    async ({ id }) => {
      const response = await fetch(serverUrl + "/message/" + id, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.code === "success") {
        return {
          content: [{ type: "text", text: "删除消息成功" }],
        };
      } else {
        return {
          content: [{ type: "text", text: "删除消息失败" }],
        };
      }
    }
  );
};
