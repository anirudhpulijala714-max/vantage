import React, { useState } from 'react';
import { MessageSquareText } from 'lucide-react';
import { appConfig } from '../config/appConfig';

export const WhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  // Sanitized phone number for WhatsApp URL (digits only)
  const sanitizedNumber = appConfig.whatsAppNumber.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${sanitizedNumber}?text=${appConfig.whatsAppMessage}`;

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-5 sm:right-6 z-40 flex items-center">
      {/* Tooltip */}
      {showTooltip && (
        <div
          role="tooltip"
          className="hidden sm:block mr-3 px-3 py-1.5 bg-slate-900 dark:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-lg border border-slate-700/80 whitespace-nowrap animate-in fade-in slide-in-from-right-2 duration-150"
        >
          Chat with an Advisor on WhatsApp
          <span className="absolute top-1/2 -right-1 w-2 h-2 bg-slate-900 dark:bg-slate-800 rotate-45 -translate-y-1/2" />
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        className="group relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50 transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-3 focus-visible:outline-emerald-400"
        aria-label="Contact loan advisor on WhatsApp (Official Support)"
      >
        {/* Subtle breathing glow */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/20 group-hover:bg-emerald-500/40 animate-ping -z-10 opacity-75" />
        <MessageSquareText className="w-6 h-6 sm:w-7 sm:h-7 transition-transform group-hover:rotate-6" />
      </a>
    </div>
  );
};
