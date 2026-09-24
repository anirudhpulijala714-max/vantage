import React from 'react';
import { Check, Shield, FileText, Headphones } from 'lucide-react';

export const TrustIndicators: React.FC = () => {
  const indicators = [
    { text: 'Simple Application', icon: <Check className="w-4 h-4 text-teal-600" /> },
    { text: '256-Bit Encrypted Data', icon: <Shield className="w-4 h-4 text-teal-600" /> },
    { text: 'Transparent Terms', icon: <FileText className="w-4 h-4 text-teal-600" /> },
    { text: 'Dedicated Advisory', icon: <Headphones className="w-4 h-4 text-teal-600" /> },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 sm:gap-x-8 text-xs sm:text-sm font-medium text-slate-700">
      {indicators.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2">
          {item.icon}
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  );
};
