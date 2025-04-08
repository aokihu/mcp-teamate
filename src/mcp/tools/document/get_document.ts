/**
 * Get a document tool
 * @author aokihu <aokihu@gmail.com>
 * @license BSD-2
 * @description Get a document from the document manager
 * @version 2.0.0
 */

import { z } from "zod";
import type { FastMCP } from "fastmcp";
import { DocumentManager } from "../../../libs/document";

export const GetDocumentTool = (mcpServer: FastMCP) => {
  mcpServer.addTool({
    name: "get_document",
    description: "Get a document from the document manager",
    parameters: z.object({
      slug: z.string(),
    }),
    execute: async ({ slug }) => {
      const documentManager = DocumentManager.getInstance();
      try {
        const document = await documentManager.getDocument(slug);
        return { content: [{ type: "text", text: JSON.stringify(document, null, 2) }] };
      } catch (error) {
        return { content: [{ type: "text", text: "Document not found" }] };
      }
    },
  });
};
