/**
 * 实现MCP具体功能
 * @author aokihu <aokihu@gmail.com>
 * @version 0.0.1   
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

const server = new McpServer({
    name: "mcp-server",
    version: "0.0.1",
});


server.tool("hello", "Hello World", {name:z.string()}, (args) => {
    return {
        content: [{
            type: "text",
            text: `Hello ${args.name}`
        }]
    }
});

export default server;