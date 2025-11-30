import { Router, Response } from 'express';
import { z } from 'zod';
import multer from 'multer';
import { mockAnalysis } from '../mockAnalysis';
import { analyzeWithAI } from '../aiAnalysis';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';
import { AnalysisResult } from '../types/analysis';
import { saveAnalysis } from '../services/analysisHistoryService';
import { uploadImages, isCloudinaryConfigured } from '../services/cloudinaryService';

const router = Router();

// Configure multer for file upload (memory storage)
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit per file (increased for videos)
    files: 10, // Max 10 files
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image and video files are allowed'));
    }
  }
});

// Validation schema
const analyzeSchema = z.object({
  description: z.string().min(5, 'Description must be at least 5 characters').max(500, 'Description too long'),
});

// POST /api/analyze (protected) - now with file upload
router.post('/analyze', authMiddleware, upload.array('files', 10), async (req: AuthRequest, res: Response) => {
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
    const userId = req.userId || req.user?.id;
    
    if (!userId) {
      console.error('❌ [Analyze] No userId found in request');
      return res.status(401).json({ error: 'User not authenticated' });
    }
    
    console.log(`👤 [Analyze] Processing analysis for user: ${userId}`);
    const files = req.files as Express.Multer.File[] || [];

    let result: AnalysisResult;
    let imageUrls: string[] = [];
    const fileNames = files.map(f => f.originalname);

    // Upload images to Cloudinary if configured
    if (files.length > 0) {
      if (isCloudinaryConfigured()) {
        try {
          console.log(`📤 [Cloudinary] Uploading ${files.length} images...`);
          imageUrls = await uploadImages(
            files.map(f => ({ buffer: f.buffer, filename: f.originalname }))
          );
          console.log(`✅ [Cloudinary] ${imageUrls.length} images uploaded successfully`);
        } catch (err) {
          console.error('❌ [Cloudinary] Upload failed:', err);
          // Fallback to base64 if Cloudinary fails
          imageUrls = files.map(f => `data:${f.mimetype};base64,${f.buffer.toString('base64')}`);
          console.log(`📸 [Fallback] Using base64 previews for ${imageUrls.length} images`);
        }
      } else {
        // No Cloudinary - use base64 previews
        imageUrls = files.map(f => `data:${f.mimetype};base64,${f.buffer.toString('base64')}`);
        console.log(`📸 [Base64] Storing ${imageUrls.length} images as base64 previews`);
      }
    }

    try {
      if (process.env.GEMINI_API_KEY) {
        console.log('🤖 [FixHub] Using Google Gemini AI for analysis...');
        result = await analyzeWithAI(description);
        console.log('✅ [FixHub] AI analysis completed successfully!');
      } else {
        console.log('⚠️  [FixHub] No API key - using mock analysis');
        result = mockAnalysis(description);
      }
    } catch (err) {
      console.error('❌ [FixHub] AI analysis failed, using mockAnalysis:', err);
      result = mockAnalysis(description);
    }

    // Save analysis to mock MongoDB with image URLs
    saveAnalysis(userId, description, fileNames, imageUrls, result);

    return res.json(result);
  } catch (error) {
    console.error('Analysis error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

