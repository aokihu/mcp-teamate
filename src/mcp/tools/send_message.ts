/**
 * Send Message to Other Agents
 * @author aokihu <aokihu@gmail.com>
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { MessageManager } from "../../libs/message";

export const sendMessageTool = (mcpServer: McpServer) => {
  mcpServer.tool(
    "SendMessage",
    "send message to other agents, the sender and receiver must be the id of the agent, and you need delete the message after read it",
    {
      sender: z.string(),
      receiver: z.string(),
      content: z.string(),
    },
    async ({ sender, receiver, content }) => {
      const messageId = MessageManager.getInstance().sendMessage(sender, receiver, content);
      if (messageId) {
        return {
          content: [{ type: "text", text: "Message sent successfully" }],
        };
      } else {
        return {
          content: [{ type: "text", text: "Message sent failed" }],
        };
      }
    }
  );
};
