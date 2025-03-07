-- 创建角色表,如果不存在
-- 角色用于保存AI代理的角色信息
-- id: 用于查找AI代理的唯一标识,由AI提供
-- role: 角色名称
-- description: 角色描述
-- work:角色是否已经在工作
-- last_active_at: 代理最后活跃时间
CREATE TABLE IF NOT EXISTS agents (
  id TEXT PRIMARY KEY,
  role TEXT NOT NULL,
  description TEXT NOT NULL,
  work INTEGER NOT NULL DEFAULT 0,
  last_active_at INTEGER NOT NULL DEFAULT (strftime('%s','now'))
);

-- 创建消息表,如果不存在
-- 消息用于保存AI代理的消息记录
-- sender: 消息发送者,可以是AI代理或者用户
-- receiver: 消息接收者,可以是AI代理或者用户
-- content: 消息内容
-- type: 消息类型,可以是文本、图片、音频等
-- timestamp: 消息发送时间
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sender TEXT NOT NULL,
  receiver TEXT NOT NULL,
  content TEXT NOT NULL,
  type TEXT NOT NULL,
  timestamp INTEGER NOT NULL DEFAULT (strftime('%s','now'))
)
