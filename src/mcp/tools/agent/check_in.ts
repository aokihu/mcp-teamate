/**
 * Check In Tool
 * @author aokihu <aokihu@gmail.com>
 * @license BSD-2
 * @description Check In Tool
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { AgentManager } from "../../../libs/agent";

export const checkInTool = (mcpServer: McpServer) => {
  mcpServer.tool(
    "Check In",
    "AI Agent Check In, tell other agents your role, ability, goal, etc. The id is unique, other agents will use this id to communicate with each other",
    {
      id: z.string(),
      role: z.string(),
      description: z.string(),
    },
    async ({ id, role, description }) => {
      AgentManager.getInstance().checkIn(id, role, description);

      return {
        content: [
          { type: "text", text: "Check in successfully." },
          { type: "text", text: "You should read your memory first." },
        ],
      };
    }
  );
};
