/**
 *
 * MCP-TEAMATE AI 合作伙伴MCP
 * @version 1.1.0
 * @description This module provides AI partnership functionalities.
 * @author aokihu <aokihu@gmail.com>
 * @license MIT
 *
 */

import { parseArgs } from "util";
import { startSSEServer } from "mcp-proxy";
import server from "./mcp";

// 从命令行中获取'port'和'endpoint'
const { values } = parseArgs({
  args: Bun.argv,
  strict: true,
  allowPositionals: true,
  options: {
    host: {
      type: "string",
      short: "h",
      default: "127.0.0.1",
    },
    port: {
      type: "string",
      short: "p",
      default: "3001",
    },
    endpoint: {
      type: "string",
      short: "e",
      default: "/sse",
    },
  },
});

// 定义全局变量
const ARG_PORT = parseInt(values.port);
const ARG_ENDPOINT = values.endpoint;
const ARG_HOST = values.host;
// 启动SSE服务器
const { close } = await startSSEServer({
  port: ARG_PORT,
  endpoint: ARG_ENDPOINT,
  createServer: async () => server,
});

console.log(`Server started on port ${ARG_PORT} at endpoint: http://${ARG_HOST}:${ARG_PORT}${ARG_ENDPOINT}`);

// 监听SIGINT信号
process.on("SIGINT", () => {
  close();
  console.log("Server closed");
});
