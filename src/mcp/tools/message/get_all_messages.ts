/**
 * Get All Messages for a specific agent
 * @author aokihu <aokihu@gmail.com>
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { MessageManager } from "../../../libs/message";

export const getAllMessagesTool = (mcpServer: McpServer) => {
  mcpServer.tool(
    "get_all_messages",
    "Get all messages for a specific agent, only show the sender and receiver of the message, not the content",
    {
      receiver: z.string(),
    },
    async ({ receiver }) => {
      const messages = MessageManager.getInstance().getMessagesByReceiver(receiver);
      if (messages.length === 0) {
        return {
          content: [{ type: "text" as const, text: "No messages found" }],
        };
      }
      return {
        content: [
          { type: "text" as const, text: `There are ${messages.length} messages.` },
          ...messages.map((message) => ({
            type: "text" as const,
            text: `Sender <${message.sender}>, Receiver <${message.receiver}>, Message ID <${message.id}>, Timestamp <${message.timestamp}>`,
          })),
        ],
      };
    }
  );
};
