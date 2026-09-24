import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';
import { appConfig } from '../config/appConfig';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand & About */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 text-white group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-center font-extrabold text-base shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                V
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                {appConfig.name}<span className="text-teal-400">.</span>
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              A transparent, customer-first personal lending platform helping salaried and self-employed professionals evaluate borrowing capacity, compute accurate EMIs, and apply for structured financing options with institutional lenders.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
              <span>TLS 1.3 & 256-bit AES bank-grade data security</span>
            </div>
          </div>

          {/* Quick Links: Products & Tools */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">Loan Products & Tools</h5>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <Link to="/personal-loan" className="hover:text-white transition-colors">Personal Loan</Link>
              </li>
              <li>
                <Link to="/calculator" className="hover:text-white transition-colors">EMI Calculator</Link>
              </li>
              <li>
                <Link to="/eligibility" className="hover:text-white transition-colors">Check Eligibility</Link>
              </li>
              <li>
                <Link to="/status" className="hover:text-white transition-colors">Track Application Status</Link>
              </li>
              <li>
                <Link to="/apply" className="hover:text-white transition-colors">Apply Online</Link>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">Company & Legal</h5>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact Loan Desk</Link>
              </li>
              <li>
                <Link to="/#faq" className="hover:text-white transition-colors">Frequently Asked Questions</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">Contact & Desk</h5>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span>{appConfig.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                <span>{appConfig.supportPhone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                <span>{appConfig.supportEmail}</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-500 shrink-0" />
                <span>{appConfig.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory & Compliance Disclaimers */}
        <div className="border-t border-slate-900 pt-8 space-y-3 bg-slate-900/40 p-6 rounded-2xl">
          <p className="text-xs text-slate-400 leading-relaxed">
            <strong className="text-slate-200">Statutory Lending Disclaimer:</strong> Loan approvals, interest rates, processing fees, and repayment tenures are strictly subject to individual borrower credit evaluation, documentation verification, and the independent credit underwriting policies of partnered scheduled commercial banks and RBI-registered NBFCs. Information displayed on this portal is for general illustrative and assessment purposes and does not constitute a guaranteed loan sanction or binding commitment.
          </p>
          <p className="text-xs text-slate-400 leading-relaxed">
            <strong className="text-slate-200">Representative APR Disclosure:</strong> Annual Percentage Rates (APR) for personal loans typically range from 10.50% to 24.00% p.a. depending on borrower creditworthiness, employer profile, and chosen tenure. Repayment periods span from 12 to 60 months. <em>Representative example:</em> For a loan amount of ₹1,00,000 borrowed at an annual interest rate of 10.50% for 36 months, the monthly EMI will be ₹3,250, with total interest payable of ₹17,009 and total repayment amount of ₹1,17,009 (excluding applicable processing fees and GST).
          </p>
        </div>

        {/* Copyright & Legal Navigation */}
        <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {appConfig.legalEntityName}. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>·</span>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <span>·</span>
            <Link to="/contact" className="hover:text-white transition-colors">Support Desk</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
