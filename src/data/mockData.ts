import {
  Organization,
  UserProfile,
  Shift,
  LeaveRequest,
  OvertimeRequest,
  Payslip,
  IncidentReport,
  SkillRecord,
  AccommodationRequest,
  PulseInsight,
  FinancialMetric,
  DepartmentSpend,
  SalesMetric,
  TeamSalesPerformance,
  UserAccount,
  UserMembership
} from '../types';

export const ORGANIZATIONS: Organization[] = [
  {
    id: 'org-health',
    name: 'St. Jude Regional Healthcare',
    industry: 'healthcare',
    tagline: 'Compassionate Care Grounded in Clinician Rest and Safety',
    theme: 'healthcare',
    location: 'Metropolitan Medical District',
    workerCount: 1420,
    avgFatigueScore: 42,
    livingWageCompliance: 100,
    description: 'A 650-bed teaching hospital with round-the-clock emergency, trauma, and intensive care units.',
    keyConcerns: ['ICU Night Shift Overtime', 'Consecutive 12-Hour Rest Deficits', 'Needle-Stick Risk Mitigation']
  },
  {
    id: 'org-mfg',
    name: 'Apex Heavy Dynamics',
    industry: 'manufacturing',
    tagline: 'Precision Metal Stamping with Zero Compromise on Worker Safety',
    theme: 'manufacturing',
    location: 'Industrial Parkway Sector 4',
    workerCount: 890,
    avgFatigueScore: 38,
    livingWageCompliance: 99.4,
    description: 'Heavy automotive and aerospace structural stamping facility operating high-tonnage hydraulic presses.',
    keyConcerns: ['Press Line B Hydraulic Fluid Leaks', '2nd Shift Repetitive Motion Fatigue', 'Noise Level Compliance']
  },
  {
    id: 'org-edu',
    name: 'Horizon Unified Academy',
    industry: 'education',
    tagline: 'Nurturing Minds with Sustainable Educator Workloads',
    theme: 'education',
    location: 'Oakridge Campus',
    workerCount: 460,
    avgFatigueScore: 28,
    livingWageCompliance: 100,
    description: 'K-12 international baccalaureate campus emphasizing educator well-being, curriculum prep equity, and inclusive accessibility.',
    keyConcerns: ['Weekend Grading Burnout', 'Special Education Support Coverage', 'Classroom Air Quality']
  },
  {
    id: 'org-corp',
    name: 'Nexus Enterprise Solutions',
    industry: 'corporate',
    tagline: 'Sustainable Global Tech Operations and Ethical Working Hours',
    theme: 'corporate',
    location: 'Financial Tower Central',
    workerCount: 3100,
    avgFatigueScore: 24,
    livingWageCompliance: 100,
    description: 'Global enterprise software and advisory firm with distributed cross-timezone engineering and consultancy teams.',
    keyConcerns: ['Cross-Timezone Call Sprawl', 'Digital Eye Strain & Screen Fatigue', 'Remote Ergonomic Setups']
  },
  {
    id: 'org-retail',
    name: 'Vertex OmniRetail Group',
    industry: 'retail',
    tagline: 'Fair Scheduling, Living Wages, and Dignity on the Sales Floor',
    theme: 'retail',
    location: 'Regional Distribution & Flagship Hub',
    workerCount: 2240,
    avgFatigueScore: 34,
    livingWageCompliance: 98.8,
    description: 'Omni-channel lifestyle and electronics retailer featuring 18 regional fulfillment depots and multi-level flagship stores.',
    keyConcerns: ['On-Call Scheduling Predictability', 'Warehouse Repetitive Strain', 'Peak Holiday Shift Coverage']
  }
];

export const DEMO_USERS: Record<string, UserProfile> = {
  worker: {
    id: 'usr-worker-01',
    name: 'Maya Lin, RN',
    email: 'maya.lin@stjude-health.org',
    role: 'worker',
    roleLabel: 'Staff Critical Care Nurse (Level III)',
    department: 'Intensive Care Unit (ICU)',
    avatar: 'https://images.unsplash.com/photo-1594824813515-585a97576f33?auto=format&fit=crop&q=80&w=256',
    organizationId: 'org-health',
    organizationName: 'St. Jude Regional Healthcare',
    skillsCount: 6,
    hasActiveAccommodation: true
  },
  hr: {
    id: 'usr-hr-01',
    name: 'Sarah Chen, SHRM-SCP',
    email: 'sarah.chen@fairshift.internal',
    role: 'hr',
    roleLabel: 'VP of People, Rest & Workforce Well-Being',
    department: 'Workforce Well-Being & Scheduling',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256',
    organizationId: 'org-health',
    organizationName: 'St. Jude Regional Healthcare',
    skillsCount: 9,
    hasActiveAccommodation: false
  },
  finance: {
    id: 'usr-fin-01',
    name: 'David Ross, CFA',
    email: 'david.ross@fairshift.internal',
    role: 'finance',
    roleLabel: 'Director of Financial Operations & Living Wage Parity',
    department: 'Finance & Labor Economics',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256',
    organizationId: 'org-health',
    organizationName: 'St. Jude Regional Healthcare',
    skillsCount: 8,
    hasActiveAccommodation: false
  },
  sales: {
    id: 'usr-sales-01',
    name: 'Elena Gomez',
    email: 'elena.gomez@fairshift.internal',
    role: 'sales',
    roleLabel: 'Commercial Partnerships & Client Director',
    department: 'Enterprise Client Growth',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=256',
    organizationId: 'org-health',
    organizationName: 'St. Jude Regional Healthcare',
    skillsCount: 7,
    hasActiveAccommodation: false
  },
  safety: {
    id: 'usr-safety-01',
    name: 'Frank Kowalski, CSP',
    email: 'frank.kowalski@fairshift.internal',
    role: 'safety',
    roleLabel: 'Lead Safety & Environmental Health Officer',
    department: 'Occupational Health & Ergonomics (EHS)',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256',
    organizationId: 'org-health',
    organizationName: 'St. Jude Regional Healthcare',
    skillsCount: 11,
    hasActiveAccommodation: false
  },
  manager: {
    id: 'usr-mgr-01',
    name: 'Carlos Santana, MSN',
    email: 'carlos.santana@stjude-health.org',
    role: 'manager',
    roleLabel: 'ICU Unit & Shift Operations Manager',
    department: 'Intensive Care Unit (ICU)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
    organizationId: 'org-health',
    organizationName: 'St. Jude Regional Healthcare',
    skillsCount: 10,
    hasActiveAccommodation: false
  },
  superadmin: {
    id: 'usr-admin-01',
    name: 'Dr. Aris Thorne',
    email: 'aris.thorne@fairshift-trust.org',
    role: 'superadmin',
    roleLabel: 'Executive Trustee & Global Workforce Ombudsman',
    department: 'Executive Governance & SDG 8 Stewardship',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=256',
    organizationId: 'org-health',
    organizationName: 'St. Jude Regional Healthcare',
    skillsCount: 14,
    hasActiveAccommodation: false
  }
};

export const DEMO_ACCOUNTS: UserAccount[] = [
  {
    id: 'acc-elena',
    name: 'Elena Rostova',
    email: 'elena.rostova@fairshift.demo',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
    headline: 'Graduate Student & Multi-Industry Part-Time Worker',
    activeMembershipId: 'mem-elena-edu',
    memberships: [
      {
        id: 'mem-elena-edu',
        organizationId: 'org-edu',
        organizationName: 'Horizon Unified Academy',
        industry: 'education',
        role: 'worker',
        roleLabel: 'Teaching Assistant & Graduate Student',
        department: 'Secondary STEM Faculty',
        badge: 'Work-Study Student',
        location: 'Oakridge Campus'
      },
      {
        id: 'mem-elena-retail',
        organizationId: 'org-retail',
        organizationName: 'Vertex OmniRetail Group',
        industry: 'retail',
        role: 'worker',
        roleLabel: 'Evening Inventory & Sales Associate',
        department: 'Omni-Fulfillment Depot',
        badge: 'Part-Time Shift Associate',
        location: 'Regional Distribution Hub'
      },
      {
        id: 'mem-elena-health',
        organizationId: 'org-health',
        organizationName: 'St. Jude Regional Healthcare',
        industry: 'healthcare',
        role: 'worker',
        roleLabel: 'Per-Diem Patient Transport Aide',
        department: 'Inpatient Logistics',
        badge: 'Per-Diem Aide',
        location: 'Metropolitan Medical District'
      }
    ]
  },
  {
    id: 'acc-marcus',
    name: 'Dr. Marcus Vance',
    email: 'marcus.vance@fairshift.demo',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256',
    headline: 'Clinical Shift Operations Lead & Industrial EHS Auditor',
    activeMembershipId: 'mem-marcus-health',
    memberships: [
      {
        id: 'mem-marcus-health',
        organizationId: 'org-health',
        organizationName: 'St. Jude Regional Healthcare',
        industry: 'healthcare',
        role: 'manager',
        roleLabel: 'ICU Unit & Shift Operations Manager',
        department: 'Intensive Care Unit (ICU)',
        badge: 'Department Manager',
        location: 'Metropolitan Medical District'
      },
      {
        id: 'mem-marcus-mfg',
        organizationId: 'org-mfg',
        organizationName: 'Apex Heavy Dynamics',
        industry: 'manufacturing',
        role: 'safety',
        roleLabel: 'Consulting Heavy Machinery EHS Officer',
        department: 'Plant Safety & Lockout Compliance',
        badge: 'EHS Safety Auditor',
        location: 'Industrial Parkway Sector 4'
      }
    ]
  },
  {
    id: 'acc-sarah',
    name: 'Sarah Chen, SHRM-SCP',
    email: 'sarah.chen@fairshift.demo',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256',
    headline: 'VP of People, Rest & SDG 8 Governance Trustee',
    activeMembershipId: 'mem-sarah-corp',
    memberships: [
      {
        id: 'mem-sarah-corp',
        organizationId: 'org-corp',
        organizationName: 'Nexus Enterprise Solutions',
        industry: 'corporate',
        role: 'hr',
        roleLabel: 'VP of People, Rest & Workforce Well-Being',
        department: 'Workforce Well-Being & Scheduling',
        badge: 'HR / Workforce Lead',
        location: 'Financial Tower Central'
      },
      {
        id: 'mem-sarah-edu',
        organizationId: 'org-edu',
        organizationName: 'Horizon Unified Academy',
        industry: 'education',
        role: 'superadmin',
        roleLabel: 'Board Trustee & SDG 8 Governance Auditor',
        department: 'Executive Governance & Safety Council',
        badge: 'Super Admin',
        location: 'Oakridge Campus'
      }
    ]
  }
];

export const INITIAL_SHIFTS: Shift[] = [
  {
    id: 'sh-101',
    workerId: 'usr-worker-01',
    workerName: 'Maya Lin, RN',
    roleTitle: 'Staff Critical Care Nurse',
    department: 'Intensive Care Unit (ICU)',
    date: '2026-10-27',
    startTime: '07:00',
    endTime: '19:30',
    durationHours: 12.5,
    status: 'scheduled',
    fatigueRisk: 'moderate',
    recoveryTimeHours: 15.5,
    baseRate: 46.50,
    overtimeHours: 0.5,
    hazardNotes: 'Acuity level 3 patient load; ergonomic lifting hoist verified in Pod B.'
  },
  {
    id: 'sh-102',
    workerId: 'usr-worker-01',
    workerName: 'Maya Lin, RN',
    roleTitle: 'Staff Critical Care Nurse',
    department: 'Intensive Care Unit (ICU)',
    date: '2026-10-28',
    startTime: '07:00',
    endTime: '19:30',
    durationHours: 12.5,
    status: 'scheduled',
    fatigueRisk: 'elevated',
    recoveryTimeHours: 11.5,
    baseRate: 46.50,
    overtimeHours: 0.5,
    hazardNotes: 'Consecutive 12h block. Mandatory 45-min mid-shift fatigue break designated.'
  },
  {
    id: 'sh-103',
    workerId: 'usr-worker-01',
    workerName: 'Maya Lin, RN',
    roleTitle: 'Staff Critical Care Nurse',
    department: 'Intensive Care Unit (ICU)',
    date: '2026-10-29',
    startTime: '19:00',
    endTime: '07:30',
    durationHours: 12.5,
    status: 'scheduled',
    fatigueRisk: 'critical',
    recoveryTimeHours: 11.0,
    baseRate: 46.50,
    overtimeHours: 1.0,
    hazardNotes: 'Overnight circadian transition shift. System flagged for voluntary swap or relief cover.'
  },
  {
    id: 'sh-104',
    workerId: 'usr-worker-01',
    workerName: 'Maya Lin, RN',
    roleTitle: 'Staff Critical Care Nurse',
    department: 'Intensive Care Unit (ICU)',
    date: '2026-10-24',
    startTime: '07:00',
    endTime: '19:00',
    durationHours: 12.0,
    status: 'completed',
    fatigueRisk: 'low',
    recoveryTimeHours: 36.0,
    baseRate: 46.50,
    overtimeHours: 0,
  },
  {
    id: 'sh-105',
    workerId: 'usr-worker-01',
    workerName: 'Maya Lin, RN',
    roleTitle: 'Staff Critical Care Nurse',
    department: 'Intensive Care Unit (ICU)',
    date: '2026-10-25',
    startTime: '07:00',
    endTime: '19:30',
    durationHours: 12.5,
    status: 'completed',
    fatigueRisk: 'moderate',
    recoveryTimeHours: 11.5,
    baseRate: 46.50,
    overtimeHours: 0.5,
  },
  // Other staff shifts for HR and Safety visibility
  {
    id: 'sh-201',
    workerId: 'usr-w2',
    workerName: 'Marcus Vance',
    roleTitle: 'Lead CNC Machinist',
    department: 'Stamping & Fabrication',
    date: '2026-10-27',
    startTime: '15:00',
    endTime: '23:30',
    durationHours: 8.5,
    status: 'scheduled',
    fatigueRisk: 'low',
    recoveryTimeHours: 16.0,
    baseRate: 38.00,
    overtimeHours: 0.5,
    hazardNotes: 'Mandatory eye and double hearing protection required at Press Bay 4.'
  },
  {
    id: 'sh-202',
    workerId: 'usr-w3',
    workerName: 'Tariq Al-Mansoor',
    roleTitle: 'Respiratory Therapist',
    department: 'Pulmonary Care',
    date: '2026-10-27',
    startTime: '19:00',
    endTime: '07:00',
    durationHours: 12.0,
    status: 'scheduled',
    fatigueRisk: 'elevated',
    recoveryTimeHours: 12.0,
    baseRate: 44.00,
    overtimeHours: 0
  },
  {
    id: 'sh-203',
    workerId: 'usr-w4',
    workerName: 'Chloe Bennett',
    roleTitle: 'Pharmacy Specialist',
    department: 'Central Pharmacy',
    date: '2026-10-27',
    startTime: '08:00',
    endTime: '16:30',
    durationHours: 8.5,
    status: 'scheduled',
    fatigueRisk: 'low',
    recoveryTimeHours: 15.5,
    baseRate: 49.00,
    overtimeHours: 0.5
  }
];

export const INITIAL_LEAVE_REQUESTS: LeaveRequest[] = [
  {
    id: 'lv-01',
    workerId: 'usr-worker-01',
    workerName: 'Maya Lin, RN',
    department: 'Intensive Care Unit (ICU)',
    type: 'fatigue-recovery',
    startDate: '2026-11-02',
    endDate: '2026-11-04',
    daysCount: 3,
    status: 'approved',
    reason: 'Proactive fatigue reset following 4 consecutive critical care weekend rotations.',
    appliedAt: '2026-10-20'
  },
  {
    id: 'lv-02',
    workerId: 'usr-worker-01',
    workerName: 'Maya Lin, RN',
    department: 'Intensive Care Unit (ICU)',
    type: 'annual',
    startDate: '2026-12-14',
    endDate: '2026-12-22',
    daysCount: 7,
    status: 'pending',
    reason: 'Annual family recharge and holiday leave.',
    appliedAt: '2026-10-25'
  },
  {
    id: 'lv-03',
    workerId: 'usr-w2',
    workerName: 'Marcus Vance',
    department: 'Stamping & Fabrication',
    type: 'study',
    startDate: '2026-11-10',
    endDate: '2026-11-12',
    daysCount: 3,
    status: 'approved',
    reason: 'Advanced Robotic Safety and Laser Calibration certification training.',
    appliedAt: '2026-10-18'
  }
];

export const INITIAL_OVERTIME_REQUESTS: OvertimeRequest[] = [
  {
    id: 'ot-01',
    workerId: 'usr-worker-01',
    workerName: 'Maya Lin, RN',
    shiftDate: '2026-10-31',
    hoursRequested: 3,
    reason: 'Post-op pediatric trauma unit handover coverage assistance.',
    fatigueImpact: 'warning',
    status: 'approved',
    appliedAt: '2026-10-24'
  },
  {
    id: 'ot-02',
    workerId: 'usr-w3',
    workerName: 'Tariq Al-Mansoor',
    shiftDate: '2026-10-28',
    hoursRequested: 4,
    reason: 'Emergency ventilator surge check in East Wing.',
    fatigueImpact: 'high-risk',
    status: 'pending',
    appliedAt: '2026-10-26'
  }
];

export const INITIAL_PAYSLIPS: Payslip[] = [
  {
    id: 'pay-2026-10-A',
    workerId: 'usr-worker-01',
    period: 'Oct 01 - Oct 15, 2026',
    basePay: 3720.00,
    overtimePay: 697.50,
    fairShiftPremium: 420.00, // SDG 8 fair premium for high-acuity/night shift
    grossPay: 4837.50,
    deductions: 912.40,
    netPay: 3925.10,
    regionalLivingWage: 23.80,
    livingWageRatio: 1.95, // 1.95x regional living wage benchmark
    transparencyScore: 100,
    payDate: '2026-10-20',
    status: 'settled'
  },
  {
    id: 'pay-2026-09-B',
    workerId: 'usr-worker-01',
    period: 'Sep 16 - Sep 30, 2026',
    basePay: 3720.00,
    overtimePay: 418.50,
    fairShiftPremium: 380.00,
    grossPay: 4518.50,
    deductions: 844.20,
    netPay: 3674.30,
    regionalLivingWage: 23.80,
    livingWageRatio: 1.95,
    transparencyScore: 100,
    payDate: '2026-10-05',
    status: 'settled'
  }
];

export const INITIAL_INCIDENTS: IncidentReport[] = [
  {
    id: 'inc-01',
    trackingCode: 'FS-ANON-8492',
    isAnonymous: true,
    department: 'Intensive Care Unit (ICU)',
    category: 'ergonomic',
    severity: 'high',
    title: 'Ceiling Patient Lift in Room 314 Sticking Under Load',
    description: 'During a dual-nurse transfer of a bariatric patient, the mechanical overhead hoist locked up intermittently, creating severe shoulder and lower lumbar strain. Reported anonymously so maintenance inspects before a drop hazard or tendon rupture occurs.',
    dateReported: '2026-10-24',
    status: 'action-assigned',
    correctiveAction: 'Biomedical engineering dispatched work order #BM-992. Hydraulic cylinder replaced; unit load-tested to 750 lbs on Oct 25.',
    assignedOfficer: 'Frank Kowalski, CSP',
    voiceTranscriptUsed: true
  },
  {
    id: 'inc-02',
    trackingCode: 'FS-ANON-3177',
    isAnonymous: true,
    department: 'Stamping & Fabrication',
    category: 'hazard-leak',
    severity: 'critical',
    title: 'Press Line B Hydraulic Feed Line Pin-Hole Mist',
    description: 'Fine high-pressure mist spraying near the emergency stop control panel. Floor surface is slick and atomized oil creates an inhalation and flash ignition risk. Workers on 2nd shift have felt dizzy after 4 hours.',
    dateReported: '2026-10-25',
    status: 'investigating',
    correctiveAction: 'Line locked out pending valve isolation and ultrasonic pipe wall thickness scan.',
    assignedOfficer: 'Frank Kowalski, CSP',
    voiceTranscriptUsed: false
  },
  {
    id: 'inc-03',
    trackingCode: 'FS-REP-1049',
    isAnonymous: false,
    reporterName: 'Chloe Bennett',
    department: 'Central Pharmacy',
    category: 'ventilation',
    severity: 'moderate',
    title: 'Chemotherapy Preparation Fume Hood Airflow Alarm Beeping',
    description: 'Exhaust sensor in negative-pressure clean room showing laminar drift. Requires recalibration by certified HVAC technician.',
    dateReported: '2026-10-26',
    status: 'reported',
    correctiveAction: 'Secondary hood designated while primary is under certification audit.',
    assignedOfficer: 'Frank Kowalski, CSP',
    voiceTranscriptUsed: false
  },
  {
    id: 'inc-04',
    trackingCode: 'FS-ANON-9012',
    isAnonymous: true,
    department: 'Emergency Department',
    category: 'fatigue-strain',
    severity: 'high',
    title: 'Understaffed 14-Hour Triage Rotation Without Scheduled Relief',
    description: 'Three triage nurses worked beyond their contracted 12h threshold without scheduled break coverage due to simultaneous ambulance diversion incoming traffic. Fatigue caused a medication labeling near-miss caught at bedside check.',
    dateReported: '2026-10-22',
    status: 'resolved',
    correctiveAction: 'Emergency on-call float pool activated. Rest recovery protocol enforced with 18h mandatory off-shift.',
    assignedOfficer: 'Sarah Chen, SHRM-SCP',
    resolutionDate: '2026-10-23',
    voiceTranscriptUsed: true
  }
];

export const INITIAL_SKILLS: SkillRecord[] = [
  {
    id: 'sk-01',
    workerId: 'usr-worker-01',
    title: 'Advanced ECMO & Continuous Renal Replacement Therapy',
    category: 'clinical',
    level: 'Master',
    issuingBody: 'American Association of Critical-Care Nurses (AACN)',
    verifiedDate: '2025-06-12',
    verifiedBy: 'Clinical Practice Governance Board',
    badge: 'ECMO-MASTER'
  },
  {
    id: 'sk-02',
    workerId: 'usr-worker-01',
    title: 'Zero-Harm Safe Patient Mobilization & Ergonomic Hoists',
    category: 'safety-protocol',
    level: 'Certified Specialist',
    issuingBody: 'National Institute for Occupational Safety and Health (NIOSH)',
    verifiedDate: '2026-01-15',
    verifiedBy: 'Hospital EHS Council',
    badge: 'ZERO-HARM-ERGO'
  },
  {
    id: 'sk-03',
    workerId: 'usr-worker-01',
    title: 'Circadian Sleep Hygiene & Fatigue Self-Assessment',
    category: 'safety-protocol',
    level: 'Practitioner',
    issuingBody: 'FairShift Decent Work Institute',
    verifiedDate: '2026-04-10',
    verifiedBy: 'FairShift Verification Network',
    badge: 'FATIGUE-AWARE'
  },
  {
    id: 'sk-04',
    workerId: 'usr-worker-01',
    title: 'Pediatric Advanced Life Support (PALS)',
    category: 'clinical',
    level: 'Certified Specialist',
    issuingBody: 'American Heart Association',
    verifiedDate: '2025-09-20',
    verifiedBy: 'Resuscitation Governance Board',
    badge: 'PALS-CERT'
  }
];

export const INITIAL_ACCOMMODATIONS: AccommodationRequest[] = [
  {
    id: 'acc-01',
    workerId: 'usr-worker-01',
    workerName: 'Maya Lin, RN',
    category: 'ergonomic-equipment',
    description: 'Custom height-adjustable portable charting station and anti-fatigue gel compression floor mat in ICU Pod B.',
    noMedicalDiagnosisConfirmed: true, // Non-medical dignity requirement
    status: 'accommodated',
    dateRequested: '2026-08-14',
    confidentialityRestricted: true,
    reviewedBy: 'People & Inclusion Support Lead'
  },
  {
    id: 'acc-02',
    workerId: 'usr-worker-01',
    workerName: 'Maya Lin, RN',
    category: 'flexible-scheduling',
    description: 'Protected 14-hour minimum recovery interval between consecutive night and day shifts to prevent circadian disruption.',
    noMedicalDiagnosisConfirmed: true,
    status: 'active',
    dateRequested: '2026-09-01',
    confidentialityRestricted: true,
    reviewedBy: 'People & Inclusion Support Lead'
  }
];

export const INITIAL_PULSE_INSIGHTS: PulseInsight[] = [
  {
    id: 'pulse-01',
    title: 'Intensive Care Unit (ICU) Fatigue-Strain Cluster Warning',
    type: 'fatigue-risk',
    severity: 'critical',
    department: 'Intensive Care Unit (ICU)',
    summary: 'Cross-referencing shift logs and anonymous incident report #FS-ANON-9012 reveals that 24% of staff logged consecutive >12.5h shifts within 72 hours, coinciding with a 38% rise in near-miss hazard notices.',
    evidenceSignals: [
      { label: 'Consecutive >12h Shifts', value: '18 shifts / week', baseline: '4 shifts / week', trend: 'up', alert: true },
      { label: 'Avg Inter-Shift Rest Interval', value: '11.2 hours', baseline: '15.5 hours standard', trend: 'down', alert: true },
      { label: 'Anonymous Fatigue Incidents', value: '3 reported (7d)', baseline: '0.2 / 7d historical', trend: 'up', alert: true },
      { label: 'Patient Acuity vs Nurse Ratio', value: '1:2.4', baseline: '1:1.8 target', trend: 'up', alert: false }
    ],
    correlationNote: 'High statistical correlation between rest intervals under 12 hours and medication near-miss logs. Causation cannot be solely attributed to staffing: delayed surgical handovers also extended shift lengths.',
    confidenceScore: 89,
    recommendedAction: 'Institute mandatory 14-hour rest buffer between ICU shifts. Deploy 2 PRN float nurses from ambulatory reserve for weekend night rotations.',
    assignedOwner: 'Sarah Chen, SHRM-SCP',
    actionStatus: 'in-progress',
    beforeMetric: 'Fatigue Risk Index: 78/100',
    afterMetric: 'Projected Target: <35/100 within 14 days',
    isPredefinedDemo: true,
    sdgTarget: 'UN SDG 8.8 — Safe & Secure Working Environments',
    generatedDate: '2026-10-26'
  },
  {
    id: 'pulse-02',
    title: 'Press Line B Micro-Leak Repeat Incident Correlation',
    type: 'safety-cluster',
    severity: 'high',
    department: 'Stamping & Fabrication (Manufacturing)',
    summary: 'Two anonymous reports in 10 days regarding atomized oil mist and slick footing near Emergency Stop controls on Press 4. Maintenance cycle delayed by 6 days due to production rush.',
    evidenceSignals: [
      { label: 'Oil Mist Hazard Reports', value: '2 reports', baseline: '0 / month target', trend: 'up', alert: true },
      { label: 'Preventative Maintenance Lag', value: '+6 days overdue', baseline: '0 days', trend: 'up', alert: true },
      { label: '2nd Shift Overtime Hours', value: '142 hrs', baseline: '60 hrs normal', trend: 'up', alert: true }
    ],
    correlationNote: 'Direct mechanical signal verified by EHS inspection. Production pressure delayed lockout maintenance.',
    confidenceScore: 94,
    recommendedAction: 'Immediate scheduled 4-hour lockout for line seals replacement. Adjust production quote without penalty for shift crew.',
    assignedOwner: 'Frank Kowalski, CSP',
    actionStatus: 'pending',
    beforeMetric: 'Physical Slip/Inhalation Risk: Critical',
    afterMetric: 'Target: Zero Hazard Level Post-Lockout',
    isPredefinedDemo: true,
    sdgTarget: 'UN SDG 8.8 — Prevent Occupational Hazards',
    generatedDate: '2026-10-25'
  },
  {
    id: 'pulse-03',
    title: 'Operating Margin vs Living Wage Stability Alignment',
    type: 'margin-pressure',
    severity: 'medium',
    department: 'Finance & Labor Economics',
    summary: 'Hospital operating revenues expanded 6.4% YoY while overtime premium costs expanded 18.2%. Addressing staffing shortages with full-time staff instead of excessive overtime would save $142,000 monthly while lowering fatigue risk.',
    evidenceSignals: [
      { label: 'Overtime Cost Premium', value: '$284,000 / mo', baseline: '$110,000 / mo benchmark', trend: 'up', alert: true },
      { label: 'Living Wage Compliance', value: '100%', baseline: '100% policy requirement', trend: 'neutral', alert: false },
      { label: 'Overtime Spend Ratio', value: '14.8% of payroll', baseline: '<6.0% sustainable', trend: 'up', alert: true }
    ],
    correlationNote: 'Financial model indicates relying on overtime for 12+ weeks increases attrition costs by $45,000 per departing clinician.',
    confidenceScore: 91,
    recommendedAction: 'Convert 6 temporary overtime allocations into 4 permanent full-time nursing positions with full health and fatigue protection benefits.',
    assignedOwner: 'David Ross, CFA',
    actionStatus: 'pending',
    beforeMetric: 'Overtime Spend: 14.8%',
    afterMetric: 'Budgeted Target: 5.2%',
    isPredefinedDemo: true,
    sdgTarget: 'UN SDG 8.5 — Full and Productive Employment & Equal Pay',
    generatedDate: '2026-10-23'
  }
];

export const FINANCIAL_METRICS: FinancialMetric[] = [
  { period: 'May 2026', revenue: 14200000, operatingCosts: 11900000, laborSpend: 7800000, netMargin: 16.2, livingWageComplianceRate: 100, budgetVariance: -1.2 },
  { period: 'Jun 2026', revenue: 14650000, operatingCosts: 12100000, laborSpend: 7950000, netMargin: 17.4, livingWageComplianceRate: 100, budgetVariance: -0.8 },
  { period: 'Jul 2026', revenue: 15100000, operatingCosts: 12800000, laborSpend: 8400000, netMargin: 15.2, livingWageComplianceRate: 100, budgetVariance: +2.1 },
  { period: 'Aug 2026', revenue: 15400000, operatingCosts: 13200000, laborSpend: 8800000, netMargin: 14.3, livingWageComplianceRate: 100, budgetVariance: +3.8 },
  { period: 'Sep 2026', revenue: 15850000, operatingCosts: 13700000, laborSpend: 9200000, netMargin: 13.5, livingWageComplianceRate: 100, budgetVariance: +4.6 },
  { period: 'Oct 2026 (Est)', revenue: 16200000, operatingCosts: 14100000, laborSpend: 9550000, netMargin: 12.9, livingWageComplianceRate: 100, budgetVariance: +5.2 }
];

export const DEPARTMENT_SPENDS: DepartmentSpend[] = [
  { department: 'Intensive Care Unit (ICU)', allocatedBudget: 2400000, actualSpend: 2680000, overtimeCost: 284000, variancePercentage: +11.6 },
  { department: 'Emergency Medicine', allocatedBudget: 2100000, actualSpend: 2280000, overtimeCost: 192000, variancePercentage: +8.5 },
  { department: 'Surgical Services', allocatedBudget: 1900000, actualSpend: 1940000, overtimeCost: 85000, variancePercentage: +2.1 },
  { department: 'Pharmacy & Therapeutics', allocatedBudget: 1200000, actualSpend: 1180000, overtimeCost: 22000, variancePercentage: -1.6 },
  { department: 'Facilities, Safety & EHS', allocatedBudget: 850000, actualSpend: 860000, overtimeCost: 31000, variancePercentage: +1.2 },
  { department: 'Workforce Well-Being & HR', allocatedBudget: 600000, actualSpend: 590000, overtimeCost: 4000, variancePercentage: -1.6 }
];

export const SALES_METRICS: SalesMetric[] = [
  { period: 'May 2026', targetRevenue: 3800000, actualRevenue: 3950000, dealVelocityDays: 44, clientRetentionRate: 97.4, activeContracts: 68 },
  { period: 'Jun 2026', targetRevenue: 4000000, actualRevenue: 4120000, dealVelocityDays: 41, clientRetentionRate: 98.1, activeContracts: 72 },
  { period: 'Jul 2026', targetRevenue: 4200000, actualRevenue: 4180000, dealVelocityDays: 43, clientRetentionRate: 97.8, activeContracts: 75 },
  { period: 'Aug 2026', targetRevenue: 4400000, actualRevenue: 4490000, dealVelocityDays: 39, clientRetentionRate: 98.5, activeContracts: 80 },
  { period: 'Sep 2026', targetRevenue: 4600000, actualRevenue: 4750000, dealVelocityDays: 38, clientRetentionRate: 98.9, activeContracts: 86 },
  { period: 'Oct 2026 (MTD)', targetRevenue: 4800000, actualRevenue: 4920000, dealVelocityDays: 36, clientRetentionRate: 99.1, activeContracts: 91 }
];

export const TEAM_SALES_PERFORMANCE: TeamSalesPerformance[] = [
  { repName: 'Elena Gomez', territory: 'Healthcare Systems - East', target: 1200000, closed: 1350000, pipeline: 2100000, complianceChecked: true },
  { repName: 'Liam O’Connor', territory: 'Enterprise Tech & Mfg', target: 1100000, closed: 1180000, pipeline: 1850000, complianceChecked: true },
  { repName: 'Aisha Patel', territory: 'Academic & Government', target: 950000, closed: 1020000, pipeline: 1400000, complianceChecked: true },
  { repName: 'Carlos Morales', territory: 'Retail & Consumer Hubs', target: 900000, closed: 880000, pipeline: 1250000, complianceChecked: true }
];

export const AUDIT_LOGS = [
  { id: 'aud-01', timestamp: '2026-10-26 21:15', actor: 'Sarah Chen (HR)', action: 'Approved fatigue-recovery leave request #LV-01 for Maya Lin', category: 'Leave & Attendance' },
  { id: 'aud-02', timestamp: '2026-10-26 19:40', actor: 'Frank Kowalski (Safety)', action: 'Dispatched emergency lockout work order for Press 4 in Bay B', category: 'Safety & EHS' },
  { id: 'aud-03', timestamp: '2026-10-26 18:22', actor: 'System (FairShift Pulse)', action: 'Triggered alert [ICU Fatigue-Strain Cluster] after shift interval threshold breach', category: 'AI Intelligence' },
  { id: 'aud-04', timestamp: '2026-10-26 16:05', actor: 'David Ross (Finance)', action: 'Audited regional living wage parity for Q3 payroll. 100% compliance certified.', category: 'Living Wage Parity' },
  { id: 'aud-05', timestamp: '2026-10-26 14:12', actor: 'BarrierBridge System', action: 'Fulfilled ergonomic station accommodation request for Maya Lin (Room 314)', category: 'BarrierBridge Accessibility' }
];
