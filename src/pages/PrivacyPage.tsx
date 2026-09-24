import React from 'react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <div>
        <span className="text-xs uppercase tracking-wider font-semibold text-blue-700">Legal & Compliance</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">Privacy Policy</h1>
        <p className="text-xs text-slate-500 mt-2">Last Updated: September 2026</p>
      </div>

      <div className="prose prose-slate max-w-none text-sm text-slate-600 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">1. Information We Collect</h2>
          <p>
            When you use Vantage Personal Loans to evaluate borrowing eligibility or submit an application, we collect personal identity details (full name, email, phone number, date of birth, residential city), employment details (employer name, monthly salary, years of work experience), and financial commitments (existing monthly EMIs).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">2. How We Use Your Information</h2>
          <p>
            We process your information strictly for:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Calculating estimated reducing balance EMIs and debt-to-income servicing capacity.</li>
            <li>Evaluating preliminary loan eligibility against partner lending criteria.</li>
            <li>Routing loan applications to authorized commercial lending partners with your explicit consent.</li>
            <li>Communicating service updates, application status milestones, and answering inquiries.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">3. Data Security & Storage</h2>
          <p>
            All data transmitted through our web portal is encrypted using industry-standard 256-bit Secure Socket Layer (SSL/TLS) protocols. We never store sensitive banking credentials, passwords, or debit card PINs on our servers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">4. Third-Party Sharing</h2>
          <p>
            We do not sell, rent, or lease your personal contact details to third-party telemarketers. Information is shared strictly with participating regulated banks, NBFCs, and credit information companies (such as CIBIL or Experian) solely for the purpose of underwriting your loan application upon your consent.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">5. Contact Us</h2>
          <p>
            If you have questions regarding this Privacy Policy or wish to exercise your data rights, please contact our Data Protection Officer at privacy@example.com.
          </p>
        </section>
      </div>
    </div>
  );
};
