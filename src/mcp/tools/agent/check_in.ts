/**
 * Check In Tool
 * @author aokihu <aokihu@gmail.com>
 * @license BSD-2
 * @description Check In Tool
 * @version 2.0.1
 */
import type { FastMCP } from "fastmcp";
import { z } from "zod";
import { AgentManager } from "../../../libs/agent";

export const checkInTool = (mcpServer: FastMCP) => {
  mcpServer.addTool({
    name: "check_in",
    description:
      "AI Agent Check In, tell other agents your role, ability, goal, etc. The id is unique, other agents will use this id to communicate with each other",
    parameters: z.object({
      id: z.string(),
      role: z.string(),
      description: z.string(),
    }),
    execute: async ({ id, role, description }) => {
      AgentManager.getInstance().checkIn(id, role, description);

      return {
        content: [
          { type: "text", text: "Check in successfully." },
          { type: "text", text: "You should read your memory first." },
        ],
      };
    },
  });
};
