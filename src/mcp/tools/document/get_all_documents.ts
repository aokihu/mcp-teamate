/**
 * Get all documents records tool
 * @author aokihu <aokihu@gmail.com>
 * @license BSD-2
 * @description Get all documents records from the document manager
 * @version 2.0.0
 */

import type { FastMCP } from "fastmcp";
import { DocumentManager } from "../../../libs/document";
import { z } from "zod";

export const GetAllDocumentsTool = (mcpServer: FastMCP) => {
  mcpServer.addTool({
    name: "get_all_documents",
    description: "Get all documents records from the document manager",
    parameters: z.object({}),
    execute: async () => {
      const documentManager = DocumentManager.getInstance();
      const documents = await documentManager.getAllDocuments();
      return { content: [{ type: "text", text: JSON.stringify(documents, null, 2) }] };
    },
  });
};
