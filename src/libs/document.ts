/**
 * Document Manager
 * @author aokihu <aokihu@gmail.com>
 * @version 3.1.1
 * @description This module provides document management functionalities.
 *              Agents can use this module to add, delete, and search documents.
 *              Documents will be saved in the `data/documents` directory.
 *              Documents will be indexed in the `data/documents/index.json` file.
 */

import { join } from "path";
import { stat, mkdir, writeFile, readFile, unlink } from "node:fs/promises";
import { z } from "zod";

export class DocumentManager {
  private static instance: DocumentManager;
  private documentPath: string;
  private documentIndexPath: string;

  /**
   * Initialize
   * @description Initialize the document manager
   * @returns {Promise<void>}
   */
  public static async initialize() {
    // Check if the `data/documents` directory exists
    const documentsDir = join(process.cwd(), "data/documents");
    const documentsDirExists = await stat(documentsDir).catch(() => false);
    if (!documentsDirExists) {
      await mkdir(documentsDir, { recursive: true });
    }

    // Check if the `data/documents/index.json` file exists
    const indexFile = join(documentsDir, "index.json");
    const indexFileExists = await stat(indexFile).catch(() => false);
    if (!indexFileExists) {
      await writeFile(indexFile, JSON.stringify({}, null, 2));
    }
  }

  public static getInstance(): DocumentManager {
    if (!this.instance) {
      this.instance = new DocumentManager();
    }

    return this.instance;
  }

  public constructor() {
    this.documentPath = join(process.cwd(), "data/documents");
    this.documentIndexPath = join(this.documentPath, "index.json");
  }

  /**
   * Add Document
   * @description Add a document to the document manager
   * @param slug - The slug of the document
   * @param document - The document to add
   * @returns {Promise<void>}
   */
  public async addDocument(slug: string, document: string): Promise<void> {
    const documentName = `${slug}.md`;
    const documentPath = join(this.documentPath, documentName);
    await writeFile(documentPath, document);

    // Update the index file
    const indexFile = await readFile(this.documentIndexPath, "utf-8");
    const index = JSON.parse(indexFile);
    index[slug] = documentName;
    await writeFile(this.documentIndexPath, JSON.stringify(index, null, 2));
  }

  /**
   * Get Document
   * @description Get a document from the document manager
   * @param slug - The slug of the document
   * @returns {Promise<string>}
   */
  public async getDocument(slug: string): Promise<string> {
    const documentName = `${slug}.md`;
    const documentPath = join(this.documentPath, documentName);
    const document = await readFile(documentPath, "utf-8");
    return document;
  }

  /**
   * Get All Documents
   * @description Get all documents from the document manager
   * @returns {Promise<string[]>}
   */
  public async getAllDocuments(): Promise<string[]> {
    const indexFile = await readFile(this.documentIndexPath, "utf-8");
    const index = JSON.parse(indexFile);
    return Object.keys(index);
  }

  /**
   * Delete Document
   * @description Delete a document from the document manager
   * @param slug - The slug of the document
   * @returns {Promise<void>}
   */
  public async deleteDocument(slug: string): Promise<void> {
    const documentName = `${slug}.md`;
    const documentPath = join(this.documentPath, documentName);
    await unlink(documentPath);
  }

  /**
   * Update Document
   * @description Update a document from the document manager
   * @param slug - The slug of the document
   * @param document - The document to update
   * @returns {Promise<void>}
   */
  public async updateDocument(slug: string, document: string): Promise<void> {
    const documentName = `${slug}.md`;
    const documentPath = join(this.documentPath, documentName);
    await writeFile(documentPath, document);
  }
}
