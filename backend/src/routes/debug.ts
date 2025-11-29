import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { mockDB } from '../mockDB';

const router = Router();

// GET /api/debug/storage - Check backend storage status
router.get('/storage', authMiddleware, (req, res) => {
  const dbStats = mockDB.stats();
  
  const storageInfo = {
    database: {
      connected: dbStats.connected,
      type: 'Mock MongoDB',
      description: 'MongoDB-style in-memory database',
      persistent: false,
      message: 'Resets on server restart. Replace with real MongoDB for production.',
      collections: dbStats.collections,
    },
    aiProvider: {
      name: 'Google Gemini',
      status: process.env.GEMINI_API_KEY ? 'Connected' : 'Not configured',
      model: 'gemini-2.5-flash',
      free: true,
    }
  };

  res.json(storageInfo);
});

export default router;

