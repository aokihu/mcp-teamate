/**
 * 获取所有代理资料
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export const getAllAgentsTool = (mcpServer: McpServer, serverUrl: string) => {
  mcpServer.tool(
    "get_all_agents", 
    "获取所有AI代理信息", 
    {}, 
    async () => {
    const response = await fetch(serverUrl + "/agent/all");
    const data = await response.json();
    if (data.code === "success") {
      return {
        content: [{ type: "text", text: JSON.stringify(data.data) }],
      };
    } else {
      return {
        content: [{ type: "text", text: "获取所有代理资料失败" }],
      };
    }
  });
};
