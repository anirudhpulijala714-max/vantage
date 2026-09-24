import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  prefixText?: string;
  suffixText?: string;
  isRequired?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  prefixText,
  suffixText,
  isRequired = false,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1.5">
        <label htmlFor={inputId} className="block text-sm font-medium text-slate-800">
          {label}
          {isRequired && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      </div>

      <div className="relative rounded-lg shadow-xs">
        {prefixText && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 text-sm font-medium">
            {prefixText}
          </div>
        )}

        <input
          id={inputId}
          className={`block w-full rounded-lg border bg-white text-slate-900 text-sm transition-colors
            ${prefixText ? 'pl-9' : 'pl-3.5'}
            ${suffixText ? 'pr-12' : 'pr-3.5'}
            py-2.5
            ${error ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-300 hover:border-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600'}
            placeholder:text-slate-400 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed
            ${className}`}
          {...props}
        />

        {suffixText && (
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-500 text-sm">
            {suffixText}
          </div>
        )}
      </div>

      {error ? (
        <p className="mt-1.5 text-xs text-red-600 font-medium" role="alert">
          {error}
        </p>
      ) : helperText ? (
        <p className="mt-1.5 text-xs text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
};
