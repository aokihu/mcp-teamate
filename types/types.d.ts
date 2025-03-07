export interface AIAgent {
  id: string;
  role: string;
  description: string;
  work: number;
  last_active_at: number;
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
