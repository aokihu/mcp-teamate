/**
 * Delete Memory
 * @author aokihu <aokihu@gmail.com>
 * @license BSD-2
 * @version 2.0.0
 */

import type { FastMCP } from "fastmcp";
import { z } from "zod";
import { AgentManager } from "../../../libs/agent";

export const deleteMemoryTool = (mcpServer: FastMCP) => {
  mcpServer.addTool({
    name: "delete_memory",
    description: "Delete Memory",
    parameters: z.object({ id: z.string() }),
    execute: async ({ id }) => {
      AgentManager.getInstance().deleteMemory(id);
      return {
        content: [{ type: "text", text: "Memory deleted" }],
      };
    },
  });
};
