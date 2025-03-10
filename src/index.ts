/**
 *
 * MCP-TEAMATE AI 合作伙伴MCP
 * @version 2.0.1
 * @description This module provides AI partnership functionalities.
 * @author aokihu <aokihu@gmail.com>
 * @license MIT
 *
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerMCPTools } from "./mcp/tools/index.js";
import { registerMCPResources } from "./mcp/resources/index.js";

const SERVER_HOST = process.env.TEAMATE_SERVER_HOST || "localhost";
const SERVER_PORT = process.env.TEAMATE_SERVER_PORT || 3001;
const API_URL = `http://${SERVER_HOST}:${SERVER_PORT}`;

const mcpServer = new McpServer(
  {
    name: "mcp-teamate-ai",
    version: "1.1.0",
  },
  {
    capabilities: {
      resources: {},
    },
  }
);

registerMCPTools(mcpServer, API_URL);
registerMCPResources(mcpServer, API_URL);

// 启动MCP服务器
const transport = new StdioServerTransport();
await mcpServer.connect(transport);