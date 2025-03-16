# MCP-TEAMATE

[中文文档](./README_zh.md)

MCP-TEAMATE is an AI agent communication server based on SSE (Server-Sent Events), providing a company-like team interaction environment for AI agents. Through the MCP protocol, AI agents can communicate, share knowledge, and work collaboratively.

## Features

- 🚀 Real-time communication based on SSE
- 💾 SQLite persistent storage
- 🔒 Secure message delivery mechanism
- 🤝 Multi-AI agent collaboration
- 📝 Knowledge management and sharing
- 🌐 Support for both local and cloud deployment

## Installation

### Prerequisites

- [Bun](https://bun.sh/) 1.0.0 or higher
- SQLite3

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/mcp-teamate.git

# Navigate to project directory
cd mcp-teamate

# Install dependencies
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
```

## MCP Tools

MCP-TEAMATE provides the following tools for AI agents:

### 1. Agent Management Tools

#### CheckIn
- Function: AI agent check-in, inform other agents about their role and capabilities
- Parameters:
  - id: string - Agent unique identifier
  - role: string - Agent role
  - description: string - Agent description

#### CheckOut
- Function: AI agent check-out, indicating task completion
- Parameters:
  - id: string - Agent unique identifier

#### GetAllAgents
- Function: Get information about all AI agents
- Parameters: None

### 2. Communication Tools

#### SendMessage
- Function: Send message to other agents
- Parameters:
  - sender: string - Sender ID
  - receiver: string - Receiver ID
  - content: string - Message content

#### GetMessage
- Function: Get detailed content of a specific message
- Parameters:
  - id: string - Message ID

#### GetMyAllMessages
- Function: Get all messages sent to a specific agent
- Parameters:
  - receiver: string - Receiver ID

#### WaitMessage
- Function: Wait for new messages
- Parameters:
  - receiver: string - Receiver ID
  - timeout?: number - Timeout in milliseconds, defaults to 30000

#### DeleteMessage
- Function: Delete a specific message
- Parameters:
  - id: string - Message ID

### 3. Memory Management Tools

#### WriteMemory
- Function: Write agent memory
- Parameters:
  - id: string - Agent ID
  - memory: string - Memory content

#### ReadMemory
- Function: Read agent memory
- Parameters:
  - id: string - Agent ID

## Usage Examples

### 1. AI Agent Check-in
```typescript
await mcpServer.tool("CheckIn").execute({
  id: "agent1",
  role: "assistant",
  description: "I am an AI assistant"
});
```

### 2. Send Message
```typescript
await mcpServer.tool("SendMessage").execute({
  sender: "agent1",
  receiver: "agent2",
  content: "Hello!"
});
```

### 3. Read Memory
```typescript
await mcpServer.tool("ReadMemory").execute({
  id: "agent1"
});
```

## Development

```bash
# Run development server
bun run dev

# Compile project
bun run compile
```

## API Documentation

The server provides the following HTTP endpoints:

- `GET /sse` - SSE connection endpoint
- `POST /messages` - Message handling endpoint

## Contributing

Issues and pull requests are welcome!

## License

MIT

## Author

aokihu <aokihu@gmail.com>

## Version History

- 3.1.1 - Current version
- 3.0.0 - Migration to SSE communication
