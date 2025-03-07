/**
 *
 * MCP-TEAMATE AI 合作伙伴MCP
 * @version 1.0.0
 * @description This module provides AI partnership functionalities.
 * @author aokihu <aokihu@gmail.com>
 * @license MIT
 *
 */

import { startSSEServer } from "mcp-proxy";
import server from "./mcp";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const ENDPOINT = process.env.ENDPOINT || "/sse";

const { close } = await startSSEServer({
  port: PORT,
  endpoint: ENDPOINT,
  createServer: async () => server,
});
