/**
 * 消息对象
 * @author aokihu <aokihu@gmail.com>
 * @description 消息对象
 * @license MIT
 * @version 1.0.0
 */

import { omits } from "../libs/functional";

export interface MessageType {
  id: string;
  sender: string;
  receiver: string;
  content: string;
  type: "text" | "image" | "audio";
  read: boolean;
  timestamp: number;
}

export interface MessageExposeType {
  id: string;
  sender: string;
  receiver: string;
  read: boolean;
  timestamp: number;
}

/* ------------------------------------------ */
/*                 全局数据定义                 */
/* ------------------------------------------ */

const MessageCollection: MessageType[] = [];

/* ------------------------------------------ */
/*               消息管理方法定义                */
/* ------------------------------------------ */

/**
 * 添加消息
 * @param sender 发送者
 * @param receiver 接收者
 * @param content 内容
 * @param type 类型
 * @returns 消息对象
 * @example
 * const message = addMessage("aokihu", "teamate", "你好", "text");
 */
const _addMessage = (sender: string, receiver: string, content: string, type: "text" | "image" | "audio" = "text") => {
  const id = Bun.randomUUIDv7();
  const message: MessageType = {
    id,
    sender,
    receiver,
    content,
    type,
    read: false,
    timestamp: Date.now(),
  };
  MessageCollection.push(message);
  return message;
};

/**
 * 获取消息
 * @param receiver 接收者
 * @returns 消息对象
 * @description 获取消息对象，不包含内容
 * @example
 * const messages = getMessages("aokihu");
 */
const _getMessagesByReceiver = (receiver: string) =>
  MessageCollection.filter((x) => x.receiver === receiver).map((x) => omits(x, "content"));

/**
 * 获取消息
 * @param sender 发送者
 * @returns 消息对象
 * @description 获取消息对象，不包含内容
 * @example
 * const messages = getMessagesBySender("aokihu");
 */
const _getMessagesBySender = (sender: string) =>
  MessageCollection.filter((x) => x.sender === sender).map((x) => omits(x, "content"));

/**
 * 获取消息
 * @param id 消息ID
 * @returns 消息对象
 * @example
 * const message = getMessageById("123");
 */
const _getMessageById = (id: string) => MessageCollection.find((x) => x.id === id);

/**
 * 删除消息
 * @param id 消息ID
 * @example
 * deleteMessageById("123");
 */
const _deleteMessageById = (id: string) => {
  const index = MessageCollection.findIndex((x) => x.id === id);
  if (index !== -1) {
    MessageCollection.splice(index, 1);
  }
};

/**
 * 删除消息
 * @param receiver 接收者
 * @example
 * deleteMessagesByReceiver("aokihu");
 */
const _deleteMessagesByReceiver = (receiver: string) => {
  MessageCollection.filter((x) => x.receiver === receiver).forEach((x) => _deleteMessageById(x.id));
};

/* ------------------------------------------ */
/*                 @Exports                   */
/* ------------------------------------------ */

const MessageManager = {
  addMessage: _addMessage,
  getMessagesByReceiver: _getMessagesByReceiver,
  getMessagesBySender: _getMessagesBySender,
  getMessageById: _getMessageById,
  deleteMessageById: _deleteMessageById,
  deleteMessagesByReceiver: _deleteMessagesByReceiver,
};

export default MessageManager;
