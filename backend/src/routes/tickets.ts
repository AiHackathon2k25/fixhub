import { Router, Response } from 'express';
import { z } from 'zod';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';
import { Ticket } from '../types/ticket';
import { sendTicketToZendesk } from '../zendeskStub';

const router = Router();

/**
 * In-memory ticket store for hackathon demo only.
 * In production, this would be replaced with a proper database.
 */
const tickets: Ticket[] = [];

// Validation schema for AnalysisResult
const analysisResultSchema = z.object({
  category: z.enum(['appliance', 'vvs', 'electronics']),
  subCategory: z.string(),
  severity: z.enum(['minor', 'moderate', 'severe']),
  estimatedCost: z.string(),
  repairOrReplace: z.enum(['repair', 'replace']),
  insuranceSummary: z.string(),
});

// Validation schema for ticket creation
const createTicketSchema = z.object({
  description: z.string().min(5, 'Description must be at least 5 characters'),
  analysis: analysisResultSchema,
});

// POST /api/tickets (protected)
router.post('/tickets', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    // Validate input
    const validation = createTicketSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: validation.error.issues 
      });
    }

    const { description, analysis } = validation.data;

    // Create ticket
    const ticket: Ticket = {
      id: `ticket_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId: req.user!.id,
      description,
      analysis,
      createdAt: new Date(),
    };

    // Store ticket
    tickets.push(ticket);

    // Send to Zendesk (stub)
    await sendTicketToZendesk(ticket);

    return res.status(201).json({
      success: true,
      ticketId: ticket.id,
      message: 'Ticket created and sent to company (mocked)',
    });
  } catch (error) {
    console.error('Ticket creation error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/tickets (protected) - bonus: list user's tickets
router.get('/tickets', authMiddleware, (req: AuthRequest, res: Response) => {
  const userTickets = tickets.filter(t => t.userId === req.user!.id);
  return res.json({ tickets: userTickets });
});

export default router;

