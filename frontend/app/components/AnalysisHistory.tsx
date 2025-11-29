'use client';

import { useState, useEffect } from 'react';
import { apiGet, apiPost } from '@/lib/apiClient';

interface AnalysisHistoryItem {
  _id: string;
  userId: string;
  description: string;
  fileNames: string[];
  imageUrls: string[];
  result: any;
  ticketId?: string;
  providerId?: string;
  providerName?: string;
  providerEmail?: string;
  providerCompany?: string;
  providerCategory?: string;
  createdAt: string;
}

interface AnalysisHistoryProps {
  onRefresh?: number; // Trigger refresh when this changes
}

export default function AnalysisHistory({ onRefresh }: AnalysisHistoryProps) {
  const [history, setHistory] = useState<AnalysisHistoryItem[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadHistory();
  }, [onRefresh]);

  // Also reload when component mounts (on page refresh)
  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setLoading(true);
    try {
      const response = await apiGet<{ success: boolean; data: AnalysisHistoryItem[] }>('/api/history', true);
      console.log('📊 [History] Loaded history items:', response.data.length);
      response.data.forEach((item, index) => {
        console.log(`  [${index}] ID: ${item._id}, Ticket: ${item.ticketId || 'none'}, Provider: ${item.providerName || 'none'}`);
      });
      setHistory(response.data);
    } catch (error) {
      console.error('Failed to load history:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this analysis?')) {
      try {
        await fetch(`http://localhost:4000/api/history/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('fixhub_token')}`,
          },
        });
        loadHistory();
      } catch (error) {
        console.error('Failed to delete:', error);
      }
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-DK', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'minor':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'severe':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  if (history.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8 border border-slate-200 text-center">
        <div className="text-6xl mb-4">📊</div>
        <h3 className="text-lg font-semibold text-slate-800 mb-2">No Analysis History</h3>
        <p className="text-slate-600">Your analysis history will appear here after you analyze damage.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
      <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <span className="text-2xl">📜</span>
        Analysis History ({history.length})
      </h2>

      <div className="space-y-3">
        {history.map((item) => (
          <div
            key={item._id}
            className="border border-slate-200 rounded-lg p-4 hover:border-teal-300 transition-colors"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getSeverityColor(item.result.severity)}`}>
                    {item.result.severity}
                  </span>
                  <span className="px-2 py-1 rounded text-xs font-medium bg-slate-100 text-slate-700 border border-slate-300">
                    {item.result.category}
                  </span>
                  {item.ticketId && (
                    <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700 border border-blue-300 font-semibold">
                      🎫 Ticket #{item.ticketId.split('_')[1].substring(0, 10)}
                    </span>
                  )}
                  {item.providerName && (
                    <span className="px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-700 border border-purple-300">
                      👷 {item.providerName}
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-600 line-clamp-2">{item.description}</p>
                <p className="text-xs text-slate-400 mt-1">
                  {formatDate(item.createdAt)} • {item.fileNames.length} file(s)
                </p>
              </div>

              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => toggleExpand(item._id)}
                  className="text-teal-600 hover:text-teal-700 text-sm font-medium"
                >
                  {expandedId === item._id ? 'Hide' : 'View'}
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Expanded Details */}
            {expandedId === item._id && (
              <div className="mt-4 pt-4 border-t border-slate-200 space-y-3">
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 mb-1">Sub-Category:</h4>
                  <p className="text-sm text-slate-600">{item.result.subCategory}</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-700 mb-1">Estimated Cost:</h4>
                  <p className="text-sm text-slate-600">{item.result.estimatedCost}</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-700 mb-1">Recommendation:</h4>
                  <p className="text-sm text-slate-600 capitalize">{item.result.repairOrReplace}</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-700 mb-1">Insurance Summary:</h4>
                  <p className="text-sm text-slate-600">{item.result.insuranceSummary}</p>
                </div>

                {/* Display Images */}
                {item.imageUrls && item.imageUrls.length > 0 ? (
                  <div>
                    <h4 className="text-sm font-semibold text-slate-700 mb-2">Uploaded Images:</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {item.imageUrls.map((url, index) => (
                        <div key={index} className="relative group">
                          <img 
                            src={url} 
                            alt={`Damage ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg border-2 border-slate-200 hover:border-teal-400 transition-colors cursor-pointer"
                            onClick={() => window.open(url, '_blank')}
                            onError={(e) => {
                              // Fallback if image fails to load
                              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="14" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3EImage%3C/text%3E%3C/svg%3E';
                            }}
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity">
                            Click to view full size
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : item.fileNames.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-slate-700 mb-1">Uploaded Files:</h4>
                    <div className="flex flex-wrap gap-2">
                      {item.fileNames.map((fileName, index) => (
                        <span key={index} className="text-xs bg-slate-100 px-2 py-1 rounded border border-slate-200">
                          📎 {fileName}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                      💡 Tip: Add Cloudinary credentials to see images
                    </p>
                  </div>
                )}

                {/* Ticket & Provider Info */}
                {item.ticketId && (
                  <div className="mt-3 pt-3 border-t border-slate-200 space-y-2">
                    <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <span className="text-xl">🎫</span>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-blue-800">Support Ticket Created</p>
                        <p className="text-xs text-blue-600 font-mono">Ticket ID: {item.ticketId}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Service Provider Info - Always show if available */}
                {item.providerName && (
                  <div className="mt-3 pt-3 border-t border-slate-200">
                    <div className="flex items-start gap-3 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-4">
                      <span className="text-2xl">👷</span>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-purple-800 mb-2">Ticket Sent To Service Provider</p>
                        <div className="space-y-2">
                          {item.providerCompany && (
                            <div>
                              <p className="text-xs text-purple-600 font-medium uppercase tracking-wide">Company</p>
                              <p className="text-sm text-purple-700 font-semibold">🏢 {item.providerCompany}</p>
                            </div>
                          )}
                          <div>
                            <p className="text-xs text-purple-600 font-medium uppercase tracking-wide">Service Provider</p>
                            <p className="text-sm text-purple-700 font-medium">👤 {item.providerName}</p>
                          </div>
                          {item.providerCategory && (
                            <div>
                              <p className="text-xs text-purple-600 font-medium uppercase tracking-wide">Category</p>
                              <p className="text-sm text-purple-700 font-medium capitalize">🔧 {item.providerCategory}</p>
                            </div>
                          )}
                          {item.providerEmail && (
                            <div>
                              <p className="text-xs text-purple-600 font-medium uppercase tracking-wide">Contact</p>
                              <p className="text-xs text-purple-600">📧 {item.providerEmail}</p>
                            </div>
                          )}
                          <p className="text-xs text-purple-500 mt-3 pt-2 border-t border-purple-200">
                            This ticket has been automatically assigned and sent to the service provider.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

