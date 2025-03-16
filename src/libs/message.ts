/**
 * Message Manager
 * @author aokihu <aokihu@gmail.com>
 */

/* ---------------------------------- */
/*               Imports              */
/* ---------------------------------- */

import type { Message } from "../../types/types";

export class MessageManager {
  private static instance: MessageManager;
  private messages: Map<string, Message> = new Map();

  /**
   * Get Instance
   * @returns MessageManager instance
   */
  static getInstance() {
    if (!this.instance) {
      this.instance = new MessageManager();
    }
    return this.instance;
  }

  /**
   * Send Message to Other Agent
   * @param sender - Sender ID, unique, other agents will use this id to communicate with each other
   * @param receiver - Receiver ID, unique, other agents will use this id to communicate with each other
   * @param content - Message content
   * @param type - Message type, default is "text"
   * @returns Message ID
   */
  sendMessage(sender: string, receiver: string, content: string, type: string = "text") {
    const id = Bun.randomUUIDv7();
    const message: Message = {
      id,
      sender,
      receiver,
      content,
      type,
      timestamp: Date.now(),
      read: false,
    };
    this.messages.set(id, message);
    return id;
  }

  /**
   * 通过ID获取消息
   */
  getMessageById(id: string) {
    const message = this.messages.get(id);
    if (message) {
      message.read = true;
      this.messages.set(id, message);
    }
    return message;
  }

  /**
   * 通过接收者获取消息
   * 返回的消息只包含id, sender, content, type, timestamp, 不包含content
   */
  getMessagesByReceiver(receiver: string): Omit<Message, "content">[] {
    return Array.from(this.messages.values())
      .filter((msg) => msg.receiver === receiver)
      .sort((a, b) => b.timestamp - a.timestamp)
      .map((x) => {
        const { content, ...rest } = x;
        return rest;
      });
  }

  /**
   * 通过ID删除消息
   */
  deleteMessageById(id: string) {
    this.messages.delete(id);
  }
}

export default new MessageManager();
