/**
 * Document Manager
 * @author aokihu <aokihu@gmail.com>
 * @version 3.1.1
 * @description This module provides document management functionalities.
 *              Agents can use this module to add, delete, and search documents.
 *              Documents will be saved in the `data/documents` directory.
 *              Documents will be indexed in the `data/documents/index.json` file.
 */

import type { Document, DocumentRecord } from "~types/types";
import { join } from "path";
import { stat, mkdir, writeFile, readFile, unlink } from "node:fs/promises";
import { omits } from "./functional";

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
   * Check Document Record
   * @description Check if the document record exists
   * @param slug - The slug of the document
   * @returns {Promise<Boolean>}
   */
  private async checkDocumentRecord(slug: string): Promise<Boolean> {
    const records = await Bun.file(this.documentIndexPath).json();
    const record = records[slug];
    return record !== undefined;
  }

  /**
   * Check Document File
   * @description Check if the document file exists
   * @param slug - The slug of the document
   * @returns {Promise<Boolean>}
   */
  private async checkDocumentFile(slug: string): Promise<Boolean> {
    const file = Bun.file(join(this.documentPath, `${slug}.md`));
    return file.exists();
  }

  /**
   * Add Document
   * @description Add a document to the document manager
   * @param slug - The slug of the document
   * @param title - The title of the document
   * @param maintainer - The maintainer of the document
   * @param version - The version of the document
   * @param content - The content of the document
   * @returns {Promise<string>} return the secret key to access the document
   */
  public async addDocument(
    slug: string,
    title: string,
    maintainer: string,
    version: string,
    content: string
  ): Promise<string> {
    // check if the document record exists
    const documentRecordExists = await this.checkDocumentRecord(slug);
    if (documentRecordExists) {
      throw new Error("Document record already exists");
    }

    // check if the document file exists
    const documentFileExists = await this.checkDocumentFile(slug);
    if (documentFileExists) {
      throw new Error("Document file already exists");
    }

    // generate a secret key
    const secretKey = await Bun.password.hash(Bun.randomUUIDv7(), {
      algorithm: "bcrypt",
    });

    // create the document record
    const documentRecord: DocumentRecord = {
      slug,
      title,
      maintainer,
      version,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      secretKey,
    };

    // read the index file
    const allRecords = await Bun.file(this.documentIndexPath).json();
    allRecords[slug] = documentRecord;

    // write the document record to the index file
    await Bun.write(this.documentIndexPath, JSON.stringify(allRecords, null, 2));

    // write the document file
    await Bun.write(join(this.documentPath, `${slug}.md`), content);

    // return the secret key
    return secretKey;
  }

  /**
   * Get Document
   * @description Get a document from the document manager
   * @param slug - The slug of the document
   * @returns {Promise<string>}
   */
  public async getDocument(slug: string): Promise<Document> {
    // check if the document record exists
    const documentRecordExists = await this.checkDocumentRecord(slug);
    if (!documentRecordExists) {
      throw new Error("Document record does not exist");
    }

    // check if the document file exists
    const documentFileExists = await this.checkDocumentFile(slug);
    if (!documentFileExists) {
      throw new Error("Document file does not exist");
    }

    // get the document record
    const documentRecord = await Bun.file(this.documentIndexPath).json();
    const rawDocumentRecord = documentRecord[slug] as DocumentRecord;
    const document = omits(rawDocumentRecord, "secretKey");

    // get the document file
    const documentFile = await Bun.file(join(this.documentPath, `${slug}.md`)).text();

    // return the document file
    return {
      ...document,
      content: documentFile,
    } as Document;
  }

  /**
   * Get All Documents
   * @description Get all documents from the document manager
   * @returns {Promise<string[]>}
   */
  public async getAllDocuments(): Promise<Document[]> {
    const records = await Bun.file(this.documentIndexPath).json();
    return Object.values(records).map((record) => omits(record, "secretKey")) as Document[];
  }

  /**
   * Delete Document
   * @description Delete a document from the document manager
   * @param slug - The slug of the document
   * @returns {Promise<void>}
   */
  public async deleteDocument(slug: string, secretKey: string): Promise<void> {
    // check if the document record exists
    const documentRecordExists = await this.checkDocumentRecord(slug);
    if (!documentRecordExists) {
      throw new Error("Document record does not exist");
    }

    // check if the secret key is correct
    const documentRecord = await Bun.file(this.documentIndexPath).json();
    const rawDocumentRecord = documentRecord[slug] as DocumentRecord;
    if (rawDocumentRecord.secretKey !== secretKey) {
      throw new Error("Invalid secret key");
    }

    // delete the record
    const records = await Bun.file(this.documentIndexPath).json();
    delete records[slug];
    await Bun.write(this.documentIndexPath, JSON.stringify(records, null, 2));

    // delete the document file
    const documentName = `${slug}.md`;
    const documentPath = join(this.documentPath, documentName);
    await Bun.file(documentPath).delete();
  }

  /**
   * Update Document
   * @description Update a document from the document manager
   * @param slug - The slug of the document
   * @param document - The document to update
   * @param version - The version of the document
   * @param secretKey - The secret key of the document
   * @returns {Promise<void>}
   */
  public async updateDocument(slug: string, document: string, version: string, secretKey: string): Promise<void> {
    // check if the document record exists
    const documentRecordExists = await this.checkDocumentRecord(slug);
    if (!documentRecordExists) {
      throw new Error("Document record does not exist");
    }

    // check if the secret key is correct
    const documentRecord = await Bun.file(this.documentIndexPath).json();
    const rawDocumentRecord = documentRecord[slug] as DocumentRecord;
    if (rawDocumentRecord.secretKey !== secretKey) {
      throw new Error("Invalid secret key");
    }

    // update the document record
    rawDocumentRecord.version = version;
    rawDocumentRecord.updatedAt = Date.now();

    // update the document file
    const documentName = `${slug}.md`;
    const documentPath = join(this.documentPath, documentName);
    await Bun.write(documentPath, document);

    // update the document record
    await Bun.write(this.documentIndexPath, JSON.stringify(documentRecord, null, 2));
  }
}
