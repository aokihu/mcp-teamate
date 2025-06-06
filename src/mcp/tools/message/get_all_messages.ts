/**
 * Get All Messages for a specific agent
 * @author aokihu <aokihu@gmail.com>
 * @license BSD-2
 * @version 2.0.1
 */

import type { FastMCP } from "fastmcp";
import { z } from "zod";
import { MessageManager } from "../../../libs/message";

export const getAllMessagesTool = (mcpServer: FastMCP) => {
  mcpServer.addTool({
    name: "get_all_messages",
    description:
      "Get all messages for a specific agent, only show the sender and receiver of the message, not the content",
    parameters: z.object({
      receiver: z.string(),
    }),
    execute: async ({ receiver }) => {
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
    },
  });
};
