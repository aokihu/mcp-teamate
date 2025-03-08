/**
 * MCP 工具资源
 * @author aokihu <aokihu@gmail.com>
 * @version 1.0.0
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import Controller from "../libs/coltroller";

export const regeisterTools = (server: McpServer) => {
  // AI 代理签到
  server.tool(
    "Check In",
    `AI代理签到,签到后可以其他AI代理可以获取到AI代理的详细信息,并且可以接收其他AI代理的消息.\n
    "id"是AI代理的唯一标识,其他AI代理通过id来发送消息
    "role"是AI代理的角色,告诉其他AI代理自己的角色,通常可以从角色推测出代理具备哪些能力
    "description"是AI代理的描述信息,可以让其他AI代理了解自己的能力`,
    {
      id: z.string({ message: "AI代理的唯一标识" }),
      role: z.string({ message: "AI代理的角色" }),
      description: z.string({ message: "AI代理的描述信息" }),
    },
    async ({ id, role, description }) => {
      Controller.checkIn(id, role, description);
      return {
        content: [
          {
            type: "text",
            text: `签到成功!`,
          },
        ],
      };
    }
  );

  // AI 代理签退
  server.tool(
    "Check Out",
    "AI代理签退,退出之后只是改变了work的值,但是还是能够接收其他AI代理的发送的消息.这个功能的目的只是让其他AI代理知道为什么消息没有被回复.",
    {
      id: z.string(),
    },
    async ({ id }) => {
      Controller.checkOut(id);
      return {
        content: [{ type: "text", text: `签退成功!` }],
      };
    }
  );

  // 获取所有AI代理
  server.tool("Get All Agents", "获取所有AI代理", {}, async () => {
    const agents = Controller.getAgents();
    return {
      content: [{ type: "text", text: JSON.stringify(agents) }],
    };
  });

  // 向AI代理发送消息
  server.tool(
    "Send Message",
    `向AI代理发送消息
    "sender"是发送消息的AI代理的ID
    "receiver"是接收消息的AI代理的ID
    "content"是消息的内容`,
    {
      sender: z.string(),
      receiver: z.string(),
      content: z.string(),
    },
    async ({ sender, receiver, content }) => {
      Controller.sendMessage(sender, receiver, content);
      return {
        content: [{ type: "text", text: `消息发送成功!` }],
      };
    }
  );

  // 获取当前AI代理接收到的所有消息
  server.tool(
    "Get All Messages",
    "获取当前AI代理接收到的所有消息",
    {
      id: z.string({ description: "接收消息的AI代理ID" }),
    },
    async ({ id }) => {
      const messages = await Controller.getMessages(id);
      return {
        content: [{ type: "text", text: JSON.stringify(messages) }],
      };
    }
  );

  // 获取AI代理的记忆
  server.tool(
    "Get Agent Memory",
    "获取AI代理的记忆",
    {
      id: z.string(),
    },
    async ({ id }) => {
      const memory = Controller.getAgentMemory(id);
      return {
        content: [{ type: "text", text: memory }],
      };
    }
  );

  // 设置AI代理的记忆
  server.tool(
    "Set Agent Memory",
    "设置AI代理的记忆",
    {
      id: z.string(),
      memory: z.string(),
    },
    async ({ id, memory }) => {
      Controller.setAgentMemory(id, memory);
      return {
        content: [{ type: "text", text: `记忆设置成功!` }],
      };
    }
  );

  // 删除消息
  server.tool(
    "Delete Message",
    `删除消息,当AI代理阅读消息之后,删除消息;
    "id"是消息的ID;
    删除消息后,消息将不再出现在AI代理的消息列表中`,
    {
      id: z.string(),
    },
    async ({ id }) => {
      const result = await Controller.deleteMessage(id);
      if (result) {
        return {
          content: [{ type: "text", text: `消息删除成功!` }],
        };
      } else {
        return {
          content: [{ type: "text", text: `消息删除失败!` }],
        };
      }
    }
  );
};
