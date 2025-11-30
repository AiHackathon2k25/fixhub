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

// CORS configuration
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allow requests with no origin (like mobile apps, Postman, or server-to-server)
    if (!origin) {
      return callback(null, true);
    }
    
    // Check if origin is in allowed list
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // Allow any Vercel deployment (production or preview)
    if (origin.includes('.vercel.app')) {
      return callback(null, true);
    }
    
    // Reject other origins
    console.warn(`⚠️  CORS: Blocked origin: ${origin}`);
    callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false,
  optionsSuccessStatus: 200, // Some legacy browsers (IE11) choke on 204
};

app.use(cors(corsOptions));

// Handle preflight requests explicitly for all routes
app.options('*', cors(corsOptions));

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
<<<<<<< HEAD
const server = app.listen(PORT, () => {
  console.log(`✅ Backend server running on http://localhost:${PORT}`);
=======
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Backend server running on port ${PORT}`);
  console.log(`🌐 Server accessible at: http://0.0.0.0:${PORT}`);
  console.log(`📋 Allowed CORS origins: ${allowedOrigins.join(', ')}`);
>>>>>>> d3e4fdb54f63a5644688415307bdc5786787a8fc
  console.log('📍 Endpoints:');
  console.log('   GET  /health');
  console.log('   POST /api/auth/signup');
  console.log('   POST /api/auth/login');
  console.log('   GET  /api/auth/me (protected)');
  console.log('   POST /api/analyze (protected)');
  console.log('   POST /api/tickets (protected)');
  console.log('   GET  /api/tickets (protected)');
  console.log('   POST /api/upload-session/create (protected)');
  console.log('   GET  /api/upload-session/:id (protected)');
  console.log('   POST /api/upload-session/:id/upload');
});

server.on('error', (error: NodeJS.ErrnoException) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`\n❌ Error: Port ${PORT} is already in use!\n`);
    console.error('💡 Solutions:');
    console.error(`   1. Kill the process using port ${PORT}:`);
    console.error(`      PowerShell: Get-NetTCPConnection -LocalPort ${PORT} | Select-Object -ExpandProperty OwningProcess | ForEach-Object { Stop-Process -Id $_ -Force }`);
    console.error(`      CMD: netstat -ano | findstr :${PORT} (then use taskkill /PID <pid> /F)`);
    console.error(`   2. Use a different port by setting PORT in your .env file`);
    console.error(`   3. Check if another instance of the server is running\n`);
    process.exit(1);
  } else {
    console.error('❌ Server error:', error);
    process.exit(1);
  }
});

