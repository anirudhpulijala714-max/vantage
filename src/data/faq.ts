export type FAQCategory =
  | 'General'
  | 'Eligibility'
  | 'Documents'
  | 'EMI'
  | 'Application'
  | 'Repayment';

export interface FAQItem {
  id: string;
  category: FAQCategory;
  question: string;
  answer: string;
}

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'What is a personal loan and how does it work?',
    answer: 'A personal loan is an unsecured credit facility provided without requiring collateral, gold, or property pledge. Once your profile and documents are verified by partner lenders, funds are credited directly to your bank account and repaid in fixed monthly EMIs across your chosen tenure.',
  },
  {
    id: 'faq-2',
    category: 'General',
    question: 'Are there any restrictions on how I can spend my loan amount?',
    answer: 'No. You have complete flexibility over personal loan proceeds, including home improvement, urgent healthcare expenses, higher education fees, wedding celebrations, or debt consolidation. It may not be utilized for speculative trading or illicit purposes.',
  },
  {
    id: 'faq-3',
    category: 'Eligibility',
    question: 'What are the minimum eligibility criteria to apply?',
    answer: 'Applicants should be between 21 and 65 years old, hold Indian citizenship, have a continuous employment or business history, earn a minimum net take-home salary of ₹15,000/month, and possess a clean banking track record.',
  },
  {
    id: 'faq-4',
    category: 'Eligibility',
    question: 'Does checking my loan eligibility impact my credit bureau score?',
    answer: 'No. Our online eligibility calculator conducts a soft assessment using self-declared income and Debt-to-Income (FOIR) ratios. Soft checks do not trigger hard credit inquiries and have zero negative impact on your bureau rating.',
  },
  {
    id: 'faq-5',
    category: 'Documents',
    question: 'What essential documents do I need to keep ready?',
    answer: 'Standard documentation includes: (1) Identity Proof (PAN Card or Aadhaar), (2) Current Residence Proof (Utility bill, Passport, or Rental Agreement), (3) Income Proof (Last 3 months salary slips or last 2 years audited ITR), and (4) Bank Statement for the latest 6 months showing continuous salary or business credits.',
  },
  {
    id: 'faq-6',
    category: 'Documents',
    question: 'Can I upload digital PDF copies rather than physical papers?',
    answer: 'Yes. Vantage supports 100% paperless digital onboarding. Original e-PDF statements downloaded directly from your netbanking portal are preferred and expedite verification turnaround by up to 24 hours.',
  },
  {
    id: 'faq-7',
    category: 'EMI',
    question: 'How is the monthly personal loan EMI calculated?',
    answer: 'EMIs are computed using the reducing balance method: EMI = [P × R × (1+R)^N] / [(1+R)^N - 1], where P is Principal amount, R is monthly interest rate, and N is tenure in months. Interest is charged only on the remaining unpaid balance after each instalment.',
  },
  {
    id: 'faq-8',
    category: 'EMI',
    question: 'Can I alter my loan tenure or EMI after sanction?',
    answer: 'Tenure and EMI are locked once you execute your formal loan agreement and register your e-NACH mandate. However, you can make prepayments to shorten your tenure or reduce future interest outflow during the repayment lifecycle.',
  },
  {
    id: 'faq-9',
    category: 'Application',
    question: 'How long does the digital application process take?',
    answer: 'Filling the 4-step online application takes approximately 3 to 5 minutes. Once submitted with complete documents, underwriting decisions are usually issued within 24 to 48 business hours.',
  },
  {
    id: 'faq-10',
    category: 'Application',
    question: 'How can I track the live status of my loan request?',
    answer: 'Every applicant receives a unique Application Reference ID (e.g. VL-APP-XXXXXX). You can check real-time progress anytime via our Self-Service Tracking Portal at /status without having to call a contact center.',
  },
  {
    id: 'faq-11',
    category: 'Repayment',
    question: 'How do I pay my monthly instalments?',
    answer: 'Repayments are automated securely via electronic National Automated Clearing House (e-NACH) or standing debit instruction from your designated salary/current account on a fixed date each month.',
  },
  {
    id: 'faq-12',
    category: 'Repayment',
    question: 'Are there any penalties if I foreclose or prepay my loan early?',
    answer: 'Most partner institutions permit prepayment or total foreclosure after a nominal lock-in period (typically 6 to 12 months). Applicable foreclosure fees (ranging from 0% to 3% plus GST) are detailed transparently in your loan sanction letter.',
  },
];
