/**
 * Get a message
 * @author aokihu <aokihu@gmail.com>
 * @license BSD-2
 * @description Get a message, include the content of the message, and delete the message after reading it
 * @version 2.0.1
 */

import type { FastMCP } from "fastmcp";
import { z } from "zod";
import { MessageManager } from "../../../libs/message";

<<<<<<< HEAD
export const getMessageTool = (mcpServer: McpServer) => {
  mcpServer.tool(
    "get_message",
    "Get a message, include the content of the message, and delete the message after reading it",
    {
=======
export const getMessageTool = (mcpServer: FastMCP) => {
  mcpServer.addTool({
    name: "get_message",
    description: "Get a message, include the content of the message, and delete the message after reading it",
    parameters: z.object({
>>>>>>> v4.1.0
      id: z.string(),
    }),
    execute: async ({ id }) => {
      const message = MessageManager.getInstance().getMessageById(id);
      if (message) {
        // Delete the message after reading it
        setTimeout(() => {
          MessageManager.getInstance().deleteMessageById(id);
        }, 1000);

        return {
          content: [
            {
              type: "text",
              text: `Sender <${message.sender}>, Receiver <${message.receiver}>\n\nContent: ${message.content}\n\nType: ${message.type}\n\nTimestamp: ${message.timestamp}`,
            },
          ],
        };
      } else {
        return {
          content: [{ type: "text", text: "Message not found" }],
        };
      }
    },
  });
};
