import {
  calculateFatigueRisk,
  calculateLivingWageRatio,
  canRoleAccessWorkerPrivateData,
  canRoleAccessFinancials,
  canRoleAccessWhistleblowerIdentity,
  canRoleApproveShiftSwaps,
  canRoleAccessAccommodations
} from './fairshiftLogic';
import { DEMO_ACCOUNTS } from '../data/mockData';

export function runFairShiftTests(): { name: string; passed: boolean; message?: string }[] {
  const results = [];

  // Test 1: Critical Fatigue Detection for long shifts with short recovery
  try {
    const risk = calculateFatigueRisk(13, 4, 11, true);
    if (risk === 'critical') {
      results.push({ name: 'Fatigue Calculation - Critical Risk on 13h Night Shift with 11h Rest', passed: true });
    } else {
      results.push({ name: 'Fatigue Calculation - Critical Risk', passed: false, message: `Expected critical, got ${risk}` });
    }
  } catch (e: any) {
    results.push({ name: 'Fatigue Calculation - Critical Risk', passed: false, message: e.message });
  }

  // Test 2: Low Fatigue Detection for standard shift with ample recovery
  try {
    const risk = calculateFatigueRisk(8, 1, 16, false);
    if (risk === 'low' || risk === 'moderate') {
      results.push({ name: 'Fatigue Calculation - Safe Risk on 8h Day Shift with 16h Rest', passed: true });
    } else {
      results.push({ name: 'Fatigue Calculation - Safe Risk', passed: false, message: `Expected low/moderate, got ${risk}` });
    }
  } catch (e: any) {
    results.push({ name: 'Fatigue Calculation - Safe Risk', passed: false, message: e.message });
  }

  // Test 3: Living Wage Ratio parity calculation
  try {
    const ratio = calculateLivingWageRatio(46.50, 23.80);
    if (ratio === 1.95) {
      results.push({ name: 'Living Wage Ratio - Standard Calculation matches 1.95x', passed: true });
    } else {
      results.push({ name: 'Living Wage Ratio', passed: false, message: `Expected 1.95, got ${ratio}` });
    }
  } catch (e: any) {
    results.push({ name: 'Living Wage Ratio', passed: false, message: e.message });
  }

  // Test 4: Role Boundary - Sales must NOT access worker private records
  try {
    const canSalesAccess = canRoleAccessWorkerPrivateData('sales');
    if (!canSalesAccess) {
      results.push({ name: 'RBAC Boundary - Sales Denied Worker Private Records', passed: true });
    } else {
      results.push({ name: 'RBAC Boundary - Sales', passed: false, message: 'Sales was incorrectly granted access' });
    }
  } catch (e: any) {
    results.push({ name: 'RBAC Boundary - Sales', passed: false, message: e.message });
  }

  // Test 5: Zero-Retaliation Guarantee - NO role can de-anonymize whistleblowers
  try {
    const adminDeAnon = canRoleAccessWhistleblowerIdentity('superadmin');
    const hrDeAnon = canRoleAccessWhistleblowerIdentity('hr');
    if (!adminDeAnon && !hrDeAnon) {
      results.push({ name: 'Zero-Retaliation - Whistleblower De-anonymization Permanently Barred', passed: true });
    } else {
      results.push({ name: 'Zero-Retaliation', passed: false, message: 'Whistleblower identity was exposed' });
    }
  } catch (e: any) {
    results.push({ name: 'Zero-Retaliation', passed: false, message: e.message });
  }

  // Test 6: Shift Swap Authority - Department Manager can approve department shift swaps
  try {
    const canMgrApprove = canRoleApproveShiftSwaps('manager');
    const canWorkerApprove = canRoleApproveShiftSwaps('worker');
    if (canMgrApprove && !canWorkerApprove) {
      results.push({ name: 'Role Authority - Department Manager Approved for Shift Swaps', passed: true });
    } else {
      results.push({ name: 'Role Authority - Shift Swaps', passed: false, message: 'Invalid shift swap permissions' });
    }
  } catch (e: any) {
    results.push({ name: 'Role Authority - Shift Swaps', passed: false, message: e.message });
  }

  // Test 7: Confidential Accommodations Isolation - Finance and Sales barred from accommodations
  try {
    const canFinanceAccessAcc = canRoleAccessAccommodations('finance');
    const canSalesAccessAcc = canRoleAccessAccommodations('sales');
    const canWorkerAccessAcc = canRoleAccessAccommodations('worker');
    if (!canFinanceAccessAcc && !canSalesAccessAcc && canWorkerAccessAcc) {
      results.push({ name: 'RBAC Boundary - Accommodations Confidentiality Protected from Commercial Roles', passed: true });
    } else {
      results.push({ name: 'RBAC Boundary - Accommodations', passed: false, message: 'Confidentiality violated' });
    }
  } catch (e: any) {
    results.push({ name: 'RBAC Boundary - Accommodations', passed: false, message: e.message });
  }

  // Test 8: Multiple Profiles for One Person - Distinct organizations & roles preserved
  try {
    const elena = DEMO_ACCOUNTS.find(a => a.id === 'acc-elena');
    if (elena && elena.memberships.length >= 3) {
      const orgIds = new Set(elena.memberships.map(m => m.organizationId));
      const hasEducation = elena.memberships.some(m => m.industry === 'education');
      const hasRetail = elena.memberships.some(m => m.industry === 'retail');
      const hasHealthcare = elena.memberships.some(m => m.industry === 'healthcare');
      
      if (orgIds.size === 3 && hasEducation && hasRetail && hasHealthcare) {
        results.push({ name: 'Multi-Profile Context - 3 Isolated Memberships Verified for One Person', passed: true });
      } else {
        results.push({ name: 'Multi-Profile Context', passed: false, message: 'Membership records incomplete or collided' });
      }
    } else {
      results.push({ name: 'Multi-Profile Context', passed: false, message: 'Elena Rostova account not found' });
    }
  } catch (e: any) {
    results.push({ name: 'Multi-Profile Context', passed: false, message: e.message });
  }

  return results;
}
