/**
 * Get all agents information
 * @author aokihu <aokihu@gmail.com>
 * @license BSD-2
 * @description Get all agents information
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { AgentManager } from "../../../libs/agent";

export const getAllAgentsTool = (mcpServer: McpServer) => {
  mcpServer.tool("Get All Agents", "Get all AI agent information", {}, async () => {
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
