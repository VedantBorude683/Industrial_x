import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import HeroVideoPlayer from '../components/HeroVideoPlayer'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] } })
}

const MODULES = [
  {
    id: 'quality',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2l2.2 5.5H18l-4.5 3.3 1.7 5.5L10 13l-5.2 3.3 1.7-5.5L2 7.5h5.8L10 2Z" stroke="#2563eb" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
    color: '#eff6ff',
    accent: '#2563eb',
    badge: 'Foundation layer',
    title: 'Material Quality Profile',
    body: 'Standardised spec sheets — purity %, contamination levels, moisture content — backed by verified lab reports. The data layer every other module depends on.',
  },
  {
    id: 'matching',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="7" cy="10" r="4" stroke="#059669" strokeWidth="1.6" />
        <circle cx="13" cy="10" r="4" stroke="#059669" strokeWidth="1.6" />
        <path d="M10 6.5C8.8 8 8.8 12 10 13.5C11.2 12 11.2 8 10 6.5Z" fill="#059669" opacity="0.25" />
      </svg>
    ),
    color: '#f0fdf4',
    accent: '#059669',
    badge: 'Matching engine',
    title: 'Find your best match',
    body: 'Instead of browsing hundreds of listings, a multi-factor compatibility score surfaces the 2–3 realistic options — quality fit, quantity, distance, and processing compatibility.',
  },
  {
    id: 'trust',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2L17 5.5V10C17 14 13.9 17.5 10 18.5C6.1 17.5 3 14 3 10V5.5L10 2Z" stroke="#7c3aed" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M7.5 10l2 2 3.5-3.5" stroke="#7c3aed" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: '#f5f3ff',
    accent: '#7c3aed',
    badge: 'Trust layer',
    title: 'Verified identity & reputation',
    body: 'Company verification, document checks, and transaction history aggregate into a trust score. A quality claim means nothing without a trust layer behind it.',
  },
  {
    id: 'cost',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="5" width="14" height="11" rx="2" stroke="#d97706" strokeWidth="1.6" />
        <path d="M7 10h6M7 13h4" stroke="#d97706" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M8 3v4M12 3v4" stroke="#d97706" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    color: '#fffbeb',
    accent: '#d97706',
    badge: 'Cost estimator',
    title: 'Total cost clarity',
    body: 'Material cost plus transport logistics, calculated before a match is surfaced. A technically perfect match that doesn\'t stack up economically never wastes your time.',
  },
]

const STATS = [
  { value: '4', label: 'Core verification layers' },
  { value: '2–3', label: 'Curated matches per search' },
  { value: '100%', label: 'Lab-backed quality data' },
  { value: '0', label: 'Guesswork in matching' },
]

export default function HomePage() {
  return (
    <main>
      {/* ═══ HERO ═══ */}
      <section
        className="relative min-h-[92vh] flex items-center overflow-hidden"
        style={{
          paddingTop: 72,
          background: 'radial-gradient(ellipse 900px 650px at 75% 42%, rgba(141, 156, 162, 0.14) 0%, rgba(219, 234, 254, 0.16) 35%, rgba(255, 255, 255, 0) 75%), linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
        }}
      >
        {/* Subtle grid pattern matching precision engineering */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: 'radial-gradient(rgba(148, 163, 184, 0.25) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            maskImage: 'linear-gradient(180deg, white, transparent 90%)',
            WebkitMaskImage: 'linear-gradient(180deg, white, transparent 90%)',
          }}
        />

        {/* Split layout */}
        <div className="container w-full relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-14 py-16 lg:py-24">

            {/* Left — copy */}
            <div className="flex-1 max-w-[540px]">
              <motion.div
                className="badge badge-blue mb-6 inline-flex items-center gap-2"
                variants={fadeUp} initial="hidden" animate="visible" custom={0}
              >


              </motion.div>

              <motion.h1 className="t-display mb-6"
                variants={fadeUp} initial="hidden" animate="visible" custom={1}
              >
                One company's waste.<br />
                <span style={{ color: '#2563eb' }}>Another's raw input.</span>
              </motion.h1>

              <motion.p className="t-body mb-8" style={{ maxWidth: 470 }}
                variants={fadeUp} initial="hidden" animate="visible" custom={2}
              >
                Verified quality data, real trust signals, and total cost clarity —
                before you ever arrange a site visit. We don't remove physical inspection;
                we eliminate the need to inspect 20 candidates to find the 1 worth visiting.
              </motion.p>

              <motion.div className="flex flex-wrap gap-3"
                variants={fadeUp} initial="hidden" animate="visible" custom={3}
              >
                <Link to="/login" className="btn btn-primary" id="hero-request-access">
                  Request early access
                </Link>
                <a href="#how-it-works" className="btn btn-outline" id="hero-how-it-works">
                  See how it works
                </a>
              </motion.div>

              {/* Trust line */}
              <motion.p className="t-overline mt-8"
                variants={fadeUp} initial="hidden" animate="visible" custom={4}
              >
                Seeding with anchor industrial clusters · No invented stats
              </motion.p>
            </div>

            {/* Right — industrial symbiosis video showcase */}
            <motion.div
              className="flex-1 w-full"
              style={{ maxWidth: 580 }}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <HeroVideoPlayer />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section style={{ background: 'var(--gray-50)', borderTop: '1.5px solid var(--gray-100)', borderBottom: '1.5px solid var(--gray-100)' }}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
            {STATS.map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="text-center"
              >
                <div className="stat-number">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MODULES ═══ */}
      <section className="section" id="how-it-works">
        <div className="container">
          <motion.p className="t-overline mb-3"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >Core modules</motion.p>
          <motion.h2 className="t-h1 mb-4" style={{ maxWidth: 500 }}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            Built on the four things that actually make a match viable.
          </motion.h2>
          <motion.p className="t-body mb-14" style={{ maxWidth: 460 }}
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          >
            Industrial waste can't be assessed by casual inspection — these modules supply
            the lab-level data and verified signals a site visit can't give you.
          </motion.p>

          <div id="modules" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {MODULES.map((m, i) => (
              <motion.article key={m.id} id={`module-${m.id}`}
                className="card flex flex-col gap-4"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              >
                {/* Icon */}
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: m.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {m.icon}
                </div>

                <div>
                  <span className="badge badge-gray mb-3" style={{ fontSize: 10 }}>{m.badge}</span>
                  <h3 className="t-h3 mb-2">{m.title}</h3>
                  <p className="t-body-sm">{m.body}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ COLD-START / NETWORK EFFECT ═══ */}
      <section className="section" id="cold-start" style={{ background: 'var(--gray-50)', borderTop: '1.5px solid var(--gray-100)' }}>
        <div className="container-sm text-center">
          <motion.p className="t-overline mb-3"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >Cold-start strategy</motion.p>
          <motion.h2 className="t-h1 mb-5"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            We're not launching an empty marketplace.
          </motion.h2>
          <motion.p className="t-body mb-10"
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          >
            Two-sided marketplaces fail without both supply and demand at launch.
            We're seeding with a small number of <strong style={{ color: 'var(--gray-900)', fontWeight: 600 }}>anchor industrial clusters</strong> where
            latent buyer-seller demand already exists — solving cold-start locally, then scaling.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
          >
            <Link to="/login" className="btn btn-primary" id="cluster-cta-btn">
              Apply as anchor cluster
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ CTA BAND ═══ */}
      <section className="section" id="early-access">
        <div className="container">
          <motion.div
            className="card flex flex-col md:flex-row items-center justify-between gap-8"
            style={{ padding: '52px 48px', background: 'var(--gray-900)', border: 'none', borderRadius: 20 }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <div style={{ maxWidth: 480 }}>
              <p className="t-label mb-2" style={{ color: 'rgba(255,255,255,0.45)' }}>Early access</p>
              <h2 className="t-h2 mb-3" style={{ color: '#fff' }}>Help shape the first version.</h2>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,0.55)' }}>
                Working with a small number of industrial facilities and procurement teams
                before broader launch. If you generate or purchase industrial by-products, we'd like to talk.
              </p>
            </div>
            <Link to="/login" className="btn btn-blue" style={{ flexShrink: 0 }} id="main-cta-btn">
              Get in touch
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ borderTop: '1.5px solid var(--gray-100)', padding: '28px 0' }}>
        <div className="container flex items-center justify-between flex-wrap gap-4">
          <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.3px', color: 'var(--gray-900)' }}>Symbi</div>
          <p style={{ fontSize: 12, color: 'var(--gray-400)' }}>
            Prototype — no live matching or data storage yet.
          </p>
        </div>
      </footer>
    </main>
  )
}
