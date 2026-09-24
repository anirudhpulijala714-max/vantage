/**
 * Backend-Ready Service Layer
 * Structured for seamless API integration with production Express/REST/GraphQL backends.
 */

import { calculateEMI, EMICalculationResult } from '../utils/calculations';

export interface EligibilityRequest {
  fullName: string;
  mobile: string;
  email: string;
  employmentType: 'salaried' | 'self-employed' | 'business';
  monthlyIncome: number;
  existingEMI: number;
  requestedTenureYears: number;
  creditScoreRange: '750+' | '700-749' | '650-699' | 'below-650' | 'not-sure';
  city: string;
}

export interface EligibilityResponse {
  isEligible: boolean;
  maxEligibleAmount: number;
  estimatedInterestRate: number;
  estimatedMaxEMI: number;
  debtToIncomeRatio: number;
  recommendedTenureYears: number;
  referenceId: string;
  remarks: string[];
}

export interface ApplicationRequest {
  personal: {
    fullName: string;
    mobile: string;
    email: string;
    dob: string;
    city: string;
    pinCode: string;
    panNumber?: string;
  };
  employment: {
    employmentType: 'salaried' | 'self-employed' | 'professional';
    companyName: string;
    workExperienceYears: number;
    monthlyNetIncome: number;
    existingMonthlyEMIs: number;
  };
  loanRequirements: {
    amount: number;
    tenureYears: number;
    purpose: string;
  };
  agreedToTerms: boolean;
}

export interface ApplicationResponse {
  success: boolean;
  applicationId: string;
  status: 'SUBMITTED' | 'UNDER_REVIEW' | 'DOCS_PENDING';
  submittedAt: string;
  estimatedReviewTime: string;
  nextSteps: string[];
}

export interface CallbackRequest {
  fullName: string;
  mobile: string;
  preferredTimeSlot: string;
  loanAmountRange: string;
  notes?: string;
}

export interface ContactEnquiryRequest {
  fullName: string;
  email: string;
  mobile: string;
  subject: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Simulates network latency for realistic fintech UX
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const LoanApiService = {
  /**
   * Check borrower loan eligibility against income, obligations, and risk tiers
   */
  async checkEligibility(payload: EligibilityRequest): Promise<EligibilityResponse> {
    await delay(700);

    const income = Number(payload.monthlyIncome) || 0;
    const existingEMI = Number(payload.existingEMI) || 0;
    const requestedTenure = Number(payload.requestedTenureYears) || 3;

    // Fixed Obligation to Income Ratio (FOIR) standard max 50%
    const maxAllowedTotalObligation = income * 0.5;
    const availableMonthlyCapacity = Math.max(0, maxAllowedTotalObligation - existingEMI);
    const dtiRatio = income > 0 ? Math.round((existingEMI / income) * 100) : 0;

    // Rate estimation based on credit profile
    let interestRate = 11.5;
    if (payload.creditScoreRange === '750+') interestRate = 10.5;
    else if (payload.creditScoreRange === '700-749') interestRate = 11.25;
    else if (payload.creditScoreRange === '650-699') interestRate = 13.0;
    else if (payload.creditScoreRange === 'below-650') interestRate = 15.5;

    const isEligible = income >= 20000 && availableMonthlyCapacity >= 2500;

    // Calculate max principal amount that available monthly capacity can service
    let maxPrincipal = 0;
    if (isEligible) {
      const r = interestRate / 12 / 100;
      const n = requestedTenure * 12;
      const factor = (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n));
      maxPrincipal = Math.min(2500000, Math.round(availableMonthlyCapacity * factor));
      // Round to nearest 10,000
      maxPrincipal = Math.floor(maxPrincipal / 10000) * 10000;
    }

    const remarks: string[] = [];
    if (isEligible) {
      remarks.push('Income meets standard lender minimum requirements.');
      remarks.push(`Current debt commitments estimated at ${dtiRatio}% of monthly income.`);
      remarks.push('Offer terms subject to document verification and final lender review.');
    } else {
      if (income < 20000) {
        remarks.push('Minimum monthly net income of ₹20,000 is typically required.');
      }
      if (availableMonthlyCapacity < 2500) {
        remarks.push('High existing monthly obligations relative to current income.');
      }
    }

    const refId = `VL-ELG-${Math.floor(100000 + Math.random() * 900000)}`;

    return {
      isEligible,
      maxEligibleAmount: Math.max(50000, maxPrincipal),
      estimatedInterestRate: interestRate,
      estimatedMaxEMI: Math.round(availableMonthlyCapacity),
      debtToIncomeRatio: dtiRatio,
      recommendedTenureYears: requestedTenure,
      referenceId: refId,
      remarks,
    };
  },

  /**
   * Submit complete loan application
   */
  async submitApplication(payload: ApplicationRequest): Promise<ApplicationResponse> {
    await delay(900);

    const appId = `VL-APP-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

    return {
      success: true,
      applicationId: appId,
      status: 'SUBMITTED',
      submittedAt: new Date().toISOString(),
      estimatedReviewTime: '24 to 48 Hours',
      nextSteps: [
        'A dedicated relationship manager will verify your submitted profile details.',
        'Keep soft copies of PAN, Aadhaar, and last 3 months bank statements ready.',
        'You will receive SMS & email updates on application status changes.',
      ],
    };
  },

  /**
   * Request a quick telephonic callback
   */
  async requestCallback(payload: CallbackRequest): Promise<ApiResponse<{ callbackId: string }>> {
    await delay(600);
    return {
      success: true,
      data: {
        callbackId: `CB-${Math.floor(10000 + Math.random() * 90000)}`,
      },
      message: 'Your callback request has been received. An advisor will contact you during your preferred time window.',
    };
  },

  /**
   * Submit general contact inquiry
   */
  async submitContact(payload: ContactEnquiryRequest): Promise<ApiResponse<{ ticketId: string }>> {
    await delay(700);
    return {
      success: true,
      data: {
        ticketId: `TCK-${Math.floor(10000 + Math.random() * 90000)}`,
      },
      message: 'Thank you for reaching out. Our support team will respond to your inquiry within 1 business day.',
    };
  },

  /**
   * Calculate EMI client-side or backend-synchronized
   */
  async calculateEMI(principal: number, interestRate: number, tenureYears: number): Promise<EMICalculationResult> {
    return calculateEMI(principal, interestRate, tenureYears);
  },
};
