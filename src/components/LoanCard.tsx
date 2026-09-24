import React from 'react';
import {
  HeartPulse,
  Home,
  Layers,
  GraduationCap,
  Sparkles,
  Plane,
  Check
} from 'lucide-react';

const iconLookup: Record<string, React.ReactNode> = {
  HeartPulse: <HeartPulse className="w-5 h-5 text-red-600" />,
  Home: <Home className="w-5 h-5 text-blue-600" />,
  Layers: <Layers className="w-5 h-5 text-indigo-600" />,
  GraduationCap: <GraduationCap className="w-5 h-5 text-teal-600" />,
  Sparkles: <Sparkles className="w-5 h-5 text-amber-600" />,
  Plane: <Plane className="w-5 h-5 text-sky-600" />,
};

interface LoanCardProps {
  title: string;
  description: string;
  iconName: string;
  features?: string[];
}

export const LoanCard: React.FC<LoanCardProps> = ({
  title,
  description,
  iconName,
  features,
}) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all duration-200 hover:shadow-xs flex flex-col justify-between">
      <div>
        <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4">
          {iconLookup[iconName] || <Sparkles className="w-5 h-5 text-blue-600" />}
        </div>

        <h4 className="text-base font-bold text-slate-900">{title}</h4>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">{description}</p>
      </div>

      {features && features.length > 0 && (
        <ul className="mt-4 pt-4 border-t border-slate-100 space-y-1.5">
          {features.map((f, idx) => (
            <li key={idx} className="flex items-center gap-2 text-xs text-slate-600">
              <Check className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
