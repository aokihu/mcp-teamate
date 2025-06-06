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
import { registerMCPTools } from "./mcp/tools";
import { registerMCPResources } from "./mcp/resources/index.js";
import { AgentManager } from "./libs/agent.js";
import { DocumentManager } from "./libs/document.js";
import { FastMCP } from "fastmcp";
import { z } from "zod";
import jwt from "jsonwebtoken";

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
const server = new FastMCP({
  name: "Teamate",
  version: String(TEAMATE_VERSION) as `${number}.${number}.${number}`,
  "ping": {
    "enabled":true,
    "intervalMs":15000
  }
});

registerMCPTools(server);

server.start({
  transportType:"httpStream",
  httpStream: {
    "port": Number(SERVER_PORT)
  }
});
