/**
 * 获取所有消息
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export const getAllMessagesTool = (mcpServer: McpServer, serverUrl: string) => {
  mcpServer.tool(
    "get_all_messages",
    "获取所有消息,只会显示消息的发送以及接收者,不会显示消息的具体内容",
    {
      receiver: z.string(),
    },
    async ({ receiver }) => {
      const response = await fetch(serverUrl + "/message?receiver=" + receiver);
      const data = await response.json();
      if (data.code === "success") {
        return {
          content: [{ type: "text", text: JSON.stringify(data.data) }],
        };
      } else {
        return {
          content: [{ type: "text", text: "获取所有消息失败" }],
        };
      }
    }
  );
};
