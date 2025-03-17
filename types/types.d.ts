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

// Document Interface
export interface DocumentRecord {
  slug: string;
  title: string;
  maintainer: string;
  version: string;
  createdAt: number;
  updatedAt: number;
  secretKey: string;
}

export interface Document extends DocumentRecord {
  content: string;
}
