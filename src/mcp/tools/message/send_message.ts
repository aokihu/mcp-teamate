/**
 * Send Message to Other Agents
 * @author aokihu <aokihu@gmail.com>
 * @license BSD-2
 * @version 2.0.1
 */

import type { FastMCP } from "fastmcp";
import { z } from "zod";
import { MessageManager } from "../../../libs/message";

<<<<<<< HEAD
export const sendMessageTool = (mcpServer: McpServer) => {
  mcpServer.tool(
    "send_message",
    "send message to other agents, the sender and receiver must be the id of the agent, and you need delete the message after read it",
    {
=======
export const sendMessageTool = (mcpServer: FastMCP) => {
  mcpServer.addTool({
    name: "send_message",
    description:
      "send message to other agents, the sender and receiver must be the id of the agent, and you need delete the message after read it",
    parameters: z.object({
>>>>>>> v4.1.0
      sender: z.string(),
      receiver: z.string(),
      content: z.string(),
    }),
    execute: async ({ sender, receiver, content }) => {
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
    },
  });
};
