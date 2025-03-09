/**
 * 签到工具
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export const checkInTool = (mcpServer: McpServer, serverUrl: string) => {
  mcpServer.tool(
    "check_in",
    "AI代理签到,告诉其他代理自己的角色、能力、目标等",
    {
      id: z.string(),
      role: z.string(),
      description: z.string(),
    },
    async ({ id, role, description }) => {
      const response = await fetch(serverUrl + "/agent/checkIn", {
        method: "POST",
        body: JSON.stringify({ id, role, description }),
      });
      const data = await response.json();
      if (data.code === "success") {
        return {
          content: [{ type: "text", text: "签到成功" }],
        };
      } else {
        return {
          content: [{ type: "text", text: "签到失败" }],
        };
      }
    }
  );
};
