import { Router, Response } from 'express';
import { z } from 'zod';
import { mockAnalysis } from '../mockAnalysis';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';

const router = Router();

// Validation schema
const analyzeSchema = z.object({
  description: z.string().min(5, 'Description must be at least 5 characters').max(500, 'Description too long'),
});

// POST /api/analyze (protected)
router.post('/analyze', authMiddleware, (req: AuthRequest, res: Response) => {
  try {
    // Validate input
    const validation = analyzeSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: validation.error.issues 
      });
    }

    const { description } = validation.data;

    // Get mock analysis result
    const result = mockAnalysis(description);

    return res.json(result);
  } catch (error) {
    console.error('Analysis error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

