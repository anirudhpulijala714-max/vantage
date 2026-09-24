import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HelpCircle, X, CheckCircle2, PhoneCall } from 'lucide-react';
import { Button } from './Button';

interface ExitIntentModalProps {
  onRequestCallback: () => void;
}

export const ExitIntentModal: React.FC<ExitIntentModalProps> = ({ onRequestCallback }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if previously dismissed in this browser session
    const hasShown = sessionStorage.getItem('vantage_exit_intent_shown');
    if (hasShown) return;

    let timeoutId: NodeJS.Timeout;

    // Inactivity trigger: 50 seconds
    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (!sessionStorage.getItem('vantage_exit_intent_shown')) {
          setIsOpen(true);
          sessionStorage.setItem('vantage_exit_intent_shown', 'true');
        }
      }, 50000);
    };

    // Exit intent trigger: cursor leaving viewport to the top
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !sessionStorage.getItem('vantage_exit_intent_shown')) {
        setIsOpen(true);
        sessionStorage.setItem('vantage_exit_intent_shown', 'true');
      }
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    document.addEventListener('mouseleave', handleMouseLeave);
    resetTimer();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleCheckEligibility = () => {
    setIsOpen(false);
    navigate('/eligibility');
  };

  const handleCallback = () => {
    setIsOpen(false);
    onRequestCallback();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 relative space-y-5 animate-in zoom-in-95 duration-200">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
          <HelpCircle className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400">
            Advisory Assistance
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Need Help Exploring Your Loan Options?
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Finding the right personal loan doesn&rsquo;t have to be overwhelming. You can check your preliminary borrowing capacity in 2 minutes or speak with our loan specialist.
          </p>
        </div>

        <div className="space-y-2.5 pt-2">
          <Button
            variant="primary"
            size="md"
            className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95"
            leftIcon={<CheckCircle2 className="w-4 h-4" />}
            onClick={handleCheckEligibility}
          >
            Check Eligibility
          </Button>

          <Button
            variant="outline"
            size="md"
            className="w-full"
            leftIcon={<PhoneCall className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
            onClick={handleCallback}
          >
            Request a Callback
          </Button>

          <button
            type="button"
            onClick={handleClose}
            className="w-full text-center text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 pt-1"
          >
            I&rsquo;m just browsing, thank you
          </button>
        </div>
      </div>
    </div>
  );
};
