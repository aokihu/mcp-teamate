import type { Agent } from "../../types/types";
import { addMemory, initDatabase, readMemory, deleteMemory } from "./database";
import { omits } from "./functional";

/* ----------------------------------*/
/*           Agent Manager           */
/* ----------------------------------*/

export class AgentManager {
  private static instance: AgentManager;
  private agents: Map<string, Agent> = new Map();

  /**
   * Get Instance
   */
  static getInstance() {
    if (!this.instance) {
      this.instance = new AgentManager();
    }
    return this.instance;
  }

  /**
   * Initialize
   * @description Initialize the agent manager
   * @returns {Promise<void>}
   */
  static async initialize() {
    await initDatabase();
  }

  /**
   * Agent Check In
   * @param id - Agent ID, unique, other agents will use this id to communicate with each other
   * @param role - Agent Role, e.g. "UI Designer", "Frontend Developer", "Backend Developer"
   * @param description - More details about the agent description, e.g. "UI Designer with 5 years of experience"
   */
  checkIn(id: string, role: string, description: string) {
    // Check the agent is already in the list
    if (this.agents.has(id)) {
      const agent = this.agents.get(id);
      if (agent) {
        agent.role = role;
        agent.description = description;
        agent.working = true;
        agent.last_active_at = Date.now();
      }
    } else {
      this.agents.set(id, {
        id,
        role,
        description,
        working: true,
        last_active_at: Date.now(),
      });
    }
  }

  /**
   * Agent Check Out
   * @param id - Agent ID, unique, other agents will use this id to communicate with each other
   */
  checkOut(id: string) {
    const agent = this.agents.get(id);
    if (agent) {
      agent.working = false;
      agent.last_active_at = Date.now();
      this.agents.set(id, agent);
    }
  }

  /**
   * Get All Agents
   */
  getAllAgents() {
    return [...this.agents.values()].map((x) => omits(x, "memory", "last_active_at", "description"));
  }

  /**
   * Get Agent By ID
   * @param id - Agent ID, unique, other agents will use this id to communicate with each other
   */
  getAgentById(id: string) {
    return this.agents.get(id);
  }

  /**
   * Add Agent Memory
   * @param agentId - Agent ID, unique, other agents will use this id to communicate with each other
   * @param memory - Memory, e.g. "I am a UI Designer"
   * @returns {number} - Memory ID
   */
  addMemory(agentId: string, memory: string) {
    const agent = this.getAgentById(agentId);
    if (agent) {
      const id = addMemory(agentId, memory);
      return id;
    }

    return null;
  }

  /**
   * Get Agent Memory
   * @param id - Agent ID, unique, other agents will use this id to communicate with each other
   */
  getMemory(id: string): { id: number; memory: string; timestamp: string }[] {
    return readMemory(id);
  }

  /**
   * Delete Agent Memory
   * @param id - Agent ID, unique, other agents will use this id to communicate with each other
   */
  deleteMemory(id: string) {
    deleteMemory(Number(id));
  }
}
