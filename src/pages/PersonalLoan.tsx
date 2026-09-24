import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { BenefitCard } from '../components/BenefitCard';
import { LOAN_BENEFITS, USE_CASES, REQUIRED_DOCUMENTS } from '../data/loanFeatures';
import {
  ArrowRight,
  ShieldCheck,
  Check,
  X,
  FileText,
  BadgePercent,
  Clock,
  HelpCircle
} from 'lucide-react';

export const PersonalLoan: React.FC = () => {
  const navigate = useNavigate();

  const comparisonData = [
    {
      feature: 'Collateral / Security',
      personalLoan: 'Zero Collateral Required',
      creditCard: 'Unsecured (Higher Risk)',
      goldLoan: 'Gold Jewelry Pledged',
    },
    {
      feature: 'Interest Rate (Indicative)',
      personalLoan: 'From 10.5% p.a.',
      creditCard: '36% – 42% p.a.',
      goldLoan: '9.0% – 15% p.a.',
    },
    {
      feature: 'Repayment Tenure',
      personalLoan: '12 to 60 Months',
      creditCard: 'Revolving / 12 Months',
      goldLoan: '6 to 24 Months',
    },
    {
      feature: 'Processing Turnaround',
      personalLoan: '24 to 48 Hours',
      creditCard: 'Instant (Existing Limits)',
      goldLoan: 'Same Day with Valuation',
    },
    {
      feature: 'Prepayment Options',
      personalLoan: 'Available after lock-in',
      creditCard: 'Subject to charges',
      goldLoan: 'Available anytime',
    },
  ];

  const feeSchedule = [
    {
      item: 'Loan Processing Fee',
      charge: '1.0% to 2.5% of sanctioned loan amount + GST',
      details: 'Deducted one-time from the disbursed loan proceeds during settlement.',
    },
    {
      item: 'Prepayment / Foreclosure Fee',
      charge: '2% to 4% on outstanding principal (nil for floating rate individuals)',
      details: 'Permitted after servicing a minimum of 6 to 12 scheduled monthly EMIs.',
    },
    {
      item: 'Late Payment / Overdue Fee',
      charge: '2% per month on overdue EMI amount',
      details: 'Applicable in case of delayed payment or bounced repayment mandate.',
    },
    {
      item: 'Mandate / Cheque Swap Charges',
      charge: '₹500 + applicable taxes per swap request',
      details: 'Applies when updating disbursal or repayment bank mandate details.',
    },
  ];

  return (
    <div className="space-y-20 sm:space-y-28 pb-24">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-wider font-semibold text-teal-400">Personal Loan Product Guide</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Unsecured Personal Loans Designed for Financial Freedom
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Explore terms, rate benchmarks, fee schedules, and comparison metrics to make an informed, transparent borrowing decision.
            </p>

            <div className="pt-4 flex flex-wrap gap-3">
              <Button
                variant="secondary"
                size="md"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                onClick={() => navigate('/eligibility')}
              >
                Assess Eligibility
              </Button>
              <Button
                variant="outline"
                size="md"
                className="text-white border-slate-700 hover:bg-slate-800"
                onClick={() => navigate('/calculator')}
              >
                Open EMI Calculator
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs uppercase tracking-wider font-semibold text-blue-700">Financial Comparison</span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Personal Loan vs Other Financing Alternatives
          </h2>
          <p className="text-sm text-slate-600">
            Compare structured personal loans against high-interest credit card debt and gold pledging.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-x-auto shadow-xs">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-700 uppercase tracking-wider">
                <th className="py-4 px-6">Feature</th>
                <th className="py-4 px-6 text-blue-700 bg-blue-50/50">Personal Loan</th>
                <th className="py-4 px-6">Credit Card Debt</th>
                <th className="py-4 px-6">Gold Loan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {comparisonData.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-slate-800">{row.feature}</td>
                  <td className="py-4 px-6 font-semibold text-blue-900 bg-blue-50/30 font-tabular">{row.personalLoan}</td>
                  <td className="py-4 px-6 text-slate-600 font-tabular">{row.creditCard}</td>
                  <td className="py-4 px-6 text-slate-600 font-tabular">{row.goldLoan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Fees & Charges Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs uppercase tracking-wider font-semibold text-blue-700">Transparent Pricing</span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Schedule of Fees & Charges
          </h2>
          <p className="text-sm text-slate-600">
            No unexpected line items. Every cost associated with your loan is clearly documented below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {feeSchedule.map((fee, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <h4 className="text-base font-bold text-slate-900">{fee.item}</h4>
              <div className="text-sm font-semibold text-blue-700 font-tabular">{fee.charge}</div>
              <p className="text-xs text-slate-600 leading-relaxed pt-1">{fee.details}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Key Benefits Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs uppercase tracking-wider font-semibold text-blue-700">Core Features</span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Key Advantages of Choosing Vantage
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {LOAN_BENEFITS.map((benefit) => (
            <BenefitCard key={benefit.id} benefit={benefit} />
          ))}
        </div>
      </section>

      {/* Call to action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-bold">Ready to Start Your Digital Application?</h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Check your tailored loan offer in under 2 minutes with paperless KYC and transparent terms.
          </p>
          <div className="pt-2">
            <Button
              variant="secondary"
              size="lg"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => navigate('/apply')}
            >
              Apply Online Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
