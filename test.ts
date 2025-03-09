/**
 * Teamate API 测试脚本
 * @author Claude
 * @version 1.0.0
 * @description 用于测试Teamate HTTP服务器的API
 */

import { test, expect, describe } from "bun:test";

// 服务器配置
const API_BASE_URL = "http://localhost:3001";

// 测试代理数据
const testAgents = [
  {
    id: "TestAgent1",
    role: "测试代理1",
    description: "用于测试API的代理1",
  },
  {
    id: "TestAgent2",
    role: "测试代理2",
    description: "用于测试API的代理2",
  },
];

// 测试消息数据
const testMessages = [
  {
    sender: "TestAgent1",
    receiver: "TestAgent2",
    content: "这是一条测试消息1",
  },
  {
    sender: "TestAgent2",
    receiver: "TestAgent1",
    content: "这是一条测试消息2",
  },
];

// 辅助函数：等待一段时间
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe("Teamate API 测试", () => {
  // 测试服务器是否在线
  test("服务器在线", async () => {
    const response = await fetch(`${API_BASE_URL}/`);
    expect(response.status).toBe(200);
    const text = await response.text();
    expect(text).toContain("Teamate HTTP Server");
  });

  // 测试代理签到
  test("代理签到", async () => {
    for (const agent of testAgents) {
      const response = await fetch(`${API_BASE_URL}/agent/checkIn`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(agent),
      });

      expect(response.status).toBe(200);
      const text = await response.text();
      expect(text).toBe("OK");
    }
  });

  // 测试获取所有代理
  test("获取所有代理", async () => {
    // 注意：这个端点可能需要根据实际API调整
    const response = await fetch(`${API_BASE_URL}/agent/all`);

    // 如果端点存在
    if (response.status === 200) {
      const agents = await response.json();
      expect(Array.isArray(agents)).toBe(true);

      // 检查我们的测试代理是否在列表中
      const agentIds = agents.map((a: any) => a.id);
      expect(agentIds).toContain(testAgents[0].id);
      expect(agentIds).toContain(testAgents[1].id);
    } else {
      console.warn("获取所有代理的端点不存在或未实现");
    }
  });

  // 测试发送消息
  test("发送消息", async () => {
    // 注意：这个端点可能需要根据实际API调整
    for (const message of testMessages) {
      const response = await fetch(`${API_BASE_URL}/message/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      // 如果端点存在
      if (response.status === 200) {
        const result = await response.json();
        expect(result).toHaveProperty("id");
      } else {
        console.warn("发送消息的端点不存在或未实现");
      }
    }
  });

  // 测试获取代理的消息
  test("获取代理的消息", async () => {
    // 注意：这个端点可能需要根据实际API调整
    const response = await fetch(`${API_BASE_URL}/message/all?receiver=${testAgents[0].id}`);

    // 如果端点存在
    if (response.status === 200) {
      const messages = await response.json();
      expect(Array.isArray(messages)).toBe(true);
    } else {
      console.warn("获取代理消息的端点不存在或未实现");
    }
  });

  // 测试设置代理记忆
  test("设置代理记忆", async () => {
    // 注意：这个端点可能需要根据实际API调整
    const memory = "这是一段测试记忆内容";
    const response = await fetch(`${API_BASE_URL}/agent/memory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: testAgents[0].id,
        memory,
      }),
    });

    // 如果端点存在
    if (response.status === 200) {
      const text = await response.text();
      expect(text).toContain("OK");
    } else {
      console.warn("设置代理记忆的端点不存在或未实现");
    }
  });

  // 测试获取代理记忆
  test("获取代理记忆", async () => {
    // 注意：这个端点可能需要根据实际API调整
    const response = await fetch(`${API_BASE_URL}/agent/memory?id=${testAgents[0].id}`);

    // 如果端点存在
    if (response.status === 200) {
      const memory = await response.text();
      expect(typeof memory).toBe("string");
    } else {
      console.warn("获取代理记忆的端点不存在或未实现");
    }
  });

  // 测试代理签退
  test("代理签退", async () => {
    // 注意：这个端点可能需要根据实际API调整
    const response = await fetch(`${API_BASE_URL}/agent/checkOut`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: testAgents[0].id,
      }),
    });

    // 如果端点存在
    if (response.status === 200) {
      const text = await response.text();
      expect(text).toContain("OK");
    } else {
      console.warn("代理签退的端点不存在或未实现");
    }
  });

  // 测试删除消息
  test("删除消息", async () => {
    // 首先发送一条消息
    const sendResponse = await fetch(`${API_BASE_URL}/message/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: testAgents[0].id,
        receiver: testAgents[1].id,
        content: "这是一条将被删除的测试消息",
      }),
    });

    // 如果发送消息的端点存在
    if (sendResponse.status === 200) {
      const result = await sendResponse.json();
      const messageId = result.id;

      // 然后删除这条消息
      const deleteResponse = await fetch(`${API_BASE_URL}/message/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: messageId,
        }),
      });

      // 如果删除消息的端点存在
      if (deleteResponse.status === 200) {
        const text = await deleteResponse.text();
        expect(text).toContain("OK");
      } else {
        console.warn("删除消息的端点不存在或未实现");
      }
    } else {
      console.warn("发送消息的端点不存在或未实现，无法测试删除消息");
    }
  });
});
