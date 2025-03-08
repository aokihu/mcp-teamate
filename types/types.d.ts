export interface AIAgent {
  id: string;
  role: string;
  description: string;
  memory: string; // 代理的记忆
  work: number; // 代理的工作状态, 0: 休息, 1: 工作
  last_active_at: number; // 代理最后一次活跃的时间
}

interface Message {
  id: string;
  sender: string;
  receiver: string;
  content: string;
  type: "text" | "image" | "audio";
  read: boolean;
  timestamp: number;
}
