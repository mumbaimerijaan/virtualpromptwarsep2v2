# Matdaan Saathi - Production-Ready Voter Assistance AI

Matdaan Saathi (Voter Friend) is a high-fidelity, production-grade AI platform designed to simplify the voting experience for Indian citizens. 

## 🚀 Technical Decisions & Architecture

### BFF (Backend-for-Frontend)
The application utilizes a secure **BFF architecture**. The React frontend communicates with a hardened Node.js/Express backend which acts as the sole orchestrator for sensitive operations (Gemini AI, Firestore, and reCAPTCHA). This prevents API key exposure and allows for centralized security auditing.

### Security: Zero-Trust & Bot Mitigation
- **reCAPTCHA Enterprise**: Every AI interaction is protected by reCAPTCHA Enterprise. The backend enforces a risk-based threshold (0.5+ score) before processing prompts, effectively neutralizing automated scrapers and brute-force attacks.
- **Strict CSP**: A multi-layered Content Security Policy is enforced via Helmet, whitelisting only trusted domains (Google APIs, reCAPTCHA, and internal assets).
- **Sanitization**: All AI outputs are sanitized using **DOMPurify** before rendering to mitigate XSS risks from dynamic content.

### Efficiency: Perceived & Real Performance
- **Cache-Aside Pattern**: In-memory TTL caching (via `node-cache`) optimizes AI response times and reduces operational costs by serving identical queries from memory.
- **Progressive Hydration**: All major routes are lazily loaded with high-fidelity **Skeleton Loaders** to improve perceived performance and keep the initial bundle size small.
- **Asset Compression**: Gzip compression is enabled server-side to minimize the payload footprint for mobile users.

## 🛠️ Tech Stack
- **Frontend**: React, Tailwind CSS, Lucide React, Framer Motion
- **Backend**: Node.js, Express, Helmet, Compression, Node-cache
- **AI**: Google Gemini Pro (Gemini-2.0-flash)
- **Infrastructure**: Google Cloud Run (Containerized via Docker)
- **Database**: Google Cloud Firestore (Audit logging)
- **Observability**: GitHub Actions (CI/CD), Health Check Endpoints

## 🧪 Quality Gates
The project maintains a 100% pass rate on core logic through automated Vitest suites and enforces an 80% coverage threshold on critical service layers.

---
*An initiative to empower every voter with accessible and intelligent guidance.*
