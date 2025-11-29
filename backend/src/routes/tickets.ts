import { Router, Response } from 'express';
import { z } from 'zod';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';
import { Ticket } from '../types/ticket';
import { sendTicketToZendesk } from '../zendeskStub';
import { mockDB } from '../mockDB';
import { TicketDocument } from '../models/Ticket';
import { getUserHistory } from '../services/analysisHistoryService';
import { getProviderForCategory, initializeServiceProviders } from '../services/serviceProviderService';

const router = Router();

const ticketsCollection = mockDB.collection<TicketDocument>('tickets');

// Initialize service providers on module load
initializeServiceProviders();

// Validation schema for AnalysisResult
const analysisResultSchema = z.object({
  category: z.enum(['appliance', 'plumbing', 'electronics', 'furniture', 'other', 'vvs']), // Include all categories
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
    const userId = req.userId!;

    // Find the most recent analysis for this user (link ticket to analysis)
    const userHistory = getUserHistory(userId, 1);
    const latestAnalysis = userHistory.length > 0 ? userHistory[0] : null;

    // Assign to appropriate service provider based on category
    const provider = getProviderForCategory(analysis.category);
    
    if (!provider) {
      console.error('❌ [Tickets] No service provider found for category:', analysis.category);
      console.error('   This should not happen - check service provider initialization');
      return res.status(500).json({ 
        error: 'Service provider not available for this category',
        category: analysis.category 
      });
    }
    
    console.log(`👷 [Tickets] Assigning to provider: ${provider.name} (${provider.company})`);
    console.log(`   Provider ID: ${provider._id}, Email: ${provider.email}`);

    // Create ticket in database (provider is guaranteed to exist here)
    const ticketDoc = ticketsCollection.insertOne({
      userId,
      description,
      analysis,
      analysisHistoryId: latestAnalysis?._id,
      providerId: provider._id,
      providerName: provider.name,
      providerEmail: provider.email,
      providerCompany: provider.company,
      providerCategory: provider.category,
      status: 'assigned',
      createdAt: new Date().toISOString(),
    });

    console.log(`📦 [Tickets] Ticket created: ${ticketDoc._id}`);

    // Update analysis history to link to ticket and provider
    if (latestAnalysis) {
      const historyCollection = mockDB.collection('analysisHistory');
      
      // Get current document to preserve all fields
      const currentDoc = historyCollection.findById(latestAnalysis._id);
      
      if (currentDoc) {
        const updateResult = historyCollection.updateOne(
          { _id: latestAnalysis._id },
          { 
            ...currentDoc, // Preserve all existing fields
            ticketId: ticketDoc._id,
            providerId: provider._id,
            providerName: provider.name,
            providerEmail: provider.email,
            providerCompany: provider.company,
            providerCategory: provider.category,
          }
        );
        
        if (updateResult) {
          console.log(`✅ [Tickets] Updated analysis history ${latestAnalysis._id}`);
          console.log(`   Ticket: ${ticketDoc._id}`);
          console.log(`   Provider: ${provider.name} (${provider.email})`);
          
          // Verify the update
          const updatedDoc = historyCollection.findById(latestAnalysis._id);
          if (updatedDoc?.providerName) {
            console.log(`   ✅ Verified: Provider info saved correctly`);
          } else {
            console.error(`   ❌ ERROR: Provider info not found after update!`);
          }
        } else {
          console.error(`❌ [Tickets] Failed to update analysis history ${latestAnalysis._id}`);
        }
      } else {
        console.error(`❌ [Tickets] Analysis history ${latestAnalysis._id} not found for update`);
      }
    } else {
      console.warn('⚠️  [Tickets] No latest analysis found to link ticket');
    }

    // Create ticket object for Zendesk stub
    const ticket: Ticket = {
      id: ticketDoc._id,
      userId,
      description,
      analysis,
      createdAt: new Date(ticketDoc.createdAt),
    };

    // Send to Zendesk (stub)
    await sendTicketToZendesk(ticket);

    console.log(`📦 [MockDB] Ticket created: ${ticketDoc._id} for user: ${userId}`);

    return res.status(201).json({
      success: true,
      ticketId: ticketDoc._id,
      message: 'Ticket created and sent to company (mocked)',
    });
  } catch (error) {
    console.error('Ticket creation error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/tickets (protected) - list user's tickets
router.get('/tickets', authMiddleware, (req: AuthRequest, res: Response) => {
  const userId = req.userId!;
  const userTickets = ticketsCollection.find({ userId });
  
  // Convert to Ticket format
  const tickets = userTickets.map(doc => ({
    id: doc._id,
    userId: doc.userId,
    description: doc.description,
    analysis: doc.analysis,
    createdAt: new Date(doc.createdAt),
  }));
  
  return res.json({ tickets });
});

export default router;

