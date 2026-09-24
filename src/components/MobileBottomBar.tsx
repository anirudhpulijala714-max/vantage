import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const MobileBottomBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide on apply page and eligibility page so it doesn't collide with the in-page form controls
  const isFormPage = location.pathname === '/apply' || location.pathname === '/eligibility';

  if (isFormPage) return null;

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-3 shadow-lg">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        <button
          type="button"
          onClick={() => navigate('/eligibility')}
          className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-200 dark:border-slate-700 active:scale-98 transition-transform"
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>Check Eligibility</span>
        </button>

        <button
          type="button"
          onClick={() => navigate('/apply')}
          className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/20 active:scale-98 transition-transform"
        >
          <span>Apply Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
