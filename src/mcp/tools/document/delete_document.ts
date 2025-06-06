/**
 * Delete a document tool
 * @author aokihu <aokihu@gmail.com>
 * @license BSD-2
 * @description Delete a document from the document manager
 * @version 2.0.0
 */

import { z } from "zod";
import type { FastMCP } from "fastmcp";
import { DocumentManager } from "../../../libs/document";

export const DeleteDocumentTool = (mcpServer: FastMCP) => {
  mcpServer.addTool({
    name: "delete_document",
    description: "Delete a document from the document manager. You must provide the secret key to access the document.",
    parameters: z.object({
      slug: z.string(),
      secretKey: z.string(),
    }),
    execute: async ({ slug, secretKey }) => {
      const documentManager = DocumentManager.getInstance();
      try {
        await documentManager.deleteDocument(slug, secretKey);
        return { content: [{ type: "text", text: "Document deleted successfully" }] };
      } catch (error) {
        return { content: [{ type: "text", text: "Document deletion failed" }] };
      }
    },
  });
};
