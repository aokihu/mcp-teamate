/**
 * AI代理类
 * @version 1.1.0
 * @description 用于管理AI代理数据的类
 * @author aokihu <aokihu@gmail.com>
 * @license MIT
 *
 */

import { omits } from "../libs/functional";

/* ------------------------------------------ */
/*                 代理对象类型                 */
/* ------------------------------------------ */

// 代理对象的类型
export interface AgentType {
  id: string;
  role: string;
  description: string;
  memory: string;
  working: boolean;
  last_active_at: number;
}

// 代理对象对外暴露的类型
export interface AgentExposeType {
  id: string;
  role: string;
  description: string;
  working: boolean;
  last_active_at: number;
}

/* ------------------------------------------ */
/*                 全局数据对象                 */
/* ------------------------------------------ */

const AgentCollection: AgentType[] = [];

/* ------------------------------------------ */
/*               代理管理对象函数                */
/* ------------------------------------------ */

/**
 * 代理签到
 * @param id 代理ID
 * @param role 代理角色
 * @param description 代理描述
 */
const _checkIn = (id: string, role: string, description: string) => {

  // 检查用户是否存在
  // 检查依据是id是否在AgentCollection中
  const agent = AgentCollection.find((agent) => agent.id === id);

  if(agent) {
    agent.working = true;
    agent.last_active_at = Date.now();
  } else {
    const newAgent = {
      id,
      role,
      description,
      memory: "",
      working: false,
      last_active_at: Date.now(),
    };
    AgentCollection.push(newAgent);
  }
};

/**
 * 代理签退
 * @param id 代理ID
 */
const _checkOut = (id: string) => {
  const agent = AgentCollection.find((agent) => agent.id === id);
  if (agent) {
    agent.working = false;
    agent.last_active_at = Date.now();
  }
};

/**
 * 获取所有代理
 * @returns 代理列表,不显示memory
 */
const _getAllAgents = () => AgentCollection.map((x) => omits(x, "memory"));

/**
 * 获取代理
 * @param id 代理ID
 * @returns 代理
 */
const _getAgentById = (id: string) => AgentCollection.find((x) => x.id === id);

/**
 * 写入代理记忆
 * @param id 代理ID
 * @param memory 记忆
 */
const _writeMemory = (id: string, memory: string) => {
  const agent = _getAgentById(id);
  if (agent) {
    agent.memory = memory;
  }
};

/**
 * 获取代理记忆
 * @param id 代理ID
 * @returns 记忆
 */
const _getMemory = (id: string) => _getAgentById(id)?.memory ?? "No memory at here";

/* ------------------------------------------ */
/*              @Export Functions             */
/* ------------------------------------------ */

const exports = {
  checkIn: _checkIn,
  checkOut: _checkOut,
  getAllAgents: _getAllAgents,
  getAgentById: _getAgentById,
  writeMemory: _writeMemory,
  getMemory: _getMemory,
};

export default exports;
