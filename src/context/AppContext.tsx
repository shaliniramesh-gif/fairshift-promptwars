import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Role,
  Industry,
  UserProfile,
  Organization,
  Shift,
  LeaveRequest,
  OvertimeRequest,
  IncidentReport,
  SkillRecord,
  AccommodationRequest,
  PulseInsight,
  AccessibilitySettings,
  UserAccount,
  UserMembership
} from '../types';
import {
  ORGANIZATIONS,
  DEMO_USERS,
  DEMO_ACCOUNTS,
  INITIAL_SHIFTS,
  INITIAL_LEAVE_REQUESTS,
  INITIAL_OVERTIME_REQUESTS,
  INITIAL_INCIDENTS,
  INITIAL_SKILLS,
  INITIAL_ACCOMMODATIONS,
  INITIAL_PULSE_INSIGHTS
} from '../data/mockData';
import { getIndustryUser, getIndustryShifts } from '../utils/industryData';

interface AppContextType {
  user: UserProfile;
  organization: Organization;
  organizations: Organization[];
  role: Role;
  industryTheme: Industry;
  isDarkMode: boolean;
  accessibility: AccessibilitySettings;
  currentTab: string;
  isLoggedIn: boolean;
  
  // Multi-profile memberships for one person
  userAccount: UserAccount;
  activeMembership: UserMembership | null;
  demoAccounts: UserAccount[];
  switchMembership: (membershipId: string) => void;
  switchUserAccount: (accountId: string) => void;
  
  // Methods
  switchRole: (newRole: Role) => void;
  switchOrganization: (orgId: string) => void;
  createOrganization: (orgData: Omit<Organization, 'id'>) => Organization;
  
  // Data State
  shifts: Shift[];
  leaveRequests: LeaveRequest[];
  overtimeRequests: OvertimeRequest[];
  incidents: IncidentReport[];
  skills: SkillRecord[];
  accommodations: AccommodationRequest[];
  pulseInsights: PulseInsight[];
  
  // Clock in/out
  isClockedIn: boolean;
  clockInTime: string | null;
  shiftElapsedSeconds: number;
  
  // Methods
  setIndustryTheme: (theme: Industry) => void;
  toggleDarkMode: () => void;
  updateAccessibility: (settings: Partial<AccessibilitySettings>) => void;
  setCurrentTab: (tab: string) => void;
  loginAsRole: (role: Role, orgId?: string) => void;
  logout: () => void;
  
  // Actions
  toggleClock: () => void;
  addIncident: (incident: {
    title: string;
    description: string;
    category: IncidentReport['category'];
    severity: IncidentReport['severity'];
    department: string;
    isAnonymous: boolean;
    voiceTranscriptUsed?: boolean;
  }) => string; // returns tracking code
  updateIncidentStatus: (id: string, status: IncidentReport['status'], correctiveAction?: string) => void;
  addLeaveRequest: (req: {
    type: LeaveRequest['type'];
    startDate: string;
    endDate: string;
    daysCount: number;
    reason: string;
  }) => void;
  updateLeaveStatus: (id: string, status: 'approved' | 'rejected') => void;
  addOvertimeRequest: (req: {
    shiftDate: string;
    hoursRequested: number;
    reason: string;
    fatigueImpact: OvertimeRequest['fatigueImpact'];
  }) => void;
  updateOvertimeStatus: (id: string, status: 'approved' | 'rejected') => void;
  addAccommodation: (acc: {
    category: AccommodationRequest['category'];
    description: string;
  }) => void;
  endorseSkill: (skillId: string) => void;
  addSkill: (title: string, category: SkillRecord['category'], level: SkillRecord['level']) => void;
  updatePulseAction: (id: string, status: PulseInsight['actionStatus'], assignedOwner?: string) => void;
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Persistence keys
  const STORAGE_PREFIX = 'fairshift_';

  // Current session & auth
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}logged_in`);
    return saved !== null ? JSON.parse(saved) : false; // Default to false so landing screen appears on start
  });

  const [organizations, setOrganizations] = useState<Organization[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}orgs`);
    return saved ? JSON.parse(saved) : ORGANIZATIONS;
  });

  const [currentOrgId, setCurrentOrgId] = useState<string>(() => {
    return localStorage.getItem(`${STORAGE_PREFIX}org_id`) || 'org-health';
  });

  const [role, setRole] = useState<Role>(() => {
    return (localStorage.getItem(`${STORAGE_PREFIX}role`) as Role) || 'worker';
  });

  const [currentTab, setCurrentTab] = useState<string>('overview');

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}dark_mode`);
    return saved !== null ? JSON.parse(saved) : false;
  });

  const [accessibility, setAccessibility] = useState<AccessibilitySettings>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}a11y`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return {
      fontSize: 'normal',
      highContrast: false,
      reducedMotion: false,
      language: 'en',
      simpleLanguage: false
    };
  });

  // Multi-profile account & memberships for one person
  const [activeAccountId, setActiveAccountId] = useState<string>(() => {
    return localStorage.getItem(`${STORAGE_PREFIX}account_id`) || 'acc-elena';
  });

  const [activeMembershipId, setActiveMembershipId] = useState<string>(() => {
    return localStorage.getItem(`${STORAGE_PREFIX}membership_id`) || 'mem-elena-edu';
  });

  // Current Org & User
  const organization = organizations.find(o => o.id === currentOrgId) || organizations[0];
  const industryTheme = organization.theme;

  const userAccount = DEMO_ACCOUNTS.find(a => a.id === activeAccountId) || DEMO_ACCOUNTS[0];
  const activeMembership = userAccount.memberships.find(m => m.id === activeMembershipId) || userAccount.memberships[0] || null;

  const baseIndustryUser = getIndustryUser(role, organization);
  const user: UserProfile = {
    ...baseIndustryUser,
    id: activeMembership ? `${userAccount.id}-${activeMembership.id}` : baseIndustryUser.id,
    name: userAccount.name,
    email: userAccount.email,
    avatar: userAccount.avatar,
    role: role,
    roleLabel: activeMembership && activeMembership.organizationId === organization.id && activeMembership.role === role
      ? activeMembership.roleLabel
      : baseIndustryUser.roleLabel,
    department: activeMembership && activeMembership.organizationId === organization.id
      ? activeMembership.department
      : baseIndustryUser.department,
    organizationId: organization.id,
    organizationName: organization.name,
    membershipId: activeMembership?.id,
    accountId: userAccount.id
  };

  // State data collections
  const [shifts, setShifts] = useState<Shift[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}shifts`);
    return saved ? JSON.parse(saved) : getIndustryShifts(organization);
  });

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}leave`);
    return saved ? JSON.parse(saved) : INITIAL_LEAVE_REQUESTS;
  });

  const [overtimeRequests, setOvertimeRequests] = useState<OvertimeRequest[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}overtime`);
    return saved ? JSON.parse(saved) : INITIAL_OVERTIME_REQUESTS;
  });

  const [incidents, setIncidents] = useState<IncidentReport[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}incidents`);
    return saved ? JSON.parse(saved) : INITIAL_INCIDENTS;
  });

  const [skills, setSkills] = useState<SkillRecord[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}skills`);
    return saved ? JSON.parse(saved) : INITIAL_SKILLS;
  });

  const [accommodations, setAccommodations] = useState<AccommodationRequest[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}accommodations`);
    return saved ? JSON.parse(saved) : INITIAL_ACCOMMODATIONS;
  });

  const [pulseInsights, setPulseInsights] = useState<PulseInsight[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}pulse`);
    return saved ? JSON.parse(saved) : INITIAL_PULSE_INSIGHTS;
  });

  // Clock in state
  const [isClockedIn, setIsClockedIn] = useState<boolean>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}clocked_in`);
    return saved ? JSON.parse(saved) : false;
  });
  const [clockInTime, setClockInTime] = useState<string | null>(() => {
    return localStorage.getItem(`${STORAGE_PREFIX}clock_in_time`);
  });
  const [shiftElapsedSeconds, setShiftElapsedSeconds] = useState<number>(0);

  // Sync to DOM root attributes for CSS theme & accessibility
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', industryTheme);
    
    // Dark mode
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // High Contrast
    if (accessibility.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Reduced motion
    if (accessibility.reducedMotion) {
      root.classList.add('force-reduced-motion');
    } else {
      root.classList.remove('force-reduced-motion');
    }

    // Font size
    root.classList.remove('text-normal', 'text-medium', 'text-large', 'text-xlarge');
    root.classList.add(`text-${accessibility.fontSize}`);
  }, [industryTheme, isDarkMode, accessibility]);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}logged_in`, JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}org_id`, currentOrgId);
  }, [currentOrgId]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}role`, role);
  }, [role]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}dark_mode`, JSON.stringify(isDarkMode));
  }, [isDarkMode]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}a11y`, JSON.stringify(accessibility));
  }, [accessibility]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}shifts`, JSON.stringify(shifts));
  }, [shifts]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}leave`, JSON.stringify(leaveRequests));
  }, [leaveRequests]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}overtime`, JSON.stringify(overtimeRequests));
  }, [overtimeRequests]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}incidents`, JSON.stringify(incidents));
  }, [incidents]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}skills`, JSON.stringify(skills));
  }, [skills]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}accommodations`, JSON.stringify(accommodations));
  }, [accommodations]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}pulse`, JSON.stringify(pulseInsights));
  }, [pulseInsights]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}clocked_in`, JSON.stringify(isClockedIn));
    if (clockInTime) {
      localStorage.setItem(`${STORAGE_PREFIX}clock_in_time`, clockInTime);
    } else {
      localStorage.removeItem(`${STORAGE_PREFIX}clock_in_time`);
    }
  }, [isClockedIn, clockInTime]);

  // Clock in timer tick
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isClockedIn && clockInTime) {
      const startTime = new Date(clockInTime).getTime();
      const update = () => {
        const now = Date.now();
        setShiftElapsedSeconds(Math.max(0, Math.floor((now - startTime) / 1000)));
      };
      update();
      interval = setInterval(update, 1000);
    } else {
      setShiftElapsedSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isClockedIn, clockInTime]);

  const switchRole = (newRole: Role) => {
    setRole(newRole);
    setCurrentTab('overview');
  };

  const switchOrganization = (orgId: string) => {
    setCurrentOrgId(orgId);
    const targetOrg = organizations.find(o => o.id === orgId);
    if (targetOrg) {
      setShifts(getIndustryShifts(targetOrg));
    }
  };

  const switchMembership = (membershipId: string) => {
    const mem = userAccount.memberships.find(m => m.id === membershipId);
    if (!mem) return;
    setActiveMembershipId(mem.id);
    localStorage.setItem(`${STORAGE_PREFIX}membership_id`, mem.id);

    setCurrentOrgId(mem.organizationId);
    localStorage.setItem(`${STORAGE_PREFIX}org_id`, mem.organizationId);

    setRole(mem.role);
    localStorage.setItem(`${STORAGE_PREFIX}role`, mem.role);

    const targetOrg = organizations.find(o => o.id === mem.organizationId);
    if (targetOrg) {
      setShifts(getIndustryShifts(targetOrg));
    }
    setCurrentTab('overview');
  };

  const switchUserAccount = (accountId: string) => {
    const acc = DEMO_ACCOUNTS.find(a => a.id === accountId);
    if (!acc) return;
    setActiveAccountId(acc.id);
    localStorage.setItem(`${STORAGE_PREFIX}account_id`, acc.id);

    const firstMem = acc.memberships[0];
    if (firstMem) {
      setActiveMembershipId(firstMem.id);
      localStorage.setItem(`${STORAGE_PREFIX}membership_id`, firstMem.id);

      setCurrentOrgId(firstMem.organizationId);
      localStorage.setItem(`${STORAGE_PREFIX}org_id`, firstMem.organizationId);

      setRole(firstMem.role);
      localStorage.setItem(`${STORAGE_PREFIX}role`, firstMem.role);

      const targetOrg = organizations.find(o => o.id === firstMem.organizationId);
      if (targetOrg) {
        setShifts(getIndustryShifts(targetOrg));
      }
    }
    setCurrentTab('overview');
  };

  const createOrganization = (orgData: Omit<Organization, 'id'>): Organization => {
    const newOrg: Organization = {
      ...orgData,
      id: `org-custom-${Date.now()}`
    };
    setOrganizations(prev => {
      const updated = [newOrg, ...prev];
      localStorage.setItem(`${STORAGE_PREFIX}orgs`, JSON.stringify(updated));
      return updated;
    });
    setCurrentOrgId(newOrg.id);
    setShifts(getIndustryShifts(newOrg));
    return newOrg;
  };

  const setIndustryTheme = (theme: Industry) => {
    const match = organizations.find(o => o.industry === theme);
    if (match) {
      setCurrentOrgId(match.id);
      setShifts(getIndustryShifts(match));
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const updateAccessibility = (settings: Partial<AccessibilitySettings>) => {
    setAccessibility(prev => ({ ...prev, ...settings }));
  };

  const loginAsRole = (selectedRole: Role, orgId?: string) => {
    setRole(selectedRole);
    if (orgId) {
      setCurrentOrgId(orgId);
      const targetOrg = organizations.find(o => o.id === orgId);
      if (targetOrg) {
        setShifts(getIndustryShifts(targetOrg));
      }
    }
    setIsLoggedIn(true);
    setCurrentTab('overview');
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const toggleClock = () => {
    if (isClockedIn) {
      // Clocking out: Record completed shift if elapsed > 10 seconds
      if (shiftElapsedSeconds > 10) {
        const durationHours = Number((shiftElapsedSeconds / 3600).toFixed(2));
        const newShift: Shift = {
          id: `sh-live-${Date.now()}`,
          workerId: user.id,
          workerName: user.name,
          roleTitle: user.roleLabel,
          department: user.department,
          date: new Date().toISOString().split('T')[0],
          startTime: clockInTime ? new Date(clockInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '08:00',
          endTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          durationHours: Math.max(durationHours, 0.5),
          status: 'completed',
          fatigueRisk: durationHours > 8 ? 'elevated' : 'low',
          recoveryTimeHours: durationHours > 8 ? 14 : 16,
          baseRate: 46.50,
          overtimeHours: durationHours > 8 ? Number((durationHours - 8).toFixed(2)) : 0,
        };
        setShifts(prev => [newShift, ...prev]);
      }
      setIsClockedIn(false);
      setClockInTime(null);
      setShiftElapsedSeconds(0);
    } else {
      const nowStr = new Date().toISOString();
      setIsClockedIn(true);
      setClockInTime(nowStr);
    }
  };

  const addIncident = (incidentData: {
    title: string;
    description: string;
    category: IncidentReport['category'];
    severity: IncidentReport['severity'];
    department: string;
    isAnonymous: boolean;
    voiceTranscriptUsed?: boolean;
  }): string => {
    const randomCode = `FS-${incidentData.isAnonymous ? 'ANON' : 'REP'}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newIncident: IncidentReport = {
      id: `inc-${Date.now()}`,
      trackingCode: randomCode,
      isAnonymous: incidentData.isAnonymous,
      reporterName: incidentData.isAnonymous ? undefined : user.name,
      department: incidentData.department || user.department,
      category: incidentData.category,
      severity: incidentData.severity,
      title: incidentData.title,
      description: incidentData.description,
      dateReported: new Date().toISOString().split('T')[0],
      status: 'reported',
      voiceTranscriptUsed: incidentData.voiceTranscriptUsed
    };
    setIncidents(prev => [newIncident, ...prev]);
    return randomCode;
  };

  const updateIncidentStatus = (id: string, status: IncidentReport['status'], correctiveAction?: string) => {
    setIncidents(prev =>
      prev.map(inc => {
        if (inc.id === id) {
          return {
            ...inc,
            status,
            correctiveAction: correctiveAction || inc.correctiveAction,
            assignedOfficer: inc.assignedOfficer || user.name,
            resolutionDate: status === 'resolved' ? new Date().toISOString().split('T')[0] : inc.resolutionDate
          };
        }
        return inc;
      })
    );
  };

  const addLeaveRequest = (req: {
    type: LeaveRequest['type'];
    startDate: string;
    endDate: string;
    daysCount: number;
    reason: string;
  }) => {
    const newReq: LeaveRequest = {
      id: `lv-${Date.now()}`,
      workerId: user.id,
      workerName: user.name,
      department: user.department,
      type: req.type,
      startDate: req.startDate,
      endDate: req.endDate,
      daysCount: req.daysCount,
      status: 'pending',
      reason: req.reason,
      appliedAt: new Date().toISOString().split('T')[0]
    };
    setLeaveRequests(prev => [newReq, ...prev]);
  };

  const updateLeaveStatus = (id: string, status: 'approved' | 'rejected') => {
    setLeaveRequests(prev =>
      prev.map(r => r.id === id ? { ...r, status } : r)
    );
  };

  const addOvertimeRequest = (req: {
    shiftDate: string;
    hoursRequested: number;
    reason: string;
    fatigueImpact: OvertimeRequest['fatigueImpact'];
  }) => {
    const newReq: OvertimeRequest = {
      id: `ot-${Date.now()}`,
      workerId: user.id,
      workerName: user.name,
      shiftDate: req.shiftDate,
      hoursRequested: req.hoursRequested,
      reason: req.reason,
      fatigueImpact: req.fatigueImpact,
      status: 'pending',
      appliedAt: new Date().toISOString().split('T')[0]
    };
    setOvertimeRequests(prev => [newReq, ...prev]);
  };

  const updateOvertimeStatus = (id: string, status: 'approved' | 'rejected') => {
    setOvertimeRequests(prev =>
      prev.map(r => r.id === id ? { ...r, status } : r)
    );
  };

  const addAccommodation = (acc: {
    category: AccommodationRequest['category'];
    description: string;
  }) => {
    const newReq: AccommodationRequest = {
      id: `acc-${Date.now()}`,
      workerId: user.id,
      workerName: user.name,
      category: acc.category,
      description: acc.description,
      noMedicalDiagnosisConfirmed: true,
      status: 'in-review',
      dateRequested: new Date().toISOString().split('T')[0],
      confidentialityRestricted: true
    };
    setAccommodations(prev => [newReq, ...prev]);
  };

  const endorseSkill = (skillId: string) => {
    setSkills(prev =>
      prev.map(s => {
        if (s.id === skillId) {
          return {
            ...s,
            verifiedBy: `${user.name} (${user.roleLabel})`,
            verifiedDate: new Date().toISOString().split('T')[0]
          };
        }
        return s;
      })
    );
  };

  const addSkill = (title: string, category: SkillRecord['category'], level: SkillRecord['level']) => {
    const newSkill: SkillRecord = {
      id: `sk-${Date.now()}`,
      workerId: user.id,
      title,
      category,
      level,
      issuingBody: 'FairShift Verified Credential Network',
      verifiedDate: new Date().toISOString().split('T')[0],
      verifiedBy: 'Self-Registered Portfolio (Audit Pending)',
      badge: `${category.toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`
    };
    setSkills(prev => [newSkill, ...prev]);
  };

  const updatePulseAction = (id: string, status: PulseInsight['actionStatus'], assignedOwner?: string) => {
    setPulseInsights(prev =>
      prev.map(p => {
        if (p.id === id) {
          return {
            ...p,
            actionStatus: status,
            assignedOwner: assignedOwner || p.assignedOwner,
            afterMetric: status === 'mitigated' ? 'Achieved: Fatigue index reduced by 48%' : p.afterMetric
          };
        }
        return p;
      })
    );
  };

  const resetDemoData = () => {
    setShifts(INITIAL_SHIFTS);
    setLeaveRequests(INITIAL_LEAVE_REQUESTS);
    setOvertimeRequests(INITIAL_OVERTIME_REQUESTS);
    setIncidents(INITIAL_INCIDENTS);
    setSkills(INITIAL_SKILLS);
    setAccommodations(INITIAL_ACCOMMODATIONS);
    setPulseInsights(INITIAL_PULSE_INSIGHTS);
    setIsClockedIn(false);
    setClockInTime(null);
    setShiftElapsedSeconds(0);
    localStorage.clear();
  };

  return (
    <AppContext.Provider
      value={{
        user,
        organization,
        organizations,
        role,
        industryTheme,
        isDarkMode,
        accessibility,
        currentTab,
        isLoggedIn,
        userAccount,
        activeMembership,
        demoAccounts: DEMO_ACCOUNTS,
        switchMembership,
        switchUserAccount,
        shifts,
        leaveRequests,
        overtimeRequests,
        incidents,
        skills,
        accommodations,
        pulseInsights,
        isClockedIn,
        clockInTime,
        shiftElapsedSeconds,
        switchRole,
        switchOrganization,
        createOrganization,
        setIndustryTheme,
        toggleDarkMode,
        updateAccessibility,
        setCurrentTab,
        loginAsRole,
        logout,
        toggleClock,
        addIncident,
        updateIncidentStatus,
        addLeaveRequest,
        updateLeaveStatus,
        addOvertimeRequest,
        updateOvertimeStatus,
        addAccommodation,
        endorseSkill,
        addSkill,
        updatePulseAction,
        resetDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
