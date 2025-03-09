/**
 * MCP资源声明
 */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { ListResourcesRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

export const registerMCPResources = (mcpServer: McpServer, serverUrl: string) => {
  mcpServer.server.setRequestHandler(ListResourcesRequestSchema, async () => {
    return {
      resources: [
        {
          uri: "teamate://agents",
          name: "团队中所有的代理资料",
          mimeType: "application/json",
        },
      ],
    };
  });
};
