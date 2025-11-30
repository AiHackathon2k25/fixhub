import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-soft">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="font-display text-display-1 text-slate-900 mb-6">
            Welcome to FixHub
          </h1>
          <p className="text-xl text-slate-600 mb-8 font-serif">
            AI-Powered Insurance Claims Management
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/signup" className="btn-primary">
              Get Started
            </Link>
            <Link to="/login" className="btn-secondary">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

