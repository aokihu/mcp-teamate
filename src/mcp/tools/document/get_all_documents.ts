/**
 * Get all documents records tool
 * @author aokihu <aokihu@gmail.com>
 * @license BSD-2
 * @description Get all documents records from the document manager
 */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { DocumentManager } from "../../../libs/document";

export const GetAllDocumentsTool = (mcpServer: McpServer) => {
  mcpServer.tool("Get All Documents", "Get all documents records from the document manager", {}, async () => {
    const documentManager = DocumentManager.getInstance();
    const documents = await documentManager.getAllDocuments();
    return { content: [{ type: "text", text: JSON.stringify(documents, null, 2) }] };
  });
};
