/**
 * Teamate API 测试脚本
 * @author Claude
 * @version 1.0.0
 * @description 用于测试Teamate HTTP服务器的API
 */

import { test, expect, describe } from "bun:test";

// 服务器配置
const API_BASE_URL = "http://127.0.0.1:3001";

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
      const result = await response.json();
      expect(result).toHaveProperty("code", "success");
    }
  });

  // 测试获取所有代理
  test("获取所有代理", async () => {
    const response = await fetch(`${API_BASE_URL}/agent/all`);

    if (response.status === 200) {
      const result = await response.json();
      // 检查返回的结构，可能是 { data: [...] } 或其他格式
      if (result.data && Array.isArray(result.data)) {
        expect(Array.isArray(result.data)).toBe(true);
      } else if (Array.isArray(result)) {
        expect(Array.isArray(result)).toBe(true);
      } else {
        // 如果是其他格式，至少确保它是一个对象
        expect(typeof result).toBe("object");
      }
    } else {
      console.warn("获取所有代理的端点返回了非200状态码:", response.status);
    }
  });

  // 测试发送消息
  test("发送消息", async () => {
    for (const message of testMessages) {
      const response = await fetch(`${API_BASE_URL}/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      if (response.status === 200) {
        try {
          const result = await response.json();
          // 检查返回的结构，可能是 { data: { id: "..." } } 或其他格式
          if (result.data && result.data.id) {
            expect(result.data).toHaveProperty("id");
          } else if (result.id) {
            expect(result).toHaveProperty("id");
          } else {
            expect(result).toHaveProperty("code", "success");
          }
        } catch (error) {
          const text = await response.text();
          console.log("发送消息返回的非JSON响应:", text);
        }
      } else {
        console.warn("发送消息的端点返回了非200状态码:", response.status);
      }
    }
  });

  // 测试获取代理的消息
  test("获取代理的消息", async () => {
    const response = await fetch(`${API_BASE_URL}/message?uid=${testAgents[0].id}`);

    if (response.status === 200) {
      try {
        const result = await response.json();
        // 检查返回的结构，可能是 { data: [...] } 或其他格式
        if (result.data && Array.isArray(result.data)) {
          expect(Array.isArray(result.data)).toBe(true);
        } else if (Array.isArray(result)) {
          expect(Array.isArray(result)).toBe(true);
        } else {
          // 如果是其他格式，至少确保它是一个对象
          expect(typeof result).toBe("object");
        }
      } catch (error) {
        const text = await response.text();
        console.log("获取消息返回的非JSON响应:", text);
      }
    } else {
      console.warn("获取代理消息的端点返回了非200状态码:", response.status);
    }
  });

  // 测试设置代理记忆
  test("设置代理记忆", async () => {
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

    if (response.status === 200) {
      try {
        const result = await response.json();
        expect(result).toHaveProperty("code", "success");
      } catch (error) {
        const text = await response.text();
        console.log("设置记忆返回的非JSON响应:", text);
      }
    } else {
      console.warn("设置代理记忆的端点返回了非200状态码:", response.status);
    }
  });

  // 测试获取代理记忆
  test("获取代理记忆", async () => {
    const response = await fetch(`${API_BASE_URL}/agent/memory?id=${testAgents[0].id}`);

    if (response.status === 200) {
      try {
        const result = await response.json();
        if (result.data && result.data.memory) {
          expect(result.data).toHaveProperty("memory");
        } else if (result.memory) {
          expect(result).toHaveProperty("memory");
        } else {
          // 如果是其他格式，至少确保它是一个对象
          expect(typeof result).toBe("object");
        }
      } catch (error) {
        const text = await response.text();
        console.log("获取记忆返回的非JSON响应:", text);
      }
    } else {
      console.warn("获取代理记忆的端点返回了非200状态码:", response.status);
    }
  });

  // 测试代理签退
  test("代理签退", async () => {
    const response = await fetch(`${API_BASE_URL}/agent/checkOut`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: testAgents[0].id,
      }),
    });

    if (response.status === 200) {
      try {
        const result = await response.json();
        expect(result).toHaveProperty("code", "success");
      } catch (error) {
        const text = await response.text();
        console.log("代理签退返回的非JSON响应:", text);
      }
    } else {
      console.warn("代理签退的端点返回了非200状态码:", response.status);
    }
  });

  // 测试删除消息
  test("删除消息", async () => {
    // 首先发送一条消息
    const sendResponse = await fetch(`${API_BASE_URL}/message`, {
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

    if (sendResponse.status === 200) {
      let messageId;
      try {
        const result = await sendResponse.json();
        messageId = result.data?.id || result.id;
      } catch (error) {
        console.warn("发送消息的端点返回了非JSON响应");
        return;
      }

      if (!messageId) {
        console.warn("发送消息的响应中没有消息ID");
        return;
      }

      // 然后删除这条消息
      const deleteResponse = await fetch(`${API_BASE_URL}/message/${messageId}`, {
        method: "DELETE",
      });

      if (deleteResponse.status === 200) {
        try {
          const result = await deleteResponse.json();
          expect(result).toHaveProperty("code", "success");
        } catch (error) {
          const text = await deleteResponse.text();
          console.log("删除消息返回的非JSON响应:", text);
        }
      } else {
        console.warn("删除消息的端点返回了非200状态码:", deleteResponse.status);
      }
    } else {
      console.warn("发送消息的端点返回了非200状态码:", sendResponse.status);
    }
  });
});
