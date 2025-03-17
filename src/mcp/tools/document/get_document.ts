/**
 * Get a document tool
 * @author aokihu <aokihu@gmail.com>
 * @description Get a document from the document manager
 */

import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { DocumentManager } from "../../../libs/document";

export const GetDocumentTool = (mcpServer: McpServer) => {
  mcpServer.tool(
    "get_document",
    "Get a document from the document manager",
    {
      slug: z.string(),
    },
    async ({ slug }) => {
      const documentManager = DocumentManager.getInstance();
      try {
        const document = await documentManager.getDocument(slug);
        return { content: [{ type: "text", text: JSON.stringify(document, null, 2) }] };
      } catch (error) {
        return { content: [{ type: "text", text: "Document not found" }] };
      }
    }
  );
};
