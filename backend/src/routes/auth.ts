import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { findUserByEmail, createUser, findUserById } from '../userStore';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';
import { UserResponse } from '../types/user';

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-dev';
const JWT_EXPIRES_IN = '1d';

// Validation schemas
const signupSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  username: z.string().min(2, 'Username must be at least 2 characters'),
  phone: z.string().min(8, 'Phone number must be at least 8 characters'),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

// POST /api/auth/signup
router.post('/signup', async (req: Request, res: Response) => {
  try {
    // Validate input
    const validation = signupSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: validation.error.issues 
      });
    }

    const { email, password, username, phone } = validation.data;

    // Check if user already exists
    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const user = createUser(email, passwordHash, username, phone);

    // Generate JWT
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    // Return response
    const userResponse: UserResponse = {
      id: user.id,
      email: user.email,
      username: user.username,
      phone: user.phone,
    };

    return res.status(201).json({
      token,
      user: userResponse,
    });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
  try {
    // Validate input
    const validation = loginSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: validation.error.issues 
      });
    }

    const { email, password } = validation.data;

    // Find user
    const user = findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    // Return response
    const userResponse: UserResponse = {
      id: user.id,
      email: user.email,
      username: user.username,
      phone: user.phone,
    };

    return res.status(200).json({
      token,
      user: userResponse,
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/auth/me (protected)
router.get('/me', authMiddleware, (req: AuthRequest, res: Response) => {
  return res.json({ user: req.user });
});

export default router;

