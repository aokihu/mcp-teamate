/**
 * Update Document Tool
 * @author aokihu <aokihu@gmail.com>
 * @description Update a document in the document manager
 */

import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { DocumentManager } from "../../../libs/document";

export const UpdateDocumentTool = (mcpServer: McpServer) => {
  mcpServer.tool(
    "update_document",
    "Update a document in the document manager. You must provide the secret key to access the document.",
    {
      slug: z.string(),
      title: z.string(),
      content: z.string(),
      secretKey: z.string(),
      version: z.number(),
    },
    async ({ slug, title, content, secretKey, version }) => {
      const documentManager = DocumentManager.getInstance();
      try {
        await documentManager.updateDocument(slug, title, content, version, secretKey);
        return { content: [{ type: "text", text: "Document updated successfully" }] };
      } catch (error) {
        return { content: [{ type: "text", text: "Document update failed" + error }] };
      }
    }
  );
};
