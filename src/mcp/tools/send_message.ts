/**
 * 发送消息
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export const sendMessageTool = (mcpServer: McpServer, serverUrl: string) => {
  mcpServer.tool(
    "send_message",
    "发送消息给其他的AI代理",
    {
      sender: z.string(),
      receiver: z.string(),
      content: z.string(),
    },
    async ({ sender, receiver, content }) => {
      const response = await fetch(serverUrl + "/message", {
        method: "POST",
        body: JSON.stringify({ sender, receiver, content }),
      });
      const data = await response.json();
      if (data.code === "success") {
        return {
          content: [{ type: "text", text: "发送消息成功" }],
        };
      } else {
        return {
          content: [{ type: "text", text: "发送消息失败" }],
        };
      }
    }
  );
};
