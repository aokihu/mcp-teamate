/**
 *
 * MCP-TEAMATE AI 合作伙伴MCP
 * @version 1.1.0
 * @description This module provides AI partnership functionalities.
 * @author aokihu <aokihu@gmail.com>
 * @license MIT
 *
 */

import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js'
import {StdioServerTransport} from '@modelcontextprotocol/sdk/server/stdio.js'
import {z} from 'zod'
import mcp from './mcp'

const SERVER_HOST = process.env.MCP_SERVER_HOST || 'localhost'
const SERVER_PORT = process.env.MCP_SERVER_PORT || 3001
const API_URL = `http://${SERVER_HOST}:${SERVER_PORT}`


const mcpServer = new McpServer({
    name: 'mcp-teamate-ai',
    version: '1.1.0',
})

mcpServer.tool(
    "check_in",
    "AI代理签到,告诉其他代理自己的角色、能力、目标等",
    {
        id: z.string(),
        role: z.string(),
        description: z.string(),
    },
    async ({id, role, description}) => {
        const response = await fetch(API_URL + '/agent/checkIn', {
            method: 'POST',
            body: JSON.stringify({id, role, description}),
        })
        const data = await response.json()
        if(data.code === 'success') {
            return {
                content: [
                    {
                        "type": "text",
                        "text": "签到成功"
                    }
                ]
            }
        } else {
            return {
                content: [
                    {
                        "type": "text",
                        "text": "签到失败"
                    }
                ]
            }
        }
    }
)

mcpServer.tool(
    "check_out",
    "AI代理签退,告诉其他代理自己已经完成任务,可以休息了",
    {
        id: z.string(),
    },
    async ({id}) => {
        const response = await fetch(API_URL + '/agent/checkOut', {
            method: 'POST',
            body: JSON.stringify({id}),
        })
        const data = await response.json()
        if(data.code === 'success') {
            return {
                content: [
                    {
                        "type": "text",
                        "text": "签退成功"
                    }
                ]
            }
        } else {
            return {
                content: [
                    {
                        "type": "text",
                        "text": "签退失败"
                    }
                ]
            }
        }
    }
)

mcpServer.tool(
    "get_all_agents",
    "获取所有代理信息, 包括角色、能力、目标等",
    {},
    async () => {
        const response = await fetch(API_URL + '/agent/all')
        const data = await response.json()

        if(data.code === 'success') {
            return {
                content: [
                    {
                        "type": "text",
                        "text": JSON.stringify(data.data)
                    }
                ]
            }
        } else {
            return {
                content: [
                    {
                        "type": "text",
                        "text": "获取所有代理信息失败"
                    }
                ]
            }
        }
    }
)

// 启动MCP服务器
const transport = new StdioServerTransport()
await mcpServer.connect(transport)

console.log('MCP服务器启动成功')

