/**
 * Delete Message
 * @author aokihu <aokihu@gmail.com>
 * @license BSD-2
 * @version 2.0.0
 */

import type { FastMCP } from "fastmcp";
import { z } from "zod";
import { MessageManager } from "../../../libs/message";

<<<<<<< HEAD
export const deleteMessageTool = (mcpServer: McpServer) => {
  mcpServer.tool(
    "delete_message",
    "Delete Message, cannot be recovered",
    {
=======
export const deleteMessageTool = (mcpServer: FastMCP) => {
  mcpServer.addTool({
    name: "delete_message",
    description: "Delete Message, cannot be recovered",
    parameters: z.object({
>>>>>>> v4.1.0
      id: z.string(),
    }),
    execute: async ({ id }) => {
      MessageManager.getInstance().deleteMessageById(id);
      return {
        content: [{ type: "text", text: "Message deleted" }],
      };
    },
  });
};
