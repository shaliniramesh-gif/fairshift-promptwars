# FairShift — Decent Work Intelligence Platform

> **Aligned with United Nations Sustainable Development Goal 8: Decent Work and Economic Growth**  
> *Target 8.8: Protect labour rights and promote safe and secure working environments for all workers.*  
> *Target 8.5: Achieve full and productive employment and decent work for all women and men, with equal pay for work of equal value.*

---

## 🌟 Executive Summary

**FairShift** is a multi-industry workforce intelligence and ergonomic rest protection platform engineered to safeguard worker physiology, enforce living wage compliance, eliminate whistleblower retaliation risks, and optimize shift operations across five high-strain industries:

1. **Healthcare** (Hospitals & Critical Care Clinics) — Rest deficit monitoring, ICU circadian shift protection.
2. **Manufacturing & Construction** (Heavy Dynamics & Fabrication) — Lockout/tagout procedures, machine vibration strain, noise mitigation.
3. **Education** (Colleges, Academies & Universities) — Educator prep-time equity, grading burnout mitigation.
4. **Corporate** (Distributed Tech & Office Teams) — Cross-timezone call sprawl, screen fatigue, ergonomic micro-breaks.
5. **Retail & Sales** (Omni-Channel Distribution & Storefronts) — Predictable on-call scheduling, standing strain.

---

## 🚀 Key Innovations & Core Capabilities

### 1. Multi-Profile Context Switching for a Single Identity
Modern workers frequently navigate fluid, multi-role lives. FairShift natively supports **Multiple Profiles & Memberships associated with a single individual**:
- **Demonstration Persona — Elena Rostova**:
  - **Profile 1**: Graduate Teaching Assistant & Student Researcher at *Horizon Unified Academy* (Education).
  - **Profile 2**: Evening Inventory & Sales Floor Associate at *Vertex OmniRetail Group* (Retail).
  - **Profile 3**: Per-Diem Patient Transport Aide at *St. Jude Regional Healthcare* (Healthcare).
- **Zero Cross-Facility Data Leakage**: Switching profiles instantly swaps the active facility, industry design tokens, shift roster, permissions, and dashboards without leaking private records across organizations.

### 2. FairShift Pulse — Explainable Workforce Intelligence
Rather than a black-box autonomous AI, FairShift Pulse provides **transparent, verifiable signal telemetry with human-in-the-loop remediation**:
- Evaluates permitted shift duration, consecutive rotations, rest recovery intervals, and hazard reports.
- Explains uncertainty bounds and correlation versus causation.
- Enforces strict ethical guardrails: **AI recommendations never automatically penalize, dismiss, or rank workers, nor use disability accommodations or anonymous reports as negative signals**.

### 3. BarrierBridge — Universal Inclusion & Non-Medical Accommodations
Accessibility is integrated directly into the core shell rather than being an oversized add-on:
- Compact slide-over accessibility drawer accessible via header trigger (`WCAG AAA` compliance).
- **Text Scaling**: 100%, 115%, 125%, 140%.
- **Sensory & Visual**: High-contrast mode, reduced motion (vestibular-safe), and simplified plain-language modes.
- **Multi-Language**: Instant UI switching between English, Español, Français, Deutsch, हिन्दी, and Tagalog.
- **Confidential Accommodation Requests**: Workers can request shift micro-breaks, ergonomic hoists, and lighting adjustments **without requiring a medical diagnosis**.

### 4. Zero-Retaliation Whistleblower Guarantee
Whistleblower reports generate a cryptographic tracking code allowing private case-status lookup without exposing reporter identity. Application logic strictly prevents any role—including Super Admins—from de-anonymizing reports.

---

## 👥 Role-Based Dashboards & Data Boundaries

| Role Persona | Dedicated Dashboard | Primary Capabilities | Strict RBAC Data Boundary |
|---|---|---|---|
| **Employee / Worker** | `WorkerDashboard` | Shift clock-in/out, personal payslips, MIT living wage parity, BarrierBridge accommodations, anonymous safety desk, verifiable skills passport | Restricted to personal shifts & reports. Cannot view peer files or company P&L. |
| **Department Manager** | `DepartmentManagerDashboard` | Shift swap approval queue, team roster coverage, safe staffing thresholds, local hazard triage | Controls department shifts; strictly barred from company-wide financials or employee medical files. |
| **HR / Workforce Lead** | `HRDashboard` | Headcount summaries, circadian deficit indicators, leave approval queue, retention monitor | Workforce-wide metrics; cryptographically barred from de-anonymizing whistleblowers. |
| **Finance Manager** | `FinanceDashboard` | Revenue, labor expenditure, net margin trends, budget variance, living wage compliance audit | P&L and aggregated costs; zero access to individual worker payroll or medical records. |
| **Sales Director** | `SalesDashboard` | Commercial deal velocity, sales targets, territory comparisons, partner contract health | Commercial pipeline only; strictly isolated from internal worker and incident records. |
| **Safety / Operations (EHS)** | `SafetyDashboard` | OSHA / SDG 8.8 hazard log, corrective action plans, near-miss resolutions | Safety log and triage; cannot access worker accommodations or de-anonymize whistleblowers. |
| **Super Admin** | `SuperAdminDashboard` | Cross-department radar, multi-industry comparison, immutable audit log, RBAC permissions | Global governance and audit trail. |

---

## 🛠️ Technology Stack

- **Frontend Framework**: React 19 (Functional components, hooks, modular architecture)
- **Language**: TypeScript 5.8+ (Strict type checking, enums, interfaces)
- **Build System**: Vite 8 with `@vitejs/plugin-react`
- **Styling & Tokens**: Tailwind CSS v4 with dynamic CSS variables for industry themes
- **3D Interactive Hero**: Three.js cursor-reactive workforce equilibrium gyroscope with WebGL fallback & reduced-motion support
- **Icons**: Lucide React
- **Testing**: Node.js / TSX automated test runner

---

## 🧪 Testing & Verification

Run the automated test suite verifying all fatigue formulas, living wage ratios, RBAC boundaries, and multi-profile isolation:

```bash
# Run unit tests
npm test

# Type check and lint
npm run lint

# Production build
npm run build
```

### Verified Test Results:
1. `Fatigue Calculation - Critical Risk on 13h Night Shift with 11h Rest`: **PASSED**
2. `Fatigue Calculation - Safe Risk on 8h Day Shift with 16h Rest`: **PASSED**
3. `Living Wage Ratio - Standard Calculation matches 1.95x`: **PASSED**
4. `RBAC Boundary - Sales Denied Worker Private Records`: **PASSED**
5. `Zero-Retaliation - Whistleblower De-anonymization Permanently Barred`: **PASSED**
6. `Role Authority - Department Manager Approved for Shift Swaps`: **PASSED**
7. `RBAC Boundary - Accommodations Confidentiality Protected from Commercial Roles`: **PASSED**
8. `Multi-Profile Context - 3 Isolated Memberships Verified for One Person`: **PASSED**

---

## 🔒 Security, Data Privacy & Honest Demo Limitations

- **Demo Environment**: Persona and membership switching operate inside browser state to enable interactive prototyping.
- **Client Logic Enforcement**: RBAC boundaries, confidentiality filters, and whistleblower privacy are enforced in application logic, not simply by hiding navigation buttons.
- **Zero Secrets in Client**: No API keys, credentials, or production tokens are checked into version control or embedded in client bundles.
- **Persistence**: All live clock-ins, leave submissions, and accommodation requests persist locally in `localStorage` with a 1-click **Reset Demo Data** action.

---

## ☁️ Google Cloud Run Deployment Instructions

FairShift is optimized for Google Cloud Run containerized deployment:

### 1. Build Container with Cloud Build
```bash
gcloud builds submit --tag gcr.io/[PROJECT-ID]/fairshift:latest
```

### 2. Deploy to Cloud Run
```bash
gcloud run deploy fairshift \
  --image gcr.io/[PROJECT-ID]/fairshift:latest \
  --platform managed \
  --region asia-east1 \
  --allow-unauthenticated \
  --port 3000
```

---

## 📋 Hackathon Submission Checklist

- [x] **Single Git Branch**: Main branch clean without duplicate branches.
- [x] **Repository Size**: Strictly under 10 MB (Clean `.gitignore` excluding `node_modules`, `dist`, `.cache`, and logs).
- [x] **No Hardcoded Secrets**: Client uses public demo state; `.env*` excluded.
- [x] **Google Cloud Run Live URL**: Deployed and accessible on Cloud Run.
- [x] **Comprehensive Documentation**: Complete SDG 8 alignment and architectural overview.
