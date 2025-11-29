import { Document } from '../mockDB';

export interface UserDocument extends Document {
  _id: string;
  email: string;
  passwordHash: string;
  username: string;
  phone: string;
  createdAt: string;
}

