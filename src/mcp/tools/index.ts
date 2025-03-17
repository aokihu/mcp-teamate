/**
 * MCP工具声明
 */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { checkInTool, checkOutTool, getAllAgentsTool, readMemoryTool, writeMemoryTool } from "./agent/index";
import { getAllMessagesTool, sendMessageTool, getMessageTool, waitMessageTool } from "./message/index";
import {
  AddDocumentTool,
  DeleteDocumentTool,
  GetAllDocumentsTool,
  GetDocumentTool,
  UpdateDocumentTool,
} from "./document/index";

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
    AddDocumentTool,
    DeleteDocumentTool,
    GetAllDocumentsTool,
    GetDocumentTool,
    UpdateDocumentTool,
  ].forEach((f) => f(mcpServer));
};
