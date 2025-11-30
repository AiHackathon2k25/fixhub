import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth';
import analyzeRouter from './routes/analyze';
import ticketsRouter from './routes/tickets';
import debugRouter from './routes/debug';
import historyRouter from './routes/history';
import uploadSessionRouter from './routes/uploadSession';
import { initializeServiceProviders } from './services/serviceProviderService';
import { migrateProviderInfo } from './scripts/migrateProviderInfo';

const app = express();
const PORT = process.env.PORT || 4000;

// Log environment status
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.warn('⚠️  WARNING: JWT_SECRET not set. Using fallback (not secure for production)');
} else {
  console.log('✅ JWT_SECRET loaded from environment');
}

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.warn('⚠️  WARNING: GEMINI_API_KEY not set. AI analysis will use mock fallback.');
} else {
  console.log('✅ GEMINI_API_KEY loaded from environment');
}

const CLOUDINARY_CONFIGURED = !!(
  process.env.CLOUDINARY_CLOUD_NAME && 
  process.env.CLOUDINARY_API_KEY && 
  process.env.CLOUDINARY_API_SECRET
);
if (!CLOUDINARY_CONFIGURED) {
  console.warn('⚠️  WARNING: Cloudinary not configured. Images will not be stored.');
  console.warn('   Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET to .env');
} else {
  console.log('✅ Cloudinary configured - images will be stored in cloud');
}

// Middleware
// CORS configuration - allow requests from localhost and Vercel
const allowedOrigins = [
  'http://localhost:3000',
  'https://fixhub-gilt.vercel.app',
  // Add more Vercel preview URLs if needed
  process.env.FRONTEND_URL,
].filter(Boolean) as string[]; // Remove undefined values

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        // Also allow any Vercel preview deployment
        if (origin.includes('.vercel.app')) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      }
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false, // We are not using cookies for now
  })
);

// Handle preflight requests explicitly
app.options('*', cors());

app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api', analyzeRouter);
app.use('/api', ticketsRouter);
app.use('/api/debug', debugRouter);
app.use('/api/history', historyRouter);
app.use('/api/upload-session', uploadSessionRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Initialize service providers
initializeServiceProviders();

// Migrate existing data to include provider info
migrateProviderInfo();

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend server running on http://localhost:${PORT}`);
  console.log('📍 Endpoints:');
  console.log('   POST /api/auth/signup');
  console.log('   POST /api/auth/login');
  console.log('   GET  /api/auth/me (protected)');
  console.log('   POST /api/analyze (protected)');
  console.log('   POST /api/tickets (protected)');
  console.log('   GET  /api/tickets (protected)');
});

