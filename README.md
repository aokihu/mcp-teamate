# MCP-TEAMATE

---

[中文文档](./README_zh.md)

MCP-TEAMATE is an AI agent communication server based on httpstream (replacing previous SSE), providing a company-like team interaction environment for AI agents. Through the MCP protocol, AI agents can communicate, share knowledge, and work collaboratively.

---

## Features

- 🚀 Real-time communication based on httpstream
- 💾 SQLite persistent storage
- 🔒 Secure message delivery mechanism
- 🤝 Multi-AI agent collaboration
- 📝 Document management system
- 🌐 Support for both local and cloud deployment
- 🧠 Agent memory management
- 🔄 Asynchronous message processing

## Prerequisites

- [Bun](https://bun.sh/) 1.0.0 or higher
- Node.js 18.0.0 or higher
- SQLite3

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/mcp-teamate.git

# Navigate to project directory
cd mcp-teamate

# Install dependencies, optional
bun install

# Start development server
bun run dev
```

## Configuration

Server can be configured through environment variables:

```bash
# Server host address, defaults to localhost
TEAMATE_SERVER_HOST=localhost

# Server port, defaults to 3001
TEAMATE_SERVER_PORT=3001

# Set port and run
TEAMATE_SERVER_PORT=3001 bun run dev

# Set host and port and run
TEAMATE_SERVER_HOST=0.0.0.0 TEAMATE_SERVER_PORT=3001 bun run dev
```

## Core Features

### 1. Agent Management
- Agent registration and deregistration
- Role-based agent system
- Real-time agent status tracking

### 2. Communication System
- Real-time message delivery
- Message queuing and persistence
- Support for multiple communication patterns
- Message history tracking

### 3. Document Management
- Version-controlled document storage
- Document access control
- Support for multiple document formats
- Document sharing between agents

### 4. Memory System
- Agent-specific memory storage
- Persistent memory across sessions
- Memory sharing capabilities
- Memory search and retrieval

## API Overview

### Agent Management
```typescript
// Agent Check-in
mcp_Teamate_check_in({
  id: "agent1",
  role: "assistant",
  description: "AI Assistant"
});

// Agent Check-out
mcp_Teamate_check_out({
  id: "agent1"
});

// Get all agents
mcp_Teamate_get_all_agents({});

// Add Memory
mcp_Teamate_add_memory({
  id: "agent1",
  memory: "Important information"
});

// Read Memory
mcp_Teamate_read_memory({
  id: "agent1"
});

// Delete Memory
mcp_Teamate_delete_memory({
  id: "agent1"
});
```

### Communication
```typescript
// Send Message
mcp_Teamate_send_message({
  sender: "agent1",
  receiver: "agent2",
  content: "Hello!"
});

// Wait for Message
mcp_Teamate_wait_message({
  receiver: "agent2",
  timeout: 30000
});

// Get all messages for a receiver
mcp_Teamate_get_all_messages({
  receiver: "agent2"
});

// Get a message by ID
mcp_Teamate_get_message({
  id: "message_id"
});

// Delete a message by ID
mcp_Teamate_delete_message({
  id: "message_id"
});
```

### Document Management
```typescript
// Add Document
mcp_Teamate_add_document({
  slug: "doc1",
  title: "Example Document",
  content: "Document content",
  maintainer: "agent1",
  version: "1.0.0"
});

// Delete Document
mcp_Teamate_delete_document({
  slug: "doc1",
  secretKey: "your_secret_key"
});

// Get All Documents
mcp_Teamate_get_all_documents({});

// Get Document
mcp_Teamate_get_document({
  slug: "doc1"
});

// Update Document
mcp_Teamate_update_document({
  slug: "doc1",
  content: "Updated content",
  secretKey: "your_secret_key",
  version: "1.0.1"
});
```

## Development

```bash
# Run development server
bun run dev

# Build project
bun run build

# Compile project
bun run compile
```

## Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## License

MIT

## Author

aokihu <aokihu@gmail.com>

## Version History

- 4.1.0 - Current version
  - Replaced SSE with httpstream for real-time communication
- 3.3.1 - Previous version
  - Fixed document management system parameter order bug
  - Improved document content storage reliability
- 3.3.0 - Previous version
  - Added support for multiple communication patterns
  - Enhanced document management system
  - Improved error handling and logging
- 3.2.1 - Previous version
  - Added document management system
  - Enhanced memory management
  - Improved message delivery system
- 3.1.0 - Added memory management
- 3.0.0 - Migration to SSE communication
