import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Modules', href: '/#modules' },
  { label: 'For clusters', href: '/#cold-start' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const isDashboard = location.pathname === '/dashboard'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'nav-glass shadow-sm' : 'bg-transparent'
      }`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <nav className={`${isDashboard ? 'w-full px-6' : 'container'} flex items-center justify-between h-[68px]`}>
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group" id="nav-logo">
          <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8C3 5.24 5.24 3 8 3s5 2.24 5 5-2.24 5-5 5S3 10.76 3 8Z" stroke="#fff" strokeWidth="1.5"/>
              <path d="M8 5.5v5M5.5 8h5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <span style={{fontSize:17,fontWeight:800,letterSpacing:'-0.5px',color:'var(--gray-900)'}}>Symbi</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {!isDashboard && NAV_LINKS.map(l => (
            <a key={l.label} href={l.href}
              className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
            >{l.label}</a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          {isDashboard ? (
            <Link to="/" className="btn btn-outline text-sm py-2">← Back to site</Link>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline hidden sm:inline-flex" id="nav-login-btn">Sign in</Link>
              <Link to="/login" className="btn btn-primary" id="nav-cta-btn">Request access</Link>
            </>
          )}
        </div>
      </nav>
    </motion.header>
  )
}
