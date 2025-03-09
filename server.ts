/**
 *
 * Teamate HTTP 服务器端
 * @author aokihu <aokihu@gmail.com>
 * @version 1.0.0
 * @description 使用标准HTTP协议, 提供API接口, 用于与Teamate进行交互
 *              然后AI代理通过STDIO与服务器进行交互
 */

import { parseArgs } from "util";
import agentManager from "./server/agent";
import messageManager from "./server/message";
import { success } from "./server/result";

// 解析命令行参数
const args = parseArgs({
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
  },
});

// 启动Bun的HTTP服务器
const server = Bun.serve({
  hostname: args.values.host,
  port: parseInt(args.values.port),
  routes: {
    // 代理签到
    "/agent/checkIn": async (req) => {
      const body = await req.json();
      const { id, role, description } = body;
      agentManager.checkIn(id, role, description);
      return Response.json(success());
    },
    // 代理签退
    "/agent/checkOut": async (req) => {
      const body = await req.json();
      const { id } = body;
      agentManager.checkOut(id);
      return Response.json(success());
    },
    // 获取所有代理
    "/agent/all": {
      GET: async (req) => {
        const agents = agentManager.getAllAgents();
        return Response.json(success(agents));
      },
    },
    // 获取代理
    "/agent/:id": {
      GET: async (req) => {
        const { id } = req.params;
        const agent = agentManager.getAgentById(id);
        return Response.json(success(agent));
      },
    },
    // 设置代理记忆
    "/agent/memory": {
      POST: async (req) => {
        const body = await req.json();
        const { id, memory } = body;
        agentManager.writeMemory(id, memory);
        return Response.json(success());
      },
      GET: async (req) => {
        const url = new URL(req.url);
        const id = url.searchParams.get("id");
        if (!id) {
          return new Response("Missing id parameter", { status: 400 });
        }
        const memory = agentManager.getMemory(id);
        return Response.json(success({ memory }));
      },
    },
    "/message": {
      // 获取所有消息, 通过接收者
      GET: async (req) => {
        const url = new URL(req.url);
        const receiver = url.searchParams.get("receiver");
        if (!receiver) {
          return new Response("Missing receiver parameter", { status: 400 });
        }
        const messages = messageManager.getMessagesByReceiver(receiver);
        return Response.json(success(messages));
      },
      // 发送消息
      POST: async (req) => {
        const body = await req.json();
        const { sender, receiver, content, type = "text" } = body;
        const messageId = messageManager.addMessage(sender, receiver, content, type);
        return Response.json(success({ id: messageId }));
      },
    },
    "/message/:id": {
      // 通过消息ID获取一条消息
      GET: async (req) => {
        const { id } = req.params;
        const message = messageManager.getMessageById(id);
        return Response.json(success(message));
      },
      // 通过消息ID删除一条消息
      DELETE: async (req) => {
        const { id } = req.params;
        messageManager.deleteMessageById(id);
        return Response.json(success());
      },
    },
  },
  fetch(req) {
    const url = new URL(req.url);

    // 默认响应
    if (url.pathname === "/") {
      return new Response("Teamate HTTP Server");
    }

    // 未找到路由
    return new Response("Not Found", { status: 404 });
  },
  error(error) {
    console.error("Server error:", error);
    return new Response(`Server Error: ${error.message}`, { status: 500 });
  },
});

console.log(`Server started on http://${server.hostname}:${server.port}`);
