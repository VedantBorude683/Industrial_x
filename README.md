# Industrial_X (Symbi) — B2B Industrial Symbiosis & Waste Exchange Platform

> **Transforming industrial waste into verified raw inputs.**  
> A digitized B2B exchange platform that verifies, matches, and tracks by-product material exchanges end-to-end with lab-backed quality data, total cost transparency, and custody tracking.

---

## 🌟 Overview

Two-sided industrial waste marketplaces typically fail due to cold-start problems, lack of trust in anonymous sellers, unstandardized material quality claims, hidden transportation overhead, and fear of leaking proprietary formula data.

**Industrial_X** solves these friction points through six foundational modules:

1. **Verified Identity & Reputation Engine**: Verifies legal corporate entities (CPCB authorization, ISO 14001, GSTIN, MCA21) with an auditable trust score and zero-default records.
2. **Material Quality Profile**: Standardizes quality metrics (purity %, contamination, moisture, intrinsic viscosity) backed by accredited laboratory assay reports (e.g., SGS testing).
3. **Smart Compatibility Matching Engine**: Multi-factor ranking based on engineering compatibility (Quality Fit, Batch Quantity Fit, Cluster Proximity, and Processing Line calibration).
4. **Integrated Landed Cost Estimator**: Calculates true landed economics inline ($\text{Material Cost} + \text{Logistics Freight} + \text{Escrow Fee} = \text{Total Landed Cost}$) compared against virgin material benchmarks.
5. **Tiered Data Visibility**: Role-based access control (Public, Verified Buyer, Matched Party under NDA) allowing enterprises to protect sensitive supply-chain data.
6. **Exchange Lifecycle Tracker**: End-to-end physical pipeline tracking active consignments through six distinct stages: $\text{Listed} \rightarrow \text{Matched} \rightarrow \text{Confirmed} \rightarrow \text{Picked Up} \rightarrow \text{Delivered} \rightarrow \text{Completed}$.

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS v4
- **Animation & Transitions**: Framer Motion
- **Routing**: React Router v6
- **Architecture**: MERN-ready static UI with seamless transition paths for Express & MongoDB

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/VedantBorude683/Industrial_x.git

# Navigate into project directory
cd Industrial_x

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 📁 Project Structure

```
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   └── industrial-symbiosis.mp4   # 3D cinematic material exchange simulation
├── src/
│   ├── components/
│   │   ├── HeroVideoPlayer.jsx     # Video telemetry player with HUD overlays
│   │   ├── Navbar.jsx              # Responsive navigation
│   │   └── NetworkAnimation.jsx    # SVG material network graph
│   ├── pages/
│   │   ├── HomePage.jsx            # High-conversion hero, core modules, cluster seeding
│   │   ├── DashboardPage.jsx       # 6-module enterprise command center with left sidebar
│   │   └── LoginPage.jsx           # Enterprise authentication & role onboarding
│   ├── App.jsx                     # Route architecture
│   ├── index.css                   # Tailwind CSS tokens & design system
│   └── main.jsx                    # Application entry point
├── package.json
└── vite.config.js
```

---

## 📜 License

MIT License. Designed for sustainable circular economy and industrial symbiosis.
