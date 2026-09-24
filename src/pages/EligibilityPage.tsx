import React from 'react';
import { EligibilityForm } from '../components/EligibilityForm';
import { ShieldCheck, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';

export const EligibilityPage: React.FC = () => {
  return (
    <div className="space-y-16 sm:space-y-24 pb-24">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-14 sm:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-teal-400">Eligibility Engine</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Personal Loan Eligibility Assessment
            </h1>
            <p className="text-base text-slate-300 leading-relaxed">
              Verify your borrowing capacity against standard commercial bank underwriting rules in real time.
            </p>
          </div>
        </div>
      </section>

      {/* Main Interactive Form */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <EligibilityForm />
      </section>

      {/* Educational Matrix on Underwriting Factors */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">How Lenders Evaluate Your Loan Eligibility</h2>
          <p className="text-sm text-slate-600">The 4 primary factors evaluated during formal credit underwriting.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 font-bold flex items-center justify-center text-xs">
                1
              </span>
              <h3 className="text-base font-bold text-slate-900">Fixed Obligation to Income Ratio (FOIR)</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Lenders require that your total monthly debt obligations (including your existing EMIs and the new proposed loan EMI) do not exceed 40% to 50% of your net monthly take-home salary.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 font-bold flex items-center justify-center text-xs">
                2
              </span>
              <h3 className="text-base font-bold text-slate-900">Credit Bureau Score (CIBIL / Experian)</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              A credit bureau score of 700 or above demonstrates consistent repayment discipline, granting access to prime tier interest rates and higher sanction amounts.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 font-bold flex items-center justify-center text-xs">
                3
              </span>
              <h3 className="text-base font-bold text-slate-900">Employment & Vintage Stability</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Lenders prefer at least 1 to 2 years of overall career experience, with a minimum of 6 continuous months with your current employer or registered professional practice.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 font-bold flex items-center justify-center text-xs">
                4
              </span>
              <h3 className="text-base font-bold text-slate-900">Minimum Net Income Threshold</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              A regular net monthly credited income of ₹20,000 for salaried personnel (or regular annual audited returns for self-employed applicants) is the typical threshold across tier-1 cities.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
