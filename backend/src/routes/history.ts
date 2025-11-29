import { Router, Response } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';
import {
  getUserHistory,
  deleteAnalysis,
  clearUserHistory,
} from '../services/analysisHistoryService';
import { mockDB } from '../mockDB';

const router = Router();

// GET /api/history - Get user's analysis history
router.get('/', authMiddleware, (req: AuthRequest, res: Response) => {
  const userId = req.userId!;
  
  try {
    // Reload collection from file to get latest data (including migration updates)
    const historyCollection = mockDB.collection<any>('analysisHistory');
    if (historyCollection && typeof (historyCollection as any).reloadFromFile === 'function') {
      (historyCollection as any).reloadFromFile();
    }
    
    // Get fresh history data
    const history = getUserHistory(userId);
    
    // Debug logging with provider details
    console.log(`📊 [History] Returning ${history.length} items for user: ${userId}`);
    history.forEach((item, index) => {
      const providerInfo = item.providerName 
        ? `${item.providerName} (${item.providerCompany || 'no company'}, ${item.providerCategory || 'no category'})`
        : 'none';
      console.log(`  [${index}] ID: ${item._id.substring(0, 20)}..., Ticket: ${item.ticketId || 'none'}, Provider: ${providerInfo}`);
    });
    
    return res.json({ success: true, data: history });
  } catch (error) {
    console.error('[History] Error fetching history:', error);
    return res.status(500).json({ error: 'Failed to fetch history' });
  }
});

// DELETE /api/history/:id - Delete a specific analysis
router.delete('/:id', authMiddleware, (req: AuthRequest, res: Response) => {
  const userId = req.userId!;
  const analysisId = req.params.id;
  
  try {
    const deleted = deleteAnalysis(userId, analysisId);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Analysis not found or unauthorized' });
    }
    
    return res.json({ success: true, message: 'Analysis deleted' });
  } catch (error) {
    console.error('[History] Error deleting analysis:', error);
    return res.status(500).json({ error: 'Failed to delete analysis' });
  }
});

// DELETE /api/history - Clear all user's history
router.delete('/', authMiddleware, (req: AuthRequest, res: Response) => {
  const userId = req.userId!;
  
  try {
    const count = clearUserHistory(userId);
    return res.json({ success: true, message: `Deleted ${count} analyses` });
  } catch (error) {
    console.error('[History] Error clearing history:', error);
    return res.status(500).json({ error: 'Failed to clear history' });
  }
});

export default router;

