import { Role, Organization, UserProfile, Shift, IncidentReport, PulseInsight } from '../types';

export function getIndustryUser(role: Role, org: Organization): UserProfile {
  switch (org.industry) {
    case 'manufacturing':
      switch (role) {
        case 'worker':
          return {
            id: 'usr-mfg-w1',
            name: 'Marcus Vance',
            email: 'marcus.vance@apex-heavy.com',
            role: 'worker',
            roleLabel: 'Lead CNC & Press Machinist',
            department: 'Stamping Bay 4',
            avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=256',
            organizationId: org.id,
            organizationName: org.name,
            skillsCount: 7,
            hasActiveAccommodation: true
          };
        case 'manager':
          return {
            id: 'usr-mfg-m1',
            name: 'Dale Henderson',
            email: 'dale.henderson@apex-heavy.com',
            role: 'manager',
            roleLabel: 'Stamping & Fabrication Line Manager',
            department: 'Stamping & Fabrication',
            avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=256',
            organizationId: org.id,
            organizationName: org.name,
            skillsCount: 11,
            hasActiveAccommodation: false
          };
        case 'hr':
          return {
            id: 'usr-mfg-hr',
            name: 'Sandra Ortiz',
            email: 'sandra.ortiz@apex-heavy.com',
            role: 'hr',
            roleLabel: 'Plant Workforce & Rest Director',
            department: 'Industrial Relations & Well-being',
            avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256',
            organizationId: org.id,
            organizationName: org.name,
            skillsCount: 9,
            hasActiveAccommodation: false
          };
        case 'finance':
          return {
            id: 'usr-mfg-fin',
            name: 'Warren Miller, CPA',
            email: 'warren.miller@apex-heavy.com',
            role: 'finance',
            roleLabel: 'Plant Cost Controller & Living Wage Officer',
            department: 'Operations Finance',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256',
            organizationId: org.id,
            organizationName: org.name,
            skillsCount: 8,
            hasActiveAccommodation: false
          };
        case 'sales':
          return {
            id: 'usr-mfg-sales',
            name: 'Kurt Reynolds',
            email: 'kurt.reynolds@apex-heavy.com',
            role: 'sales',
            roleLabel: 'Automotive OEM Client Director',
            department: 'Industrial Key Accounts',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256',
            organizationId: org.id,
            organizationName: org.name,
            skillsCount: 7,
            hasActiveAccommodation: false
          };
        case 'safety':
          return {
            id: 'usr-mfg-safe',
            name: 'Frank Kowalski, CSP',
            email: 'frank.kowalski@apex-heavy.com',
            role: 'safety',
            roleLabel: 'Heavy Machinery & EHS Officer',
            department: 'Plant Safety & Lockout Compliance',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=256',
            organizationId: org.id,
            organizationName: org.name,
            skillsCount: 12,
            hasActiveAccommodation: false
          };
        case 'superadmin':
          return {
            id: 'usr-mfg-admin',
            name: 'Arthur Vance',
            email: 'arthur.vance@apex-heavy.com',
            role: 'superadmin',
            roleLabel: 'Managing Director & SDG 8 Trustee',
            department: 'Executive Governance & Safety Council',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=256',
            organizationId: org.id,
            organizationName: org.name,
            skillsCount: 15,
            hasActiveAccommodation: false
          };
      }
      break;

    case 'education':
      switch (role) {
        case 'worker':
          return {
            id: 'usr-edu-w1',
            name: 'Priya Sharma, M.Ed.',
            email: 'priya.sharma@horizon-academy.edu',
            role: 'worker',
            roleLabel: 'Senior STEM Educator & Lab Coordinator',
            department: 'Secondary STEM Faculty',
            avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256',
            organizationId: org.id,
            organizationName: org.name,
            skillsCount: 8,
            hasActiveAccommodation: true
          };
        case 'manager':
          return {
            id: 'usr-edu-m1',
            name: 'James Vance, Ph.D.',
            email: 'james.vance@horizon-academy.edu',
            role: 'manager',
            roleLabel: 'Dean of Faculty & Department Chair',
            department: 'Secondary STEM Faculty',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256',
            organizationId: org.id,
            organizationName: org.name,
            skillsCount: 11,
            hasActiveAccommodation: false
          };
        default:
          break;
      }
      break;

    case 'corporate':
      switch (role) {
        case 'worker':
          return {
            id: 'usr-corp-w1',
            name: 'Alex Chen',
            email: 'alex.chen@nexus-solutions.com',
            role: 'worker',
            roleLabel: 'Senior Staff Systems Engineer',
            department: 'Cloud Platform Engineering',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
            organizationId: org.id,
            organizationName: org.name,
            skillsCount: 9,
            hasActiveAccommodation: true
          };
        case 'manager':
          return {
            id: 'usr-corp-m1',
            name: 'Nathan Drake',
            email: 'nathan.drake@nexus-solutions.com',
            role: 'manager',
            roleLabel: 'Engineering Team Lead & Sprint Director',
            department: 'Cloud Platform Engineering',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256',
            organizationId: org.id,
            organizationName: org.name,
            skillsCount: 12,
            hasActiveAccommodation: false
          };
        default:
          break;
      }
      break;

    case 'retail':
      switch (role) {
        case 'worker':
          return {
            id: 'usr-ret-w1',
            name: 'Jamal Washington',
            email: 'jamal.w@vertex-retail.com',
            role: 'worker',
            roleLabel: 'Store Sales Specialist & Inventory Logistics',
            department: 'Flagship Sales Floor',
            avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=256',
            organizationId: org.id,
            organizationName: org.name,
            skillsCount: 6,
            hasActiveAccommodation: true
          };
        case 'manager':
          return {
            id: 'usr-ret-m1',
            name: 'Michelle Wu',
            email: 'michelle.wu@vertex-retail.com',
            role: 'manager',
            roleLabel: 'Store Shift Operations Manager',
            department: 'Flagship Sales Floor',
            avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=256',
            organizationId: org.id,
            organizationName: org.name,
            skillsCount: 10,
            hasActiveAccommodation: false
          };
        default:
          break;
      }
      break;

    default: // Healthcare
      break;
  }

  // Healthcare default
  const baseDefaults: Record<Role, UserProfile> = {
    worker: {
      id: 'usr-worker-01',
      name: 'Maya Lin, RN',
      email: 'maya.lin@stjude-health.org',
      role: 'worker',
      roleLabel: 'Staff Critical Care Nurse (Level III)',
      department: 'Intensive Care Unit (ICU)',
      avatar: 'https://images.unsplash.com/photo-1594824813515-585a97576f33?auto=format&fit=crop&q=80&w=256',
      organizationId: org.id,
      organizationName: org.name,
      skillsCount: 6,
      hasActiveAccommodation: true
    },
    manager: {
      id: 'usr-mgr-01',
      name: 'Carlos Santana, MSN',
      email: 'carlos.santana@stjude-health.org',
      role: 'manager',
      roleLabel: 'ICU Unit & Shift Operations Manager',
      department: 'Intensive Care Unit (ICU)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
      organizationId: org.id,
      organizationName: org.name,
      skillsCount: 10,
      hasActiveAccommodation: false
    },
    hr: {
      id: 'usr-hr-01',
      name: 'Sarah Chen, SHRM-SCP',
      email: 'sarah.chen@fairshift.internal',
      role: 'hr',
      roleLabel: 'VP of People, Rest & Workforce Well-Being',
      department: 'Workforce Well-Being & Scheduling',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256',
      organizationId: org.id,
      organizationName: org.name,
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
      organizationId: org.id,
      organizationName: org.name,
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
      organizationId: org.id,
      organizationName: org.name,
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
      organizationId: org.id,
      organizationName: org.name,
      skillsCount: 11,
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
      organizationId: org.id,
      organizationName: org.name,
      skillsCount: 14,
      hasActiveAccommodation: false
    }
  };

  const user = baseDefaults[role];
  return {
    ...user,
    organizationId: org.id,
    organizationName: org.name
  };
}

export function getIndustryShifts(org: Organization): Shift[] {
  const isMfg = org.industry === 'manufacturing';
  const isEdu = org.industry === 'education';
  const isCorp = org.industry === 'corporate';
  const isRetail = org.industry === 'retail';

  if (isMfg) {
    return [
      {
        id: 'sh-mfg-01',
        workerId: 'usr-mfg-w1',
        workerName: 'Marcus Vance',
        roleTitle: 'Lead CNC & Press Machinist',
        department: 'Stamping Bay 4',
        date: '2026-10-27',
        startTime: '15:00',
        endTime: '23:30',
        durationHours: 8.5,
        status: 'scheduled',
        fatigueRisk: 'moderate',
        recoveryTimeHours: 15.5,
        baseRate: 38.50,
        overtimeHours: 0.5,
        hazardNotes: 'Press line B hydraulic check. Double ear protection and steel-toed boots mandatory.'
      },
      {
        id: 'sh-mfg-02',
        workerId: 'usr-mfg-w1',
        workerName: 'Marcus Vance',
        roleTitle: 'Lead CNC & Press Machinist',
        department: 'Stamping Bay 4',
        date: '2026-10-28',
        startTime: '15:00',
        endTime: '23:30',
        durationHours: 8.5,
        status: 'scheduled',
        fatigueRisk: 'low',
        recoveryTimeHours: 15.5,
        baseRate: 38.50,
        overtimeHours: 0
      },
      {
        id: 'sh-mfg-03',
        workerId: 'usr-mfg-w2',
        workerName: 'Liam Kowalski',
        roleTitle: 'Robotics Welding Specialist',
        department: 'Laser Cell 2',
        date: '2026-10-27',
        startTime: '07:00',
        endTime: '15:30',
        durationHours: 8.5,
        status: 'scheduled',
        fatigueRisk: 'low',
        recoveryTimeHours: 15.5,
        baseRate: 41.00,
        overtimeHours: 0
      }
    ];
  }

  if (isEdu) {
    return [
      {
        id: 'sh-edu-01',
        workerId: 'usr-edu-w1',
        workerName: 'Priya Sharma',
        roleTitle: 'Senior STEM Educator',
        department: 'Secondary STEM Faculty',
        date: '2026-10-27',
        startTime: '08:00',
        endTime: '16:00',
        durationHours: 8.0,
        status: 'scheduled',
        fatigueRisk: 'low',
        recoveryTimeHours: 16.0,
        baseRate: 44.00,
        overtimeHours: 0,
        hazardNotes: 'Protected 90-minute prep block designated. Laboratory safety audit at 14:00.'
      },
      {
        id: 'sh-edu-02',
        workerId: 'usr-edu-w1',
        workerName: 'Priya Sharma',
        roleTitle: 'Senior STEM Educator',
        department: 'Secondary STEM Faculty',
        date: '2026-10-28',
        startTime: '08:00',
        endTime: '16:00',
        durationHours: 8.0,
        status: 'scheduled',
        fatigueRisk: 'moderate',
        recoveryTimeHours: 16.0,
        baseRate: 44.00,
        overtimeHours: 1.0,
        hazardNotes: 'Science Olympiad robotics mentoring rotation.'
      }
    ];
  }

  if (isCorp) {
    return [
      {
        id: 'sh-corp-01',
        workerId: 'usr-corp-w1',
        workerName: 'Alex Chen',
        roleTitle: 'Senior Staff Systems Engineer',
        department: 'Cloud Platform Engineering',
        date: '2026-10-27',
        startTime: '09:00',
        endTime: '17:30',
        durationHours: 8.5,
        status: 'scheduled',
        fatigueRisk: 'low',
        recoveryTimeHours: 15.5,
        baseRate: 68.00,
        overtimeHours: 0,
        hazardNotes: 'No-meeting afternoon focus block reserved for latency tuning.'
      },
      {
        id: 'sh-corp-02',
        workerId: 'usr-corp-w1',
        workerName: 'Alex Chen',
        roleTitle: 'Senior Staff Systems Engineer',
        department: 'Cloud Platform Engineering',
        date: '2026-10-28',
        startTime: '13:00',
        endTime: '21:00',
        durationHours: 8.0,
        status: 'scheduled',
        fatigueRisk: 'moderate',
        recoveryTimeHours: 16.0,
        baseRate: 68.00,
        overtimeHours: 0,
        hazardNotes: 'Cross-timezone EMEA release window; mandatory next-day late start applied.'
      }
    ];
  }

  if (isRetail) {
    return [
      {
        id: 'sh-ret-01',
        workerId: 'usr-ret-w1',
        workerName: 'Jamal Washington',
        roleTitle: 'Store Sales Specialist',
        department: 'Flagship Sales Floor',
        date: '2026-10-27',
        startTime: '10:00',
        endTime: '18:30',
        durationHours: 8.5,
        status: 'scheduled',
        fatigueRisk: 'moderate',
        recoveryTimeHours: 15.5,
        baseRate: 28.50,
        overtimeHours: 0.5,
        hazardNotes: 'Anti-fatigue footwear check. Micro-break rotation every 120 minutes.'
      },
      {
        id: 'sh-ret-02',
        workerId: 'usr-ret-w1',
        workerName: 'Jamal Washington',
        roleTitle: 'Store Sales Specialist',
        department: 'Flagship Sales Floor',
        date: '2026-10-28',
        startTime: '10:00',
        endTime: '18:30',
        durationHours: 8.5,
        status: 'scheduled',
        fatigueRisk: 'low',
        recoveryTimeHours: 15.5,
        baseRate: 28.50,
        overtimeHours: 0
      }
    ];
  }

  // Healthcare (Default)
  return [
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
      hazardNotes: 'Overnight circadian transition shift. System flagged for relief cover.'
    }
  ];
}
