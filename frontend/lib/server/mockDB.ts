/**
 * Mock MongoDB-style database with file persistence for Next.js
 * Note: For Vercel deployment, consider using Vercel KV or a real database
 * This version works for local development and testing
 */

import * as fs from 'fs';
import * as path from 'path';

interface Document {
  _id: string;
  [key: string]: any;
}

const DATA_DIR = path.join(process.cwd(), 'data');

class Collection<T extends Document> {
  private documents: Map<string, T>;
  public name: string;
  private filePath: string;

  constructor(name: string) {
    this.name = name;
    this.documents = new Map();
    this.filePath = path.join(DATA_DIR, `${name}.json`);
    this.loadFromFile();
  }

  private loadFromFile(): void {
    try {
      if (fs.existsSync(this.filePath)) {
        const data = fs.readFileSync(this.filePath, 'utf-8');
        const docs: T[] = JSON.parse(data);
        docs.forEach(doc => {
          this.documents.set(doc._id, doc);
        });
      }
    } catch (error) {
      console.error(`Error loading ${this.name}.json:`, error);
    }
  }

  private saveToFile(): void {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      const docs = Array.from(this.documents.values());
      fs.writeFileSync(this.filePath, JSON.stringify(docs, null, 2), 'utf-8');
    } catch (error) {
      console.error(`Error saving ${this.name}.json:`, error);
    }
  }

  insertOne(doc: Omit<T, '_id'>): T {
    const _id = `${this.name}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newDoc = { ...doc, _id } as T;
    this.documents.set(_id, newDoc);
    this.saveToFile();
    return newDoc;
  }

  find(query: Partial<T> = {}): T[] {
    const results: T[] = [];
    this.documents.forEach((doc) => {
      if (this.matchesQuery(doc, query)) {
        results.push({ ...doc });
      }
    });
    return results;
  }

  findOne(query: Partial<T>): T | null {
    for (const doc of this.documents.values()) {
      if (this.matchesQuery(doc, query)) {
        return { ...doc };
      }
    }
    return null;
  }

  findById(id: string): T | null {
    const doc = this.documents.get(id);
    return doc ? { ...doc } : null;
  }

  updateOne(query: Partial<T>, update: Partial<T>): boolean {
    for (const [id, doc] of this.documents.entries()) {
      if (this.matchesQuery(doc, query)) {
        const updated = { ...doc, ...update, _id: id };
        this.documents.set(id, updated);
        this.saveToFile();
        return true;
      }
    }
    return false;
  }

  deleteOne(query: Partial<T>): boolean {
    for (const [id, doc] of this.documents.entries()) {
      if (this.matchesQuery(doc, query)) {
        this.documents.delete(id);
        this.saveToFile();
        return true;
      }
    }
    return false;
  }

  deleteMany(query: Partial<T> = {}): number {
    let count = 0;
    const toDelete: string[] = [];
    this.documents.forEach((doc, id) => {
      if (this.matchesQuery(doc, query)) {
        toDelete.push(id);
        count++;
      }
    });
    toDelete.forEach(id => this.documents.delete(id));
    if (count > 0) this.saveToFile();
    return count;
  }

  countDocuments(query: Partial<T> = {}): number {
    let count = 0;
    this.documents.forEach((doc) => {
      if (this.matchesQuery(doc, query)) count++;
    });
    return count;
  }

  private matchesQuery(doc: T, query: Partial<T>): boolean {
    for (const key in query) {
      if (doc[key] !== query[key]) return false;
    }
    return true;
  }
}

class MockDatabase {
  private collections: Map<string, Collection<any>>;
  public connected: boolean;

  constructor() {
    this.collections = new Map();
    this.connected = true;
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  }

  collection<T extends Document>(name: string): Collection<T> {
    if (!this.collections.has(name)) {
      const collection = new Collection<T>(name);
      this.collections.set(name, collection);
    }
    return this.collections.get(name)!;
  }
}

export const mockDB = new MockDatabase();
export type { Document, Collection };
export { MockDatabase };

