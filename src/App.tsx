import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { WhatsAppButton } from './components/WhatsAppButton';
import { MobileBottomBar } from './components/MobileBottomBar';
import { ExitIntentModal } from './components/ExitIntentModal';
import { CallbackModal } from './components/CallbackModal';

import { Home } from './pages/Home';
import { PersonalLoan } from './pages/PersonalLoan';
import { EligibilityPage } from './pages/EligibilityPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { ApplyPage } from './pages/ApplyPage';
import { ApplicationStatusPage } from './pages/ApplicationStatusPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);

  return (
    <ThemeProvider>
      <ToastProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-600 selection:text-white transition-colors">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/personal-loan" element={<PersonalLoan />} />
                <Route path="/eligibility" element={<EligibilityPage />} />
                <Route path="/calculator" element={<CalculatorPage />} />
                <Route path="/apply" element={<ApplyPage />} />
                <Route path="/status" element={<ApplicationStatusPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
            <WhatsAppButton />
            <MobileBottomBar />
            <ExitIntentModal onRequestCallback={() => setIsCallbackOpen(true)} />
            <CallbackModal
              isOpen={isCallbackOpen}
              onClose={() => setIsCallbackOpen(false)}
            />
          </div>
        </Router>
      </ToastProvider>
    </ThemeProvider>
  );
}
