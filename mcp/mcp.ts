import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerResourceTemplates } from "../libs/resource_templates";
import { registerResources } from "../libs/resources";
import { regeisterTools } from "./tools";

// 创建MCP服务器实例
// 这里的server是一个McpServer实例
// 你可以在这里添加更多的工具和功能
const server = new McpServer(
  {
    name: "mcp",
    description: "MCP-TEAMATE AI 合作伙伴MCP",
    version: "1.0.0",
  },
  {
    capabilities: {
      resources: {},
    },
  }
);

// 注册资源模版
registerResourceTemplates(server);
registerResources(server);
regeisterTools(server);

export default server;
