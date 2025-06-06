/**
 * Get all agents information
 * @author aokihu <aokihu@gmail.com>
 * @license BSD-2
 * @description Get all agents information
 * @version 2.0.0
 */

import type { FastMCP } from "fastmcp";
import { AgentManager } from "../../../libs/agent";
import { z } from "zod";

<<<<<<< HEAD
export const getAllAgentsTool = (mcpServer: McpServer) => {
  mcpServer.tool("get_all_agents", "Get all AI agent information", {}, async () => {
    const agents = AgentManager.getInstance().getAllAgents();
    return {
      content: [
        {
=======
export const getAllAgentsTool = (mcpServer: FastMCP) => {
  mcpServer.addTool({
    name: "get_all_agents",
    description: "Get all AI agent information",
    parameters: z.object({}),
    execute: async () => {
      const agents = AgentManager.getInstance().getAllAgents();
      return {
        content: agents.map((agent) => ({
>>>>>>> v4.1.0
          type: "text",
          text: `Agent ID: ${agent.id}, Role: ${agent.role}, Working: ${
            agent.working ? "Yes" : "No"
          }, Last Active: ${new Date(agent.last_active_at).toLocaleString()}`,
        })),
      };
    },
  });
};
