/**
 * 等待消息
 * @description 等待消息工具,等待其他AI代理发送消息
 *              这个工具将会阻塞当前的执行,直到收到消息
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export const waitMessageTool = (mcpServer: McpServer, serverUrl: string) => {
    mcpServer.tool("wait_message",
        "等待消息工具,这个工具会阻塞当前的执行,直到收到消息",
        { receiver: z.string() },
        async ({ receiver }) => {
            return new Promise((resolve) => {
                let count = 0;
                const timer = setInterval(async () => {
                    const response = await fetch(serverUrl + "/message?mode=unread&receiver=" + receiver);
                    const data = await response.json();
                    if (data.code === "success" && data.data.length > 0) {
                        clearInterval(timer);
                        return resolve({
                            content: [{ type: "text", text: "收到消息" }],
                        });
                    }

                    count++;
                    if (count >= 30) { // 30秒后没有收到消息,则认为没有新的消息
                        clearInterval(timer);
                        return resolve({
                            content: [{ type: "text", text: "等待消息超时,没有新的消息" }],
                        });
                    }
                }, 1000);
            });
        }
    );
};
