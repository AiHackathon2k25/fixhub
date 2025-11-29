'use client';

interface ComingSoonModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ComingSoonModal({ open, onClose }: ComingSoonModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Mobile App Coming Soon!</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold focus:outline-none"
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>

          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">
              We're building a mobile app so claimants can snap a photo and file a claim in seconds, directly from their phone.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              Stay tuned for updates on our mobile experience!
            </p>
          </div>

          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Got It
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

