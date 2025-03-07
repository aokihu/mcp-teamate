/**
 * 控制器类
 * @author aokihu <aokihu@gmail.com>
 * @version 1.0.0
 */

import type { AIAgent, Message } from "../types/types";

// 数据声明
const Agents: Map<string, AIAgent> = new Map();
const Messages: Set<Message> = new Set();

export default class Controller {
  /**
   * 代理签到
   * @param id 代理ID
   * @param role 代理角色
   * @param description 代理描述
   */
  static checkIn: (id: string, role: string, description: string) => Promise<void> = async (id, role, description) => {
    // 检查代理是否存在
    const agent = Agents.get(id);

    if (agent) {
      // 更新代理信息
      agent.work = 1;
      agent.last_active_at = new Date().getTime();
    } else {
      // 创建代理
      Agents.set(id, {
        id,
        role,
        description,
        work: 1,
        last_active_at: new Date().getTime(),
      });
    }
  };

  /**
   * 代理签退
   * @param id 代理ID
   */
  static checkOut: (id: string) => Promise<void> = async (id) => {
    const agent = Agents.get(id);

    if (agent) {
      agent.work = 0;
    }
  };

  /**
   * 获取代理
   * @param id 代理ID
   * @returns 代理
   */
  static getAgent: (id: string) => AIAgent | undefined = (id) => Agents.get(id);

  /**
   * 获取所有代理
   * @returns 所有代理
   */
  static getAgents: () => AIAgent[] = () => [...Agents.values()];

  /**
   * 获取AI代理的消息
   * @param uid 代理ID
   * @returns 消息
   */
  static getMessages: (uid: string) => Message[] = (uid) =>
    [...Messages.values()].filter((message) => message.receiver === uid);

  /**
   * 获取AI代理的消息
   * @param id 消息ID
   * @returns 消息
   */
  static getMessage: (id: string) => Message | undefined = (id) =>
    [...Messages.values()].find((message) => message.id === id);

  /**
   * 向AI代理发送消息
   * @param sender 发送者
   * @param receiver 接收者
   * @param content 消息内容
   */
  static sendMessage: (sender: string, receiver: string, content: string) => Promise<void> = async (
    sender,
    receiver,
    content
  ) => {
    Messages.add({
      id: crypto.randomUUID(),
      sender,
      receiver,
      content,
      type: "text",
      read: false,
      timestamp: new Date().getTime(),
    });
  };

  /**
   * 删除消息
   * @param id 消息ID
   */
  static deleteMessage: (id: string) => Promise<boolean> = async (id) => {
    const message = [...Messages.values()].find((message) => message.id === id);
    if (message) {
      Messages.delete(message);
      return true;
    } else {
      return false;
    }
  };

  /**
   * 清除已读消息
   */
  static clearReadedMessages: () => Promise<void> = async () => {
    Messages.forEach((message) => {
      if (message.read) {
        Messages.delete(message);
      }
    });
  };
}
