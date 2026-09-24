import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

interface SecurityBadgeProps {
  className?: string;
  variant?: 'banner' | 'badge';
}

export const SecurityBadge: React.FC<SecurityBadgeProps> = ({
  className = '',
  variant = 'banner',
}) => {
  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-[11px] font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 ${className}`}>
        <Lock className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
        <span>Official Secure Portal</span>
      </div>
    );
  }

  return (
    <div className={`p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex items-center gap-2.5 ${className}`}>
      <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
      <span>
        <strong className="text-slate-900 dark:text-white">Security Reminder:</strong> Your personal and financial information should only be submitted through our official website.
      </span>
    </div>
  );
};
