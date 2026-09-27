import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import NetworkAnimation from '../components/NetworkAnimation'

export default function LoginPage() {
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [form, setForm] = useState({ email: '', password: '', company: '', role: '' })
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Mock auth — route to dashboard
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex" style={{ paddingTop: 68 }}>
      {/* Left panel — animation (hidden on mobile) */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center" style={{background:'var(--gray-50)',borderRight:'1.5px solid var(--gray-100)'}}>
        <div className="absolute inset-0">
          <NetworkAnimation />
        </div>
        <div className="relative z-10 text-center px-12">
          <div className="card inline-block px-6 py-4" style={{backdropFilter:'blur(8px)',background:'rgba(255,255,255,0.9)'}}>
            <p style={{fontSize:13,fontWeight:600,color:'var(--gray-900)',marginBottom:4}}>
              Compatibility matching in real time
            </p>
            <p style={{fontSize:12,color:'var(--gray-400)'}}>
              Verified nodes · Quality-matched · Cost-aware
            </p>
          </div>
        </div>
      </div>

      {/* Right panel — auth card */}
      <div className="flex-1 flex items-center justify-center px-8 py-12 bg-white">
        <motion.div
          style={{ width: '100%', maxWidth: 420 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" style={{fontSize:13,color:'var(--gray-400)',display:'inline-flex',alignItems:'center',gap:4,marginBottom:32,textDecoration:'none'}}>
            ← Back to Symbi
          </Link>

          {/* Toggle */}
          <div className="flex rounded-xl p-1 mb-8" style={{background:'var(--gray-100)'}}>
            {['login','register'].map(m => (
              <button key={m} id={`auth-tab-${m}`}
                onClick={() => setMode(m)}
                className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all"
                style={{
                  background: mode === m ? '#fff' : 'transparent',
                  color: mode === m ? 'var(--gray-900)' : 'var(--gray-500)',
                  boxShadow: mode === m ? '0 1px 4px rgba(17,24,39,0.08)' : 'none',
                  border: 'none', cursor: 'pointer',
                }}
              >{m === 'login' ? 'Sign in' : 'Register'}</button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={mode}
              initial={{ opacity: 0, x: mode === 'login' ? -10 : 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
            >
              <h1 className="t-h2 mb-1">
                {mode === 'login' ? 'Welcome back' : 'Create your account'}
              </h1>
              <p className="t-body-sm mb-8">
                {mode === 'login'
                  ? 'Sign in to access your industrial exchange dashboard.'
                  : 'Join a network of verified industrial facilities.'}
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {mode === 'register' && (
                  <>
                    <div>
                      <label className="t-label mb-1.5 block" style={{color:'var(--gray-700)'}}>Company name</label>
                      <input id="register-company" className="input" type="text" placeholder="Acme Steel Ltd."
                        value={form.company} onChange={e => setForm(f => ({...f, company: e.target.value}))} required />
                    </div>
                    <div>
                      <label className="t-label mb-1.5 block" style={{color:'var(--gray-700)'}}>Your role</label>
                      <select id="register-role" className="input" style={{cursor:'pointer'}}
                        value={form.role} onChange={e => setForm(f => ({...f, role: e.target.value}))} required>
                        <option value="">Select role…</option>
                        <option value="waste-generator">Waste generator / Seller</option>
                        <option value="buyer">Raw material buyer</option>
                        <option value="both">Both</option>
                        <option value="cluster-admin">Industrial cluster administrator</option>
                      </select>
                    </div>
                  </>
                )}
                <div>
                  <label className="t-label mb-1.5 block" style={{color:'var(--gray-700)'}}>Work email</label>
                  <input id="auth-email" className="input" type="email" placeholder="you@company.com"
                    value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} required />
                </div>
                <div>
                  <label className="t-label mb-1.5 block" style={{color:'var(--gray-700)'}}>Password</label>
                  <input id="auth-password" className="input" type="password" placeholder="••••••••"
                    value={form.password} onChange={e => setForm(f => ({...f, password: e.target.value}))} required />
                </div>

                <button id="auth-submit-btn" type="submit" className="btn btn-primary w-full mt-2" style={{borderRadius:10,padding:'13px'}}>
                  {mode === 'login' ? 'Sign in to dashboard' : 'Create account'}
                </button>
              </form>

              <p style={{fontSize:13,color:'var(--gray-400)',textAlign:'center',marginTop:20}}>
                {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                  style={{color:'var(--blue-600)',fontWeight:600,background:'none',border:'none',cursor:'pointer',fontSize:13}}>
                  {mode === 'login' ? 'Register' : 'Sign in'}
                </button>
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
