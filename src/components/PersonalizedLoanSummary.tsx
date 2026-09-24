import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatINR } from '../utils/calculations';
import { Button } from './Button';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface PersonalizedLoanSummaryProps {
  amount: number;
  tenureYears: number;
  rate: number;
  emi: number;
  totalInterest: number;
  totalRepayment: number;
}

export const PersonalizedLoanSummary: React.FC<PersonalizedLoanSummaryProps> = ({
  amount,
  tenureYears,
  rate,
  emi,
  totalInterest,
  totalRepayment,
}) => {
  const navigate = useNavigate();
  const months = tenureYears * 12;

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white rounded-2xl p-6 sm:p-7 border border-blue-800/40 shadow-xl space-y-5 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-blue-500/20 text-teal-400">
            <Sparkles className="w-4 h-4" />
          </span>
          <span className="text-xs uppercase font-bold tracking-widest text-teal-300">
            Personalized Proposal Summary
          </span>
        </div>
        <span className="text-xs text-blue-200/80 font-mono">
          Indicative @ {rate}% p.a.
        </span>
      </div>

      {/* Primary Figures */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-white/10 relative z-10">
        <div>
          <span className="text-xs text-slate-300 block">Loan Amount</span>
          <span className="text-lg sm:text-xl font-extrabold text-white font-tabular mt-0.5 block">
            {formatINR(amount)}
          </span>
        </div>

        <div>
          <span className="text-xs text-slate-300 block">Selected Tenure</span>
          <span className="text-lg sm:text-xl font-extrabold text-white font-tabular mt-0.5 block">
            {months} Months
          </span>
          <span className="text-[11px] text-slate-400">{tenureYears} {tenureYears === 1 ? 'Year' : 'Years'}</span>
        </div>

        <div>
          <span className="text-xs text-slate-300 block">Estimated Monthly EMI</span>
          <span className="text-lg sm:text-xl font-extrabold text-teal-400 font-tabular mt-0.5 block">
            {formatINR(emi)}
          </span>
          <span className="text-[11px] text-teal-200/80">Monthly outflow</span>
        </div>

        <div>
          <span className="text-xs text-slate-300 block">Estimated Total Interest</span>
          <span className="text-lg sm:text-xl font-extrabold text-indigo-300 font-tabular mt-0.5 block">
            {formatINR(totalInterest)}
          </span>
          <span className="text-[11px] text-slate-400">Total finance fee</span>
        </div>
      </div>

      {/* Action Row */}
      <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
          <span>Soft verification • Zero impact on your credit bureau score</span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button
            variant="secondary"
            size="md"
            className="w-full sm:w-auto bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-bold hover:brightness-105"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={() =>
              navigate('/eligibility', {
                state: { prefillAmount: amount, prefillTenure: tenureYears },
              })
            }
          >
            Check Eligibility
          </Button>
          <Button
            variant="outline"
            size="md"
            className="w-full sm:w-auto text-white border-white/20 hover:bg-white/10"
            onClick={() =>
              navigate('/apply', {
                state: { prefillAmount: amount, prefillTenure: tenureYears },
              })
            }
          >
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  );
};
