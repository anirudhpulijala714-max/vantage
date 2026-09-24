import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoanApiService, EligibilityResponse } from '../services/api';
import { formatINR } from '../utils/calculations';
import { Button } from './Button';
import { Input } from './Input';
import { SecurityBadge } from './SecurityBadge';
import {
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Calendar,
  Briefcase,
  Wallet,
  Coins,
  Clock,
  MapPin,
  Check
} from 'lucide-react';

export const EligibilityForm: React.FC = () => {
  const navigate = useNavigate();

  // 6-step inputs
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [age, setAge] = useState<number>(29);
  const [employmentType, setEmploymentType] = useState<'salaried' | 'self-employed' | 'business'>('salaried');
  const [monthlyIncome, setMonthlyIncome] = useState<number | string>(65000);
  const [existingEMI, setExistingEMI] = useState<number | string>(5000);
  const [loanAmount, setLoanAmount] = useState<number | string>(500000);
  const [preferredTenure, setPreferredTenure] = useState<number>(3);
  const [city, setCity] = useState('Bengaluru');
  const [mobile, setMobile] = useState('');
  const [fullName, setFullName] = useState('');

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<EligibilityResponse | null>(null);

  const stepLabels = [
    { num: 1, label: 'Age', icon: <Calendar className="w-3.5 h-3.5" /> },
    { num: 2, label: 'Employment', icon: <Briefcase className="w-3.5 h-3.5" /> },
    { num: 3, label: 'Income', icon: <Wallet className="w-3.5 h-3.5" /> },
    { num: 4, label: 'Amount', icon: <Coins className="w-3.5 h-3.5" /> },
    { num: 5, label: 'Tenure', icon: <Clock className="w-3.5 h-3.5" /> },
    { num: 6, label: 'Location', icon: <MapPin className="w-3.5 h-3.5" /> },
  ];

  const handleNext = () => {
    setError('');
    if (currentStep === 1) {
      if (age < 21 || age > 65) {
        setError('Applicant must be between 21 and 65 years of age.');
        return;
      }
    } else if (currentStep === 3) {
      if (Number(monthlyIncome) < 15000) {
        setError('Minimum net monthly income required is ₹15,000.');
        return;
      }
    } else if (currentStep === 4) {
      if (Number(loanAmount) < 50000 || Number(loanAmount) > 2500000) {
        setError('Loan amount required must be between ₹50,000 and ₹25,00,000.');
        return;
      }
    } else if (currentStep === 6) {
      if (!city.trim()) {
        setError('Please enter your city/location.');
        return;
      }
    }

    if (currentStep < 6) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleFinalSubmit();
    }
  };

  const handleBack = () => {
    setError('');
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleFinalSubmit = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await LoanApiService.checkEligibility({
        fullName: fullName || 'Verified Applicant',
        mobile: mobile || '9876543210',
        email: 'applicant@example.com',
        employmentType,
        monthlyIncome: Number(monthlyIncome),
        existingEMI: Number(existingEMI) || 0,
        requestedTenureYears: preferredTenure,
        creditScoreRange: '750+',
        city,
      });
      setResult(response);
    } catch {
      setError('An error occurred during assessment. Please check details and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setCurrentStep(1);
    setError('');
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden transition-colors">
      {!result ? (
        <div className="p-6 sm:p-8 space-y-6">
          {/* Header & Step progress */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400">
                Interactive Pre-Check • Step {currentStep} of 6
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Takes ~90 seconds
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Instant Loan Eligibility Checker
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Check your estimated borrowing limit and FOIR capacity without impacting your official bureau score.
            </p>
          </div>

          {/* Stepper Progress Indicator */}
          <div className="flex items-center justify-between gap-1 max-w-xl mx-auto py-2">
            {stepLabels.map((s, idx) => (
              <React.Fragment key={s.num}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      currentStep === s.num
                        ? 'bg-blue-600 text-white ring-4 ring-blue-100 dark:ring-blue-900/40 shadow-xs'
                        : currentStep > s.num
                        ? 'bg-teal-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {currentStep > s.num ? <Check className="w-4 h-4" /> : s.num}
                  </div>
                  <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 mt-1 hidden sm:inline">
                    {s.label}
                  </span>
                </div>
                {idx < stepLabels.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-1 transition-colors ${
                      currentStep > s.num ? 'bg-teal-600' : 'bg-slate-200 dark:bg-slate-800'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Step 1: Age */}
          {currentStep === 1 && (
            <div className="space-y-4 py-2">
              <label htmlFor="age-input" className="block text-sm font-bold text-slate-800 dark:text-slate-200">
                Step 1: What is your current age? <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-4">
                <input
                  id="age-input"
                  type="number"
                  min={21}
                  max={65}
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-32 p-3 text-lg font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:border-blue-600 focus:outline-none"
                />
                <span className="text-sm text-slate-500 dark:text-slate-400">Years old (21 to 65 allowed)</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {[25, 30, 35, 42, 50].map((presetAge) => (
                  <button
                    key={presetAge}
                    type="button"
                    onClick={() => setAge(presetAge)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                      age === presetAge
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {presetAge} Years
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Employment Type */}
          {currentStep === 2 && (
            <div className="space-y-4 py-2">
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200">
                Step 2: What is your primary employment type? <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    key: 'salaried',
                    label: 'Salaried Employee',
                    sub: 'Receives monthly salary credited to bank',
                  },
                  {
                    key: 'self-employed',
                    label: 'Self-Employed Professional',
                    sub: 'Doctor, CA, Lawyer, Consultant, Architect',
                  },
                  {
                    key: 'business',
                    label: 'Business Owner / Trader',
                    sub: 'Proprietorship, LLP, or Pvt Ltd company',
                  },
                ].map((emp) => (
                  <button
                    key={emp.key}
                    type="button"
                    onClick={() => setEmploymentType(emp.key as any)}
                    className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      employmentType === emp.key
                        ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-600 dark:border-blue-500 text-blue-900 dark:text-blue-100 ring-2 ring-blue-500/20'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span className="font-bold text-sm">{emp.label}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 mt-2">{emp.sub}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Monthly Income */}
          {currentStep === 3 && (
            <div className="space-y-4 py-2">
              <label htmlFor="income-input" className="block text-sm font-bold text-slate-800 dark:text-slate-200">
                Step 3: What is your net monthly in-hand income? <span className="text-red-500">*</span>
              </label>
              <div className="max-w-md">
                <Input
                  id="income-input"
                  label=""
                  type="number"
                  prefixText="₹"
                  placeholder="e.g. 65000"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                  helperText="Direct bank credit excluding non-guaranteed bonuses"
                />
              </div>

              <div className="max-w-md pt-2">
                <Input
                  label="Existing monthly EMI obligations (if any)"
                  type="number"
                  prefixText="₹"
                  placeholder="0"
                  value={existingEMI}
                  onChange={(e) => setExistingEMI(e.target.value)}
                  helperText="Active home, car, or personal loan instalments"
                />
              </div>
            </div>
          )}

          {/* Step 4: Loan Amount Required */}
          {currentStep === 4 && (
            <div className="space-y-4 py-2">
              <div className="flex items-center justify-between">
                <label htmlFor="req-amount-slider" className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  Step 4: Required loan amount? <span className="text-red-500">*</span>
                </label>
                <span className="text-lg font-extrabold text-blue-600 dark:text-blue-400 font-tabular">
                  {formatINR(Number(loanAmount))}
                </span>
              </div>
              <input
                id="req-amount-slider"
                type="range"
                min={50000}
                max={2500000}
                step={25000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                aria-label="Required Loan Amount Slider"
                className="w-full h-2 rounded-lg"
              />
              <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 font-tabular">
                <span>₹50,000</span>
                <span>₹10,00,000</span>
                <span>₹25,00,000</span>
              </div>
            </div>
          )}

          {/* Step 5: Preferred Tenure */}
          {currentStep === 5 && (
            <div className="space-y-4 py-2">
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200">
                Step 5: Preferred repayment tenure? <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-5 gap-2 max-w-lg">
                {[1, 2, 3, 4, 5].map((yr) => (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => setPreferredTenure(yr)}
                    className={`py-3 text-xs font-bold rounded-xl border text-center transition-all ${
                      preferredTenure === yr
                        ? 'bg-slate-900 dark:bg-blue-600 text-white border-slate-900 dark:border-blue-600 shadow-sm'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {yr} {yr === 1 ? 'Year' : 'Years'}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Longer tenure lowers your monthly EMI, while shorter tenure reduces total interest payable.
              </p>
            </div>
          )}

          {/* Step 6: City / Location */}
          {currentStep === 6 && (
            <div className="space-y-4 py-2">
              <label htmlFor="city-location-input" className="block text-sm font-bold text-slate-800 dark:text-slate-200">
                Step 6: What is your current city / location? <span className="text-red-500">*</span>
              </label>
              <div className="max-w-md">
                <Input
                  id="city-location-input"
                  label="Residence City"
                  isRequired
                  placeholder="e.g. Bengaluru, Hyderabad, Pune, Mumbai, Delhi NCR"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 max-w-md">
                {['Bengaluru', 'Mumbai', 'Delhi NCR', 'Pune', 'Hyderabad', 'Chennai'].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCity(c)}
                    className={`py-1.5 px-2 text-xs font-medium rounded-lg border text-center transition-colors ${
                      city === c
                        ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            {currentStep > 1 ? (
              <Button
                type="button"
                variant="outline"
                size="md"
                leftIcon={<ArrowLeft className="w-4 h-4" />}
                onClick={handleBack}
              >
                Previous Step
              </Button>
            ) : (
              <SecurityBadge variant="badge" />
            )}

            <Button
              type="button"
              variant="primary"
              size="md"
              className="bg-gradient-to-r from-blue-600 to-indigo-600"
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={handleNext}
            >
              {currentStep === 6 ? 'Assess Eligibility' : 'Continue'}
            </Button>
          </div>
        </div>
      ) : (
        /* Results Assessment Interface */
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 text-xs font-bold mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Eligibility Assessment Result</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Preliminary Assessment Completed
              </h3>
              {/* Mandatory specific wording from requirement */}
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-2 p-3 bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-800/60 rounded-xl leading-relaxed">
                &ldquo;Based on the information provided, you may meet the preliminary criteria. Final eligibility is subject to verification and lender policies.&rdquo;
              </p>
            </div>
            <button
              onClick={handleReset}
              className="text-xs text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 flex items-center gap-1 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Assess with different parameters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Modify Details</span>
            </button>
          </div>

          {/* Metric cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/80 border border-blue-100 dark:border-slate-700 p-5 rounded-2xl">
              <span className="text-xs text-blue-700 dark:text-blue-300 font-semibold block">
                Estimated Borrowing Limit
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-blue-950 dark:text-white font-tabular mt-1 block">
                {formatINR(result.maxEligibleAmount)}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
                Based on 50% FOIR limit
              </span>
            </div>

            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded-2xl">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold block">
                Indicative Starting APR
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-teal-600 dark:text-teal-400 font-tabular mt-1 block">
                {result.estimatedInterestRate}% <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">p.a.</span>
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
                Reducing balance benchmark
              </span>
            </div>

            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded-2xl">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold block">
                Max Monthly Serviceable EMI
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-tabular mt-1 block">
                {formatINR(result.estimatedMaxEMI)}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
                Fits inside your current budget
              </span>
            </div>
          </div>

          {/* Action Button: Mandatory Continue Application */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() =>
                navigate('/apply', {
                  state: {
                    prefillAmount: result.maxEligibleAmount,
                    prefillTenure: result.recommendedTenureYears,
                  },
                })
              }
            >
              Continue Application
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => navigate('/calculator')}
            >
              Calculate Custom EMI
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
