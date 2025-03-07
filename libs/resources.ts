/**
 * 注册MCP Resources
 * @author aokihu <aokihu@gmail.com>
 * @version 1.0.0
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { ListResourcesRequestSchema, ReadResourceRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import Controller from "./coltroller";

// 注册MCP资源 - UriResource
export const registerResources = (server: McpServer) => {
  const _server = server.server;

  _server.setRequestHandler(ListResourcesRequestSchema, async (request) => {
    return {
      resources: [
        {
          uri: "team://agents",
          name: "AI代理所有用户的资料,不包括描述信息",
          description: "返回的数据格式:{id:string,role:string,description:string,work:number,last_active_at:number}",
          mimeType: "application/json",
        },
      ],
    };
  });

  _server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const uri = request.params.uri;

    const url = new URL(uri);
    const protocol = url.protocol;

    if (protocol === "team:") {
      // 获取所有AI代理
      if (url.hostname === "agents") {
        const agents = Controller.getAgents();
        return {
          contents: agents.map((agent) => ({
            uri: `team://agent/${agent.id}`,
            mimeType: "application/json",
            type: "text",
            text: JSON.stringify(agent),
          })),
        };
      }

      // 获取单个AI代理
      if (url.hostname === "agent") {
        const agentId = url.pathname.split("/")[1];
        const agent = Controller.getAgent(agentId);
        if (agent) {
          return {
            contents: [
              {
                uri: `team://agent/${agent.id}`,
                mimeType: "application/json",
                type: "text",
                text: JSON.stringify(agent),
              },
            ],
          };
        }
      }

      // 获取AI代理的消息
      if (url.hostname === "messages") {
        const agentId = url.pathname.split("/")[1];
        const messages = Controller.getMessages(agentId);
        return {
          contents: messages.map((message) => ({
            uri: `team://message/${message.id}`,
            mimeType: "application/json",
            type: "text",
            text: JSON.stringify(message),
          })),
        };
      }

      // 获取单个AI代理的消息
      if (url.hostname === "message") {
        const messageId = url.pathname.split("/")[1];
        const message = Controller.getMessage(messageId);

        if (message) {
          return {
            contents: [
              {
                uri: `team://message/${message.id}`,
                mimeType: "application/json",
                type: "text",
                text: JSON.stringify(message),
              },
            ],
          };
        } else {
          return {
            contents: [
              {
                uri: `team://message/${messageId}`,
                mimeType: "application/json",
                type: "text",
                text: "消息不存在",
              },
            ],
          };
        }
      }
    }

    return {
      contents: [],
    };
  });
};
