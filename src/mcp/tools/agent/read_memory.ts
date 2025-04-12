/**
 * Read Memory
 * @author aokihu <aokihu@gmail.com>
 * @license BSD-2
 * @version 2.0.0
 */

import type { FastMCP } from "fastmcp";
import { z } from "zod";
import { AgentManager } from "../../../libs/agent";

export const readMemoryTool = (mcpServer: FastMCP) => {
  mcpServer.addTool({
    name: "read_memory",
    description: "Read Memory. This tool is used to read the all memories of the agent.",
    parameters: z.object({
      id: z.string(),
    }),
    execute: async ({ id }) => {
      const memories = AgentManager.getInstance().getMemory(id);
      if (memories.length === 0) {
        return {
          content: [{ type: "text", text: "No memories found" }],
        };
      }
      return {
        content: memories.map((x) => ({ type: "text", text: `<<${x.id}>>\n${x.memory}` })),
      };
    },
  });
};
