/**
 * Mock MongoDB-style database with file persistence
 * Simulates MongoDB API without requiring actual MongoDB installation
 * Data persists to JSON files
 * Can be easily replaced with real MongoDB later
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

  // Load data from JSON file
  private loadFromFile(): void {
    try {
      if (fs.existsSync(this.filePath)) {
        const data = fs.readFileSync(this.filePath, 'utf-8');
        const docs: T[] = JSON.parse(data);
        docs.forEach(doc => {
          this.documents.set(doc._id, doc);
        });
        console.log(`📂 [MockDB] Loaded ${docs.length} documents from ${this.name}.json`);
      }
    } catch (error) {
      console.error(`❌ [MockDB] Error loading ${this.name}.json:`, error);
    }
  }

  // Save data to JSON file
  private saveToFile(): void {
    try {
      // Ensure data directory exists
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      const docs = Array.from(this.documents.values());
      fs.writeFileSync(this.filePath, JSON.stringify(docs, null, 2), 'utf-8');
    } catch (error) {
      console.error(`❌ [MockDB] Error saving ${this.name}.json:`, error);
    }
  }

  // MongoDB-like insert
  insertOne(doc: Omit<T, '_id'>): T {
    const _id = `${this.name}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newDoc = { ...doc, _id } as T;
    this.documents.set(_id, newDoc);
    this.saveToFile(); // Auto-save
    return newDoc;
  }

  // MongoDB-like find (returns array)
  find(query: Partial<T> = {}): T[] {
    const results: T[] = [];
    
    this.documents.forEach((doc) => {
      if (this.matchesQuery(doc, query)) {
        results.push({ ...doc });
      }
    });
    
    return results;
  }

  // MongoDB-like findOne (returns single doc or null)
  findOne(query: Partial<T>): T | null {
    for (const doc of this.documents.values()) {
      if (this.matchesQuery(doc, query)) {
        return { ...doc };
      }
    }
    return null;
  }

  // MongoDB-like findById
  findById(id: string): T | null {
    const doc = this.documents.get(id);
    return doc ? { ...doc } : null;
  }

  // MongoDB-like updateOne
  updateOne(query: Partial<T>, update: Partial<T>): boolean {
    for (const [id, doc] of this.documents.entries()) {
      if (this.matchesQuery(doc, query)) {
        const updated = { ...doc, ...update, _id: id };
        this.documents.set(id, updated);
        this.saveToFile(); // Auto-save
        return true;
      }
    }
    return false;
  }

  // MongoDB-like deleteOne
  deleteOne(query: Partial<T>): boolean {
    for (const [id, doc] of this.documents.entries()) {
      if (this.matchesQuery(doc, query)) {
        this.documents.delete(id);
        this.saveToFile(); // Auto-save
        return true;
      }
    }
    return false;
  }

  // MongoDB-like deleteMany
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
    if (count > 0) {
      this.saveToFile(); // Auto-save
    }
    return count;
  }

  // Count documents
  countDocuments(query: Partial<T> = {}): number {
    let count = 0;
    this.documents.forEach((doc) => {
      if (this.matchesQuery(doc, query)) {
        count++;
      }
    });
    return count;
  }

  // Helper: Check if document matches query
  private matchesQuery(doc: T, query: Partial<T>): boolean {
    for (const key in query) {
      if (doc[key] !== query[key]) {
        return false;
      }
    }
    return true;
  }

  // Get all documents (for debugging)
  findAll(): T[] {
    return Array.from(this.documents.values());
  }

  // Reload from file (useful after migrations)
  reloadFromFile(): void {
    this.documents.clear();
    this.loadFromFile();
    console.log(`🔄 [MockDB] Reloaded ${this.name} collection from file`);
  }
}

// Mock Database class (simulates MongoDB connection)
class MockDatabase {
  private collections: Map<string, Collection<any>>;
  public connected: boolean;

  constructor() {
    this.collections = new Map();
    this.connected = true;
    
    // Ensure data directory exists
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
      console.log(`📂 [MockDB] Created data directory: ${DATA_DIR}`);
    }
    
    console.log('📦 [MockDB] Mock MongoDB initialized with file persistence');
  }

  // Get or create collection (MongoDB-like)
  collection<T extends Document>(name: string): Collection<T> {
    if (!this.collections.has(name)) {
      const collection = new Collection<T>(name);
      this.collections.set(name, collection);
      console.log(`📦 [MockDB] Collection '${name}' created`);
    }
    return this.collections.get(name)!;
  }

  // Get database stats
  stats() {
    const stats: any = {
      connected: this.connected,
      collections: {},
    };

    this.collections.forEach((collection, name) => {
      stats.collections[name] = collection.countDocuments();
    });

    return stats;
  }

  // Drop entire database (for testing)
  dropDatabase() {
    this.collections.clear();
    console.log('📦 [MockDB] Database dropped');
  }
}

// Singleton instance
export const mockDB = new MockDatabase();

// Export types
export type { Document, Collection };
export { MockDatabase };

