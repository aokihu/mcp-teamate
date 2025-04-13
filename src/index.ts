/**
 * @file MCP-TEAMATE Server
 * @description MCP-TEAMATE Server
 * @author aokihu <aokihu@gmail.com>
 * @copyright 2024 aokihu
 * @license BSD-2
 *
 */

/* -------------------------------------------- */
/*                 Imports                      */
/* -------------------------------------------- */

import pkg from "../package.json" assert { type: "json" };
import express, { type Request, type Response } from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { registerMCPTools } from "./mcp/tools/index.js";
import { registerMCPResources } from "./mcp/resources/index.js";
import { AgentManager } from "./libs/agent.js";
import { DocumentManager } from "./libs/document.js";

/* -------------------------------------------- */
/*                 Environment                  */
/* -------------------------------------------- */

const SERVER_HOST = process.env.TEAMATE_SERVER_HOST || "localhost";
const SERVER_PORT = process.env.TEAMATE_SERVER_PORT || 3001;
const TEAMATE_VERSION = pkg.version;

/* -------------------------------------------- */
/*             Initialize Modules               */
/* -------------------------------------------- */

await AgentManager.initialize();
await DocumentManager.initialize();
/* -------------------------------------------- */
/*              Setup MCP Server                */
/* -------------------------------------------- */

const createMCPServer = () => {
  const mcpServer = new McpServer(
    {
      name: "mcp-teamate-ai",
      version: TEAMATE_VERSION,
    },
    {
      capabilities: {
        resources: {},
      },
    }
  );

  registerMCPTools(mcpServer);
  registerMCPResources(mcpServer);

  // 设定定时Ping客户端
  mcpServer.tool("ping", async () => {
    return {
      content: [
        {
          type: "text",
          text: "pong",
        },
      ],
    };
  });

  return mcpServer;
};

const transports: Map<string, SSEServerTransport> = new Map();
const mcpServers: Map<SSEServerTransport, McpServer> = new Map();

/* -------------------------------------------- */
/*                 HTTP Server                  */
/* -------------------------------------------- */

const app = express();

app.get("/ping", (req: Request, res: Response) => {
  res.send("pong");
});

app.get("/sse", async (req: Request, res: Response) => {
  res.header("Cache-Control", "no-cache");
  res.header("Connection", "keep-alive");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.header("Content-Type", "text/event-stream");
  res.flushHeaders();

  const transport = new SSEServerTransport("/messages", res);
  const mcpServer = createMCPServer();
  mcpServers.set(transport, mcpServer);
  transports.set(transport.sessionId, transport);

  await mcpServer.connect(transport);
  await transport.send({
    jsonrpc: "2.0",
    method: "sse/connection",
    params: { message: "SSE Connection established" },
  });

  // 设定定时Ping客户端
  const pingInterval = setInterval(() => {
    transport.send({
      jsonrpc: "2.0",
      method: "sse/ping",
      params: { message: "Ping" },
    });
  }, 10000);

  // Clear disconnect client
  req.on("close", () => {
    if (transport) {
      transport.close();
      transports.delete(transport.sessionId);
      mcpServers.delete(transport);
    }

    clearInterval(pingInterval);
  });

  return;
});

// @ts-ignore
app.post("/messages", async (req, res) => {
  const sessionId = req.query["sessionId"] as string;

  if (!sessionId) {
    return res.status(400).send("No sessionId");
  }

  const transport = transports.get(sessionId);

  if (!transport) {
    return res.status(400).send("Transport not found");
  }

  await transport.handlePostMessage(req, res);
});

app.listen(SERVER_PORT, () => {
  console.log(`MCP-TEAMATE v${TEAMATE_VERSION}`);
  console.log(`Server is running on http://${SERVER_HOST}:${SERVER_PORT}`);
  console.log(`You can add this setting to your MCP server:
  
{
  "mcpServers": {
    "Teamate": {
      "url": "http://${SERVER_HOST}:${SERVER_PORT}/sse"
    }
  }
}`);
});
