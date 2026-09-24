import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { TrustIndicators } from '../components/TrustIndicators';
import { HeroVisual } from '../components/HeroVisual';
import { EMICalculator } from '../components/EMICalculator';
import { EligibilityForm } from '../components/EligibilityForm';
import { BenefitCard } from '../components/BenefitCard';
import { StepTimeline } from '../components/StepTimeline';
import { FAQAccordion } from '../components/FAQAccordion';
import { DocumentChecklist } from '../components/DocumentChecklist';
import { LoanComparison } from '../components/LoanComparison';
import { TrustCenter } from '../components/TrustCenter';
import { TestimonialCard } from '../components/TestimonialCard';
import {
  LOAN_BENEFITS,
  USE_CASES
} from '../data/loanFeatures';
import { TESTIMONIALS_DATA } from '../data/testimonials';
import {
  ArrowRight,
  Calculator,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Lock,
  Headphones,
  Building,
  TrendingDown,
  Check,
  Shield
} from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const emiSectionRef = useRef<HTMLDivElement>(null);
  const eligibilitySectionRef = useRef<HTMLDivElement>(null);

  const scrollToEMI = () => {
    emiSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToEligibility = () => {
    eligibilitySectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* ========================================================================= */}
      {/* 1. PREMIUM HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative pt-10 sm:pt-16 pb-6 sm:pb-12 overflow-hidden">
        {/* Colorful gradient ambient glows */}
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-r from-blue-500/15 via-indigo-500/15 to-purple-500/15 rounded-full blur-3xl dark:from-blue-600/20 dark:via-indigo-600/15 dark:to-purple-600/20" />
          <div className="absolute top-1/2 -left-24 w-80 h-80 bg-teal-400/15 rounded-full blur-3xl dark:bg-teal-500/10" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Value Prop, Heading, CTAs, Trust Pill */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-200/80 dark:border-blue-800/60 text-blue-700 dark:text-blue-300 text-xs font-bold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Next-Generation Digital Lending</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12] text-balance">
                Personal Loans <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-teal-300 bg-clip-text text-transparent">
                  Made Simple & Fair.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                Experience transparent digital personal loans with competitive interest rates starting from 10.50% p.a., flexible repayment tenures up to 5 years, and instant eligibility assessment.
              </p>

              {/* CTAs with animated gradient hover */}
              <div className="space-y-3 pt-1">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  <Button
                    variant="primary"
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:shadow-lg hover:shadow-blue-500/25 active:scale-95 transition-all text-white font-bold"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    onClick={() => navigate('/eligibility')}
                  >
                    Check Eligibility
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                    leftIcon={<Calculator className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                    onClick={scrollToEMI}
                  >
                    Calculate EMI
                  </Button>
                </div>

                {/* Mandatory Trust Message from Requirement 1 */}
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 pt-1">
                  <ShieldCheck className="w-4 h-4 text-teal-500 shrink-0" />
                  <span>Simple process • Transparent information • Secure application</span>
                </div>
              </div>

              {/* Hero Trust Indicators */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                <TrustIndicators />
              </div>
            </div>

            {/* Right Column: Hero Visual Dashboard */}
            <div className="lg:col-span-6">
              <HeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SECTION — LOAN OVERVIEW */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-wider font-bold text-blue-600 dark:text-blue-400">
            Product Overview
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Designed for Life’s Planned & Unplanned Milestones
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            An unsecured personal loan provides quick financial liquidity without requiring you to pledge property, shares, or physical assets.
          </p>
        </div>

        {/* 3 Core Explanation Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-extrabold">
              01
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">What is a Personal Loan?</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              A personal loan is an all-purpose financing solution where you borrow a lump sum and repay it in structured, monthly instalments over an agreed tenure, calculated on reducing balance interest.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center font-extrabold">
              02
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">How Does It Work?</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Submit your basic employment and identity documents digitally. Lenders assess credit history and debt capacity, sanction the loan amount, and disburse directly into your active bank account.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-extrabold">
              03
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Who Can Apply?</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Indian citizens aged 21 to 65 years who are salaried employees at registered companies or established self-employed professionals with steady verifiable monthly earnings above ₹15,000.
            </p>
          </div>
        </div>

        {/* Typical Use Cases Grid */}
        <div className="bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Common Personal Loan Use Cases</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Personal loans have zero end-use restrictions, granting full spending autonomy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {USE_CASES.map((uc, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-2 hover:border-blue-400 transition-colors"
              >
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0" />
                  {uc.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{uc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SECTION — LIVE EMI CALCULATOR (Upgraded) */}
      {/* ========================================================================= */}
      <section ref={emiSectionRef} id="calculator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-12">
          <span className="text-xs uppercase tracking-wider font-bold text-blue-600 dark:text-blue-400">
            Interactive Financial Tool
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Live EMI Calculator
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Adjust loan amount, interest rate, and tenure sliders to preview your monthly budget commitments in real time.
          </p>
        </div>

        <EMICalculator onCheckEligibility={scrollToEligibility} />
      </section>

      {/* ========================================================================= */}
      {/* 4. SECTION — LOAN COMPARISON */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LoanComparison />
      </section>

      {/* ========================================================================= */}
      {/* 5. SECTION — LOAN ELIGIBILITY CHECKER */}
      {/* ========================================================================= */}
      <section ref={eligibilitySectionRef} id="eligibility" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-12">
          <span className="text-xs uppercase tracking-wider font-bold text-blue-600 dark:text-blue-400">
            Instant Pre-Check
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Assess Your Borrowing Power
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Check your eligibility against verified underwriting parameters in 6 quick interactive steps.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <EligibilityForm />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. SECTION — HOW IT WORKS */}
      {/* ========================================================================= */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-wider font-bold text-blue-600 dark:text-blue-400">
            Simple 4-Step Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How The Application Process Works
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            From initial soft assessment to electronic disbursement into your active bank account.
          </p>
        </div>

        <StepTimeline />
      </section>

      {/* ========================================================================= */}
      {/* 7. SECTION — DOCUMENT CHECKLIST */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DocumentChecklist />
      </section>

      {/* ========================================================================= */}
      {/* 8. SECTION — TRUST CENTER */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TrustCenter />
      </section>

      {/* ========================================================================= */}
      {/* 9. SECTION — TESTIMONIALS */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
          <span className="text-xs uppercase tracking-wider font-bold text-blue-600 dark:text-blue-400">
            Borrower Feedback
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            What Our Borrowers Say
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Authentic experiences from professionals who evaluated and funded their needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS_DATA.map((t) => (
            <TestimonialCard key={t.id} item={t} />
          ))}
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-6">
          *Illustrative user feedback for demonstration purposes.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* 10. SECTION — FAQ WITH SEARCH */}
      {/* ========================================================================= */}
      <section id="faq" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-12">
          <span className="text-xs uppercase tracking-wider font-bold text-blue-600 dark:text-blue-400">
            Help & Knowledge Base
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Clear, transparent answers across eligibility, documentation, EMIs, and repayments.
          </p>
        </div>

        <FAQAccordion />
      </section>

      {/* ========================================================================= */}
      {/* 11. SECTION — FINAL CTA */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-14 text-white text-center space-y-6 relative overflow-hidden shadow-2xl border border-blue-800/40">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Explore Your Loan Options?
            </h2>
            <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
              Check your eligibility in 2 minutes without affecting your credit score, or connect directly with our loan advisory desk.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 relative z-10">
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-teal-500 to-blue-500 text-white font-bold hover:opacity-95"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => navigate('/eligibility')}
            >
              Check Eligibility
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-white/30 text-white bg-white/10 hover:bg-white/20"
              onClick={() => navigate('/contact')}
            >
              Contact Loan Specialist
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
