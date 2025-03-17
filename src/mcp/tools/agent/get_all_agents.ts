/**
 * 获取所有代理资料
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { AgentManager } from "../../../libs/agent";

export const getAllAgentsTool = (mcpServer: McpServer) => {
  mcpServer.tool("GetAllAgents", "Get all AI agent information", {}, async () => {
    const agents = AgentManager.getInstance().getAllAgents();
    return {
      content: [
        {
          type: "text",
          text: agents
            .map(
              (agent) =>
                `Agent ID: ${agent.id}, Role: ${agent.role}, Working: ${
                  agent.working ? "Yes" : "No"
                }, Last Active: ${new Date(agent.last_active_at).toLocaleString()}`
            )
            .join("\n"),
        },
      ],
    };
  });
};
