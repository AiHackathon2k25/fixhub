/**
 * Migration script to add provider info to existing tickets and analysis history
 * Run this once to update existing data
 */

import { mockDB } from '../mockDB';
import { getProviderForCategory } from '../services/serviceProviderService';
import { AnalysisHistoryDocument } from '../models/AnalysisHistory';
import { TicketDocument } from '../models/Ticket';

export function migrateProviderInfo(): void {
  console.log('🔄 [Migration] Starting provider info migration...');

  const historyCollection = mockDB.collection<AnalysisHistoryDocument>('analysisHistory');
  const ticketsCollection = mockDB.collection<TicketDocument>('tickets');

  let updatedHistory = 0;
  let updatedTickets = 0;

  // Update analysis history records that have tickets but no provider info
  const allHistory = historyCollection.find({});
  allHistory.forEach((historyItem) => {
    if (historyItem.ticketId && !historyItem.providerName) {
      // Get provider based on category
      const provider = getProviderForCategory(historyItem.result.category);
      
      if (provider) {
        // Get current document to preserve all fields
        const currentDoc = historyCollection.findById(historyItem._id);
        
        if (currentDoc) {
          // Update history with all existing fields preserved
          const updateResult = historyCollection.updateOne(
            { _id: historyItem._id },
            {
              ...currentDoc, // Preserve all existing fields
              providerId: provider._id,
              providerName: provider.name,
              providerEmail: provider.email,
              providerCompany: provider.company,
              providerCategory: provider.category,
            }
          );
          
          if (updateResult) {
            updatedHistory++;
            console.log(`  ✅ Updated history ${historyItem._id.substring(0, 20)}... with provider: ${provider.name}`);
          }
        }
      }
    }
  });

  // Update tickets that don't have provider info
  const allTickets = ticketsCollection.find({});
  allTickets.forEach((ticket) => {
    if (!ticket.providerName && ticket.analysis) {
      const provider = getProviderForCategory(ticket.analysis.category);
      
      if (provider) {
        // Get current document to preserve all fields
        const currentDoc = ticketsCollection.findById(ticket._id);
        
        if (currentDoc) {
          const updateResult = ticketsCollection.updateOne(
            { _id: ticket._id },
            {
              ...currentDoc, // Preserve all existing fields
              providerId: provider._id,
              providerName: provider.name,
              providerEmail: provider.email,
              providerCompany: provider.company,
              providerCategory: provider.category,
              status: 'assigned',
            }
          );
          
          if (updateResult) {
            updatedTickets++;
            console.log(`  ✅ Updated ticket ${ticket._id.substring(0, 20)}... with provider: ${provider.name}`);
          }
        }
      }
    }
  });

  console.log(`✅ [Migration] Complete! Updated ${updatedHistory} history records and ${updatedTickets} tickets`);
}

