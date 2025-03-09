/**
 * 签退工具
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export const checkOutTool = (mcpServer: McpServer, serverUrl: string) => {
  mcpServer.tool(
    "check_out",
    "AI代理签退,告诉其他代理自己已经完成任务,可以休息了",
    {
      id: z.string(),
    },
    async ({ id }) => {
      const response = await fetch(serverUrl + "/agent/checkOut", {
        method: "POST",
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      if (data.code === "success") {
        return {
          content: [{ type: "text", text: "签退成功" }],
        };
      } else {
        return {
          content: [{ type: "text", text: "签退失败" }],
        };
      }
    }
  );
};
