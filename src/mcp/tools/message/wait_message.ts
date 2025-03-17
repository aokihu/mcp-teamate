/**
 * Wait Message
 * @author aokihu <aokihu@gmail.com>
 * @license BSD-2
 * @version 1.0.0
 * @description Wait Message Tool, wait for other AI agents to send messages
 *              This tool will block the current execution until a message is received
 *              Beacuse Cursor can not support progress feature, so we need to use this tool
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { MessageManager } from "../../../libs/message";

export const waitMessageTool = (mcpServer: McpServer) => {
  mcpServer.tool(
    "wait_message",
    "Wait Message Tool, this tool will block the current execution until a message is received",
    { receiver: z.string(), timeout: z.number().optional() },
    async ({ receiver, timeout = 30000 }) => {
      return new Promise((resolve) => {
        const timer = setTimeout(() => {
          resolve({
            content: [{ type: "text", text: "Timeout" }],
          });
        }, timeout);

        const messages = MessageManager.getInstance().getMessagesByReceiver(receiver);
        if (messages.length > 0) {
          clearTimeout(timer);
          resolve({
            content: [{ type: "text", text: "Message received" }],
          });
        }
      });
    }
  );
};
