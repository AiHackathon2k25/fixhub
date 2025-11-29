import { User } from './types/user';
import bcrypt from 'bcryptjs';
import { mockDB } from './mockDB';
import { UserDocument } from './models/User';

/**
 * User store using Mock MongoDB
 * Can be easily replaced with real MongoDB by changing the mockDB import
 */

const usersCollection = mockDB.collection<UserDocument>('users');

// Create default test user
const defaultPasswordHash = bcrypt.hashSync('test123', 10);

const existingUser = usersCollection.findOne({ email: 'test@fixhub.com' });
if (!existingUser) {
  usersCollection.insertOne({
    email: 'test@fixhub.com',
    passwordHash: defaultPasswordHash,
    username: 'Test User',
    phone: '+45 12345678',
    createdAt: new Date().toISOString(),
  });
  console.log('📦 [MockDB] Default user created: test@fixhub.com');
}

export function findUserByEmail(email: string): User | undefined {
  const doc = usersCollection.findOne({ email: email.toLowerCase() });
  if (!doc) return undefined;
  
  return {
    id: doc._id,
    email: doc.email,
    passwordHash: doc.passwordHash,
    username: doc.username,
    phone: doc.phone,
  };
}

export function createUser(email: string, passwordHash: string, username: string, phone: string): User {
  const doc = usersCollection.insertOne({
    email: email.toLowerCase(),
    passwordHash,
    username,
    phone,
    createdAt: new Date().toISOString(),
  });
  
  console.log(`📦 [MockDB] User created: ${email}`);
  
  return {
    id: doc._id,
    email: doc.email,
    passwordHash: doc.passwordHash,
    username: doc.username,
    phone: doc.phone,
  };
}

export function findUserById(id: string): User | undefined {
  const doc = usersCollection.findById(id);
  if (!doc) return undefined;
  
  return {
    id: doc._id,
    email: doc.email,
    passwordHash: doc.passwordHash,
    username: doc.username,
    phone: doc.phone,
  };
}

