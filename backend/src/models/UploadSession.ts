import { Document } from '../mockDB';

export interface UploadSessionFile {
  buffer: Buffer;
  filename: string;
  mimetype: string;
  size: number;
}

export interface UploadSession extends Document {
  _id: string;
  status: 'pending' | 'uploaded' | 'expired';
  files: UploadSessionFile[];
  description: string;
  createdAt: Date;
  expiresAt: Date;
}

export interface UploadSessionDocument extends UploadSession {
  _id: string;
}

