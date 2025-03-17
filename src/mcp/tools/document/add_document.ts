/**
 * Add new document to the document manager
 * @author aokihu <aokihu@gmail.com>
 * @license BSD-2
 * @description Add new document to the document manager
 */

import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { DocumentManager } from "../../../libs/document";

export const AddDocumentTool = (mcpServer: McpServer) => {
  mcpServer.tool(
    "add_document",
    "Add new document to the document manager. It will return a secret key to access the document, you must keep it safe. You can store it in your memory or in a safe place.",
    {
      slug: z.string(),
      title: z.string(),
      content: z.string(),
      maintainer: z.string(),
      version: z.string(),
    },
    async ({ slug, title, content, maintainer, version }) => {
      const documentManager = DocumentManager.getInstance();
      const secretKey = await documentManager.addDocument(slug, title, maintainer, version, content);
      return { content: [{ type: "text", text: "Document added successfully. Secret key: " + secretKey }] };
    }
  );
};
