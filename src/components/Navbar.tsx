import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, PhoneCall, ShieldCheck, Search, FileText } from 'lucide-react';
import { CallbackModal } from './CallbackModal';
import { GlobalSearchModal } from './GlobalSearchModal';
import { ThemeToggle } from './ThemeToggle';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global keyboard shortcut: Cmd+K / Ctrl+K opens smart search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Personal Loan', path: '/personal-loan' },
    { label: 'Eligibility', path: '/eligibility' },
    { label: 'EMI Calculator', path: '/calculator' },
    { label: 'Track Status', path: '/status' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800 shadow-xs'
            : 'bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Zone 1: Single Brand Wordmark Element with colorful gradient */}
          <Link
            to="/"
            className="flex items-center gap-2 group text-slate-900 dark:text-white focus:outline-none"
            aria-label="Vantage Personal Loans Home"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-center font-extrabold text-base shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              V
            </div>
            <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Vantage<span className="text-blue-600 dark:text-teal-400">.</span>
            </span>
          </Link>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-xs xl:text-sm font-semibold transition-colors hover:text-blue-600 dark:hover:text-blue-400 whitespace-nowrap ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Actions + Search + Theme Toggle */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Smart Search Trigger */}
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2 text-xs"
              title="Search website (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Search</span>
              <kbd className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                ⌘K
              </kbd>
            </button>

            {/* Dark Mode Toggle */}
            <ThemeToggle />

            {/* Request Callback CTA */}
            <button
              onClick={() => setIsCallbackModalOpen(true)}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <PhoneCall className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Callback</span>
            </button>

            {/* Primary Check Eligibility Button */}
            <button
              onClick={() => navigate('/eligibility')}
              className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 rounded-xl shadow-md shadow-blue-500/15 transition-all whitespace-nowrap active:scale-95"
            >
              Check Eligibility
            </button>
          </div>

          {/* Mobile Right Bar: Search, Theme, Hamburger */}
          <div className="flex sm:hidden items-center gap-1">
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="p-2 text-slate-600 dark:text-slate-300"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-600 dark:text-slate-300 rounded-xl"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="sm:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-150">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block py-2 px-3 rounded-xl text-sm font-semibold transition-colors ${
                    location.pathname === link.path
                      ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCallbackModalOpen(true);
                }}
                className="w-full py-2.5 px-3 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Request Callback</span>
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate('/apply');
                }}
                className="w-full py-2.5 px-3 text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center gap-2 shadow-sm"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Start Loan Application</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Reusable Modals */}
      <CallbackModal
        isOpen={isCallbackModalOpen}
        onClose={() => setIsCallbackModalOpen(false)}
      />

      <GlobalSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </>
  );
};
