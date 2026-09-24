import React, { useState } from 'react';
import { LoanApiService } from '../services/api';
import { isValidIndianMobile } from '../utils/validation';
import { useToast } from '../context/ToastContext';
import { Button } from './Button';
import { Input } from './Input';
import { SecurityBadge } from './SecurityBadge';
import { X, PhoneCall, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CallbackModal: React.FC<CallbackModalProps> = ({ isOpen, onClose }) => {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [preferredTime, setPreferredTime] = useState<'Morning' | 'Afternoon' | 'Evening'>('Morning');
  const [loanRequirement, setLoanRequirement] = useState('₹3 Lakh – ₹5 Lakh');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || name.trim().length < 3) {
      setError('Please provide your full name (minimum 3 characters).');
      showToast('Please enter your full name.', 'warning');
      return;
    }
    if (!isValidIndianMobile(mobileNumber)) {
      setError('Please enter a valid 10-digit mobile number.');
      showToast('Please enter a valid 10-digit mobile number.', 'warning');
      return;
    }

    setError('');
    setIsLoading(true);
    try {
      await LoanApiService.requestCallback({
        fullName: name,
        mobile: mobileNumber,
        preferredTimeSlot: preferredTime,
        loanAmountRange: loanRequirement,
      });
      setIsSuccess(true);
      showToast('Your callback request has been submitted.', 'success');
    } catch {
      setError('Could not schedule callback. Please try again or call our support line.');
      showToast('Unable to process your request. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsSuccess(false);
    setError('');
    setName('');
    setMobileNumber('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5 text-slate-900 dark:text-white font-bold text-base">
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
              <PhoneCall className="w-4 h-4" />
            </div>
            <span>Request a Callback</span>
          </div>
          <button
            onClick={handleModalClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-6 sm:p-8 text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-teal-100 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center mx-auto ring-8 ring-teal-50 dark:ring-teal-900/20">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Your callback request has been submitted.
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                A personal loan advisor will contact you during <strong className="text-slate-900 dark:text-white">{preferredTime}</strong> hours at <strong className="text-slate-900 dark:text-white font-mono">+91 {mobileNumber}</strong>.
              </p>
            </div>
            <Button
              variant="primary"
              size="md"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600"
              onClick={handleModalClose}
            >
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Connect with an accredited loan officer for a personalized walkthrough of interest rates, documents, and eligibility.
            </p>

            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Input
              label="Full Name"
              isRequired
              placeholder="e.g. Ramesh Patel"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              label="Mobile Number"
              isRequired
              prefixText="+91"
              maxLength={10}
              placeholder="98765 43210"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
            />

            {/* Time options: Morning, Afternoon, Evening */}
            <div>
              <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                Preferred Time
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Morning', 'Afternoon', 'Evening'] as const).map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setPreferredTime(slot)}
                    className={`py-2 px-3 text-xs font-semibold rounded-xl border text-center transition-all ${
                      preferredTime === slot
                        ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-blue-400 dark:border-blue-600 shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Loan requirement */}
            <div>
              <label htmlFor="cb-loan-req" className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                Loan Requirement
              </label>
              <select
                id="cb-loan-req"
                value={loanRequirement}
                onChange={(e) => setLoanRequirement(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-800 dark:text-white focus:border-blue-600 focus:outline-none"
              >
                <option value="Under ₹1 Lakh">Under ₹1 Lakh</option>
                <option value="₹1 Lakh – ₹3 Lakh">₹1 Lakh – ₹3 Lakh</option>
                <option value="₹3 Lakh – ₹5 Lakh">₹3 Lakh – ₹5 Lakh</option>
                <option value="₹5 Lakh – ₹10 Lakh">₹5 Lakh – ₹10 Lakh</option>
                <option value="₹10 Lakh+">₹10 Lakh and above</option>
              </select>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600"
                isLoading={isLoading}
              >
                Request Callback
              </Button>
            </div>

            <SecurityBadge variant="banner" />
          </form>
        )}
      </div>
    </div>
  );
};
