import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { Button } from './Button';

interface LoanOption {
  id: string;
  name: string;
  badge?: string;
  amountRange: string;
  interestRate: string;
  tenure: string;
  estimatedEMI: string;
  processingFee: string;
  idealFor: string;
}

export const LoanComparison: React.FC = () => {
  const navigate = useNavigate();

  const loanOptions: LoanOption[] = [
    {
      id: 'standard-personal',
      name: 'Standard Personal Loan',
      badge: 'Most Popular',
      amountRange: '₹50,000 – ₹15,00,000',
      interestRate: '10.50% – 16.00% p.a.',
      tenure: '12 – 60 Months',
      estimatedEMI: '₹3,250 per ₹1 Lakh (36 Mo.)',
      processingFee: '1.0% – 2.0% + GST',
      idealFor: 'Salaried employees with consistent monthly pay slips',
    },
    {
      id: 'express-salaried',
      name: 'Express Salaried Loan',
      badge: 'Swift Disbursal',
      amountRange: '₹1,00,000 – ₹10,00,000',
      interestRate: '11.25% – 18.00% p.a.',
      tenure: '12 – 48 Months',
      estimatedEMI: '₹3,286 per ₹1 Lakh (36 Mo.)',
      processingFee: '1.5% + GST',
      idealFor: 'Corporate employees needing quick liquidity',
    },
    {
      id: 'flexi-overdraft',
      name: 'Flexi Overdraft Credit Line',
      amountRange: '₹2,00,000 – ₹20,00,000',
      interestRate: '12.00% – 19.50% p.a.',
      tenure: 'Annual Renewal (Up to 5 Yrs)',
      estimatedEMI: 'Interest only on drawn amount',
      processingFee: '1.5% – 2.5% + GST',
      idealFor: 'Emergency backup funds & variable business capital',
    },
    {
      id: 'professional-loan',
      name: 'Doctors & Professionals Loan',
      badge: 'High Limit',
      amountRange: '₹5,00,000 – ₹25,00,000',
      interestRate: '10.25% – 14.50% p.a.',
      tenure: '12 – 60 Months',
      estimatedEMI: '₹3,238 per ₹1 Lakh (36 Mo.)',
      processingFee: '0.75% – 1.5% + GST',
      idealFor: 'Registered Doctors, Chartered Accountants & Architects',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
        <span className="text-xs uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400">
          Tailored Loan Programs
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Compare Available Personal Loan Options
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Representative program terms. Sanctions and terms depend on verified applicant profile and underwriting criteria.
        </p>
      </div>

      {/* Desktop Responsive Table View */}
      <div className="hidden lg:block bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              <th className="py-4 px-6">Loan Option</th>
              <th className="py-4 px-5">Sanction Limit</th>
              <th className="py-4 px-5">Indicative APR</th>
              <th className="py-4 px-5">Tenure</th>
              <th className="py-4 px-5">Estimated EMI</th>
              <th className="py-4 px-5">Processing Fee</th>
              <th className="py-4 px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
            {loanOptions.map((opt) => (
              <tr key={opt.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white">{opt.name}</span>
                      {opt.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700/50">
                          {opt.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{opt.idealFor}</span>
                  </div>
                </td>
                <td className="py-4 px-5 font-semibold text-slate-800 dark:text-slate-200 font-tabular">
                  {opt.amountRange}
                </td>
                <td className="py-4 px-5 font-bold text-teal-600 dark:text-teal-400 font-tabular">
                  {opt.interestRate}
                </td>
                <td className="py-4 px-5 text-slate-700 dark:text-slate-300">{opt.tenure}</td>
                <td className="py-4 px-5 text-xs text-slate-600 dark:text-slate-400 font-tabular">
                  {opt.estimatedEMI}
                </td>
                <td className="py-4 px-5 text-xs text-slate-600 dark:text-slate-400">{opt.processingFee}</td>
                <td className="py-4 px-6 text-right">
                  <Button
                    variant="primary"
                    size="sm"
                    className="whitespace-nowrap"
                    onClick={() => navigate('/apply')}
                  >
                    Apply
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile & Tablet Card View */}
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
        {loanOptions.map((opt) => (
          <div
            key={opt.id}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-slate-900 dark:text-white">{opt.name}</h4>
                {opt.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700/50">
                    {opt.badge}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">{opt.idealFor}</p>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block">Sanction Limit</span>
                  <span className="font-bold text-slate-900 dark:text-white font-tabular">{opt.amountRange}</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block">Indicative Rate</span>
                  <span className="font-bold text-teal-600 dark:text-teal-400 font-tabular">{opt.interestRate}</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block">Tenure</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{opt.tenure}</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block">Processing Fee</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">{opt.processingFee}</span>
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-xs text-slate-600 dark:text-slate-300">
                <span className="font-medium">Estimated EMI:</span> {opt.estimatedEMI}
              </div>
            </div>

            <Button
              variant="secondary"
              size="sm"
              className="w-full"
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              onClick={() => navigate('/apply')}
            >
              Apply for {opt.name.split(' ')[0]}
            </Button>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center">
        *Disclaimer: Indicative rates and processing fees represent typical lender brackets for standard credit tier profiles. Final applicable terms are subject to verified credit assessment.
      </p>
    </div>
  );
};
