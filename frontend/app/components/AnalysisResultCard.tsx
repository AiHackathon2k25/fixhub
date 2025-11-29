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
        return 'bg-green-100 text-green-800';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800';
      case 'severe':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get first 1-2 sentences of insurance summary
  const shortSummary = result.insuranceSummary.split('.').slice(0, 2).join('.') + '.';

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-3xl">✅</span>
        <h2 className="text-2xl font-bold text-gray-800">Analysis Complete</h2>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 space-y-3 mb-4">
        <div>
          <span className="text-sm font-medium text-gray-600">Category:</span>
          <p className="text-lg text-gray-900 capitalize">
            {result.category} - {result.subCategory}
          </p>
        </div>

        <div>
          <span className="text-sm font-medium text-gray-600">Severity:</span>
          <div className="mt-1">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getSeverityColor(result.severity)}`}>
              {result.severity.toUpperCase()}
            </span>
          </div>
        </div>

        <div>
          <span className="text-sm font-medium text-gray-600">Estimated Cost:</span>
          <p className="text-lg font-semibold text-gray-900">{result.estimatedCost}</p>
        </div>

        <div>
          <span className="text-sm font-medium text-gray-600">Recommendation:</span>
          <p className="text-lg text-gray-900 capitalize">{result.repairOrReplace}</p>
        </div>

        <div>
          <span className="text-sm font-medium text-gray-600">Insurance Summary:</span>
          <p className="text-gray-700 mt-1">{shortSummary}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onOpenClaim}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          📄 Preview Full Claim
        </button>
        <button
          onClick={onSendTicket}
          disabled={isSendingTicket}
          className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:transform-none disabled:shadow-md"
        >
          {isSendingTicket ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
          ) : '🎫 Send Ticket to Company'}
        </button>
      </div>
    </div>
  );
}

