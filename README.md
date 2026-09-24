# Vantage Personal Loans - Premium Fintech Web Platform

A production-grade, trustworthy, and conversion-focused Personal Loan web application engineered with modern React, TypeScript, Tailwind CSS, and clean architectural patterns suitable for high-value client deployments.

---

## 1. Key Highlights & Architecture

- **Visual & Brand Identity**: Premium fintech aesthetic with Deep Navy (`#0F172A`), Cobalt Blue (`#1D4ED8`), and Teal Accent (`#0D9488`). Follows strict WCAG AA contrast standards, tabular numeral alignment (`font-tabular`), and zero-pill metadata discipline.
- **Mathematical Precision**: Accurate Reducing-Balance Monthly Compounding EMI formula:
  $$EMI = \frac{P \times R \times (1+R)^N}{(1+R)^N - 1}$$
- **Real-Time Interactive Calculations**:
  - Live slider + numeric inputs for Loan Amount (₹50,000 to ₹25,00,000), Annual Rate (9.5% to 24%), and Tenure (12 to 60 months).
  - High-precision dynamic SVG Donut chart displaying Principal vs. Interest percentage distribution.
  - **Side-by-Side Loan Scenario Comparison**: Temporary session list preserving the last 3 calculated results for side-by-side evaluation of monthly EMI, total interest, and total repayment, with "Lowest Monthly EMI" and "Lowest Total Interest" badges, one-click "Load in Calculator", and direct application prefill.
  - Full multi-year Amortization Repayment schedule with opening balance, annual EMI, principal paid, interest paid, and closing balance.
  - Early Prepayment & Foreclosure savings simulator.
- **Multi-Step Digital Application Flow (4 Steps + Success)**:
  - **Step 1: Personal Details** (Full name, 10-digit mobile, email, age/DOB validation, city, 6-digit PIN).
  - **Step 2: Employment Details** (Salaried / Self-Employed / Professional, company name, monthly net income, work experience, existing EMIs).
  - **Step 3: Loan Requirements** (Sanction amount slider, tenure selection, specific loan purpose).
  - **Step 4: Review Summary** (Full overview with inline step editing capability and regulatory declaration).
  - **Step 5: Confirmation & Reference ID** (Generated reference code `VL-APP-XXXXXX`, next steps timeline, print summary).
- **Interactive Eligibility Assessment**:
  - Rule-based FOIR (Fixed Obligation to Income Ratio) calculation capping total debt commitments at 50% of monthly net income.
  - Soft credit evaluation tiering with zero impact on official credit score.
- **Top Bar Contract**:
  - Zone 1: Single text element wordmark (`Vantage.`).
  - Zone 2: Clean semantic navigation links.
  - Zone 3: Direct actions ("Request Callback" modal & "Check Eligibility").
  - Mobile drawer navigation with backdrop.
- **Regulatory Compliance & Disclaimers**:
  - Non-deceptive financial copywriting.
  - Clear disclaimers stating that all loan approvals, rates, and limits are subject to lender underwriting criteria and document verification.
- **Backend-Ready Service Layer (`src/services/api.ts`)**:
  - Decoupled REST/GraphQL placeholder methods (`checkEligibility`, `submitApplication`, `requestCallback`, `submitContact`) with typed payloads, simulated latency, and error states.

---

## 2. Directory Structure

```text
├── index.html                  # SEO metadata, Open Graph, Twitter cards & Google Fonts
├── metadata.json               # AI Studio project configuration
├── package.json                # Project dependencies
├── tsconfig.json               # TypeScript configurations
├── vite.config.ts              # Vite & Tailwind CSS plugins
└── src/
    ├── App.tsx                 # Client-side routing & base layout
    ├── index.css               # Design tokens, CSS variables & slider styling
    ├── main.tsx                # React 19 entry point
    ├── components/
    │   ├── ApplicationForm.tsx # 4-step + success multi-step loan application
    │   ├── BenefitCard.tsx     # Reusable benefit card with Lucide icons
    │   ├── Button.tsx          # Accessible button with states & variants
    │   ├── CallbackModal.tsx   # Request callback modal dialog
    │   ├── EligibilityForm.tsx # Soft eligibility checking tool
    │   ├── EMICalculator.tsx   # Interactive EMI calculator with sliders
    │   ├── EMIChart.tsx        # High-precision SVG donut chart
    │   ├── FAQAccordion.tsx    # Accessible FAQ accordion with category tabs
    │   ├── Footer.tsx          # Institutional footer with disclaimers
    │   ├── Input.tsx           # Accessible form input with prefix/suffix/error
    │   ├── LoanCard.tsx        # Feature and loan purpose card
    │   ├── Navbar.tsx          # Sticky responsive navigation bar
    │   ├── ScrollToTop.tsx     # Route change scroll reset
    │   ├── StepTimeline.tsx    # 4-step progressive timeline
    │   ├── TestimonialCard.tsx # Borrower feedback card
    │   └── TrustIndicators.tsx # Core trust proof markers
    ├── data/
    │   ├── faq.ts              # Categorized questions & answers
    │   ├── loanFeatures.ts     # Benefits, document checklist, use cases
    │   └── testimonials.ts     # Customer review dataset
    ├── hooks/
    │   └── useEMICalculator.ts # Reactive hook for EMI & amortization
    ├── pages/
    │   ├── ApplyPage.tsx       # Dedicated application page
    │   ├── CalculatorPage.tsx  # In-depth EMI & amortization planner
    │   ├── ContactPage.tsx     # Contact info, inquiry form & callback
    │   ├── EligibilityPage.tsx # Borrowing power assessment page
    │   ├── Home.tsx            # Main landing page with all 11 core sections
    │   ├── PersonalLoan.tsx    # Product deep dive & fee schedule
    │   ├── PrivacyPage.tsx     # Compliant privacy disclosure
    │   └── TermsPage.tsx       # Terms of service
    ├── services/
    │   └── api.ts              # Pluggable backend API client layer
    └── utils/
        ├── calculations.ts     # Financial formulas & INR formatters
        └── validation.ts       # Form validation regex & helpers
```

---

## 3. Getting Started

### Prerequisites
- Node.js (version 18+ or 20+ recommended)
- npm or pnpm

### Installation
```bash
# Clone the repository
git clone <repo-url>

# Install dependencies
npm install

# Start local development server
npm run dev
```
The application will be served at `http://localhost:3000`.

### Production Build
```bash
npm run build
```
Generates production-optimized static assets inside the `dist/` folder.

---

## 4. Connecting a Real Backend

To connect the application to an active Express, Node.js, Python, or Go API backend:
1. Open `src/services/api.ts`.
2. Replace the simulated `delay()` and mock returns in `LoanApiService` with `fetch()` or `axios` calls pointing to your live `/api/v1/*` endpoints.
3. Configure environment variables in `.env` (e.g. `VITE_API_BASE_URL=https://api.yourdomain.com`).
