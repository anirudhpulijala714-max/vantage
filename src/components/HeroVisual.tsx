import React from 'react';
import { motion } from 'motion/react';
import {
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  Zap,
  Lock,
  Wallet
} from 'lucide-react';
import { formatINR } from '../utils/calculations';

export const HeroVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
      {/* Colorful background radial glows */}
      <div className="absolute -top-12 -left-12 w-64 h-64 bg-gradient-to-tr from-blue-600/20 via-indigo-600/20 to-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-gradient-to-br from-teal-500/20 via-emerald-500/20 to-blue-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Glassmorphic Dashboard Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-2xl p-6 sm:p-7 space-y-6"
      >
        {/* Top bar of widget */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Credit Health & Sanction Meter
                </h4>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Verified Soft Underwriting Engine
              </p>
            </div>
          </div>
          <span className="text-[10px] font-bold font-mono px-2.5 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800/80">
            APR 10.5%
          </span>
        </div>

        {/* Live Loan Amount Visualization */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 rounded-2xl p-5 text-white shadow-lg space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/15 rounded-full blur-xl pointer-events-none" />

          <div className="flex justify-between items-center relative z-10">
            <span className="text-xs text-slate-300 font-medium">Approved Pre-Assessment</span>
            <span className="text-[11px] text-teal-400 font-mono flex items-center gap-1">
              <Zap className="w-3 h-3" /> Soft Evaluation
            </span>
          </div>

          <div className="relative z-10">
            <div className="text-2xl sm:text-3xl font-extrabold font-tabular text-white tracking-tight">
              {formatINR(500000)}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-slate-400 font-tabular">36 Monthly Instalments</span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-teal-300 font-medium font-tabular">Zero Collateral</span>
            </div>
          </div>

          {/* Mini progress gauge */}
          <div className="space-y-1 relative z-10 pt-1">
            <div className="flex justify-between text-[11px] text-slate-400 font-tabular">
              <span>Sanction Capacity</span>
              <span className="text-teal-400 font-bold">85% Clean Profile</span>
            </div>
            <div className="w-full h-2 bg-slate-700/80 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                className="h-full bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-500 rounded-full"
              />
            </div>
          </div>
        </div>

        {/* EMI & Rate Breakdown Preview */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
              Estimated Monthly EMI
            </span>
            <div className="text-base sm:text-lg font-extrabold text-blue-600 dark:text-blue-400 font-tabular">
              {formatINR(16248)}
              <span className="text-xs text-slate-500 font-normal"> /mo</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
              Indicative Interest
            </span>
            <div className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white font-tabular">
              10.50%
              <span className="text-xs text-teal-600 dark:text-teal-400 font-semibold"> p.a.</span>
            </div>
          </div>
        </div>

        {/* Feature bullets */}
        <div className="pt-1 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 font-medium">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-500" />
            Zero Hidden Fees
          </span>
          <span className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-blue-500" />
            256-bit Security
          </span>
          <span className="flex items-center gap-1.5 hidden sm:flex">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            Swift Digital KYC
          </span>
        </div>
      </motion.div>

      {/* Floating Card 1: Fast Approval Badge (Top Right) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="hidden sm:flex absolute -top-5 -right-6 z-20 bg-white dark:bg-slate-800 rounded-2xl p-3.5 border border-slate-200 dark:border-slate-700 shadow-xl items-center gap-3"
      >
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
          <TrendingUp className="w-4 h-4" />
        </div>
        <div className="text-left">
          <span className="text-[10px] uppercase font-bold tracking-wider text-teal-600 dark:text-teal-400 block">
            Speedy Evaluation
          </span>
          <span className="text-xs font-extrabold text-slate-900 dark:text-white">
            Pre-Approval in 24 Hrs
          </span>
        </div>
      </motion.div>

      {/* Floating Card 2: Safe & Regulated (Bottom Left) */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="hidden sm:flex absolute -bottom-5 -left-6 z-20 bg-white dark:bg-slate-800 rounded-2xl p-3.5 border border-slate-200 dark:border-slate-700 shadow-xl items-center gap-3"
      >
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div className="text-left">
          <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400 block">
            Bureau Safe
          </span>
          <span className="text-xs font-extrabold text-slate-900 dark:text-white">
            No Score Impact
          </span>
        </div>
      </motion.div>
    </div>
  );
};
