import React from 'react';
import { PROCESS_STEPS } from '../data/loanFeatures';
import { Clock, Check } from 'lucide-react';

export const StepTimeline: React.FC = () => {
  return (
    <div className="relative">
      {/* Desktop connector line */}
      <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-8 z-0" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {PROCESS_STEPS.map((step) => (
          <div
            key={step.step}
            className="bg-white p-6 rounded-2xl border border-slate-200/90 hover:border-slate-300 shadow-xs flex flex-col justify-between transition-all duration-200"
          >
            <div>
              {/* Header with step number and duration */}
              <div className="flex items-center justify-between mb-4">
                <span className="w-10 h-10 rounded-xl bg-slate-900 text-white font-mono font-bold text-sm flex items-center justify-center shadow-xs">
                  {step.step}
                </span>
                <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {step.timeEstimate}
                </span>
              </div>

              <h4 className="text-base font-bold text-slate-900">{step.title}</h4>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">{step.description}</p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100">
              <ul className="space-y-1.5">
                {step.details.map((detail, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                    <Check className="w-3 h-3 text-teal-600 shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
