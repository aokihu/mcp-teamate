/**
 * MCP工具声明
 */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { checkInTool } from "./check_in.js";
import { checkOutTool } from "./check_out.js";
import { getAllAgentsTool } from "./get_all_agents.js";
import { readMemoryTool } from "./read_memory.js";
import { writeMemoryTool } from "./write_memory.js";
import { getAllMessagesTool } from "./get_all_messages.js";
import { sendMessageTool } from "./send_message.js";
import { deleteMessageTool } from "./delete_message.js";
import { getMessageTool } from "./get_message.js";
import { waitMessageTool } from "./wait_message.js";

export const registerMCPTools = (mcpServer: McpServer, serverUrl: string) => {
  checkInTool(mcpServer, serverUrl); // 签到工具
  checkOutTool(mcpServer, serverUrl); // 签退工具
  getAllAgentsTool(mcpServer, serverUrl); // 获取所有代理资料
  writeMemoryTool(mcpServer, serverUrl); // 写入代理记忆
  readMemoryTool(mcpServer, serverUrl); // 读取代理记忆
  getAllMessagesTool(mcpServer, serverUrl); // 获取所有消息
  getMessageTool(mcpServer, serverUrl); // 获取一条消息
  deleteMessageTool(mcpServer, serverUrl); // 删除消息
  sendMessageTool(mcpServer, serverUrl); // 发送消息
  waitMessageTool(mcpServer, serverUrl); // 等待消息
};
