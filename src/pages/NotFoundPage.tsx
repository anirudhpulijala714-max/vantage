import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Home, Search, ArrowRight, ShieldAlert } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto shadow-lg shadow-blue-500/10">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-blue-600 dark:text-blue-400">
            Error 404
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Page Not Found
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            The page or document you are trying to access does not exist or may have been relocated.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            variant="primary"
            size="md"
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600"
            leftIcon={<Home className="w-4 h-4" />}
            onClick={() => navigate('/')}
          >
            Return Home
          </Button>

          <Button
            variant="outline"
            size="md"
            className="w-full sm:w-auto"
            leftIcon={<Search className="w-4 h-4 text-slate-500" />}
            onClick={() => navigate('/calculator')}
          >
            EMI Calculator
          </Button>
        </div>

        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
          Looking for customer support?{' '}
          <button
            onClick={() => navigate('/contact')}
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Contact our desk
          </button>
        </div>
      </div>
    </div>
  );
};
