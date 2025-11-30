import { Router, Response } from 'express';
import multer from 'multer';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';
import {
  createSession,
  getSession,
  updateSession,
  cleanExpiredSessions,
} from '../services/uploadSessionService';

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
  },
});

/**
 * POST /api/upload-session/create
 * Create a new upload session (protected, for desktop users)
 */
router.post('/create', authMiddleware, (req: AuthRequest, res: Response) => {
  try {
    // Clean up old sessions periodically
    cleanExpiredSessions();

    const session = createSession();
    
    return res.json({
      sessionId: session._id,
      expiresAt: session.expiresAt,
    });
  } catch (error) {
    console.error('❌ [UploadSession] Error creating session:', error);
    return res.status(500).json({ error: 'Failed to create upload session' });
  }
});

/**
 * GET /api/upload-session/:id
 * Get session status (for polling from desktop)
 */
router.get('/:id', authMiddleware, (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const session = getSession(id);

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Don't send file buffers in status check, just metadata
    const sessionStatus = {
      sessionId: session._id,
      status: session.status,
      fileCount: session.files.length,
      description: session.description,
      expiresAt: session.expiresAt,
    };

    return res.json(sessionStatus);
  } catch (error) {
    console.error('❌ [UploadSession] Error getting session:', error);
    return res.status(500).json({ error: 'Failed to get session status' });
  }
});

/**
 * POST /api/upload-session/:id/upload
 * Upload files to a session (from mobile device)
 * No auth required - session ID is the security token
 */
router.post('/:id/upload', upload.array('files', 10), async (req, res: Response) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const files = req.files as Express.Multer.File[] || [];

    if (files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    if (!description || description.trim().length < 5) {
      return res.status(400).json({ error: 'Description must be at least 5 characters' });
    }

    // Check if session exists and is valid
    const session = getSession(id);
    if (!session) {
      return res.status(404).json({ error: 'Session not found or expired' });
    }

    if (session.status === 'expired') {
      return res.status(400).json({ error: 'Session has expired' });
    }

    if (session.status === 'uploaded') {
      return res.status(400).json({ error: 'Session already has files uploaded' });
    }

    // Convert files to the format we need
    const sessionFiles = files.map(file => ({
      buffer: file.buffer,
      filename: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
    }));

    // Update session with files and description
    const updated = updateSession(id, sessionFiles, description);

    if (!updated) {
      return res.status(500).json({ error: 'Failed to update session' });
    }

    return res.json({
      success: true,
      message: 'Files uploaded successfully',
      fileCount: files.length,
    });
  } catch (error) {
    console.error('❌ [UploadSession] Error uploading files:', error);
    return res.status(500).json({ error: 'Failed to upload files' });
  }
});

/**
 * GET /api/upload-session/:id/files
 * Retrieve uploaded files from session (for desktop to process)
 */
router.get('/:id/files', authMiddleware, (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const session = getSession(id);

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    if (session.status !== 'uploaded') {
      return res.status(400).json({ error: 'No files uploaded yet' });
    }

    // Return files and description for processing
    return res.json({
      files: session.files,
      description: session.description,
    });
  } catch (error) {
    console.error('❌ [UploadSession] Error retrieving files:', error);
    return res.status(500).json({ error: 'Failed to retrieve files' });
  }
});

export default router;

