/**
 * Check Out Tool
 * @author aokihu <aokihu@gmail.com>
 * @license BSD-2
 * @description Check Out Tool
 * @version 2.0.0
 */

import type { FastMCP } from "fastmcp";
import { z } from "zod";
import { AgentManager } from "../../../libs/agent";

export const checkOutTool = (mcpServer: FastMCP) => {
  mcpServer.addTool({
    name: "check_out",
    description: "AI Agent Check Out, tell other agents you have finished the task, you can rest now",
    parameters: z.object({
      id: z.string(),
    }),
    execute: async ({ id }) => {
      AgentManager.getInstance().checkOut(id);

      return {
        content: [{ type: "text", text: "Check out successfully" }],
      };
    },
  });
};
