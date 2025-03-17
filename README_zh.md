# MCP-TEAMATE

[English](./README.md)

MCP-TEAMATE 是一个基于SSE（Server-Sent Events）的AI代理通信服务器，它为AI代理提供了一个类似公司团队的交互环境。通过MCP协议，AI代理可以相互通信、共享知识、协同工作。

## 特性

- 🚀 基于SSE的实时通信
- 💾 SQLite持久化存储
- 🔒 安全的消息传递机制
- 🤝 支持多AI代理协作
- 📝 文档管理系统
- 🌐 支持本地和云端部署
- 🧠 代理记忆管理
- 🔄 异步消息处理

## 环境要求

- [Bun](https://bun.sh/) 1.0.0 或更高版本
- Node.js 18.0.0 或更高版本
- SQLite3

## 安装

```bash
# 克隆仓库
git clone https://github.com/yourusername/mcp-teamate.git

# 进入项目目录
cd mcp-teamate

# 安装依赖
bun install

# 启动开发服务器
bun run dev
```

## 配置

可以通过环境变量配置服务器：

```bash
# 服务器主机地址，默认为 localhost
TEAMATE_SERVER_HOST=localhost

# 服务器端口，默认为 3001
TEAMATE_SERVER_PORT=3001
```

## 核心功能

### 1. 代理管理
- 代理注册与注销
- 基于角色的代理系统
- 实时代理状态跟踪

### 2. 通信系统
- 实时消息传递
- 消息队列和持久化
- 支持多种通信模式
- 消息历史追踪

### 3. 文档管理
- 版本控制的文档存储
- 文档访问控制
- 支持多种文档格式
- 代理间文档共享

### 4. 记忆系统
- 代理特定的记忆存储
- 跨会话持久化记忆
- 记忆共享能力
- 记忆搜索和检索

## API 概览

### 代理管理
```typescript
// 代理签到
mcp_Teamate_CheckIn({
  id: "agent1",
  role: "assistant",
  description: "AI助手"
});

// 代理签出
mcp_Teamate_CheckOut({
  id: "agent1"
});
```

### 通信
```typescript
// 发送消息
mcp_Teamate_SendMessage({
  sender: "agent1",
  receiver: "agent2",
  content: "你好！"
});

// 等待消息
mcp_Teamate_wait_message({
  receiver: "agent2",
  timeout: 30000
});
```

### 文档管理
```typescript
// 添加文档
mcp_Teamate_add_document({
  slug: "doc1",
  title: "示例文档",
  content: "文档内容",
  maintainer: "agent1",
  version: "1.0.0"
});

// 获取文档
mcp_Teamate_get_document({
  slug: "doc1"
});
```

### 记忆管理
```typescript
// 写入记忆
mcp_Teamate_write_memory({
  id: "agent1",
  memory: "重要信息"
});

// 读取记忆
mcp_Teamate_read_memory({
  id: "agent1"
});
```

## 开发

```bash
# 运行开发服务器
bun run dev

# 构建项目
bun run build

# 编译项目
bun run compile
```

## 贡献

我们欢迎贡献！请随时提交 Pull Request。

## 许可证

MIT

## 作者

aokihu <aokihu@gmail.com>

## 版本历史

- 3.3.0 - 当前版本
  - 添加多种通信模式支持
  - 增强文档管理系统
  - 改进错误处理和日志记录
- 3.2.1 - 上一版本
  - 添加文档管理系统
  - 增强记忆管理
  - 改进消息传递系统
- 3.1.0 - 添加记忆管理
- 3.0.0 - 迁移到SSE通信方式 