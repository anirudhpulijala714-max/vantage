/**
 * Input validation and formatting helper functions
 */

export interface ValidationRule {
  validate: (val: string | number) => boolean;
  message: string;
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

export function isValidIndianMobile(mobile: string): boolean {
  // 10 digits starting with 6, 7, 8, or 9
  const cleaned = mobile.replace(/[^0-9]/g, '');
  return /^[6-9]\d{9}$/.test(cleaned);
}

export function formatIndianMobile(value: string): string {
  const cleaned = value.replace(/\D/g, '').slice(0, 10);
  if (cleaned.length > 5) {
    return `${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  return cleaned;
}

export function isValidName(name: string): boolean {
  return name.trim().length >= 3;
}

export function isValidAge(dobString: string): boolean {
  if (!dobString) return false;
  const dob = new Date(dobString);
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  const m = now.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) {
    age--;
  }
  return age >= 21 && age <= 65;
}

export function isValidIncome(income: number | string): boolean {
  const num = typeof income === 'string' ? parseFloat(income.replace(/[^0-9.]/g, '')) : income;
  return !isNaN(num) && num >= 15000;
}
