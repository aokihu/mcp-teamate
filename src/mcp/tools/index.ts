/**
 * MCP Tools Declaration
 * @author aokihu <aokihu@gmail.com>
 * @copyright 2024 aokihu
 * @license BSD-2
 */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import AgentTools from "./agent";
import MessageTools from "./message";
import DocumentTools from "./document";

export const registerMCPTools = (mcpServer: McpServer) =>
  [AgentTools, MessageTools, DocumentTools].flat().forEach((f) => f(mcpServer));
