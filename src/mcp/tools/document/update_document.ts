/**
 * Update Document Tool
 * @author aokihu <aokihu@gmail.com>
 * @license BSD-2
 * @description Update a document in the document manager
 * @version 2.0.0
 */

import { z } from "zod";
import type { FastMCP } from "fastmcp";
import { DocumentManager } from "../../../libs/document";

export const UpdateDocumentTool = (mcpServer: FastMCP) => {
  mcpServer.addTool({
    name: "update_document",
    description: "Update a document in the document manager. You must provide the secret key to access the document.",
    parameters: z.object({
      slug: z.string(),
      content: z.string(),
      secretKey: z.string(),
      version: z.string(),
    }),
    execute: async ({ slug, content, secretKey, version }) => {
      const documentManager = DocumentManager.getInstance();
      try {
        await documentManager.updateDocument(slug, content, version, secretKey);
        return { content: [{ type: "text", text: "Document updated successfully" }] };
      } catch (error) {
        return { content: [{ type: "text", text: "Document update failed" + error }] };
      }
    },
  });
};
