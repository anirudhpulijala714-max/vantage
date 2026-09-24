import React from 'react';
import { ApplicationForm } from '../components/ApplicationForm';
import { ShieldCheck, Lock, Headphones } from 'lucide-react';

export const ApplyPage: React.FC = () => {
  return (
    <div className="space-y-12 sm:space-y-16 pb-24">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs uppercase tracking-wider font-semibold text-teal-400">Digital Origination Desk</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Apply for a Personal Loan
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Complete the 4-step digital onboarding to submit your application for soft underwriting review.
          </p>
        </div>
      </section>

      {/* Main Application Container */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ApplicationForm />

        {/* Security and privacy reassurance */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="flex flex-col items-center p-3">
            <Lock className="w-5 h-5 text-slate-400 mb-1" />
            <span className="text-xs font-semibold text-slate-800">256-Bit SSL Encryption</span>
            <span className="text-[11px] text-slate-500">Your documents are safe</span>
          </div>

          <div className="flex flex-col items-center p-3">
            <ShieldCheck className="w-5 h-5 text-teal-600 mb-1" />
            <span className="text-xs font-semibold text-slate-800">Zero Spam Guarantee</span>
            <span className="text-[11px] text-slate-500">No unsolicited calls</span>
          </div>

          <div className="flex flex-col items-center p-3">
            <Headphones className="w-5 h-5 text-blue-600 mb-1" />
            <span className="text-xs font-semibold text-slate-800">Advisory Support</span>
            <span className="text-[11px] text-slate-500">Help available at each step</span>
          </div>
        </div>
      </section>
    </div>
  );
};
