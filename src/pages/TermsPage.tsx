import React from 'react';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <div>
        <span className="text-xs uppercase tracking-wider font-semibold text-blue-700">Legal Terms</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">Terms and Conditions</h1>
        <p className="text-xs text-slate-500 mt-2">Last Updated: September 2026</p>
      </div>

      <div className="prose prose-slate max-w-none text-sm text-slate-600 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Vantage Personal Loans website (&ldquo;Platform&rdquo;), you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, please refrain from using our services.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">2. Informational Nature of Tools & Calculators</h2>
          <p>
            The EMI calculators, eligibility assessment tools, and financial illustrations provided on this platform are for general educational and planning purposes only. They do not constitute a formal loan sanction, binding offer, or credit guarantee.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">3. Underwriting & Lender Discretion</h2>
          <p>
            Final loan approval, sanctioned loan amount, applicable interest rates, processing fees, and repayment tenures remain at the sole discretion of partner banks and registered Non-Banking Financial Companies (NBFCs), governed by their internal risk and credit underwriting policies.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">4. Applicant Declarations & Accuracy</h2>
          <p>
            You declare that all information submitted during eligibility checks and loan applications is true, accurate, and complete. Any intentional misrepresentation or fraudulent submission may lead to immediate rejection of the loan application and potential legal repercussions under applicable law.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">5. Limitation of Liability</h2>
          <p>
            Vantage Personal Loans shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use the platform or any loan denial by partnered financial institutions.
          </p>
        </section>
      </div>
    </div>
  );
};
