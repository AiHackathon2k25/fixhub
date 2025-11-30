'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { isLoggedIn, clearToken } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const loggedIn = typeof window !== 'undefined' && isLoggedIn();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Close mobile menu on window resize to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleLogout = () => {
    clearToken();
    router.push('/');
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleHashLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    closeMobileMenu();
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  };

  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12 md:h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" onClick={closeMobileMenu}>
            <div className="w-8 h-8 bg-primary-500 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">FH</span>
            </div>
            <span className="text-base md:text-lg font-semibold text-slate-900">
              <span className="text-slate-900">Fix</span>
              <span className="text-primary-500">Hub</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6">
            {loggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className={`px-3 py-1.5 rounded transition-colors text-sm font-medium ${
                    pathname === '/dashboard'
                      ? 'text-primary-500 bg-primary-50'
                      : 'text-slate-700 hover:text-primary-500'
                  }`}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 text-slate-700 hover:text-primary-500 rounded transition-colors text-sm font-medium"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/"
                  className={`px-3 py-1.5 rounded transition-colors text-sm font-medium ${
                    pathname === '/' 
                      ? 'text-primary-500 bg-primary-50' 
                      : 'text-slate-700 hover:text-primary-500'
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/#services"
                  className="px-3 py-1.5 text-slate-700 hover:text-primary-500 rounded transition-colors text-sm font-medium"
                >
                  Services
                </Link>
                <Link
                  href="/#about"
                  className="px-3 py-1.5 text-slate-700 hover:text-primary-500 rounded transition-colors text-sm font-medium"
                >
                  About
                </Link>
                <Link
                  href="/#team"
                  className="px-3 py-1.5 text-slate-700 hover:text-primary-500 rounded transition-colors text-sm font-medium"
                >
                  Team
                </Link>
                <Link
                  href="/contact"
                  className={`px-3 py-1.5 rounded transition-colors text-sm font-medium ${
                    pathname === '/contact'
                      ? 'text-primary-500 bg-primary-50'
                      : 'text-slate-700 hover:text-primary-500'
                  }`}
                >
                  Contact
                </Link>
              </>
            )}
          </nav>

          {/* Desktop Action Buttons */}
          {!loggedIn && (
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/auth/login"
                className="px-4 py-2 text-slate-700 hover:text-primary-500 rounded transition-colors text-sm font-medium"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="px-5 py-2 bg-primary-500 text-white hover:bg-primary-600 rounded transition-colors text-sm font-medium"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded transition-colors relative z-50"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg
              className="w-6 h-6 transition-transform duration-300"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={closeMobileMenu}
            aria-hidden="true"
            style={{ top: '3.5rem' }}
          />
        )}

        {/* Mobile Menu */}
        <div
          className={`md:hidden transform transition-all duration-300 ease-in-out overflow-hidden ${
            mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="border-t border-slate-200 bg-white py-4">
            <nav className="flex flex-col space-y-1 px-4">
              {loggedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={closeMobileMenu}
                    className={`px-4 py-2.5 rounded transition-colors text-sm font-medium ${
                      pathname === '/dashboard'
                        ? 'text-primary-500 bg-primary-50'
                        : 'text-slate-700 hover:text-primary-500 hover:bg-primary-50'
                    }`}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2.5 text-left text-slate-700 hover:text-primary-500 hover:bg-primary-50 rounded transition-colors text-sm font-medium w-full"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/"
                    onClick={closeMobileMenu}
                    className={`px-4 py-2.5 rounded transition-colors text-sm font-medium ${
                      pathname === '/' 
                        ? 'text-primary-500 bg-primary-50' 
                        : 'text-slate-700 hover:text-primary-500 hover:bg-primary-50'
                    }`}
                  >
                    Home
                  </Link>
                  <Link
                    href="/#services"
                    onClick={(e) => handleHashLinkClick(e, '/#services')}
                    className="px-4 py-2.5 text-slate-700 hover:text-primary-500 hover:bg-primary-50 rounded transition-colors text-sm font-medium"
                  >
                    Services
                  </Link>
                  <Link
                    href="/#about"
                    onClick={(e) => handleHashLinkClick(e, '/#about')}
                    className="px-4 py-2.5 text-slate-700 hover:text-primary-500 hover:bg-primary-50 rounded transition-colors text-sm font-medium"
                  >
                    About
                  </Link>
                  <Link
                    href="/#team"
                    onClick={(e) => handleHashLinkClick(e, '/#team')}
                    className="px-4 py-2.5 text-slate-700 hover:text-primary-500 hover:bg-primary-50 rounded transition-colors text-sm font-medium"
                  >
                    Team
                  </Link>
                  <Link
                    href="/contact"
                    onClick={closeMobileMenu}
                    className={`px-4 py-2.5 rounded transition-colors text-sm font-medium ${
                      pathname === '/contact'
                        ? 'text-primary-500 bg-primary-50'
                        : 'text-slate-700 hover:text-primary-500 hover:bg-primary-50'
                    }`}
                  >
                    Contact
                  </Link>
                  <div className="pt-4 border-t border-slate-200 space-y-2 mt-4">
                    <Link
                      href="/auth/login"
                      onClick={closeMobileMenu}
                      className="block px-4 py-2.5 text-slate-700 hover:text-primary-500 hover:bg-primary-50 rounded transition-colors text-sm font-medium text-center"
                    >
                      Login
                    </Link>
                    <Link
                      href="/auth/signup"
                      onClick={closeMobileMenu}
                      className="block px-4 py-2.5 bg-primary-500 text-white hover:bg-primary-600 rounded transition-colors text-sm font-medium text-center shadow-sm"
                    >
                      Sign Up
                    </Link>
                  </div>
                </>
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

