/**
 * Wait Message
 * @author aokihu <aokihu@gmail.com>
 * @license BSD-2
 * @version 2.0.1
 * @description Wait Message Tool, wait for other AI agents to send messages
 *              This tool will block the current execution until a message is received
 *              Beacuse Cursor can not support progress feature, so we need to use this tool
 */

import { z } from "zod";
import { MessageManager } from "../../../libs/message";
import type { FastMCP } from "fastmcp";

export const waitMessageTool = (mcpServer: FastMCP) => {
  mcpServer.addTool({
    name: "wait_message",
    description:
      "Wait Message Tool, this tool will block the current execution until a message is received. The timeout is 30 seconds, unit is milliseconds",
    parameters: z.object({ receiver: z.string(), timeout: z.number().optional() }),
    execute: async ({ receiver, timeout = 30000 }, { reportProgress }) => {
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
        reportProgress({
          progress: count / maxCount,
          total: maxCount,
        });
      } while (count < maxCount);

      return {
        content: [{ type: "text", text: "Timeout" }],
      };
    },
  });
};
