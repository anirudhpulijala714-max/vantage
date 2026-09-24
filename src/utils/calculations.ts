/**
 * Financial Calculations & Formatting Utilities
 * Standard Reducing Balance EMI Formula:
 * EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]
 * where:
 * P = Principal loan amount
 * R = Monthly interest rate (Annual rate / 12 / 100)
 * N = Tenure in months
 */

export interface EMICalculationResult {
  monthlyEMI: number;
  principalAmount: number;
  totalInterest: number;
  totalRepayment: number;
  interestPercentage: number;
  principalPercentage: number;
}

export interface AmortizationRow {
  year: number;
  openingBalance: number;
  emiPaid: number;
  principalPaid: number;
  interestPaid: number;
  closingBalance: number;
}

/**
 * Calculates accurate Reducing Balance EMI and breakdown
 */
export function calculateEMI(
  principal: number,
  annualInterestRate: number,
  tenureYears: number
): EMICalculationResult {
  const p = Math.max(10000, Number(principal) || 10000);
  const annualRate = Math.max(0.1, Number(annualInterestRate) || 10.5);
  const years = Math.max(1, Number(tenureYears) || 1);
  const n = years * 12; // Total months
  const r = annualRate / 12 / 100; // Monthly rate decimal

  // EMI formula
  const numerator = p * r * Math.pow(1 + r, n);
  const denominator = Math.pow(1 + r, n) - 1;
  const emi = Math.round(numerator / denominator);

  const totalRepayment = emi * n;
  const totalInterest = Math.max(0, totalRepayment - p);

  const principalPercentage = Math.round((p / totalRepayment) * 100);
  const interestPercentage = Math.max(0, 100 - principalPercentage);

  return {
    monthlyEMI: emi,
    principalAmount: p,
    totalInterest,
    totalRepayment,
    interestPercentage,
    principalPercentage,
  };
}

/**
 * Generates annual amortization schedule for repayment analysis
 */
export function generateAmortizationSchedule(
  principal: number,
  annualInterestRate: number,
  tenureYears: number
): AmortizationRow[] {
  const years = Math.max(1, Math.min(10, Number(tenureYears) || 1));
  const r = (Number(annualInterestRate) || 10.5) / 12 / 100;
  const totalMonths = years * 12;
  const numerator = principal * r * Math.pow(1 + r, totalMonths);
  const denominator = Math.pow(1 + r, totalMonths) - 1;
  const monthlyEMI = numerator / denominator;

  let balance = principal;
  const rows: AmortizationRow[] = [];

  for (let year = 1; year <= years; year++) {
    const opening = balance;
    let yearPrincipal = 0;
    let yearInterest = 0;

    for (let month = 1; month <= 12; month++) {
      if (balance <= 0) break;
      const monthInterest = balance * r;
      const monthPrincipal = Math.min(balance, monthlyEMI - monthInterest);
      yearInterest += monthInterest;
      yearPrincipal += monthPrincipal;
      balance -= monthPrincipal;
    }

    rows.push({
      year,
      openingBalance: Math.round(opening),
      emiPaid: Math.round(yearPrincipal + yearInterest),
      principalPaid: Math.round(yearPrincipal),
      interestPaid: Math.round(yearInterest),
      closingBalance: Math.max(0, Math.round(balance)),
    });
  }

  return rows;
}

/**
 * Format Indian Rupee currency (e.g. ₹ 5,00,000)
 */
export function formatINR(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '₹ 0';
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

/**
 * Format compact Indian denomination (e.g. ₹ 5 Lakhs, ₹ 10.5 K)
 */
export function formatCompactINR(amount: number): string {
  if (amount >= 10000000) {
    return `₹ ${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    return `₹ ${(amount / 100000).toFixed(amount % 100000 === 0 ? 0 : 1)} Lakh`;
  }
  if (amount >= 1000) {
    return `₹ ${(amount / 1000).toFixed(0)} K`;
  }
  return `₹ ${amount}`;
}
