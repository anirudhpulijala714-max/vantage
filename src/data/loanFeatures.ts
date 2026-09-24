export interface Benefit {
  id: string;
  title: string;
  description: string;
  iconName: string;
  metric?: string;
  badge?: string;
}

export interface DocumentCategory {
  category: string;
  description: string;
  items: string[];
  mandatoryNote?: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  timeEstimate: string;
  details: string[];
}

export const LOAN_BENEFITS: Benefit[] = [
  {
    id: 'b-1',
    title: 'Flexible Loan Amounts',
    description: 'Borrow between ₹50,000 and ₹25,00,000 tailored precisely to your specific financial milestone or emergency.',
    iconName: 'Banknote',
    metric: '₹50K to ₹25L'
  },
  {
    id: 'b-2',
    title: 'Transparent Interest Terms',
    description: 'Competitive annual percentage rates starting from 10.5% p.a. with zero hidden origination charges or surprise clauses.',
    iconName: 'Percent',
    metric: 'From 10.5% p.a.'
  },
  {
    id: 'b-3',
    title: 'Customizable Tenure',
    description: 'Choose comfortable repayment horizons spanning 12 to 60 months with predictable monthly reducing-balance EMIs.',
    iconName: 'CalendarClock',
    metric: '12 – 60 Months'
  },
  {
    id: 'b-4',
    title: '100% Digital Assessment',
    description: 'Eliminate tedious physical paperwork with paperless identity verification and rapid eligibility confirmation.',
    iconName: 'ShieldCheck',
    metric: 'Paperless'
  },
  {
    id: 'b-5',
    title: 'No Collateral Required',
    description: 'Unsecured personal financing based strictly on your verified income, professional stability, and credit profile.',
    iconName: 'LockKeyhole',
    metric: 'Zero Pledging'
  },
  {
    id: 'b-6',
    title: 'Dedicated Loan Advisory',
    description: 'Experienced loan advisors assist you through documentation, eligibility optimization, and disbursement follow-ups.',
    iconName: 'Headphones',
    metric: 'Direct Support'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Enter Basic Details',
    description: 'Provide your contact information, employment type, and net monthly income in our secure 2-minute form.',
    timeEstimate: '2 mins',
    details: ['Personal details', 'Monthly income', 'City & residence']
  },
  {
    step: '02',
    title: 'Instant Eligibility Check',
    description: 'Our rule-based engine assesses your borrowing power against lender underwriting criteria without affecting your credit score.',
    timeEstimate: 'Instant',
    details: ['Soft eligibility scan', 'FOIR ratio check', 'Tenure matching']
  },
  {
    step: '03',
    title: 'Review Customized Offers',
    description: 'Compare interest rates, processing charges, and EMI schedules across partnered scheduled commercial lenders.',
    timeEstimate: 'Immediate',
    details: ['Transparent comparison', 'EMI breakdown', 'No obligations']
  },
  {
    step: '04',
    title: 'Documentation & Sanction',
    description: 'Complete digital KYC, submit bank verification, and receive the sanctioned amount directly in your active bank account.',
    timeEstimate: '24–48 hours',
    details: ['Digital e-KYC', 'e-NACH mandate', 'Direct electronic transfer']
  }
];

export const REQUIRED_DOCUMENTS: DocumentCategory[] = [
  {
    category: 'Identity Proof',
    description: 'Government-issued photo identification to verify personal identity.',
    items: ['PAN Card (Mandatory for credit verification)', 'Aadhaar Card (Linked with active mobile)', 'Valid Passport or Voter ID Card'],
    mandatoryNote: 'PAN card is compulsory for tax & credit bureau identification.'
  },
  {
    category: 'Address Proof',
    description: 'Verification of your current residential stability.',
    items: ['Aadhaar Card / Passport', 'Recent Electricity / Utility Bill (last 2 months)', 'Registered Rent Agreement with recent utility bill'],
  },
  {
    category: 'Income Proof (Salaried)',
    description: 'Validating stable salary credits from registered employer.',
    items: ['Latest 3 months salary slips', 'Latest Form 16 or Annual Tax Filing', 'Official corporate email verification or Employee ID card'],
  },
  {
    category: 'Income Proof (Self-Employed)',
    description: 'For business owners, consultants, and professionals.',
    items: ['Latest 2 years Income Tax Returns (ITR) with Computation of Income', 'Audited Profit & Loss and Balance Sheet (if applicable)', 'Business Registration / GST Certificate'],
  },
  {
    category: 'Banking Records',
    description: 'Evaluating financial cash flow and existing repayment history.',
    items: ['Last 6 months updated bank statement in PDF format (salary / primary operational account)', 'e-Mandate / Cancelled cheque for disbursement'],
  }
];

export const USE_CASES = [
  {
    title: 'Medical Emergencies',
    description: 'Immediate liquidity to cover unexpected hospital bills, treatments, or surgeries without liquidating investments.',
    iconName: 'HeartPulse'
  },
  {
    title: 'Home Renovation',
    description: 'Upgrade your living space, remodel kitchen or bathrooms, or repair property with structured financing.',
    iconName: 'Home'
  },
  {
    title: 'Debt Consolidation',
    description: 'Combine multiple high-interest credit card dues into a single lower-interest, predictable monthly EMI.',
    iconName: 'Layers'
  },
  {
    title: 'Higher Education & Certifications',
    description: 'Invest in skill enhancement, executive diplomas, or overseas course fees with convenient repayment horizons.',
    iconName: 'GraduationCap'
  },
  {
    title: 'Wedding & Family Celebrations',
    description: 'Manage venue, catering, and milestone event expenses seamlessly without exhausting emergency reserves.',
    iconName: 'Sparkles'
  },
  {
    title: 'Travel & Relocation',
    description: 'Fund domestic or international relocations, security deposits, and planned family vacations.',
    iconName: 'Plane'
  }
];
