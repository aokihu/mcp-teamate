import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
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

export default server;
