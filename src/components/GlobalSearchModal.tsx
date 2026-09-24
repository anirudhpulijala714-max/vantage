import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, FileText, HelpCircle, Calculator, CheckCircle2, ShieldCheck } from 'lucide-react';
import { FAQ_DATA } from '../data/faq';
import { REQUIRED_DOCUMENTS, LOAN_BENEFITS, USE_CASES } from '../data/loanFeatures';

interface SearchResult {
  id: string;
  title: string;
  category: string;
  snippet: string;
  link: string;
  iconType: 'faq' | 'doc' | 'calc' | 'eligibility' | 'benefit';
}

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open search triggered globally
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Build searchable index
  const searchableItems: SearchResult[] = [
    {
      id: 'calc-1',
      title: 'Personal Loan EMI Calculator',
      category: 'Calculators & Tools',
      snippet: 'Interactive slider calculator with reducing balance monthly compounding and live SVG chart.',
      link: '/calculator',
      iconType: 'calc',
    },
    {
      id: 'elig-1',
      title: 'Borrowing Power & FOIR Eligibility Checker',
      category: 'Eligibility Assessment',
      snippet: 'Instant 6-step eligibility evaluation based on age, income, FOIR ratio, and credit tier.',
      link: '/eligibility',
      iconType: 'eligibility',
    },
    {
      id: 'apply-1',
      title: 'Digital Loan Application Portal',
      category: 'Application Flow',
      snippet: '4-step multi-stage application flow with instant reference ID generation.',
      link: '/apply',
      iconType: 'eligibility',
    },
    {
      id: 'track-1',
      title: 'Track Loan Application Status',
      category: 'Self-Service Tracking',
      snippet: 'Real-time timeline checking for submitted applications with Reference ID.',
      link: '/status',
      iconType: 'eligibility',
    },
    ...FAQ_DATA.map((faq) => ({
      id: faq.id,
      title: faq.question,
      category: `FAQ: ${faq.category}`,
      snippet: faq.answer,
      link: `/#faq`,
      iconType: 'faq' as const,
    })),
    ...REQUIRED_DOCUMENTS.map((doc, idx) => ({
      id: `doc-${idx}`,
      title: `${doc.category} Requirements`,
      category: 'Document Checklist',
      snippet: doc.items.join(', '),
      link: '/personal-loan',
      iconType: 'doc' as const,
    })),
    ...LOAN_BENEFITS.map((ben) => ({
      id: `ben-${ben.id}`,
      title: ben.title,
      category: 'Loan Features & Benefits',
      snippet: ben.description,
      link: '/personal-loan',
      iconType: 'benefit' as const,
    })),
    ...USE_CASES.map((uc, idx) => ({
      id: `uc-${idx}`,
      title: `Loan Purpose: ${uc.title}`,
      category: 'Eligible Use Cases',
      snippet: uc.description,
      link: '/personal-loan',
      iconType: 'benefit' as const,
    })),
  ];

  const results = query.trim()
    ? searchableItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.snippet.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : searchableItems.slice(0, 5); // default top shortcuts

  const handleSelect = (link: string) => {
    navigate(link);
    onClose();
  };

  const getIcon = (type: SearchResult['iconType']) => {
    switch (type) {
      case 'calc':
        return <Calculator className="w-4 h-4 text-blue-500" />;
      case 'doc':
        return <FileText className="w-4 h-4 text-indigo-500" />;
      case 'eligibility':
        return <CheckCircle2 className="w-4 h-4 text-teal-500" />;
      case 'faq':
        return <HelpCircle className="w-4 h-4 text-purple-500" />;
      default:
        return <ShieldCheck className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 sm:pt-20 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 gap-3">
          <Search className="w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search FAQs, rates, eligibility criteria, documents, or status..."
            className="flex-1 bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Clear search input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block text-[11px] font-mono px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded border border-slate-200 dark:border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {results.length > 0 ? (
            results.map((result) => (
              <button
                key={result.id}
                onClick={() => handleSelect(result.link)}
                className="w-full text-left p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors flex items-start gap-3 group"
              >
                <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-white dark:group-hover:bg-slate-700 transition-colors shrink-0 mt-0.5">
                  {getIcon(result.iconType)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400">
                      {result.category}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                    {result.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                    {result.snippet}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0 mt-2" />
              </button>
            ))
          ) : (
            <div className="text-center py-12 px-4 space-y-2">
              <Search className="w-8 h-8 text-slate-400 mx-auto opacity-50" />
              <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                No matching results found
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                We couldn&rsquo;t find anything matching &ldquo;{query}&rdquo;. Try searching for &ldquo;EMI&rdquo;, &ldquo;Documents&rdquo;, &ldquo;Eligibility&rdquo;, or &ldquo;Interest Rates&rdquo;.
              </p>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Quick search across all tools & policies</span>
          <span className="hidden sm:inline">Use ↑ ↓ to navigate</span>
        </div>
      </div>
    </div>
  );
};
