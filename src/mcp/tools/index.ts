/**
 * MCP Tools Declaration
 * @author aokihu <aokihu@gmail.com>
 * @copyright 2024 aokihu
 * @license BSD-2
 */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  addMemoryTool,
  checkInTool,
  checkOutTool,
  deleteMemoryTool,
  getAllAgentsTool,
  readMemoryTool,
} from "./agent/index";
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
    readMemoryTool,
    addMemoryTool,
    deleteMemoryTool,
    AddDocumentTool,
    DeleteDocumentTool,
    GetAllDocumentsTool,
    GetDocumentTool,
    UpdateDocumentTool,
  ].forEach((f) => f(mcpServer));
};
