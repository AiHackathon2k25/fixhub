import { mockDB } from '../mockDB';
import { UploadSession, UploadSessionFile } from '../models/UploadSession';
import * as crypto from 'crypto';

const UPLOAD_SESSIONS_COLLECTION = 'uploadSessions';
const SESSION_EXPIRY_MS = 10 * 60 * 1000; // 10 minutes

/**
 * Generate a secure random session ID
 */
function generateSessionId(): string {
  return crypto.randomBytes(16).toString('hex');
}

/**
 * Create a new upload session
 */
export function createSession(): UploadSession {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + SESSION_EXPIRY_MS);
  const sessionId = generateSessionId();

  const session: Omit<UploadSession, '_id'> = {
    status: 'pending',
    files: [],
    description: '',
    createdAt: now,
    expiresAt: expiresAt,
  };

  const collection = mockDB.collection<UploadSession>(UPLOAD_SESSIONS_COLLECTION);
  
  // Insert and get the created document
  const insertedSession = collection.insertOne(session);
  
  // Update with our custom session ID
  collection.updateOne({ _id: insertedSession._id }, { _id: sessionId });
  
  const newSession = {
    ...session,
    _id: sessionId,
  } as UploadSession;
  
  console.log(`📱 [UploadSession] Created new session: ${sessionId}`);
  
  return newSession;
}

/**
 * Get session by ID
 */
export function getSession(sessionId: string): UploadSession | null {
  const collection = mockDB.collection<UploadSession>(UPLOAD_SESSIONS_COLLECTION);
  const session = collection.findById(sessionId);

  if (!session) {
    return null;
  }

  // Check if expired
  if (new Date() > new Date(session.expiresAt)) {
    session.status = 'expired';
    collection.updateOne({ _id: sessionId }, { status: 'expired' });
    console.log(`⏰ [UploadSession] Session expired: ${sessionId}`);
  }

  return session;
}

/**
 * Update session with uploaded files and description
 */
export function updateSession(
  sessionId: string,
  files: UploadSessionFile[],
  description: string
): boolean {
  const collection = mockDB.collection<UploadSession>(UPLOAD_SESSIONS_COLLECTION);
  const session = getSession(sessionId);

  if (!session) {
    console.error(`❌ [UploadSession] Session not found: ${sessionId}`);
    return false;
  }

  if (session.status === 'expired') {
    console.error(`❌ [UploadSession] Session expired: ${sessionId}`);
    return false;
  }

  const updated = collection.updateOne(
    { _id: sessionId },
    {
      files,
      description,
      status: 'uploaded',
    }
  );

  if (updated) {
    console.log(`✅ [UploadSession] Session updated: ${sessionId} (${files.length} files)`);
  }

  return updated;
}

/**
 * Clean up expired sessions (can be called periodically)
 */
export function cleanExpiredSessions(): number {
  const collection = mockDB.collection<UploadSession>(UPLOAD_SESSIONS_COLLECTION);
  const now = new Date();
  
  const sessions = collection.find();
  let deletedCount = 0;

  sessions.forEach((session) => {
    if (now > new Date(session.expiresAt)) {
      collection.deleteOne({ _id: session._id });
      deletedCount++;
    }
  });

  if (deletedCount > 0) {
    console.log(`🧹 [UploadSession] Cleaned up ${deletedCount} expired sessions`);
  }

  return deletedCount;
}

