/**
 * Delete a document tool
 * @author aokihu <aokihu@gmail.com>
 * @license BSD-2
 * @description Delete a document from the document manager
 */

import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { DocumentManager } from "../../../libs/document";

export const DeleteDocumentTool = (mcpServer: McpServer) => {
  mcpServer.tool(
    "Delete Document",
    "Delete a document from the document manager. You must provide the secret key to access the document.",
    {
      slug: z.string(),
      secretKey: z.string(),
    },
    async ({ slug, secretKey }) => {
      const documentManager = DocumentManager.getInstance();
      try {
        await documentManager.deleteDocument(slug, secretKey);
        return { content: [{ type: "text", text: "Document deleted successfully" }] };
      } catch (error) {
        return { content: [{ type: "text", text: "Document deletion failed" }] };
      }
    }
  );
};
