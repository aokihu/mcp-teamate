/**
 * 获取一条消息
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export const getMessageTool = (mcpServer: McpServer, serverUrl: string) => {
  mcpServer.tool(
    "get_message",
    "获取一条消息,包含消息的具体内容",
    {
      id: z.string(),
    },
    async ({ id }) => {
      const response = await fetch(serverUrl + "/message/" + id);
      const data = await response.json();
      if (data.code === "success") {
        return {
          content: [{ type: "text", text: JSON.stringify(data.data) }],
        };
      } else {
        return {
          content: [{ type: "text", text: "获取一条消息失败" }],
        };
      }
    }
  );
};
