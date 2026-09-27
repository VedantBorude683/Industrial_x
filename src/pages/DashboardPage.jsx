import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

/* ─────────────────────────────────────────────────────────────
   SAMPLE DATASET: 500kg PET Plastic Scrap (85% Purity)
   One coherent dataset flowing through all modules
───────────────────────────────────────────────────────────── */

const BATCH_DATA = {
  id: 'MAT-PET-8842',
  name: 'Post-Industrial PET Scrap Flakes',
  specSummary: '500 kg · 85% Purity · Clear Regrind',
  quantity: '500 kg',
  purity: 85.0,
  contamination: 1.2,
  moisture: 0.4,
  iv: 0.72,
  flakeSize: '10–12 mm Flakes',
  color: 'Clear / Transparent',
  origin: 'Beverage bottle preform trim',
  labReportId: 'SGS-PUN-2024-8842',
  labDate: 'Sep 18, 2026',
}

const SELLER = {
  name: 'Apex Polymers Ltd.',
  legalName: 'Apex Polymers & Sustainable Packaging Pvt. Ltd.',
  location: 'Bhosari Industrial Area, Pune',
  cpcbId: 'CPCB-MH-2023-8842',
  trustScore: 94,
  completedDeals: 48,
  volumeDiverted: '342 MT',
  rating: 4.9,
  reviewsCount: 46,
  onTimeRate: '99.1%',
}

const MATCHES = [
  {
    id: 'm1',
    rank: 1,
    company: 'PolyRecycle GreenFilaments',
    type: 'Polyester Fiber Extrusion',
    location: 'Chakan Phase II, Pune',
    distance: '38 km',
    score: 94,
    badge: 'Optimal Match',
    badgeColor: '#059669',
    scores: { quality: 96, quantity: 92, distance: 95, processing: 93 },
    specNote: 'Extruder calibrated for ≥84% purity PET scrap. Direct-feed compatibility.',
    costs: {
      material: 19000,
      transport: 2200,
      escrow: 450,
      total: 21650,
      perKg: '₹43.30/kg',
      benchmark: '₹82.00/kg',
      savingsPct: 47,
      savingsAmt: 19350,
    },
  },
  {
    id: 'm2',
    rank: 2,
    company: 'Deccan GeoTextiles Ltd.',
    type: 'Non-Woven Geotextile Felts',
    location: 'Wada Cluster, Thane',
    distance: '124 km',
    score: 86,
    badge: 'Strong Match',
    badgeColor: '#2563eb',
    scores: { quality: 88, quantity: 95, distance: 78, processing: 84 },
    specNote: 'Requires ≥80% purity. 124 km transport route slightly increases freight.',
    costs: {
      material: 19000,
      transport: 5800,
      escrow: 450,
      total: 25250,
      perKg: '₹50.50/kg',
      benchmark: '₹82.00/kg',
      savingsPct: 38,
      savingsAmt: 15750,
    },
  },
  {
    id: 'm3',
    rank: 3,
    company: 'EcoStraps Packaging Co.',
    type: 'High-Tensile Strapping Lines',
    location: 'Waluj Estate, Aurangabad',
    distance: '210 km',
    score: 72,
    badge: 'Marginal Match',
    badgeColor: '#d97706',
    scores: { quality: 82, quantity: 75, distance: 62, processing: 70 },
    specNote: 'Requires chain extender additive. Higher long-haul freight overhead.',
    costs: {
      material: 19000,
      transport: 9200,
      escrow: 450,
      total: 28650,
      perKg: '₹57.30/kg',
      benchmark: '₹82.00/kg',
      savingsPct: 30,
      savingsAmt: 12350,
    },
  },
]

const LIFECYCLE_STAGES = [
  { step: 1, label: 'Listed', date: 'Sep 22', state: 'done' },
  { step: 2, label: 'Matched', date: 'Sep 23', state: 'done' },
  { step: 3, label: 'Confirmed', date: 'Sep 24', state: 'done' },
  { step: 4, label: 'Picked Up', date: 'Sep 26', state: 'active', note: 'In Transit · Waybill #EWB-88192' },
  { step: 5, label: 'Delivered', date: 'ETA 3:30 PM', state: 'pending' },
  { step: 6, label: 'Completed', date: 'Post-inspection', state: 'pending' },
]

export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState('all') // 'all' | 'identity' | 'quality' | 'matching' | 'cost' | 'visibility' | 'lifecycle'
  const [qualityTab, setQualityTab] = useState('verified') // 'verified' | 'self'
  const [selectedMatch, setSelectedMatch] = useState('m1')
  const [visibilityTier, setVisibilityTier] = useState('matched') // 'public' | 'verified' | 'matched'
  const [certModalOpen, setCertModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row" style={{ paddingTop: 68 }}>

      {/* ─── OFFICIAL LAB CERTIFICATE MODAL ─── */}
      {certModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div>
                <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider">Verified Test Report</p>
                <h3 className="text-base font-bold">SGS India · Certificate #8842</h3>
              </div>
              <button
                onClick={() => setCertModalOpen(false)}
                className="text-slate-400 hover:text-white text-lg p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-slate-700">
              <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl text-emerald-900">
                <p className="font-bold text-sm">✓ Lab Verification Passed</p>
                <p className="mt-1 text-emerald-800">
                  Sample tested on Sep 18, 2026. Certified as <strong>85.0% pure PET polymer</strong> with no PVC contaminants detected. Safe for industrial extrusion.
                </p>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
                <div className="p-2.5 flex justify-between bg-slate-50 font-semibold text-slate-600">
                  <span>Parameter</span>
                  <span>Verified Value</span>
                </div>
                <div className="p-2.5 flex justify-between">
                  <span>PET Purity</span>
                  <strong className="text-slate-900">85.0% (Grade A)</strong>
                </div>
                <div className="p-2.5 flex justify-between">
                  <span>Contamination (Fines/Labels)</span>
                  <strong className="text-slate-900">1.2% (&lt; 1.5% limit)</strong>
                </div>
                <div className="p-2.5 flex justify-between">
                  <span>Moisture Content</span>
                  <strong className="text-slate-900">0.40% (&lt; 0.5% limit)</strong>
                </div>
                <div className="p-2.5 flex justify-between">
                  <span>Intrinsic Viscosity (IV)</span>
                  <strong className="text-slate-900">0.72 dL/g</strong>
                </div>
                <div className="p-2.5 flex justify-between">
                  <span>PVC Content</span>
                  <strong className="text-emerald-700 font-bold">0.0% (Not Detected)</strong>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 flex justify-between items-center pt-2">
                <span>NABL Accredited Testing Facility</span>
                <span className="font-mono text-emerald-700 font-semibold">Digitally Signed</span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setCertModalOpen(false)}
                className="btn btn-primary text-xs py-2 px-4 cursor-pointer"
              >
                Close Certificate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════
          LEFT SAAS SIDEBAR
      ═════════════════════════════════════════════════════════════ */}
      <aside className="w-full md:w-68 bg-white border-r border-slate-200 flex-shrink-0 flex flex-col justify-between sticky top-[68px] md:h-[calc(100vh-68px)] overflow-y-auto z-20 shadow-2xs">
        <div>
          {/* Company Profile Header */}
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-900 text-white font-bold text-sm flex items-center justify-center shadow-xs">
                AP
              </div>
              <div className="min-w-0">
                <h3 className="text-xs font-bold text-slate-900 truncate">Apex Polymers Ltd.</h3>
                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Verified Seller
                </span>
              </div>
            </div>

            {/* Current Listing Capsule */}
            <div className="mt-3 p-2.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Listing</p>
              <p className="text-xs font-bold text-slate-900 mt-0.5 truncate">500 kg PET Plastic Scrap</p>
              <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
                <span>85% Purity</span>
                <span className="text-emerald-700 font-semibold">Ready to Ship</span>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-3 space-y-1">
            <button
              onClick={() => setActiveNav('all')}
              className={`w-full px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer text-left ${
                activeNav === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="text-sm">⊞</span>
              <span>All 6 Modules</span>
            </button>

            <div className="pt-3 pb-1 px-3">
              <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                Core Modules
              </p>
            </div>

            {[
              { id: 'identity', label: 'Verified Identity', icon: '✦', badge: '94/100' },
              { id: 'quality', label: 'Material Quality', icon: '◈', badge: '85%' },
              { id: 'matching', label: 'Smart Matching', icon: '⊕', badge: '3 Matches' },
              { id: 'cost', label: 'Cost Estimator', icon: '⊟', badge: '₹43/kg' },
              { id: 'visibility', label: 'Tiered Visibility', icon: '◫', badge: '3 Tiers' },
              { id: 'lifecycle', label: 'Exchange Tracker', icon: '⟳', badge: 'In Transit' },
            ].map((item) => {
              const isActive = activeNav === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  className={`w-full px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors cursor-pointer text-left ${
                    isActive
                      ? 'bg-blue-600 text-white font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="text-sm opacity-80">{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                  </div>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${isActive ? 'bg-blue-700 text-blue-100' : 'bg-slate-100 text-slate-500'}`}>
                    {item.badge}
                  </span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Pune-Chakan Cluster</span>
          <span className="font-mono text-emerald-600 font-bold">Active Hub</span>
        </div>
      </aside>

      {/* ═════════════════════════════════════════════════════════════
          MAIN DASHBOARD WORKSPACE (RIGHT SIDE)
      ═════════════════════════════════════════════════════════════ */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 md:p-8 space-y-6 overflow-y-auto">

        {/* Top Header Bar */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-1">
              <span>Listing #{BATCH_DATA.id}</span>
              <span>•</span>
              <span className="text-slate-600">{BATCH_DATA.origin}</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900">
              500 kg PET Plastic Scrap Flakes (85% Purity)
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCertModalOpen(true)}
              className="btn btn-outline text-xs py-2 px-3.5 inline-flex items-center gap-1.5 cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
              View Lab Report
            </button>
            <span className="badge badge-green text-xs font-semibold py-1 px-3">
              ● Exchange Active
            </span>
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════
            ROW 1: VERIFIED IDENTITY (1) & EXCHANGE TRACKER (6)
        ═════════════════════════════════════════════════════════════ */}
        {(activeNav === 'all' || activeNav === 'identity' || activeNav === 'lifecycle') && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* ─── MODULE 1: VERIFIED IDENTITY & REPUTATION ENGINE ─── */}
            {(activeNav === 'all' || activeNav === 'identity') && (
              <div className={`${activeNav === 'identity' ? 'lg:col-span-12' : 'lg:col-span-5'} bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between`}>
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                    <h2 className="font-bold text-slate-900 text-sm tracking-tight">
                      Verified Identity &amp; Reputation
                    </h2>
                    <span className="badge badge-green text-xs font-semibold">
                      ✓ Verified
                    </span>
                  </div>

                  <div className="flex items-start gap-3.5 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-slate-900 text-white font-bold text-sm flex items-center justify-center flex-shrink-0">
                      AP
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm leading-snug">{SELLER.name}</h4>
                      <p className="text-xs text-slate-500">{SELLER.location}</p>
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5">CPCB: {SELLER.cpcbId}</p>
                    </div>
                  </div>

                  {/* Trust Score & Metrics */}
                  <div className="grid grid-cols-3 gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-center mb-4">
                    <div>
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Trust Score</span>
                      <span className="text-xl font-black text-emerald-600">{SELLER.trustScore}<span className="text-xs font-normal text-slate-400">/100</span></span>
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Completed</span>
                      <span className="text-xl font-bold text-slate-900">{SELLER.completedDeals}</span>
                      <span className="text-[10px] text-slate-500 block">{SELLER.volumeDiverted}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Rating</span>
                      <span className="text-xl font-bold text-amber-500">{SELLER.rating}★</span>
                      <span className="text-[10px] text-slate-500 block">{SELLER.reviewsCount} reviews</span>
                    </div>
                  </div>

                  {/* Verification Badges */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 rounded-lg bg-emerald-50/70 border border-emerald-100 text-emerald-800 flex items-center gap-1.5 font-medium">
                      <span>✓</span> CPCB Authorized
                    </div>
                    <div className="p-2 rounded-lg bg-emerald-50/70 border border-emerald-100 text-emerald-800 flex items-center gap-1.5 font-medium">
                      <span>✓</span> ISO 14001 Certified
                    </div>
                    <div className="p-2 rounded-lg bg-emerald-50/70 border border-emerald-100 text-emerald-800 flex items-center gap-1.5 font-medium">
                      <span>✓</span> Weighbridge Synced
                    </div>
                    <div className="p-2 rounded-lg bg-emerald-50/70 border border-emerald-100 text-emerald-800 flex items-center gap-1.5 font-medium">
                      <span>✓</span> Zero Payment Defaults
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 text-xs text-slate-400 flex justify-between mt-4">
                  <span>Track Record</span>
                  <span className="text-slate-600 font-semibold">{SELLER.onTimeRate} On-Time Fulfillment</span>
                </div>
              </div>
            )}

            {/* ─── MODULE 6: EXCHANGE LIFECYCLE TRACKER ─── */}
            {(activeNav === 'all' || activeNav === 'lifecycle') && (
              <div className={`${activeNav === 'lifecycle' ? 'lg:col-span-12' : 'lg:col-span-7'} bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between`}>
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                    <h2 className="font-bold text-slate-900 text-sm tracking-tight">
                      Exchange Lifecycle Tracker
                    </h2>
                    <span className="badge badge-blue text-xs font-semibold">
                      ● Stage 4: Picked Up
                    </span>
                  </div>

                  {/* Active Consignment Bar */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mb-5 text-xs flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="text-slate-500">Active Consignment:</span>{' '}
                      <strong className="text-slate-900">500 kg PET Flakes</strong>{' '}
                      <span className="text-slate-400">➔</span>{' '}
                      <strong className="text-blue-700">PolyRecycle GreenFilaments</strong>
                    </div>
                    <div className="font-mono text-slate-600">
                      Vehicle: <strong className="text-slate-900">MH-12-RN-4820</strong>
                    </div>
                  </div>

                  {/* Horizontal Stage Progress Bar */}
                  <div className="relative mb-5 pt-1">
                    <div className="absolute top-5 left-6 right-6 h-0.5 bg-slate-200 z-0">
                      <div className="h-full bg-emerald-500" style={{ width: '60%' }}></div>
                    </div>

                    <div className="grid grid-cols-6 relative z-10 text-center gap-1">
                      {LIFECYCLE_STAGES.map((s) => {
                        const isDone = s.state === 'done'
                        const isActive = s.state === 'active'
                        return (
                          <div key={s.step} className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                              isDone
                                ? 'bg-emerald-500 text-white'
                                : isActive
                                ? 'bg-blue-600 text-white ring-4 ring-blue-100 shadow-sm'
                                : 'bg-white border-2 border-slate-300 text-slate-400'
                            }`}>
                              {isDone ? '✓' : s.step}
                            </div>
                            <span className={`text-xs mt-1.5 font-bold ${isActive ? 'text-blue-700' : isDone ? 'text-slate-800' : 'text-slate-400'}`}>
                              {s.label}
                            </span>
                            <span className="text-[10px] text-slate-400 mt-0.5">{s.date}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Telemetry Status Box */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                    <p className="font-bold text-slate-900 flex items-center gap-1.5">
                      <span>🚚</span> Transit Status:
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                      Picked up at Bhosari Dock 3. Gross weight 514 kg verified on digital weighbridge. Carrier is 14 km from Chakan intake facility. Estimated arrival: 38 mins.
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 text-xs text-slate-400 flex justify-between mt-4">
                  <span>Audit Trail</span>
                  <span className="font-mono text-slate-700 font-semibold">Waybill #EWB-88192 Active</span>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ═════════════════════════════════════════════════════════════
            ROW 2: MATERIAL QUALITY (2) & TIERED VISIBILITY (5)
        ═════════════════════════════════════════════════════════════ */}
        {(activeNav === 'all' || activeNav === 'quality' || activeNav === 'visibility') && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* ─── MODULE 2: MATERIAL QUALITY PROFILE ─── */}
            {(activeNav === 'all' || activeNav === 'quality') && (
              <div className={`${activeNav === 'quality' ? 'lg:col-span-12' : 'lg:col-span-6'} bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between`}>
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                    <h2 className="font-bold text-slate-900 text-sm tracking-tight">
                      Material Quality Profile
                    </h2>

                    {/* Segmented Control */}
                    <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
                      <button
                        onClick={() => setQualityTab('verified')}
                        className={`px-2.5 py-1 rounded-md font-semibold cursor-pointer transition-all ${
                          qualityTab === 'verified' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-500'
                        }`}
                      >
                        ✓ Lab-Verified
                      </button>
                      <button
                        onClick={() => setQualityTab('self')}
                        className={`px-2.5 py-1 rounded-md font-semibold cursor-pointer transition-all ${
                          qualityTab === 'self' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-500'
                        }`}
                      >
                        Self-Declared
                      </button>
                    </div>
                  </div>

                  {/* Verification Tag Strip */}
                  <div className={`p-3 rounded-xl border mb-4 flex items-center justify-between gap-3 ${
                    qualityTab === 'verified' ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-amber-50 border-amber-200 text-amber-900'
                  }`}>
                    <div className="flex items-center gap-2.5">
                      <span className="font-bold text-xs">
                        {qualityTab === 'verified' ? '✓ SGS Lab Certificate Attached' : '⚠ Self-Declared by Seller'}
                      </span>
                      <span className="text-[11px] opacity-80">
                        {qualityTab === 'verified' ? 'Report #8842 (Sep 18, 2026)' : 'Pending laboratory assay'}
                      </span>
                    </div>
                    {qualityTab === 'verified' && (
                      <button
                        onClick={() => setCertModalOpen(true)}
                        className="text-xs font-bold text-emerald-800 underline hover:text-emerald-950 cursor-pointer"
                      >
                        Inspect ➔
                      </button>
                    )}
                  </div>

                  {/* 4 Core Parameter Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4 text-center">
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Purity</span>
                      <p className="text-xl font-black text-blue-600 mt-0.5">85.0%</p>
                      <span className="text-[10px] text-slate-500">ASTM D3418</span>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Contaminants</span>
                      <p className="text-xl font-bold text-slate-800 mt-0.5">1.2%</p>
                      <span className="text-[10px] text-slate-500">&lt; 1.5% max limit</span>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Moisture</span>
                      <p className="text-xl font-bold text-slate-800 mt-0.5">0.40%</p>
                      <span className="text-[10px] text-slate-500">Dry regrind</span>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Viscosity</span>
                      <p className="text-xl font-bold text-purple-600 mt-0.5">0.72</p>
                      <span className="text-[10px] text-slate-500">dL/g (Grade A)</span>
                    </div>
                  </div>

                  {/* Form & Specs Strip */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Material Form:</span>
                      <strong className="text-slate-900">{BATCH_DATA.flakeSize}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Color / Resin Separation:</span>
                      <strong className="text-emerald-700">{BATCH_DATA.color}</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 text-xs text-slate-400 flex justify-between mt-4">
                  <span>Structured Lab Spec</span>
                  <span className="text-emerald-700 font-semibold">Ready for Machine Extrusion</span>
                </div>
              </div>
            )}

            {/* ─── MODULE 5: TIERED DATA VISIBILITY ─── */}
            {(activeNav === 'all' || activeNav === 'visibility') && (
              <div className={`${activeNav === 'visibility' ? 'lg:col-span-12' : 'lg:col-span-6'} bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between`}>
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                    <h2 className="font-bold text-slate-900 text-sm tracking-tight">
                      Tiered Data Visibility
                    </h2>
                    <span className="badge badge-gray text-xs">
                      Privacy Controls
                    </span>
                  </div>

                  {/* 3-Tier Switcher */}
                  <div className="mb-4">
                    <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-xl">
                      <button
                        onClick={() => setVisibilityTier('public')}
                        className={`py-2 px-2 text-xs font-semibold rounded-lg transition-all cursor-pointer text-center ${
                          visibilityTier === 'public' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                        }`}
                      >
                        Public Tier
                        <span className="block text-[10px] text-slate-400 font-normal">Unverified</span>
                      </button>

                      <button
                        onClick={() => setVisibilityTier('verified')}
                        className={`py-2 px-2 text-xs font-semibold rounded-lg transition-all cursor-pointer text-center ${
                          visibilityTier === 'verified' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-500'
                        }`}
                      >
                        Verified Buyer
                        <span className="block text-[10px] text-slate-400 font-normal">KYC Passed</span>
                      </button>

                      <button
                        onClick={() => setVisibilityTier('matched')}
                        className={`py-2 px-2 text-xs font-semibold rounded-lg transition-all cursor-pointer text-center ${
                          visibilityTier === 'matched' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-500'
                        }`}
                      >
                        Matched Party
                        <span className="block text-[10px] text-slate-400 font-normal">Under NDA</span>
                      </button>
                    </div>
                  </div>

                  {/* Live Simulation Card */}
                  <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50 text-xs space-y-2.5">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                      <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                        Preview: What This Tier Sees
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        visibilityTier === 'public' ? 'bg-slate-200 text-slate-700' : visibilityTier === 'verified' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {visibilityTier === 'public' ? 'Redacted' : visibilityTier === 'verified' ? 'Standard Access' : 'Full Unlocked Access'}
                      </span>
                    </div>

                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Company Name:</span>
                      <strong className="font-mono">
                        {visibilityTier === 'public' ? '[Redacted] Packaging Mfr #PUN-89' : visibilityTier === 'verified' ? 'Apex Polymers (Verified Facility)' : 'Apex Polymers & Packaging Ltd.'}
                      </strong>
                    </div>

                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Location GPS:</span>
                      <span className="font-mono">
                        {visibilityTier === 'public' ? 'Maharashtra Region (~150 km)' : visibilityTier === 'verified' ? 'Pune Industrial Cluster (Bhosari)' : 'Plot D-42, Bhosari MIDC, Gate 3'}
                      </span>
                    </div>

                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Lab Test Report:</span>
                      <span>
                        {visibilityTier === 'public' ? '🔒 Locked (Registration Required)' : visibilityTier === 'verified' ? 'Verified Summary Shown' : '✓ Full PDF & Spectral Download'}
                      </span>
                    </div>

                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Direct Contact:</span>
                      <span>
                        {visibilityTier === 'public' ? 'Platform Routed Only' : visibilityTier === 'verified' ? 'Procurement Desk Inquiry' : '+91 98220 XXXXX (Plant Head)'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 text-xs text-slate-400 flex justify-between mt-4">
                  <span>Privacy Custody</span>
                  <span className="text-slate-700 font-semibold">Configurable Field Permissions</span>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ═════════════════════════════════════════════════════════════
            ROW 3: SMART MATCHING (3) & INLINE COST ESTIMATOR (4)
        ═════════════════════════════════════════════════════════════ */}
        {(activeNav === 'all' || activeNav === 'matching' || activeNav === 'cost') && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h2 className="font-bold text-slate-900 text-base tracking-tight">
                  Smart Compatibility Matching &amp; Integrated Cost Estimator
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Ranked by compatibility sub-scores with landed economics (Material + Freight = Total Landed Cost)
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="badge badge-blue text-xs font-semibold">500 kg PET Regrind</span>
                <span className="badge badge-green text-xs font-semibold">3 Matches Scored</span>
              </div>
            </div>

            {/* The Ranked Match Cards */}
            <div className="space-y-4">
              {MATCHES.map((m) => {
                const isSelected = selectedMatch === m.id
                return (
                  <div
                    key={m.id}
                    onClick={() => setSelectedMatch(m.id)}
                    className={`rounded-2xl p-5 border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/20 shadow-md ring-1 ring-blue-500/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">

                      {/* Left: Module 3 (Matching) */}
                      <div className="lg:col-span-7 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 font-bold text-sm flex items-center justify-center">
                              #{m.rank}
                            </span>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-bold text-slate-900 text-base">{m.company}</h3>
                                <span
                                  className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white uppercase"
                                  style={{ background: m.badgeColor }}
                                >
                                  {m.badge}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500">{m.type} · {m.location} ({m.distance})</p>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="text-2xl font-black" style={{ color: m.badgeColor }}>
                              {m.score}%
                            </span>
                            <span className="block text-[10px] text-slate-400 font-semibold uppercase -mt-1">
                              Match Score
                            </span>
                          </div>
                        </div>

                        {/* 4 Sub-Scores */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-center">
                          <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                            <span className="text-[10px] text-slate-500 font-medium block">Quality Fit</span>
                            <span className="text-sm font-bold text-slate-900">{m.scores.quality}%</span>
                          </div>
                          <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                            <span className="text-[10px] text-slate-500 font-medium block">Quantity Fit</span>
                            <span className="text-sm font-bold text-slate-900">{m.scores.quantity}%</span>
                          </div>
                          <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                            <span className="text-[10px] text-slate-500 font-medium block">Distance Fit</span>
                            <span className="text-sm font-bold text-slate-900">{m.scores.distance}%</span>
                          </div>
                          <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                            <span className="text-[10px] text-slate-500 font-medium block">Processing Fit</span>
                            <span className="text-sm font-bold text-slate-900">{m.scores.processing}%</span>
                          </div>
                        </div>

                        <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                          <strong>Fit Summary:</strong> {m.specNote}
                        </p>
                      </div>

                      {/* Right: Module 4 (Inline Cost Estimator) */}
                      <div className="lg:col-span-5 bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2.5">
                        <div className="flex justify-between items-center pb-1.5 border-b border-slate-200">
                          <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                            Landed Cost Breakdown
                          </span>
                          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                            Viable Match
                          </span>
                        </div>

                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span className="text-slate-600">Material (500 kg):</span>
                            <strong className="font-mono text-slate-900">₹{m.costs.material.toLocaleString()}</strong>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-slate-600">Transport ({m.distance}):</span>
                            <strong className="font-mono text-slate-900">+ ₹{m.costs.transport.toLocaleString()}</strong>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-slate-600">Escrow &amp; Assay Fee:</span>
                            <strong className="font-mono text-slate-900">+ ₹{m.costs.escrow.toLocaleString()}</strong>
                          </div>

                          <div className="flex justify-between items-baseline pt-2 border-t border-slate-200 text-slate-900">
                            <div>
                              <strong className="text-sm">Total Landed Cost:</strong>
                              <span className="block text-[11px] text-slate-500">
                                Landed Rate: <strong className="text-slate-900">{m.costs.perKg}</strong>
                              </span>
                            </div>
                            <span className="text-xl font-bold font-mono text-slate-900">
                              ₹{m.costs.total.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Benchmark Comparison */}
                        <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-xs flex justify-between items-center">
                          <div>
                            <span className="text-emerald-900 font-semibold block">
                              vs Virgin PET ({m.costs.benchmark}):
                            </span>
                            <span className="text-[10px] text-emerald-700">
                              Saves ₹{m.costs.savingsAmt.toLocaleString()} net
                            </span>
                          </div>
                          <span className="text-base font-bold text-emerald-700 font-mono">
                            -{m.costs.savingsPct}%
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>
                )
              })}
            </div>

            <div className="pt-3 border-t border-slate-100 text-xs text-slate-400 flex flex-col sm:flex-row justify-between gap-2">
              <span>Matching: Algorithmic tolerance filter</span>
              <span>Cost: Landed rate calculated upfront</span>
            </div>
          </div>
        )}

      </main>
    </div>
  )
}
