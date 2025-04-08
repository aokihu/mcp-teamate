/**
 * Add new document to the document manager
 * @author aokihu <aokihu@gmail.com>
 * @license BSD-2
 * @description Add new document to the document manager
 * @version 2.0.0
 */

import { z } from "zod";
import type { FastMCP } from "fastmcp";
import { DocumentManager } from "../../../libs/document";

export const AddDocumentTool = (mcpServer: FastMCP) => {
  mcpServer.addTool({
    name: "add_document",
    description:
      "Add new document to the document manager. It will return a secret key to access the document, you must keep it safe. You can store it in your memory or in a safe place.",
    parameters: z.object({
      slug: z.string(),
      title: z.string(),
      content: z.string(),
      maintainer: z.string(),
      version: z.string(),
    }),
    execute: async ({ slug, title, content, maintainer, version }) => {
      const documentManager = DocumentManager.getInstance();
      const secretKey = await documentManager.addDocument(slug, title, maintainer, version, content);
      return {
        content: [
          {
            type: "text",
            text:
              "Document added successfully. You should keep the secret key in your memory or in a safe place. Secret key: " +
              secretKey,
          },
        ],
      };
    },
  });
};
