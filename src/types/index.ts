export type Role = 'worker' | 'manager' | 'hr' | 'finance' | 'sales' | 'safety' | 'superadmin';

export type Industry = 'healthcare' | 'manufacturing' | 'education' | 'corporate' | 'retail';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: Role;
  roleLabel: string;
  department: string;
  avatar: string;
  organizationId: string;
  organizationName: string;
  skillsCount: number;
  hasActiveAccommodation: boolean;
  membershipId?: string;
  accountId?: string;
}

export interface UserMembership {
  id: string;
  organizationId: string;
  organizationName: string;
  industry: Industry;
  role: Role;
  roleLabel: string;
  department: string;
  badge: string; // e.g., 'Student / Work-Study', 'Evening Shift Associate', 'Per-Diem Aide'
  location: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  avatar: string;
  headline: string;
  activeMembershipId: string;
  memberships: UserMembership[];
}

export interface Organization {
  id: string;
  name: string;
  industry: Industry;
  tagline: string;
  theme: Industry;
  location: string;
  workerCount: number;
  avgFatigueScore: number;
  livingWageCompliance: number;
  description: string;
  keyConcerns: string[];
}

export interface Shift {
  id: string;
  workerId: string;
  workerName: string;
  roleTitle: string;
  department: string;
  date: string;
  startTime: string;
  endTime: string;
  durationHours: number;
  status: 'scheduled' | 'active' | 'completed' | 'swapped';
  fatigueRisk: 'low' | 'moderate' | 'elevated' | 'critical';
  recoveryTimeHours: number;
  baseRate: number;
  overtimeHours: number;
  hazardNotes?: string;
}

export interface LeaveRequest {
  id: string;
  workerId: string;
  workerName: string;
  department: string;
  type: 'annual' | 'fatigue-recovery' | 'sick' | 'parental' | 'study' | 'unpaid';
  startDate: string;
  endDate: string;
  daysCount: number;
  status: 'pending' | 'approved' | 'rejected';
  reason: string;
  appliedAt: string;
}

export interface OvertimeRequest {
  id: string;
  workerId: string;
  workerName: string;
  shiftDate: string;
  hoursRequested: number;
  reason: string;
  fatigueImpact: 'acceptable' | 'warning' | 'high-risk';
  status: 'pending' | 'approved' | 'rejected';
  appliedAt: string;
}

export interface Payslip {
  id: string;
  workerId: string;
  period: string;
  basePay: number;
  overtimePay: number;
  fairShiftPremium: number;
  grossPay: number;
  deductions: number;
  netPay: number;
  regionalLivingWage: number;
  livingWageRatio: number;
  transparencyScore: number;
  payDate: string;
  status: 'settled' | 'processing';
}

export interface IncidentReport {
  id: string;
  trackingCode: string;
  isAnonymous: boolean;
  reporterName?: string;
  department: string;
  category: 'ergonomic' | 'hazard-leak' | 'fatigue-strain' | 'machinery' | 'harassment' | 'ventilation' | 'safety-gear' | 'other';
  severity: 'low' | 'moderate' | 'high' | 'critical';
  title: string;
  description: string;
  dateReported: string;
  status: 'reported' | 'investigating' | 'action-assigned' | 'resolved';
  correctiveAction?: string;
  assignedOfficer?: string;
  resolutionDate?: string;
  voiceTranscriptUsed?: boolean;
}

export interface SkillRecord {
  id: string;
  workerId: string;
  title: string;
  category: 'clinical' | 'machinery' | 'safety-protocol' | 'leadership' | 'digital' | 'operations';
  level: 'Apprentice' | 'Practitioner' | 'Certified Specialist' | 'Master';
  issuingBody: string;
  verifiedDate: string;
  verifiedBy: string;
  expiryDate?: string;
  badge: string;
}

export interface AccommodationRequest {
  id: string;
  workerId: string;
  workerName: string;
  category: 'ergonomic-equipment' | 'flexible-scheduling' | 'sensory-lighting' | 'micro-breaks' | 'screen-contrast' | 'mobility-assist';
  description: string;
  noMedicalDiagnosisConfirmed: boolean;
  status: 'active' | 'in-review' | 'accommodated';
  dateRequested: string;
  confidentialityRestricted: boolean;
  reviewedBy?: string;
}

export interface PulseSignalEvidence {
  label: string;
  value: string;
  baseline: string;
  trend: 'up' | 'down' | 'neutral';
  alert: boolean;
}

export interface PulseInsight {
  id: string;
  title: string;
  type: 'fatigue-risk' | 'safety-cluster' | 'margin-pressure' | 'retention-warning' | 'equity-gap';
  severity: 'low' | 'medium' | 'high' | 'critical';
  department: string;
  summary: string;
  evidenceSignals: PulseSignalEvidence[];
  correlationNote: string;
  confidenceScore: number;
  recommendedAction: string;
  assignedOwner: string;
  actionStatus: 'pending' | 'in-progress' | 'mitigated';
  beforeMetric: string;
  afterMetric?: string;
  isPredefinedDemo: boolean;
  sdgTarget: string;
  generatedDate: string;
}

export interface FinancialMetric {
  period: string;
  revenue: number;
  operatingCosts: number;
  laborSpend: number;
  netMargin: number;
  livingWageComplianceRate: number;
  budgetVariance: number;
}

export interface DepartmentSpend {
  department: string;
  allocatedBudget: number;
  actualSpend: number;
  overtimeCost: number;
  variancePercentage: number;
}

export interface SalesMetric {
  period: string;
  targetRevenue: number;
  actualRevenue: number;
  dealVelocityDays: number;
  clientRetentionRate: number;
  activeContracts: number;
}

export interface TeamSalesPerformance {
  repName: string;
  territory: string;
  target: number;
  closed: number;
  pipeline: number;
  complianceChecked: boolean;
}

export interface AccessibilitySettings {
  fontSize: 'normal' | 'medium' | 'large' | 'xlarge';
  highContrast: boolean;
  reducedMotion: boolean;
  language: 'en' | 'es' | 'fr' | 'de' | 'hi' | 'tl';
  simpleLanguage: boolean;
}
