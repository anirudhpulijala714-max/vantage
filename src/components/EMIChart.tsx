import React from 'react';
import { formatINR } from '../utils/calculations';

interface EMIChartProps {
  principal: number;
  totalInterest: number;
  totalRepayment: number;
}

export const EMIChart: React.FC<EMIChartProps> = ({
  principal,
  totalInterest,
  totalRepayment,
}) => {
  const principalPercent = totalRepayment > 0 ? (principal / totalRepayment) * 100 : 70;
  const interestPercent = 100 - principalPercent;

  // Donut SVG parameters
  const size = 200;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Stroke-dash calculations
  const principalDash = (principalPercent / 100) * circumference;
  const interestDash = (interestPercent / 100) * circumference;
  const principalOffset = 0;
  const interestOffset = -principalDash;

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90"
          aria-label="Principal versus Interest breakdown donut chart"
        >
          {/* Background circle track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#F1F5F9"
            strokeWidth={strokeWidth}
          />
          {/* Principal segment (Dark Slate / Navy) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#1D4ED8"
            strokeWidth={strokeWidth}
            strokeDasharray={`${principalDash} ${circumference}`}
            strokeDashoffset={principalOffset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
          {/* Interest segment (Teal Accent) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#0D9488"
            strokeWidth={strokeWidth}
            strokeDasharray={`${interestDash} ${circumference}`}
            strokeDashoffset={interestOffset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-4">
          <span className="text-xs uppercase tracking-wider font-medium text-slate-500">Total Payable</span>
          <span className="text-lg font-bold text-slate-900 font-tabular">{formatINR(totalRepayment)}</span>
        </div>
      </div>

      {/* Legend & percentages */}
      <div className="w-full mt-6 grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
        <div className="flex items-start gap-2">
          <div className="w-3 h-3 rounded-sm bg-blue-600 mt-1 shrink-0" />
          <div>
            <div className="text-xs text-slate-500">Principal</div>
            <div className="text-sm font-semibold text-slate-900 font-tabular">
              {principalPercent.toFixed(1)}%
            </div>
            <div className="text-xs text-slate-600 font-tabular">{formatINR(principal)}</div>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="w-3 h-3 rounded-sm bg-teal-600 mt-1 shrink-0" />
          <div>
            <div className="text-xs text-slate-500">Total Interest</div>
            <div className="text-sm font-semibold text-slate-900 font-tabular">
              {interestPercent.toFixed(1)}%
            </div>
            <div className="text-xs text-slate-600 font-tabular">{formatINR(totalInterest)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
