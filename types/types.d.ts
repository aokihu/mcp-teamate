// AI Agent Interface
export interface Agent {
  id: string;
  role: string;
  description: string;
  working: boolean;
  last_active_at: number;
  memory?: string;
}

// Message Interface
export interface Message {
  id: string;
  sender: string;
  receiver: string;
  content: string;
  type: string;
  timestamp: number;
  read: boolean;
}
