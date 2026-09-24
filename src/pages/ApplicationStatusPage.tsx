import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Search,
  CheckCircle2,
  Clock,
  FileCheck,
  AlertCircle,
  Building,
  HelpCircle,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Button } from '../components/Button';
import { formatINR } from '../utils/calculations';

interface ApplicationTimelineStep {
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  timestamp?: string;
}

export const ApplicationStatusPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialId = searchParams.get('id') || '';

  const [appId, setAppId] = useState(initialId);
  const [searchedId, setSearchedId] = useState(initialId);
  const [hasSearched, setHasSearched] = useState(Boolean(initialId));
  const [isSearching, setIsSearching] = useState(false);

  // Mock application record
  const mockApplicationData = {
    id: searchedId || 'VL-APP-849201',
    applicantName: 'Applicant (Verified via Reference)',
    submittedOn: 'September 24, 2026',
    requestedAmount: 500000,
    tenure: '36 Months',
    currentStage: 'Underwriting Review',
    statusBadge: 'In Progress (Active Review)',
    estimatedDecisionTime: 'Within 24 Hours',
    timeline: [
      {
        title: '1. Application Received',
        description: 'Application metadata, requested loan terms, and applicant contact profile registered in system.',
        status: 'completed' as const,
        timestamp: 'Sep 24, 2026 • 10:14 AM',
      },
      {
        title: '2. Information Verification',
        description: 'Automated soft KYC verification and employment records authenticated.',
        status: 'completed' as const,
        timestamp: 'Sep 24, 2026 • 11:30 AM',
      },
      {
        title: '3. Underwriting Review',
        description: 'Credit assessment desk evaluating monthly Debt-to-Income capacity and final APR tier.',
        status: 'current' as const,
        timestamp: 'In Progress',
      },
      {
        title: '4. Sanction Decision',
        description: 'Final loan sanction letter generated with approved amount, interest rate, and repayment schedule.',
        status: 'upcoming' as const,
      },
      {
        title: '5. Disbursal & Next Steps',
        description: 'Digital agreement e-sign, e-NACH mandate registration, and direct account disbursement.',
        status: 'upcoming' as const,
      },
    ],
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appId.trim()) return;

    setIsSearching(true);
    setTimeout(() => {
      setSearchedId(appId.trim().toUpperCase());
      setHasSearched(true);
      setIsSearching(false);
    }, 400);
  };

  const handleUseDemo = (demoId: string) => {
    setAppId(demoId);
    setSearchedId(demoId);
    setHasSearched(true);
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-24">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-14 sm:py-18">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs uppercase tracking-wider font-semibold text-teal-400">
            Self-Service Tracking Portal
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Track Application Status
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Enter your unique Application Reference ID to check real-time progress and underwriting status.
          </p>
        </div>
      </section>

      {/* Search Input Box */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 relative z-10">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 sm:p-8 space-y-4">
          <form onSubmit={handleSearch} className="space-y-3">
            <label htmlFor="ref-input" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Enter Application Reference ID
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="ref-input"
                  type="text"
                  placeholder="e.g. VL-APP-849201"
                  value={appId}
                  onChange={(e) => setAppId(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm sm:text-base text-slate-900 dark:text-white font-mono uppercase focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                size="md"
                className="bg-gradient-to-r from-blue-600 to-indigo-600"
                isLoading={isSearching}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Track Status
              </Button>
            </div>
          </form>

          {/* Quick Demo ID helper */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
            <span>Try demo references:</span>
            <button
              type="button"
              onClick={() => handleUseDemo('VL-APP-849201')}
              className="text-blue-600 dark:text-blue-400 font-mono hover:underline"
            >
              VL-APP-849201
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => handleUseDemo('VL-APP-192843')}
              className="text-blue-600 dark:text-blue-400 font-mono hover:underline"
            >
              VL-APP-192843
            </button>
          </div>
        </div>
      </section>

      {/* Tracking Results Area */}
      {hasSearched && (
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-200">
          {/* Status Overview Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono block">Reference ID</span>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-mono">
                  {mockApplicationData.id}
                </h3>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-bold self-start sm:self-auto">
                <Clock className="w-3.5 h-3.5" />
                <span>{mockApplicationData.statusBadge}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-500 dark:text-slate-400 block">Submitted On</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{mockApplicationData.submittedOn}</span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 block">Requested Amount</span>
                <span className="font-bold text-slate-900 dark:text-white font-tabular">{formatINR(mockApplicationData.requestedAmount)}</span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 block">Tenure</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{mockApplicationData.tenure}</span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 block">Decision Window</span>
                <span className="font-semibold text-teal-600 dark:text-teal-400">{mockApplicationData.estimatedDecisionTime}</span>
              </div>
            </div>

            {/* 5-Step Timeline */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Application Progression Milestones
              </h4>

              <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
                {mockApplicationData.timeline.map((step, idx) => {
                  const isCompleted = step.status === 'completed';
                  const isCurrent = step.status === 'current';

                  return (
                    <div key={idx} className="relative group">
                      {/* Step Indicator Dot */}
                      <div
                        className={`absolute -left-6 sm:-left-8 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isCompleted
                            ? 'bg-teal-600 text-white'
                            : isCurrent
                            ? 'bg-blue-600 text-white ring-4 ring-blue-100 dark:ring-blue-900/40 animate-pulse'
                            : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h5
                            className={`text-sm font-bold ${
                              isCurrent
                                ? 'text-blue-600 dark:text-blue-400'
                                : isCompleted
                                ? 'text-slate-900 dark:text-white'
                                : 'text-slate-500 dark:text-slate-400'
                            }`}
                          >
                            {step.title}
                          </h5>
                          {step.timestamp && (
                            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                              {step.timestamp}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Assistance Box */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <HelpCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>Need to provide updated bank statements or change loan amount?</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="whitespace-nowrap"
                onClick={() => navigate('/contact')}
              >
                Contact Desk
              </Button>
            </div>
          </div>

          {/* Demo disclaimer banner */}
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Demo Notice:</strong> This tracking interface demonstrates the client-side progression workflow. In production deployments, this component pulls live underwriting status from secure partner loan origination webhooks.
            </p>
          </div>
        </section>
      )}
    </div>
  );
};
