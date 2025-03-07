/**
 * 注册MCP Resource Templates
 * @author aokihu <aokihu@gmail.com>
 * @version 1.0.0
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { ListResourceTemplatesRequestSchema } from "@modelcontextprotocol/sdk/types.js";

// 注册MCP资源模版 - UriTemplate
export const registerResourceTemplates = (server: McpServer) => {
  const _server = server.server;

  _server.setRequestHandler(ListResourceTemplatesRequestSchema, async (request) => {
    return {
      resourceTemplates: [
        {
          uriTemplate: "team://agent/{id}",
          name: "AI代理用户的详细信息,包含详细描述信息",
          mimeType: "application/json",
        },
        {
          uriTemplate: "team://messages/{uid}",
          name: "AI代理通过自己的ID获取所有的消息,返回结果是消息的数量和消息的ID列表",
          description: "消息的结果格式{count:number,ids:string[]},阅读之后使用Delete Message工具删除消息",
          mimeType: "application/json",
        },
      ],
    };
  });
};
