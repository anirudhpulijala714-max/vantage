import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EMICalculator, SavedLoanScenario } from '../components/EMICalculator';
import { ScenarioComparison } from '../components/ScenarioComparison';
import { useEMICalculator } from '../hooks/useEMICalculator';
import { formatINR, calculateEMI } from '../utils/calculations';
import { Button } from '../components/Button';
import { ArrowRight, Table, Sparkles, TrendingDown } from 'lucide-react';

export const CalculatorPage: React.FC = () => {
  const navigate = useNavigate();

  // Unified Calculator State
  const {
    loanAmount,
    interestRate,
    tenureYears,
    setLoanAmount,
    setInterestRate,
    setTenureYears,
    schedule,
    result,
  } = useEMICalculator({
    initialAmount: 700000,
    initialRate: 11.0,
    initialTenure: 4,
  });

  const [extraPrepayment, setExtraPrepayment] = useState<number>(2000);

  // Pre-seed temporary comparison list with initial representative calculations (Max 3)
  const [savedScenarios, setSavedScenarios] = useState<SavedLoanScenario[]>(() => {
    const s1 = calculateEMI(500000, 10.5, 3);
    const s2 = calculateEMI(500000, 10.5, 5);
    const s3 = calculateEMI(700000, 11.0, 4);

    return [
      {
        id: 'sc-seed-1',
        savedAt: '10:00 AM',
        loanAmount: 500000,
        interestRate: 10.5,
        tenureYears: 3,
        monthlyEMI: s1.monthlyEMI,
        totalInterest: s1.totalInterest,
        totalRepayment: s1.totalRepayment,
      },
      {
        id: 'sc-seed-2',
        savedAt: '10:05 AM',
        loanAmount: 500000,
        interestRate: 10.5,
        tenureYears: 5,
        monthlyEMI: s2.monthlyEMI,
        totalInterest: s2.totalInterest,
        totalRepayment: s2.totalRepayment,
      },
      {
        id: 'sc-seed-3',
        savedAt: '10:12 AM',
        loanAmount: 700000,
        interestRate: 11.0,
        tenureYears: 4,
        monthlyEMI: s3.monthlyEMI,
        totalInterest: s3.totalInterest,
        totalRepayment: s3.totalRepayment,
      },
    ];
  });

  // Handle saving a calculation: preserves strictly the last 3 calculated results
  const handleSaveScenario = (newScenario: SavedLoanScenario) => {
    setSavedScenarios((prev) => {
      // Check if identical scenario already exists (same amount, rate, tenure)
      const existingIndex = prev.findIndex(
        (s) =>
          s.loanAmount === newScenario.loanAmount &&
          s.interestRate === newScenario.interestRate &&
          s.tenureYears === newScenario.tenureYears
      );

      let updatedList: SavedLoanScenario[];
      if (existingIndex !== -1) {
        // Update its timestamp and bring to end
        const filtered = prev.filter((_, idx) => idx !== existingIndex);
        updatedList = [...filtered, newScenario];
      } else {
        updatedList = [...prev, newScenario];
      }

      // Keep only the last 3 items
      return updatedList.slice(-3);
    });
  };

  const handleSaveCurrent = () => {
    const newScenario: SavedLoanScenario = {
      id: `sc-${Date.now()}`,
      savedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      loanAmount,
      interestRate,
      tenureYears,
      monthlyEMI: result.monthlyEMI,
      totalInterest: result.totalInterest,
      totalRepayment: result.totalRepayment,
    };
    handleSaveScenario(newScenario);
  };

  const handleLoadScenario = (scenario: SavedLoanScenario) => {
    setLoanAmount(scenario.loanAmount);
    setInterestRate(scenario.interestRate);
    setTenureYears(scenario.tenureYears);

    // Scroll gently up to calculator
    const calculatorEl = document.getElementById('main-calculator-anchor');
    calculatorEl?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRemoveScenario = (id: string) => {
    setSavedScenarios((prev) => prev.filter((s) => s.id !== id));
  };

  const handleClearAll = () => {
    setSavedScenarios([]);
  };

  // Approximate prepayment savings calculation
  const months = tenureYears * 12;
  const currentTotalInterest = result.totalInterest;
  const estimatedSavings = Math.round(
    Math.min(currentTotalInterest * 0.45, (extraPrepayment * months * (interestRate / 100)) * 0.6)
  );

  return (
    <div className="space-y-16 sm:space-y-24 pb-24">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-14 sm:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-teal-400">Financial Modeling Tool</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Personal Loan EMI Calculator & Repayment Schedule
            </h1>
            <p className="text-base text-slate-300 leading-relaxed">
              Calculate reducing balance instalments, inspect annual amortization breakdowns, and compare different loan scenarios side-by-side.
            </p>
          </div>
        </div>
      </section>

      {/* Main Interactive Calculator (Controlled State) */}
      <section id="main-calculator-anchor" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <EMICalculator
          controlledAmount={loanAmount}
          controlledRate={interestRate}
          controlledTenure={tenureYears}
          onAmountChange={setLoanAmount}
          onRateChange={setInterestRate}
          onTenureChange={setTenureYears}
          onSaveScenario={handleSaveScenario}
          savedCount={savedScenarios.length}
          onCheckEligibility={() => navigate('/eligibility')}
        />
      </section>

      {/* Side-by-Side Loan Scenario Comparison (Last 3 Calculations) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScenarioComparison
          scenarios={savedScenarios}
          onLoadScenario={handleLoadScenario}
          onRemoveScenario={handleRemoveScenario}
          onClearAll={handleClearAll}
          onSaveCurrent={handleSaveCurrent}
          canSaveCurrent={true}
        />
      </section>

      {/* Prepayment Impact Simulator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-6">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-teal-700">Financial Insight</span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">Prepayment & Early Payoff Simulator</h3>
              <p className="text-xs text-slate-500 mt-0.5">See how paying a small extra principal monthly slashes your total interest burden.</p>
            </div>
            <div className="flex items-center gap-2">
              {[1000, 2000, 5000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setExtraPrepayment(amt)}
                  className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all ${
                    extraPrepayment === amt
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  +{formatINR(amt)}/mo
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-teal-50/70 border border-teal-100 rounded-xl">
              <span className="text-xs text-teal-800 font-semibold block">Potential Interest Saved</span>
              <span className="text-2xl font-extrabold text-teal-900 font-tabular mt-1 block">
                {formatINR(estimatedSavings)}
              </span>
              <span className="text-xs text-teal-700 mt-1 block">Direct savings on total finance charges</span>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-xs text-slate-500 font-medium block">Monthly Additional Principal</span>
              <span className="text-2xl font-extrabold text-slate-900 font-tabular mt-1 block">
                {formatINR(extraPrepayment)}
              </span>
              <span className="text-xs text-slate-500 mt-1 block">Added directly towards loan principal</span>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-xs text-slate-500 font-medium block">Tenure Reduction</span>
              <span className="text-2xl font-extrabold text-blue-700 font-tabular mt-1 block">
                4 – 8 Months
              </span>
              <span className="text-xs text-slate-500 mt-1 block">Closes your liability well ahead of schedule</span>
            </div>
          </div>
        </div>
      </section>

      {/* Annual Amortization Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Table className="w-5 h-5 text-blue-600" />
                Annual Amortization Repayment Schedule
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Representative schedule for {formatINR(loanAmount)} at {interestRate}% over {tenureYears} years.
              </p>
            </div>
            <Button
              variant="primary"
              size="sm"
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              onClick={() => navigate('/apply', { state: { prefillAmount: loanAmount, prefillTenure: tenureYears } })}
            >
              Apply for this Loan
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-700 uppercase tracking-wider">
                  <th className="py-3.5 px-5">Year</th>
                  <th className="py-3.5 px-5">Opening Balance</th>
                  <th className="py-3.5 px-5">Annual EMI Paid</th>
                  <th className="py-3.5 px-5 text-blue-700">Principal Paid</th>
                  <th className="py-3.5 px-5 text-teal-700">Interest Paid</th>
                  <th className="py-3.5 px-5">Closing Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-tabular">
                {schedule.map((row) => (
                  <tr key={row.year} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-5 font-semibold text-slate-900">Year {row.year}</td>
                    <td className="py-3 px-5 text-slate-600">{formatINR(row.openingBalance)}</td>
                    <td className="py-3 px-5 font-medium text-slate-800">{formatINR(row.emiPaid)}</td>
                    <td className="py-3 px-5 font-bold text-blue-800">{formatINR(row.principalPaid)}</td>
                    <td className="py-3 px-5 font-bold text-teal-800">{formatINR(row.interestPaid)}</td>
                    <td className="py-3 px-5 font-medium text-slate-900">{formatINR(row.closingBalance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 text-center">
            *All amortization values are computed mathematically using standard reducing-balance monthly compounding. Actual loan contracts may show minor variation due to first repayment cycle day adjustments.
          </div>
        </div>
      </section>
    </div>
  );
};
