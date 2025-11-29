import { User } from './types/user';

/**
 * In-memory user store for hackathon demo only.
 * In production, this would be replaced with a proper database (e.g., PostgreSQL, MongoDB).
 */
const users: User[] = [];

export function findUserByEmail(email: string): User | undefined {
  return users.find(u => u.email.toLowerCase() === email.toLowerCase());
}

export function createUser(email: string, passwordHash: string, username: string, phone: string): User {
  const user: User = {
    id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    email,
    passwordHash,
    username,
    phone,
  };
  users.push(user);
  return user;
}

export function findUserById(id: string): User | undefined {
  return users.find(u => u.id === id);
}

