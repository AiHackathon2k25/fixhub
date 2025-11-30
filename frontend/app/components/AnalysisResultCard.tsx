'use client';

import { AnalysisResult } from '@/lib/types';

interface AnalysisResultCardProps {
  result: AnalysisResult;
  onOpenClaim: () => void;
  onSendTicket: () => void;
  isSendingTicket?: boolean;
}

export default function AnalysisResultCard({ result, onOpenClaim, onSendTicket, isSendingTicket = false }: AnalysisResultCardProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'minor':
        return 'badge badge-success';
      case 'moderate':
        return 'badge badge-warning';
      case 'severe':
        return 'badge badge-error';
      default:
        return 'badge bg-slate-100 text-slate-700';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'badge badge-success';
      case 'medium':
        return 'badge badge-warning';
      case 'hard':
        return 'badge badge-error';
      default:
        return 'badge bg-slate-100 text-slate-700';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'low':
        return 'badge badge-primary';
      case 'normal':
        return 'badge bg-sage-100 text-sage-700 border-sage-200';
      case 'high':
        return 'badge badge-warning';
      default:
        return 'badge bg-slate-100 text-slate-700';
    }
  };

  // Get first 1-2 sentences of insurance summary
  const shortSummary = result.insuranceSummary.split('.').slice(0, 2).join('.') + '.';

  return (
    <div className="card p-8 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-soft">
          <span className="text-2xl">✓</span>
        </div>
        <h2 className="font-display text-3xl text-slate-900">Analysis Complete</h2>
      </div>

      {/* New enhanced fields - prominent display */}
      <div className="bg-gradient-soft rounded-2xl p-6 mb-6 border border-primary-100">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-primary-700 mb-2 uppercase tracking-wide">Issue Summary</h3>
          <p className="text-lg text-slate-800 leading-relaxed font-serif">{result.issueSummary}</p>
        </div>
        
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-primary-700 mb-2 uppercase tracking-wide">Recommended Fix</h3>
          <p className="text-lg text-slate-800 leading-relaxed font-serif">{result.recommendedFix}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className={getDifficultyColor(result.difficulty)}>
            <span className="mr-1">🔧</span> {result.difficulty}
          </span>
          <span className={getUrgencyColor(result.urgency)}>
            <span className="mr-1">⏰</span> {result.urgency}
          </span>
        </div>
      </div>

      {/* Existing fields - detailed information */}
      <div className="bg-cream-200 rounded-2xl p-6 space-y-4 mb-6">
        <div>
          <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">Category</span>
          <p className="text-lg text-slate-900 capitalize mt-1 font-medium">
            {result.category} · {result.subCategory}
          </p>
        </div>

        <div>
          <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">Severity</span>
          <div className="mt-2">
            <span className={getSeverityColor(result.severity)}>
              {result.severity}
            </span>
          </div>
        </div>

        <div>
          <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">Estimated Cost</span>
          <p className="text-2xl font-bold text-slate-900 mt-1">{result.estimatedCost}</p>
        </div>

        <div>
          <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">Recommendation</span>
          <p className="text-lg text-slate-900 capitalize mt-1 font-medium">{result.repairOrReplace}</p>
        </div>

        <div className="pt-3 border-t border-slate-300">
          <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">Insurance Summary</span>
          <p className="text-slate-700 mt-2 leading-relaxed font-serif text-sm">{shortSummary}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onOpenClaim}
          className="btn-secondary flex-1 text-center"
        >
          <span className="mr-2">📄</span> Preview Full Claim
        </button>
        <button
          onClick={onSendTicket}
          disabled={isSendingTicket}
          className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSendingTicket ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
          ) : <><span className="mr-2">🎫</span> Send Ticket to Company</>}
        </button>
      </div>
    </div>
  );
}

