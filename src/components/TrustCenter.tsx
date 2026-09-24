import React from 'react';
import {
  ShieldCheck,
  Lock,
  FileText,
  Headphones,
  CheckCircle2,
  Scale
} from 'lucide-react';

export const TrustCenter: React.FC = () => {
  const trustPillars = [
    {
      icon: <Lock className="w-5 h-5 text-indigo-500" />,
      title: 'Secure Application Process',
      description:
        'All online interactions, document uploads, and soft assessments take place through verified HTTPS protocols to protect your submitted details.',
      highlight: 'End-to-End Encrypted',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-teal-500" />,
      title: 'Strict Data Privacy',
      description:
        'We never sell or distribute your contact records to spam telemarketers. Information is handled solely for processing your verified credit evaluation.',
      highlight: 'No Spam Policy',
    },
    {
      icon: <FileText className="w-5 h-5 text-blue-500" />,
      title: 'Transparent Terms & Fees',
      description:
        'Interest rate brackets, processing charges, and repayment calculations are presented upfront before any contractual commitment is signed.',
      highlight: 'Zero Hidden Charges',
    },
    {
      icon: <Headphones className="w-5 h-5 text-purple-500" />,
      title: 'Dedicated Customer Support',
      description:
        'Connect directly with experienced loan advisors via callback, telephone, WhatsApp, or email throughout your borrowing journey.',
      highlight: 'Direct Human Advisory',
    },
    {
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
      title: 'Clear Documentation Guidelines',
      description:
        'Simple, structured checklist for KYC and income proofs so you know exactly what is required with no ambiguous requests.',
      highlight: 'Paperless Digital KYC',
    },
    {
      icon: <Scale className="w-5 h-5 text-amber-500" />,
      title: 'Responsible Lending Principles',
      description:
        'We evaluate Debt-to-Income (FOIR) ratios to ensure proposed repayment commitments remain realistic and manageable for your financial wellness.',
      highlight: 'Debt-Burden Protection',
    },
  ];

  return (
    <div className="space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400">
          Commitment to Integrity
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Vantage Trust Center
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Every policy, calculator, and underwriting assessment on our platform is grounded in customer transparency, digital safety, and responsible lending standards.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trustPillars.map((pillar, idx) => (
          <div
            key={idx}
            className="group bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {pillar.icon}
                </div>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 font-mono">
                  {pillar.highlight}
                </span>
              </div>

              <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {pillar.title}
              </h4>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
