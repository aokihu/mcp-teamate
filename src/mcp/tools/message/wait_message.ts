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
    "Wait Message",
    "Wait Message Tool, this tool will block the current execution until a message is received. The timeout is 30 seconds, unit is milliseconds",
    { receiver: z.string(), timeout: z.number().optional() },
    async ({ receiver, timeout = 30000 }) => {
      let count = 0;
      const maxCount = timeout / 1000;
      do {
        const messages = MessageManager.getInstance().getMessagesByReceiver(receiver);
        if (messages.length > 0) {
          return {
            content: [{ type: "text", text: "Message received" }],
          };
        }
        count++;
        await Bun.sleep(1000);
      } while (count < maxCount);

      return {
        content: [{ type: "text", text: "Timeout" }],
      };
    }
  );
};
