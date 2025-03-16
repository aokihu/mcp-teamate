/**
 * Get a message
 * @author aokihu <aokihu@gmail.com>
 * @description Get a message, include the content of the message, and delete the message after reading it
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { MessageManager } from "../../libs/message";

export const getMessageTool = (mcpServer: McpServer) => {
  mcpServer.tool(
    "GetMessage",
    "Get a message, include the content of the message, and delete the message after reading it",
    {
      id: z.string(),
    },
    async ({ id }) => {
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
    }
  );
};
