import { Document } from '../mockDB';

export interface ServiceProviderDocument extends Document {
  _id: string;
  name: string;
  category: 'plumbing' | 'electronics' | 'appliance' | 'furniture' | 'other';
  email: string;
  phone: string;
  company: string;
  specialties: string[];
  isActive: boolean;
  createdAt: string;
}

