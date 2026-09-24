import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoanApiService, ApplicationRequest, ApplicationResponse } from '../services/api';
import { formatINR } from '../utils/calculations';
import { isValidEmail, isValidIndianMobile, isValidAge, isValidIncome } from '../utils/validation';
import { useToast } from '../context/ToastContext';
import { Button } from './Button';
import { Input } from './Input';
import { SecurityBadge } from './SecurityBadge';
import { appConfig } from '../config/appConfig';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  FileCheck2,
  Edit2,
  Copy,
  Check,
  Calendar,
  Building2,
  CreditCard,
  UserCheck,
  Download,
  Printer,
  Headphones,
  Mail,
  Phone
} from 'lucide-react';

export const ApplicationForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();
  const stateData = (location.state as any) || {};

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionResult, setSubmissionResult] = useState<ApplicationResponse | null>(null);
  const [submissionDate, setSubmissionDate] = useState<string>('');
  const [copied, setCopied] = useState(false);

  // Restore non-sensitive form data from sessionStorage during this session
  const [formData, setFormData] = useState<ApplicationRequest>(() => {
    try {
      const saved = sessionStorage.getItem('vantage_app_session_draft');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          loanRequirements: {
            amount: stateData.prefillAmount || parsed.loanRequirements?.amount || 500000,
            tenureYears: stateData.prefillTenure || parsed.loanRequirements?.tenureYears || 3,
            purpose: parsed.loanRequirements?.purpose || 'Home Renovation',
          },
        };
      }
    } catch {
      // ignore
    }
    return {
      personal: {
        fullName: '',
        mobile: '',
        email: '',
        dob: '1995-06-15',
        city: '',
        pinCode: '',
        panNumber: '',
      },
      employment: {
        employmentType: 'salaried',
        companyName: '',
        workExperienceYears: 3,
        monthlyNetIncome: 50000,
        existingMonthlyEMIs: 0,
      },
      loanRequirements: {
        amount: stateData.prefillAmount || 500000,
        tenureYears: stateData.prefillTenure || 3,
        purpose: 'Home Renovation',
      },
      agreedToTerms: false,
    };
  });

  // Save non-sensitive drafts to sessionStorage
  useEffect(() => {
    try {
      const draft = {
        personal: {
          fullName: formData.personal.fullName,
          email: formData.personal.email,
          city: formData.personal.city,
          pinCode: formData.personal.pinCode,
          dob: formData.personal.dob,
        },
        employment: formData.employment,
        loanRequirements: formData.loanRequirements,
      };
      sessionStorage.setItem('vantage_app_session_draft', JSON.stringify(draft));
    } catch {
      // ignore
    }
  }, [formData]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Step 1 Validation
  const validateStep1 = (): boolean => {
    const errs: Record<string, string> = {};
    const { fullName, mobile, email, dob, city, pinCode } = formData.personal;

    if (!fullName.trim() || fullName.trim().length < 3) {
      errs.fullName = 'Full Name must be at least 3 characters.';
    }
    if (!mobile.trim() || !isValidIndianMobile(mobile)) {
      errs.mobile = 'Enter a valid 10-digit Indian mobile number.';
    }
    if (!email.trim() || !isValidEmail(email)) {
      errs.email = 'Enter a valid email address.';
    }
    if (!dob || !isValidAge(dob)) {
      errs.dob = 'Applicant must be between 21 and 65 years of age.';
    }
    if (!city.trim()) {
      errs.city = 'City is required.';
    }
    if (!pinCode.trim() || !/^\d{6}$/.test(pinCode.trim())) {
      errs.pinCode = 'Enter a valid 6-digit PIN code.';
    }

    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      showToast('Please complete the required fields in Step 1.', 'warning');
    }
    return Object.keys(errs).length === 0;
  };

  // Step 2 Validation
  const validateStep2 = (): boolean => {
    const errs: Record<string, string> = {};
    const { companyName, monthlyNetIncome, workExperienceYears } = formData.employment;

    if (!companyName.trim()) {
      errs.companyName = 'Company / Employer name is required.';
    }
    if (!isValidIncome(monthlyNetIncome)) {
      errs.monthlyNetIncome = 'Minimum monthly net income is ₹15,000.';
    }
    if (workExperienceYears < 1) {
      errs.workExperienceYears = 'Minimum 1 year of total work experience required.';
    }

    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      showToast('Please complete employment details accurately.', 'warning');
    }
    return Object.keys(errs).length === 0;
  };

  // Step 3 Validation
  const validateStep3 = (): boolean => {
    const errs: Record<string, string> = {};
    const { amount, tenureYears } = formData.loanRequirements;

    if (amount < 50000 || amount > 2500000) {
      errs.amount = 'Loan amount must be between ₹50,000 and ₹25,00,000.';
    }
    if (tenureYears < 1 || tenureYears > 5) {
      errs.tenureYears = 'Tenure must be between 1 and 5 years.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Step 4 Validation
  const validateStep4 = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.agreedToTerms) {
      errs.agreedToTerms = 'You must acknowledge the terms and credit check consent to proceed.';
      showToast('Please agree to terms and consent before submitting.', 'warning');
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setErrors({});
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setErrors({});
      setCurrentStep(3);
    } else if (currentStep === 3 && validateStep3()) {
      setErrors({});
      setCurrentStep(4);
    }
  };

  const handleBack = () => {
    setErrors({});
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep4()) return;

    setIsSubmitting(true);
    try {
      const response = await LoanApiService.submitApplication(formData);
      const today = new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      setSubmissionDate(today);
      setSubmissionResult(response);
      setCurrentStep(5);
      showToast('Application submitted successfully.', 'success', 'Confirmed');
    } catch {
      setErrors({ form: 'Unable to process your request. Please try again.' });
      showToast('Unable to process your request. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyAppId = () => {
    if (submissionResult?.applicationId) {
      navigator.clipboard.writeText(submissionResult.applicationId);
      setCopied(true);
      showToast('Application Reference ID copied to clipboard!', 'info');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadSummary = () => {
    // Generate text/markdown summary download and print preview
    const summaryText = `===========================================
VANTAGE PERSONAL LOANS - APPLICATION SUMMARY
===========================================
Application Reference ID: ${submissionResult?.applicationId}
Submission Date: ${submissionDate}
Status: Under Review (Preliminary Assessment)

APPLICANT DETAILS:
Name: ${formData.personal.fullName}
Mobile: +91 ${formData.personal.mobile}
Email: ${formData.personal.email}
City: ${formData.personal.city} (${formData.personal.pinCode})

LOAN SPECIFICATIONS:
Requested Amount: ${formatINR(formData.loanRequirements.amount)}
Tenure: ${formData.loanRequirements.tenureYears} Years (${formData.loanRequirements.tenureYears * 12} Months)
Purpose: ${formData.loanRequirements.purpose}

EMPLOYMENT:
Nature: ${formData.employment.employmentType}
Employer: ${formData.employment.companyName}
Monthly Net Income: ${formatINR(formData.employment.monthlyNetIncome)}

CUSTOMER SUPPORT:
Email: ${appConfig.supportEmail}
Phone: ${appConfig.supportPhone}
Hours: ${appConfig.hours}
===========================================
Note: This document confirms receipt of your online application submission.`;

    const blob = new Blob([summaryText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Vantage_Application_${submissionResult?.applicationId}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Application summary downloaded successfully.', 'success');
  };

  // Steps breadcrumb data
  const stepLabels = [
    { num: 1, label: 'Personal Details', icon: <UserCheck className="w-4 h-4" /> },
    { num: 2, label: 'Employment', icon: <Building2 className="w-4 h-4" /> },
    { num: 3, label: 'Loan Requirement', icon: <CreditCard className="w-4 h-4" /> },
    { num: 4, label: 'Review', icon: <FileCheck2 className="w-4 h-4" /> },
    { num: 5, label: 'Submit', icon: <CheckCircle2 className="w-4 h-4" /> },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
      {/* Step Indicators */}
      {currentStep < 5 && (
        <div className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 px-6 py-4">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {stepLabels.slice(0, 4).map((s, idx) => (
              <React.Fragment key={s.num}>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      currentStep === s.num
                        ? 'bg-blue-600 text-white ring-4 ring-blue-100 dark:ring-blue-900/40 shadow-xs'
                        : currentStep > s.num
                        ? 'bg-teal-600 text-white'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {currentStep > s.num ? <Check className="w-4 h-4" /> : s.num}
                  </div>
                  <span
                    className={`hidden sm:inline text-xs font-semibold ${
                      currentStep === s.num
                        ? 'text-slate-900 dark:text-white'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {idx < 3 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 sm:mx-4 transition-colors ${
                      currentStep > s.num ? 'bg-teal-600' : 'bg-slate-200 dark:bg-slate-700'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* STEP 1: Personal Details */}
      {currentStep === 1 && (
        <div className="p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <span className="text-xs uppercase tracking-wider font-bold text-blue-600 dark:text-blue-400">
              Step 1 of 4 • Personal Details
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
              Personal Information
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Enter your official identity details exactly as stated on your government PAN or Aadhaar card.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name (As per PAN)"
              isRequired
              placeholder="e.g. Aditi Sharma"
              value={formData.personal.fullName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  personal: { ...formData.personal, fullName: e.target.value },
                })
              }
              error={errors.fullName}
            />

            <Input
              label="Mobile Number"
              isRequired
              prefixText="+91"
              maxLength={10}
              placeholder="98765 43210"
              value={formData.personal.mobile}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  personal: { ...formData.personal, mobile: e.target.value.replace(/\D/g, '') },
                })
              }
              error={errors.mobile}
            />

            <Input
              label="Personal Email Address"
              isRequired
              type="email"
              placeholder="aditi@example.com"
              value={formData.personal.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  personal: { ...formData.personal, email: e.target.value },
                })
              }
              error={errors.email}
            />

            <Input
              label="Date of Birth"
              isRequired
              type="date"
              value={formData.personal.dob}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  personal: { ...formData.personal, dob: e.target.value },
                })
              }
              error={errors.dob}
            />

            <Input
              label="Current Residential City"
              isRequired
              placeholder="e.g. Pune"
              value={formData.personal.city}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  personal: { ...formData.personal, city: e.target.value },
                })
              }
              error={errors.city}
            />

            <Input
              label="Area PIN Code"
              isRequired
              maxLength={6}
              placeholder="e.g. 411001"
              value={formData.personal.pinCode}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  personal: { ...formData.personal, pinCode: e.target.value.replace(/\D/g, '') },
                })
              }
              error={errors.pinCode}
            />
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <SecurityBadge variant="badge" />
            <Button
              variant="primary"
              size="md"
              className="bg-gradient-to-r from-blue-600 to-indigo-600"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={handleNext}
            >
              Next: Employment Details
            </Button>
          </div>
        </div>
      )}

      {/* STEP 2: Employment Details */}
      {currentStep === 2 && (
        <div className="p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <span className="text-xs uppercase tracking-wider font-bold text-blue-600 dark:text-blue-400">
              Step 2 of 4 • Employment Details
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
              Employment & Income Profile
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Provide verified employment records to evaluate your debt servicing capacity and repayment ability.
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
              Employment Nature <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { key: 'salaried', label: 'Salaried' },
                { key: 'self-employed', label: 'Self-Employed' },
                { key: 'professional', label: 'Doctor / CA / Lawyer' },
              ].map((emp) => (
                <button
                  key={emp.key}
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      employment: { ...formData.employment, employmentType: emp.key as any },
                    })
                  }
                  className={`py-2 px-3 text-xs font-semibold rounded-xl border text-center transition-all ${
                    formData.employment.employmentType === emp.key
                      ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-blue-400 dark:border-blue-600 shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {emp.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Company / Practice Name"
              isRequired
              placeholder="e.g. Infosys, TCS, or Practice Clinic"
              value={formData.employment.companyName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  employment: { ...formData.employment, companyName: e.target.value },
                })
              }
              error={errors.companyName}
            />

            <div>
              <label htmlFor="work-exp-select" className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                Total Work Experience <span className="text-red-500">*</span>
              </label>
              <select
                id="work-exp-select"
                value={formData.employment.workExperienceYears}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    employment: {
                      ...formData.employment,
                      workExperienceYears: Number(e.target.value),
                    },
                  })
                }
                className="w-full py-2.5 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-800 dark:text-white focus:border-blue-600 focus:outline-none"
              >
                <option value={1}>1 Year</option>
                <option value={2}>2 Years</option>
                <option value={3}>3 – 5 Years</option>
                <option value={6}>6 – 10 Years</option>
                <option value={11}>10+ Years</option>
              </select>
            </div>

            <Input
              label="Net Monthly In-Hand Salary"
              isRequired
              type="number"
              prefixText="₹"
              value={formData.employment.monthlyNetIncome}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  employment: {
                    ...formData.employment,
                    monthlyNetIncome: Number(e.target.value),
                  },
                })
              }
              error={errors.monthlyNetIncome}
              helperText="Net amount credited to bank account each month"
            />

            <Input
              label="Existing Total Monthly EMIs"
              type="number"
              prefixText="₹"
              placeholder="0"
              value={formData.employment.existingMonthlyEMIs}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  employment: {
                    ...formData.employment,
                    existingMonthlyEMIs: Number(e.target.value),
                  },
                })
              }
              helperText="Active personal, automobile, or housing loan instalments"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <Button variant="outline" size="md" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={handleBack}>
              Back
            </Button>
            <Button
              variant="primary"
              size="md"
              className="bg-gradient-to-r from-blue-600 to-indigo-600"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={handleNext}
            >
              Next: Loan Requirements
            </Button>
          </div>
        </div>
      )}

      {/* STEP 3: Loan Requirements */}
      {currentStep === 3 && (
        <div className="p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <span className="text-xs uppercase tracking-wider font-bold text-blue-600 dark:text-blue-400">
              Step 3 of 4 • Loan Requirement
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
              Loan Specifications
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Customize your desired borrowing capital and repayment tenure.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="desired-amount-slider-apply" className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Desired Loan Amount: <span className="text-blue-600 dark:text-blue-400 font-tabular font-bold">{formatINR(formData.loanRequirements.amount)}</span>
                </label>
              </div>
              <input
                id="desired-amount-slider-apply"
                type="range"
                min={50000}
                max={2500000}
                step={25000}
                value={formData.loanRequirements.amount}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    loanRequirements: {
                      ...formData.loanRequirements,
                      amount: Number(e.target.value),
                    },
                  })
                }
                aria-label="Desired Loan Amount Slider"
                className="w-full h-2 rounded-lg"
              />
              <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 font-tabular mt-1">
                <span>₹50,000</span>
                <span>₹10,00,000</span>
                <span>₹25,00,000</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
                Preferred Loan Tenure
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((yr) => (
                  <button
                    key={yr}
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        loanRequirements: {
                          ...formData.loanRequirements,
                          tenureYears: yr,
                        },
                      })
                    }
                    className={`py-2.5 text-xs font-bold rounded-xl border text-center transition-all ${
                      formData.loanRequirements.tenureYears === yr
                        ? 'bg-slate-900 dark:bg-blue-600 text-white border-slate-900 dark:border-blue-600'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {yr} {yr === 1 ? 'Year' : 'Years'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="loan-purpose-apply" className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                Primary Loan Purpose
              </label>
              <select
                id="loan-purpose-apply"
                value={formData.loanRequirements.purpose}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    loanRequirements: {
                      ...formData.loanRequirements,
                      purpose: e.target.value,
                    },
                  })
                }
                className="w-full py-2.5 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-800 dark:text-white focus:border-blue-600 focus:outline-none"
              >
                <option value="Home Renovation">Home Renovation & Furnishing</option>
                <option value="Medical Emergency">Medical Contingency & Treatment</option>
                <option value="Debt Consolidation">Debt & Credit Card Consolidation</option>
                <option value="Wedding / Family Function">Wedding & Family Milestones</option>
                <option value="Higher Education">Higher Education & Professional Upskilling</option>
                <option value="Travel / Relocation">Travel, Security Deposit & Relocation</option>
                <option value="Other Personal Needs">Other Personal Requirements</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <Button variant="outline" size="md" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={handleBack}>
              Back
            </Button>
            <Button
              variant="primary"
              size="md"
              className="bg-gradient-to-r from-blue-600 to-indigo-600"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={handleNext}
            >
              Next: Review & Submit
            </Button>
          </div>
        </div>
      )}

      {/* STEP 4: Review Summary */}
      {currentStep === 4 && (
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <span className="text-xs uppercase tracking-wider font-bold text-blue-600 dark:text-blue-400">
              Step 4 of 4 • Review & Submit
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
              Review Your Application
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Verify all entered particulars before submitting for digital underwriting verification.
            </p>
          </div>

          {errors.form && (
            <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl text-xs text-red-700 dark:text-red-300">
              {errors.form}
            </div>
          )}

          <div className="space-y-4">
            {/* 1. Personal Info */}
            <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  1. Personal Information
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center gap-1"
                >
                  <Edit2 className="w-3.5 h-3.5" /> Edit
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block">Name:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{formData.personal.fullName}</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block">Mobile:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">+91 {formData.personal.mobile}</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block">Email:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">{formData.personal.email}</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block">City:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{formData.personal.city} ({formData.personal.pinCode})</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block">DOB:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{formData.personal.dob}</span>
                </div>
              </div>
            </div>

            {/* 2. Employment Info */}
            <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  2. Employment & Income
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center gap-1"
                >
                  <Edit2 className="w-3.5 h-3.5" /> Edit
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block">Employment:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 capitalize">{formData.employment.employmentType}</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block">Employer:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{formData.employment.companyName}</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block">Monthly In-Hand:</span>
                  <span className="font-bold text-slate-900 dark:text-white font-tabular">{formatINR(formData.employment.monthlyNetIncome)}</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block">Experience:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{formData.employment.workExperienceYears} Years</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block">Active EMIs:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 font-tabular">{formatINR(formData.employment.existingMonthlyEMIs)}</span>
                </div>
              </div>
            </div>

            {/* 3. Loan Requirements */}
            <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  3. Loan Specification
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center gap-1"
                >
                  <Edit2 className="w-3.5 h-3.5" /> Edit
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block">Requested Amount:</span>
                  <span className="text-sm font-extrabold text-blue-600 dark:text-blue-400 font-tabular">{formatINR(formData.loanRequirements.amount)}</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block">Tenure:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{formData.loanRequirements.tenureYears} Years ({formData.loanRequirements.tenureYears * 12} Months)</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block">Purpose:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{formData.loanRequirements.purpose}</span>
                </div>
              </div>
            </div>

            {/* Terms & Consent */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreedToTerms}
                  onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                  className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  I hereby confirm that all information provided is accurate and authentic. I authorize Vantage Personal Loans and partnered lending institutions to conduct credit verification, retrieve bureau records, and contact me via telephone, SMS, or WhatsApp regarding this loan application.
                </span>
              </label>
              {errors.agreedToTerms && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400 font-medium">{errors.agreedToTerms}</p>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <Button
              type="button"
              variant="outline"
              size="md"
              leftIcon={<ArrowLeft className="w-4 h-4" />}
              onClick={handleBack}
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"
              isLoading={isSubmitting}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Submit Application
            </Button>
          </div>
        </form>
      )}

      {/* STEP 5: Success Screen (Requirement 5) */}
      {currentStep === 5 && submissionResult && (
        <div className="p-6 sm:p-10 text-center space-y-7 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-16 h-16 bg-teal-100 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 rounded-full flex items-center justify-center mx-auto ring-8 ring-teal-50 dark:ring-teal-900/20">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-widest bg-teal-50 dark:bg-teal-950/40 px-3 py-1 rounded-full border border-teal-200 dark:border-teal-800">
              Application Confirmed
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Application Submitted
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              Your application has been received and routed to our credit underwriting team for verification.
            </p>
          </div>

          {/* Reference & Details Card */}
          <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 max-w-md mx-auto text-left space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
              <div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Application Reference ID
                </span>
                <span className="text-lg font-bold text-slate-900 dark:text-white font-mono tracking-tight">
                  {submissionResult.applicationId}
                </span>
              </div>
              <button
                type="button"
                onClick={copyAppId}
                className="text-xs flex items-center gap-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md hover:bg-slate-50 text-slate-700 dark:text-slate-200"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy ID'}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-slate-500 dark:text-slate-400 block">Submission Date</span>
                <span className="font-semibold text-slate-900 dark:text-white">{submissionDate || 'Today'}</span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 block">Requested Amount</span>
                <span className="font-bold text-slate-900 dark:text-white font-tabular">{formatINR(formData.loanRequirements.amount)}</span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 block">Decision Window</span>
                <span className="font-semibold text-teal-600 dark:text-teal-400">{submissionResult.estimatedReviewTime}</span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 block">Status</span>
                <span className="font-semibold text-blue-600 dark:text-blue-400">Under Review</span>
              </div>
            </div>
          </div>

          {/* Next Steps Card */}
          <div className="max-w-md mx-auto text-left bg-blue-50/60 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 rounded-2xl p-4 space-y-2">
            <span className="text-xs font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wider block">
              Next Steps
            </span>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              {submissionResult.nextSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-blue-200 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support Information Card */}
          <div className="max-w-md mx-auto text-left bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-4 text-xs space-y-2">
            <div className="flex items-center gap-1.5 text-slate-900 dark:text-white font-bold">
              <Headphones className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Customer Support Information</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              For any questions regarding your application reference, contact our desk quoting ID <code className="font-mono font-bold text-slate-900 dark:text-white">{submissionResult.applicationId}</code>.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 pt-1 text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                {appConfig.supportEmail}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                {appConfig.supportPhone}
              </span>
            </div>
          </div>

          {/* Action Buttons: Download Application Summary & Return */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="primary"
              size="md"
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600"
              leftIcon={<Download className="w-4 h-4" />}
              onClick={handleDownloadSummary}
            >
              Download Application Summary
            </Button>
            <Button
              variant="outline"
              size="md"
              className="w-full sm:w-auto"
              leftIcon={<Printer className="w-4 h-4" />}
              onClick={() => window.print()}
            >
              Print Receipt
            </Button>
            <Button
              variant="outline"
              size="md"
              className="w-full sm:w-auto"
              onClick={() => navigate(`/status?id=${submissionResult.applicationId}`)}
            >
              Track Status
            </Button>
          </div>

          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed max-w-lg mx-auto">
            *Notice: This application receipt was generated via the client-side portal for demonstration and staging purposes. In production, this data synchronizes directly with the institutional loan origination system (LOS).
          </p>
        </div>
      )}
    </div>
  );
};
