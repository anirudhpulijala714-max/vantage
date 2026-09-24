import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEMICalculator } from '../hooks/useEMICalculator';
import { formatINR } from '../utils/calculations';
import { EMIChart } from './EMIChart';
import { Button } from './Button';
import { PersonalizedLoanSummary } from './PersonalizedLoanSummary';
import { ArrowRight, HelpCircle, CheckCircle2, Sparkles, Send } from 'lucide-react';

interface EMICalculatorProps {
  onCheckEligibility?: () => void;
  showScheduleToggle?: boolean;
}

export const EMICalculator: React.FC<EMICalculatorProps> = ({
  onCheckEligibility,
}) => {
  const navigate = useNavigate();
  const {
    loanAmount,
    interestRate,
    tenureYears,
    setLoanAmount,
    setInterestRate,
    setTenureYears,
    result,
  } = useEMICalculator({
    initialAmount: 500000,
    initialRate: 11.5,
    initialTenure: 3,
  });

  const quickAmounts = [100000, 300000, 500000, 1000000, 1500000, 2000000];
  const tenures = [1, 2, 3, 4, 5];

  const handleEligibilityRedirect = () => {
    if (onCheckEligibility) {
      onCheckEligibility();
    } else {
      navigate('/eligibility', {
        state: { prefillAmount: loanAmount, prefillTenure: tenureYears },
      });
    }
  };

  const handleApplyRedirect = () => {
    navigate('/apply', {
      state: { prefillAmount: loanAmount, prefillTenure: tenureYears },
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-slate-800">
          {/* Controls Column */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-7">
            <div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs uppercase tracking-wider font-bold text-blue-600 dark:text-blue-400">
                  Interactive Estimator
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 inline" />
                  Real-time reducing balance
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                Calculate Your Estimated EMI
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Adjust loan parameters to evaluate monthly instalments and total interest payable.
              </p>
            </div>

            {/* 1. Loan Amount */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="loan-amount-slider" className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Loan Amount
                </label>
                <div className="flex items-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 focus-within:border-blue-600 focus-within:bg-white dark:focus-within:bg-slate-800">
                  <span className="text-sm font-medium text-slate-500 mr-1">₹</span>
                  <input
                    type="number"
                    aria-label="Loan Amount in Rupees"
                    min={50000}
                    max={2500000}
                    step={10000}
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-28 text-right text-sm font-bold text-slate-900 dark:text-white bg-transparent focus:outline-none font-tabular"
                  />
                </div>
              </div>

              <input
                id="loan-amount-slider"
                type="range"
                min={50000}
                max={2500000}
                step={10000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                aria-label="Loan Amount Slider"
                className="w-full h-2 rounded-lg"
              />

              <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 font-tabular">
                <span>₹ 50,000</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">{formatINR(loanAmount)}</span>
                <span>₹ 25,00,000</span>
              </div>

              {/* Quick Presets */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {quickAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setLoanAmount(amt)}
                    className={`text-xs px-2.5 py-1 rounded-md transition-colors font-medium ${
                      loanAmount === amt
                        ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700 font-semibold'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {amt >= 100000 ? `₹${amt / 100000}L` : `₹${amt / 1000}K`}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Interest Rate */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="interest-rate-slider" className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  Interest Rate (p.a.)
                  <span title="Indicative rates start at 10.5% p.a. depending on borrower credit rating" className="text-slate-400 cursor-help">
                    <HelpCircle className="w-3.5 h-3.5" />
                  </span>
                </label>
                <div className="flex items-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 focus-within:border-blue-600 focus-within:bg-white dark:focus-within:bg-slate-800">
                  <input
                    type="number"
                    aria-label="Interest Rate per annum"
                    min={9.5}
                    max={24}
                    step={0.1}
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-16 text-right text-sm font-bold text-slate-900 dark:text-white bg-transparent focus:outline-none font-tabular"
                  />
                  <span className="text-sm font-medium text-slate-500 ml-1">%</span>
                </div>
              </div>

              <input
                id="interest-rate-slider"
                type="range"
                min={9.5}
                max={24}
                step={0.1}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                aria-label="Interest Rate Slider"
                className="w-full h-2 rounded-lg"
              />

              <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 font-tabular">
                <span>9.5%</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">{interestRate}% p.a.</span>
                <span>24.0%</span>
              </div>
            </div>

            {/* 3. Tenure in Years */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="loan-tenure-slider" className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Loan Tenure
                </label>
                <div className="text-sm font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 font-tabular">
                  {tenureYears} {tenureYears === 1 ? 'Year' : 'Years'} ({tenureYears * 12} Months)
                </div>
              </div>

              <input
                id="loan-tenure-slider"
                type="range"
                min={1}
                max={5}
                step={1}
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                aria-label="Loan Tenure Slider in Years"
                className="w-full h-2 rounded-lg"
              />

              {/* Tenure buttons */}
              <div className="grid grid-cols-5 gap-1.5 pt-1">
                {tenures.map((yr) => (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => setTenureYears(yr)}
                    className={`py-1.5 text-xs font-semibold rounded-md border text-center transition-all ${
                      tenureYears === yr
                        ? 'bg-slate-900 dark:bg-blue-600 text-white border-slate-900 dark:border-blue-600 shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    {yr} {yr === 1 ? 'Yr' : 'Yrs'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Output & Chart Column */}
          <div className="lg:col-span-5 p-6 sm:p-8 bg-slate-50/70 dark:bg-slate-900/60 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              {/* Primary KPI: Monthly EMI */}
              <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-xs">
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
                  Estimated Monthly EMI
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-blue-700 dark:text-blue-400 font-tabular tracking-tight">
                    {formatINR(result.monthlyEMI)}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">/ month</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                  For {tenureYears * 12} monthly instalments at {interestRate}% p.a.
                </p>
              </div>

              {/* Donut Chart */}
              <EMIChart
                principal={result.principalAmount}
                totalInterest={result.totalInterest}
                totalRepayment={result.totalRepayment}
              />

              {/* Summary metrics grid */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">Principal</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white font-tabular">
                    {formatINR(result.principalAmount)}
                  </span>
                </div>
                <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">Total Interest</span>
                  <span className="text-sm font-bold text-teal-600 dark:text-teal-400 font-tabular">
                    {formatINR(result.totalInterest)}
                  </span>
                </div>
              </div>
            </div>

            {/* CTAs & Disclaimers */}
            <div className="space-y-3 pt-3">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <Button
                  variant="primary"
                  size="md"
                  className="flex-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-md shadow-blue-500/10"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  onClick={handleEligibilityRedirect}
                >
                  Check Eligibility
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  className="flex-1"
                  leftIcon={<Send className="w-3.5 h-3.5" />}
                  onClick={handleApplyRedirect}
                >
                  Apply Now
                </Button>
              </div>

              <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center leading-relaxed">
                These calculations are illustrative. Actual terms may vary depending on applicant profile and lender criteria.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Personalized Loan Summary generated after input */}
      <PersonalizedLoanSummary
        amount={loanAmount}
        tenureYears={tenureYears}
        rate={interestRate}
        emi={result.monthlyEMI}
        totalInterest={result.totalInterest}
        totalRepayment={result.totalRepayment}
      />
    </div>
  );
};
