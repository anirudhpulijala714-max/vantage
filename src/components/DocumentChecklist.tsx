import React, { useState } from 'react';
import { CheckSquare, Square, FileText, CheckCircle2, RotateCcw } from 'lucide-react';
import { Button } from './Button';

interface ChecklistItem {
  id: string;
  name: string;
  description: string;
  acceptedFiles: string;
}

export const DocumentChecklist: React.FC = () => {
  const defaultItems: ChecklistItem[] = [
    {
      id: 'pan',
      name: 'Permanent Account Number (PAN Card)',
      description: 'Mandatory government identity document for financial credit checks.',
      acceptedFiles: 'PAN Card copy / e-PAN PDF',
    },
    {
      id: 'address',
      name: 'Valid Residence / Address Proof',
      description: 'Current residential address verification document matching applicant identity.',
      acceptedFiles: 'Aadhaar Card, Passport, Voter ID, or Utility Bill (<3 months old)',
    },
    {
      id: 'income',
      name: 'Recent Income Proof (Salary Slips / ITR)',
      description: 'Verifies monthly financial capacity and current employer compensation.',
      acceptedFiles: 'Last 3 months salary slips or last 2 years audited ITR with computation',
    },
    {
      id: 'bank-statement',
      name: 'Bank Account Statements (Past 6 Months)',
      description: 'Shows active salary/business credit deposits and banking cleanliness.',
      acceptedFiles: 'Last 6 months digital bank PDF statement with transaction history',
    },
    {
      id: 'employment',
      name: 'Employment / Business Continuity Proof',
      description: 'Proves current stability and professional vintage.',
      acceptedFiles: 'Official employee ID card, appointment letter, or GST registration certificate',
    },
  ];

  const [checkedIds, setCheckedIds] = useState<string[]>(['pan']);

  const toggleItem = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const completedCount = checkedIds.length;
  const progressPercent = Math.round((completedCount / defaultItems.length) * 100);

  const resetAll = () => {
    setCheckedIds([]);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-teal-600 dark:text-teal-400">
            Self-Check Readiness Tool
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            Interactive Document Checklist
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Mark off documents you currently have accessible to ensure rapid digital disbursal.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs font-bold text-slate-900 dark:text-white font-tabular block">
              {completedCount} of {defaultItems.length} Ready ({progressPercent}%)
            </span>
            <div className="w-28 sm:w-36 h-2 bg-slate-100 dark:bg-slate-800 rounded-full mt-1 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          {completedCount > 0 && (
            <button
              onClick={resetAll}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs flex items-center gap-1"
              title="Reset checklist"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Checklist items */}
      <div className="space-y-3">
        {defaultItems.map((item) => {
          const isChecked = checkedIds.includes(item.id);
          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                isChecked
                  ? 'bg-teal-50/50 dark:bg-teal-950/20 border-teal-200 dark:border-teal-800/60 shadow-xs'
                  : 'bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="mt-0.5 shrink-0 text-teal-600 dark:text-teal-400">
                {isChecked ? (
                  <CheckSquare className="w-5 h-5 fill-teal-100 dark:fill-teal-900" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400 dark:text-slate-600" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4
                    className={`text-sm font-bold ${
                      isChecked
                        ? 'text-teal-950 dark:text-teal-200'
                        : 'text-slate-900 dark:text-white'
                    }`}
                  >
                    {item.name}
                  </h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  {item.description}
                </p>
                <span className="inline-block text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-1">
                  Accepted: {item.acceptedFiles}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
        <p className="italic">
          *Required documents may vary depending on applicant profile and lender requirements.
        </p>
        <span className="font-semibold text-slate-700 dark:text-slate-300">
          Tip: Digital PDF statements speed up verification by up to 24 hours.
        </span>
      </div>
    </div>
  );
};
