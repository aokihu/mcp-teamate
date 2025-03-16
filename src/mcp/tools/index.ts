/**
 * MCP工具声明
 */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { checkInTool } from "./check_in";
import { checkOutTool } from "./check_out";
import { getAllAgentsTool } from "./get_all_agents";
import { getAllMessagesTool } from "./get_all_messages";
import { sendMessageTool } from "./send_message";
import { getMessageTool } from "./get_message";
import { waitMessageTool } from "./wait_message";
import { writeMemoryTool } from "./write_memory";
import { readMemoryTool } from "./read_memory";
export const registerMCPTools = (mcpServer: McpServer) => {
  [
    checkInTool,
    checkOutTool,
    getAllAgentsTool,
    getAllMessagesTool,
    sendMessageTool,
    getMessageTool,
    waitMessageTool,
    writeMemoryTool,
    readMemoryTool,
  ].forEach((f) => f(mcpServer));
};
