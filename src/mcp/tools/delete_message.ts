/**
 * Delete Message
 * @author aokihu <aokihu@gmail.com>
 * @license MIT
 * @version 1.0.0
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { MessageManager } from "../../libs/message";

export const deleteMessageTool = (mcpServer: McpServer, serverUrl: string) => {
  mcpServer.tool(
    "delete_message",
    "Delete Message, cannot be recovered",
    {
      id: z.string(),
    },
    async ({ id }) => {
      MessageManager.getInstance().deleteMessageById(id);
      return {
        content: [{ type: "text", text: "Message deleted" }],
      };
    }
  );
};
