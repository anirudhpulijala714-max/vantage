import React, { useState, useMemo } from 'react';
import { FAQ_DATA, FAQItem, FAQCategory } from '../data/faq';
import { ChevronDown, Search, X, HelpCircle } from 'lucide-react';

export const FAQAccordion: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const categories: (string)[] = [
    'All',
    'General',
    'Eligibility',
    'Documents',
    'EMI',
    'Application',
    'Repayment',
  ];

  const filteredItems: FAQItem[] = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory =
        activeCategory === 'All' || item.category === activeCategory;
      const matchesQuery =
        !searchQuery.trim() ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="max-w-md mx-auto relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search questions by keyword (e.g. EMI, documents, CIBIL)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-xs"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl max-w-xl mx-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              activeCategory === cat
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="space-y-3 max-w-3xl mx-auto">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`bg-white dark:bg-slate-900 rounded-2xl border transition-colors ${
                  isOpen
                    ? 'border-blue-200 dark:border-blue-800 shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className="w-full py-4 px-5 sm:px-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                      {item.category}
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                      {item.question}
                    </span>
                  </div>
                  <span
                    className={`w-6 h-6 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 px-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
            <HelpCircle className="w-8 h-8 text-slate-400 mx-auto opacity-50" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              No matching questions found
            </h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              We couldn&rsquo;t find any FAQs matching &ldquo;{searchQuery}&rdquo;. Try another term or contact our loan advisory desk.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
              className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline pt-2 inline-block"
            >
              Reset Search & Category Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
