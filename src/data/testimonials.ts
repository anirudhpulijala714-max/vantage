export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  city: string;
  loanPurpose: string;
  rating: number;
  quote: string;
  tenureYears: number;
  isPlaceholderData: boolean;
}

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Rajesh K.',
    role: 'Senior Software Engineer',
    city: 'Bengaluru',
    loanPurpose: 'Home Renovation',
    rating: 5,
    quote: 'The EMI calculator gave me an exact realistic breakdown before applying. The digital eligibility check took 3 minutes and the documentation guidance was crystal clear without hidden fees.',
    tenureYears: 3,
    isPlaceholderData: true,
  },
  {
    id: 'test-2',
    name: 'Pooja Sharma',
    role: 'Product Marketing Manager',
    city: 'Pune',
    loanPurpose: 'Higher Education Course',
    rating: 5,
    quote: 'Very transparent process compared to traditional bank visits. I received clear terms for my 24-month tenure and customer support answered my questions promptly before final sanction.',
    tenureYears: 2,
    isPlaceholderData: true,
  },
  {
    id: 'test-3',
    name: 'Vikramaditya S.',
    role: 'Operations Director',
    city: 'Hyderabad',
    loanPurpose: 'Medical Contingency',
    rating: 5,
    quote: 'During an unexpected emergency, speed and clarity matter most. The paperless verification workflow was seamless and completed within 36 hours. Highly recommend the structured guidance.',
    tenureYears: 4,
    isPlaceholderData: true,
  },
  {
    id: 'test-4',
    name: 'Ananya Deshmukh',
    role: 'Chartered Accountant',
    city: 'Mumbai',
    loanPurpose: 'Debt Consolidation',
    rating: 5,
    quote: 'Consolidated two credit card balances into one structured personal loan at a significantly lower interest rate. Saved substantially on monthly outgo with a predictable repayment schedule.',
    tenureYears: 3,
    isPlaceholderData: true,
  }
];
