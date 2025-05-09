/**
 * Check Out Tool
 * @author aokihu <aokihu@gmail.com>
 * @license BSD-2
 * @description Check Out Tool
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { AgentManager } from "../../../libs/agent";

export const checkOutTool = (mcpServer: McpServer) => {
  mcpServer.tool(
    "check_out",
    "AI Agent Check Out, tell other agents you have finished the task, you can rest now",
    {
      id: z.string(),
    },
    async ({ id }) => {
      AgentManager.getInstance().checkOut(id);

      return {
        content: [{ type: "text", text: "Check out successfully" }],
      };
    }
  );
};
