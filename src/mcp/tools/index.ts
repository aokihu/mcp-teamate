/**
 * MCP Tools Declaration
 * @author aokihu <aokihu@gmail.com>
 * @copyright 2024 aokihu
 * @license BSD-2
 */

import type { FastMCP } from "fastmcp";
import { AgentTools } from "./agent";
import { MessageTools } from "./message";
import { DocumentTools } from "./document";

export const registerMCPTools = (mcpServer: FastMCP) =>
  [...AgentTools, ...MessageTools, ...DocumentTools].forEach((f) => f(mcpServer));
