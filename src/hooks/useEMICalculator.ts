import { useState, useMemo } from 'react';
import { calculateEMI, EMICalculationResult, generateAmortizationSchedule, AmortizationRow } from '../utils/calculations';

export interface UseEMICalculatorProps {
  initialAmount?: number;
  initialRate?: number;
  initialTenure?: number;
}

export function useEMICalculator({
  initialAmount = 500000,
  initialRate = 11.5,
  initialTenure = 3,
}: UseEMICalculatorProps = {}) {
  const [loanAmount, setLoanAmount] = useState<number>(initialAmount);
  const [interestRate, setInterestRate] = useState<number>(initialRate);
  const [tenureYears, setTenureYears] = useState<number>(initialTenure);

  const result: EMICalculationResult = useMemo(() => {
    return calculateEMI(loanAmount, interestRate, tenureYears);
  }, [loanAmount, interestRate, tenureYears]);

  const schedule: AmortizationRow[] = useMemo(() => {
    return generateAmortizationSchedule(loanAmount, interestRate, tenureYears);
  }, [loanAmount, interestRate, tenureYears]);

  const handleAmountChange = (val: number) => {
    const clamped = Math.max(50000, Math.min(2500000, val));
    setLoanAmount(clamped);
  };

  const handleRateChange = (val: number) => {
    const clamped = Math.max(9.5, Math.min(24.0, Number(val.toFixed(2))));
    setInterestRate(clamped);
  };

  const handleTenureChange = (val: number) => {
    const clamped = Math.max(1, Math.min(5, val));
    setTenureYears(clamped);
  };

  return {
    loanAmount,
    interestRate,
    tenureYears,
    setLoanAmount: handleAmountChange,
    setInterestRate: handleRateChange,
    setTenureYears: handleTenureChange,
    result,
    schedule,
  };
}
