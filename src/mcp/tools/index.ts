/**
 * MCP Tools Declaration
 * @author aokihu <aokihu@gmail.com>
 * @copyright 2024 aokihu
 * @license BSD-2
 */

<<<<<<< HEAD
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import AgentTools from "./agent";
import MessageTools from "./message";
import DocumentTools from "./document";

export const registerMCPTools = (mcpServer: McpServer) =>
  [AgentTools, MessageTools, DocumentTools].flat().forEach((f) => f(mcpServer));
=======
import type { FastMCP } from "fastmcp";
import { AgentTools } from "./agent";
import { MessageTools } from "./message";
import { DocumentTools } from "./document";

export const registerMCPTools = (mcpServer: FastMCP) =>
  [...AgentTools, ...MessageTools, ...DocumentTools].forEach((f) => f(mcpServer));
>>>>>>> v4.1.0
