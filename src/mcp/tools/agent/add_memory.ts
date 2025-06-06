/**
 * Add Memory
 * @author aokihu <aokihu@gmail.com>
 * @license BSD-2
 * @version 2.0.0
 */

import type { FastMCP } from "fastmcp";
import { z } from "zod";
import { AgentManager } from "../../../libs/agent";

export const addMemoryTool = (mcpServer: FastMCP) => {
  mcpServer.addTool({
    name: "add_memory",
    description:
`Add Memory for yourself,
you can add memory with different types, such as 'longterm', 'shortterm', 'important' etc. 
The default type is 'longterm'`,
    parameters: z.object({ id: z.string(), memory: z.string(), memoryType: z.string().optional() }),
    execute: async ({ id, memory, memoryType = "longterm" }) => {
      const memoryId = AgentManager.getInstance().addMemory(id, memory, memoryType);
      return {
        content: [{ type: "text", text: `Memory added with id: ${memoryId}` }],
      };
    },
  });
};
