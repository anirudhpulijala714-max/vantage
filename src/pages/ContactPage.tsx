import React, { useState } from 'react';
import { LoanApiService, ContactEnquiryRequest } from '../services/api';
import { isValidEmail, isValidIndianMobile } from '../utils/validation';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { CallbackModal } from '../components/CallbackModal';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  PhoneCall,
  CheckCircle2,
  AlertCircle,
  Building
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [subject, setSubject] = useState('Loan Application Inquiry');
  const [message, setMessage] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || fullName.trim().length < 3) {
      setError('Please enter your full name (minimum 3 characters).');
      return;
    }
    if (!isValidEmail(email)) {
      setError('Please provide a valid email address.');
      return;
    }
    if (!isValidIndianMobile(mobile)) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!message.trim() || message.trim().length < 10) {
      setError('Please enter your message or query (at least 10 characters).');
      return;
    }

    setError('');
    setIsLoading(true);
    try {
      await LoanApiService.submitContact({
        fullName,
        email,
        mobile,
        subject,
        message,
      });
      setIsSuccess(true);
    } catch {
      setError('Something went wrong while sending your inquiry. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-24">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-14 sm:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-teal-400">Customer Support Desk</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              We&rsquo;re Here to Help You Navigate Borrowing
            </h1>
            <p className="text-base text-slate-300 leading-relaxed">
              Have questions regarding loan eligibility, documentation, or your application status? Connect directly with our team.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Contact Info + Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Contact Info & Callback Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <h3 className="text-xl font-bold text-slate-900">Registered Office</h3>

              <div className="space-y-4 text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800 block">Corporate Headquarters:</strong>
                    <span>Level 4, Prestige Tech Park, Marathahalli-Sarjapur Outer Ring Road, Bengaluru, Karnataka 560103</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800 block">Helpline (Toll-Free):</strong>
                    <span>+91 XXXXX XXXXX (Placeholder)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800 block">Email Inquiries:</strong>
                    <span>support@example.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800 block">Operational Hours:</strong>
                    <span>Monday to Saturday: 9:30 AM to 6:30 PM IST</span>
                    <span className="text-xs text-slate-400 block mt-0.5">Closed on second Saturdays & public holidays</span>
                  </div>
                </div>
              </div>

              {/* Direct Callback Trigger */}
              <div className="pt-4 border-t border-slate-100">
                <div className="bg-blue-50/70 border border-blue-100 p-4 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-blue-900">
                    <PhoneCall className="w-4 h-4 text-blue-600" />
                    <span>Prefer Speaking With an Advisor?</span>
                  </div>
                  <p className="text-xs text-blue-800">
                    Schedule a convenient callback time and our loan specialist will reach out.
                  </p>
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full mt-2"
                    onClick={() => setIsCallbackOpen(true)}
                  >
                    Request a Callback
                  </Button>
                </div>
              </div>
            </div>

            {/* Office map representation container */}
            <div className="bg-slate-100 rounded-2xl border border-slate-200 p-6 text-center space-y-2">
              <Building className="w-8 h-8 text-slate-400 mx-auto" />
              <h4 className="text-sm font-bold text-slate-800">Prestige Tech Park Office Campus</h4>
              <p className="text-xs text-slate-500">
                Visitors by appointment only. Please contact your loan advisor prior to scheduling an in-person meeting.
              </p>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-xs">
              {isSuccess ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Message Received!</h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Thank you for reaching out. Our customer support team has received your ticket and will respond to <strong className="text-slate-800">{email}</strong> within 1 business day.
                  </p>
                  <Button
                    variant="outline"
                    size="md"
                    className="mt-4"
                    onClick={() => {
                      setIsSuccess(false);
                      setMessage('');
                    }}
                  >
                    Send Another Inquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Send an Online Enquiry</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Fill out the form below and an advisory representative will revert promptly.
                    </p>
                  </div>

                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Your Full Name"
                      isRequired
                      placeholder="e.g. Anand Menon"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />

                    <Input
                      label="Email Address"
                      isRequired
                      type="email"
                      placeholder="anand@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Mobile Number"
                      isRequired
                      prefixText="+91"
                      maxLength={10}
                      placeholder="98765 43210"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                    />

                    <div>
                      <label htmlFor="inquiry-subject-select" className="block text-sm font-medium text-slate-800 mb-1.5">
                        Inquiry Subject
                      </label>
                      <select
                        id="inquiry-subject-select"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full py-2.5 px-3 rounded-lg border border-slate-300 bg-white text-sm text-slate-800 focus:border-blue-600 focus:outline-none"
                      >
                        <option value="Loan Application Inquiry">New Loan Application Inquiry</option>
                        <option value="Eligibility Questions">Eligibility & Documentation</option>
                        <option value="EMI & Rate Clarification">EMI & Interest Rate Clarification</option>
                        <option value="Application Status Check">Check Application Status</option>
                        <option value="Other Assistance">Other General Questions</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message-textarea" className="block text-sm font-medium text-slate-800 mb-1.5">
                      Your Message / Query <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message-textarea"
                      rows={4}
                      placeholder="Tell us what you're looking for or details about your borrowing requirement..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-3 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="secondary"
                      size="lg"
                      className="w-full"
                      isLoading={isLoading}
                    >
                      Submit Online Enquiry
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Callback modal */}
      <CallbackModal
        isOpen={isCallbackOpen}
        onClose={() => setIsCallbackOpen(false)}
      />
    </div>
  );
};
