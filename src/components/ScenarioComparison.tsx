import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SavedLoanScenario } from './EMICalculator';
import { formatINR } from '../utils/calculations';
import { Button } from './Button';
import {
  Columns2,
  Trash2,
  RotateCcw,
  ArrowRight,
  TrendingDown,
  Coins,
  Sparkles,
  CheckCircle2,
  PlusCircle
} from 'lucide-react';

interface ScenarioComparisonProps {
  scenarios: SavedLoanScenario[];
  onLoadScenario: (scenario: SavedLoanScenario) => void;
  onRemoveScenario: (id: string) => void;
  onClearAll: () => void;
  onSaveCurrent: () => void;
  canSaveCurrent: boolean;
}

export const ScenarioComparison: React.FC<ScenarioComparisonProps> = ({
  scenarios,
  onLoadScenario,
  onRemoveScenario,
  onClearAll,
  onSaveCurrent,
  canSaveCurrent,
}) => {
  const navigate = useNavigate();

  // Identify lowest EMI and lowest interest among saved scenarios
  const lowestEMI = scenarios.length > 0
    ? Math.min(...scenarios.map((s) => s.monthlyEMI))
    : 0;

  const lowestInterest = scenarios.length > 0
    ? Math.min(...scenarios.map((s) => s.totalInterest))
    : 0;

  return (
    <section id="scenarios-comparison" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-blue-700">Side-by-Side Analysis</span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
              {scenarios.length}/3 Scenarios Stored
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 flex items-center gap-2">
            <Columns2 className="w-5 h-5 text-blue-600" />
            Compare Loan Scenarios
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Compare monthly instalments, interest burden, and total liability across your last 3 calculations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {canSaveCurrent && (
            <Button
              variant="outline"
              size="sm"
              leftIcon={<PlusCircle className="w-3.5 h-3.5 text-blue-600" />}
              onClick={onSaveCurrent}
            >
              Save Current Calculation
            </Button>
          )}

          {scenarios.length > 0 && (
            <button
              type="button"
              onClick={onClearAll}
              className="text-xs text-slate-500 hover:text-red-600 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-red-200 hover:bg-red-50/50 transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear List</span>
            </button>
          )}
        </div>
      </div>

      {scenarios.length === 0 ? (
        <div className="text-center py-12 px-4 rounded-xl border border-dashed border-slate-200 bg-slate-50/50 space-y-3">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
            <Columns2 className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-slate-800">No Saved Scenarios Yet</h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            Adjust the sliders in the calculator above and click <strong className="text-slate-700">&ldquo;Save Scenario for Comparison&rdquo;</strong> to store and compare up to 3 loan options side-by-side.
          </p>
          <Button
            variant="secondary"
            size="sm"
            onClick={onSaveCurrent}
            leftIcon={<PlusCircle className="w-4 h-4" />}
          >
            Save Current Calculation as First Scenario
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenarios.map((item, idx) => {
            const isLowestEMI = scenarios.length > 1 && item.monthlyEMI === lowestEMI;
            const isLowestInterest = scenarios.length > 1 && item.totalInterest === lowestInterest;
            const principalPct = Math.round((item.loanAmount / item.totalRepayment) * 100);
            const interestPct = 100 - principalPct;

            return (
              <div
                key={item.id}
                className={`bg-white rounded-xl border transition-all flex flex-col justify-between overflow-hidden ${
                  isLowestEMI
                    ? 'border-blue-300 ring-2 ring-blue-100 shadow-sm'
                    : isLowestInterest
                    ? 'border-teal-300 ring-2 ring-teal-100 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div>
                  {/* Card Header */}
                  <div className="p-4 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900">
                          Scenario {idx + 1}
                        </span>
                        <span className="text-[10px] text-slate-600 font-mono">
                          ({item.savedAt})
                        </span>
                      </div>
                      <span className="text-xs text-slate-500 block mt-0.5">
                        {item.tenureYears} {item.tenureYears === 1 ? 'Year' : 'Years'} @ {item.interestRate}%
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveScenario(item.id)}
                      className="p-1 rounded-md text-slate-400 hover:text-red-600 hover:bg-slate-100 transition-colors"
                      title="Remove scenario"
                      aria-label="Remove scenario"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Highlights Badges */}
                  {(isLowestEMI || isLowestInterest) && (
                    <div className="px-4 pt-3 flex flex-wrap gap-1.5">
                      {isLowestEMI && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          <TrendingDown className="w-3 h-3" />
                          Lowest Monthly EMI
                        </span>
                      )}
                      {isLowestInterest && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                          <Coins className="w-3 h-3" />
                          Lowest Total Interest
                        </span>
                      )}
                    </div>
                  )}

                  {/* Monthly EMI Hero Box */}
                  <div className="p-4 space-y-4">
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 block">
                        Monthly EMI
                      </span>
                      <div className="text-2xl font-extrabold text-blue-700 font-tabular mt-0.5">
                        {formatINR(item.monthlyEMI)}
                        <span className="text-xs text-slate-500 font-normal"> / mo</span>
                      </div>
                    </div>

                    {/* Breakdown metrics list */}
                    <div className="space-y-2 text-xs divide-y divide-slate-100">
                      <div className="flex justify-between items-center pt-1">
                        <span className="text-slate-500">Principal Loan</span>
                        <span className="font-bold text-slate-900 font-tabular">
                          {formatINR(item.loanAmount)}
                        </span>
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <span className="text-slate-500">Interest Rate</span>
                        <span className="font-semibold text-slate-800 font-tabular">
                          {item.interestRate}% p.a.
                        </span>
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <span className="text-slate-500">Repayment Period</span>
                        <span className="font-semibold text-slate-800">
                          {item.tenureYears * 12} Months
                        </span>
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <span className="text-slate-500">Total Interest Payable</span>
                        <span className="font-bold text-teal-700 font-tabular">
                          {formatINR(item.totalInterest)}
                        </span>
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <span className="text-slate-500">Total Amount Payable</span>
                        <span className="font-extrabold text-slate-900 font-tabular">
                          {formatINR(item.totalRepayment)}
                        </span>
                      </div>
                    </div>

                    {/* Proportional visual bar */}
                    <div className="pt-2">
                      <div className="flex justify-between text-[10px] text-slate-500 mb-1 font-tabular">
                        <span>Principal: {principalPct}%</span>
                        <span>Interest: {interestPct}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden flex">
                        <div
                          className="bg-blue-600 h-full"
                          style={{ width: `${principalPct}%` }}
                          title={`Principal: ${principalPct}%`}
                        />
                        <div
                          className="bg-teal-500 h-full"
                          style={{ width: `${interestPct}%` }}
                          title={`Interest: ${interestPct}%`}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => onLoadScenario(item)}
                    className="w-full py-2 px-3 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-blue-600" />
                    <span>Load in Calculator</span>
                  </button>

                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full"
                    rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                    onClick={() =>
                      navigate('/apply', {
                        state: {
                          prefillAmount: item.loanAmount,
                          prefillTenure: item.tenureYears,
                        },
                      })
                    }
                  >
                    Apply for this Plan
                  </Button>
                </div>
              </div>
            );
          })}

          {/* Empty slot placeholder cards to emphasize max 3 */}
          {Array.from({ length: 3 - scenarios.length }).map((_, slotIdx) => (
            <div
              key={`empty-slot-${slotIdx}`}
              className="rounded-xl border border-dashed border-slate-200 bg-slate-50/40 p-6 flex flex-col items-center justify-center text-center space-y-3 min-h-[340px]"
            >
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold text-xs">
                {scenarios.length + slotIdx + 1}
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-700 block">
                  Scenario Slot {scenarios.length + slotIdx + 1} Available
                </span>
                <p className="text-[11px] text-slate-500 max-w-xs leading-relaxed">
                  Tweak loan amount or tenure in the calculator, then save to fill this comparison slot.
                </p>
              </div>
              <button
                type="button"
                onClick={onSaveCurrent}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Save Current Setting Here</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {scenarios.length > 0 && (
        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <span>
            *Temporary list holds your latest 3 calculated scenarios. Saving a 4th scenario automatically displaces the oldest one.
          </span>
          <span className="text-slate-600 font-medium">
            Session storage only • No personal data logged
          </span>
        </div>
      )}
    </section>
  );
};
