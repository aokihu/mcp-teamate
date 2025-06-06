/**
 * Add Memory
 * @author aokihu <aokihu@gmail.com>
 * @license BSD-2
 * @version 2.0.0
 */

import type { FastMCP } from "fastmcp";
import { z } from "zod";
import { AgentManager } from "../../../libs/agent";

<<<<<<< HEAD
export const addMemoryTool = (mcpServer: McpServer) => {
  mcpServer.tool(
    "add_memory",
    "Add Memory for Agent",
    { id: z.string(), memory: z.string() },
    async ({ id, memory }) => {
      const memoryId = AgentManager.getInstance().addMemory(id, memory);
      return {
        content: [{ type: "text", text: `Memory added with id: ${memoryId}` }],
      };
    }
  );
=======
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
>>>>>>> v4.1.0
};
