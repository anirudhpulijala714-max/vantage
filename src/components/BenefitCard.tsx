import React from 'react';
import {
  Banknote,
  Percent,
  CalendarClock,
  ShieldCheck,
  LockKeyhole,
  Headphones,
  CheckCircle2,
  Clock,
  FileCheck
} from 'lucide-react';
import { Benefit } from '../data/loanFeatures';

const iconMap: Record<string, React.ReactNode> = {
  Banknote: <Banknote className="w-5 h-5 text-blue-600" />,
  Percent: <Percent className="w-5 h-5 text-blue-600" />,
  CalendarClock: <CalendarClock className="w-5 h-5 text-blue-600" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-teal-600" />,
  LockKeyhole: <LockKeyhole className="w-5 h-5 text-blue-600" />,
  Headphones: <Headphones className="w-5 h-5 text-blue-600" />,
  Clock: <Clock className="w-5 h-5 text-blue-600" />,
  FileCheck: <FileCheck className="w-5 h-5 text-blue-600" />,
};

interface BenefitCardProps {
  benefit: Benefit;
}

export const BenefitCard: React.FC<BenefitCardProps> = ({ benefit }) => {
  return (
    <div className="group bg-white p-6 rounded-2xl border border-slate-200/90 hover:border-slate-300 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-blue-50/60 transition-colors">
          {iconMap[benefit.iconName] || <CheckCircle2 className="w-5 h-5 text-blue-600" />}
        </div>
        {benefit.metric && (
          <span className="text-xs font-semibold text-slate-500 font-tabular">
            {benefit.metric}
          </span>
        )}
      </div>

      <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
        {benefit.title}
      </h4>

      <p className="text-sm text-slate-600 mt-2 leading-relaxed">
        {benefit.description}
      </p>
    </div>
  );
};
