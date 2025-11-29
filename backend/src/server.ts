import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth';
import analyzeRouter from './routes/analyze';
import ticketsRouter from './routes/tickets';

const app = express();
const PORT = process.env.PORT || 4000;

// Log JWT_SECRET status
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.warn('⚠️  WARNING: JWT_SECRET not set. Using fallback (not secure for production)');
} else {
  console.log('✅ JWT_SECRET loaded from environment');
}

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api', analyzeRouter);
app.use('/api', ticketsRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

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

