import { Role } from '../types';

/**
 * Calculates physiological and cognitive fatigue risk for a shift
 * aligned with UN SDG 8.8 decent work & circadian safety parameters.
 */
export function calculateFatigueRisk(
  durationHours: number,
  consecutiveDays: number,
  recoveryHours: number,
  isNightShift: boolean = false
): 'low' | 'moderate' | 'elevated' | 'critical' {
  let score = 0;

  // Shift duration scoring
  if (durationHours > 12) score += 35;
  else if (durationHours > 8) score += 20;
  else score += 10;

  // Consecutive days accumulation
  if (consecutiveDays >= 5) score += 30;
  else if (consecutiveDays >= 3) score += 15;

  // Insufficient recovery interval
  if (recoveryHours < 12) score += 30;
  else if (recoveryHours < 14) score += 15;

  // Night shift circadian penalty
  if (isNightShift) score += 15;

  if (score >= 70) return 'critical';
  if (score >= 45) return 'elevated';
  if (score >= 25) return 'moderate';
  return 'low';
}

/**
 * Calculates the living wage parity ratio against local MIT Living Wage benchmarks.
 * Ratio >= 1.0 means compliant; < 1.0 indicates a wage deficit.
 */
export function calculateLivingWageRatio(
  hourlyBaseRate: number,
  regionalLivingWage: number
): number {
  if (regionalLivingWage <= 0) return 1.0;
  return Number((hourlyBaseRate / regionalLivingWage).toFixed(2));
}

/**
 * RBAC Boundary Check: Can this role access other workers' confidential records?
 */
export function canRoleAccessWorkerPrivateData(role: Role): boolean {
  return role === 'hr' || role === 'superadmin';
}

/**
 * RBAC Boundary Check: Can this role inspect aggregate financial P&L and margins?
 */
export function canRoleAccessFinancials(role: Role): boolean {
  return role === 'finance' || role === 'superadmin';
}

/**
 * RBAC Boundary Check: Can this role approve department shift swaps & relief coverage?
 */
export function canRoleApproveShiftSwaps(role: Role): boolean {
  return role === 'manager' || role === 'hr' || role === 'superadmin';
}

/**
 * Zero-Retaliation Core Guarantee:
 * NO ROLE — not even superadmin or CEO — is permitted to de-anonymize anonymous whistleblowers.
 */
export function canRoleAccessWhistleblowerIdentity(role: Role): boolean {
  return false;
}

/**
 * RBAC Boundary Check: Can this role inspect confidential accommodation requests?
 * Restricted to Worker (own), HR, and SuperAdmin. Finance and Sales are strictly barred.
 */
export function canRoleAccessAccommodations(role: Role): boolean {
  return role === 'worker' || role === 'hr' || role === 'superadmin';
}

