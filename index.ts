/**
 *
 * MCP-TEAMATE AI 合作伙伴MCP
 * @version 1.0.0
 * @description This module provides AI partnership functionalities.
 * @author aokihu <aokihu@gmail.com>
 * @license MIT
 *
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { startSSEServer } from "mcp-proxy";
import { z } from "zod";

const server = new McpServer({
  name: "mcp",
  description: "MCP-TEAMATE AI 合作伙伴MCP",
  version: "1.0.0",
});

server.tool("Echo", "This is simple echo tool", { message: z.string() }, async ({ message }) => {
  return {
    content: [
      {
        type: "text",
        text: message,
      },
    ],
  };
});

const { close } = await startSSEServer({
  port: 8080,
  endpoint: "/sse",
  createServer: async () => {
    return server;
  },
});
