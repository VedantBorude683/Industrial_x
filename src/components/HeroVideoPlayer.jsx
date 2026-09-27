import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

export default function HeroVideoPlayer() {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)

  const togglePlay = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    const nextMuted = !isMuted
    videoRef.current.muted = nextMuted
    setIsMuted(nextMuted)
  }

  return (
    <div className="relative w-full group">
      {/* Ambient background glow matching the video's atmospheric lighting */}
      <div
        className="absolute -inset-4 rounded-3xl opacity-60 blur-2xl pointer-events-none transition-opacity duration-700 group-hover:opacity-80"
        style={{
          background: 'radial-gradient(ellipse at 60% 50%, rgba(141, 156, 162, 0.45) 0%, rgba(37, 99, 235, 0.15) 50%, transparent 80%)',
          zIndex: 0,
        }}
      />

      {/* Main Video Card Frame */}
      <div
        className="relative z-10 card overflow-hidden"
        style={{
          padding: 0,
          borderRadius: 20,
          background: '#ffffff',
          border: '1.5px solid rgba(203, 213, 225, 0.75)',
          boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.8) inset',
        }}
      >
        {/* Top Window Header */}
        <div
          className="flex items-center justify-between px-4 py-3 select-none"
          style={{
            background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
            borderBottom: '1px solid #e2e8f0',
          }}
        >
          {/* macOS window controls */}
          <div className="flex items-center gap-2">
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#f87171', display: 'inline-block' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#fbbf24', display: 'inline-block' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#34d399', display: 'inline-block' }} />
            <span className="ml-2 text-xs font-semibold tracking-wider text-slate-500 uppercase">
              Live Symbiosis Telemetry
            </span>
          </div>

          {/* Active status beacon */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#059669', letterSpacing: '0.04em' }}>
              DIRECT CONVEYOR FEED
            </span>
          </div>
        </div>

        {/* Video Viewport Container */}
        <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
          <video
            ref={videoRef}
            src="/industrial-symbiosis.mp4"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover block"
            style={{ filter: 'contrast(1.02) saturate(1.03)' }}
          />

          {/* Subtle cinematic vignette gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.25) 0%, rgba(15, 23, 42, 0) 25%, rgba(15, 23, 42, 0) 70%, rgba(15, 23, 42, 0.45) 100%)',
            }}
          />

          {/* Overlay: Top-left telemetry chip */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <div
              className="px-2.5 py-1 rounded-full flex items-center gap-1.5"
              style={{
                background: 'rgba(15, 23, 42, 0.65)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                fontSize: 11,
                fontWeight: 500,
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2.5">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
              <span>Plant 01 (Source) ➔ Plant 02 (Intake)</span>
            </div>
          </div>

          {/* Overlay: Interactive Controls (Sound & Play/Pause) */}
          <div className="absolute bottom-3 right-3 flex items-center gap-2 z-20">
            <button
              onClick={togglePlay}
              className="flex items-center justify-center rounded-full transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              title={isPlaying ? "Pause video" : "Play video"}
              style={{
                width: 32,
                height: 32,
                background: 'rgba(15, 23, 42, 0.72)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
              }}
            >
              {isPlaying ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
            </button>

            <button
              onClick={toggleMute}
              className="flex items-center justify-center rounded-full transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              title={isMuted ? "Unmute audio" : "Mute audio"}
              style={{
                width: 32,
                height: 32,
                background: 'rgba(15, 23, 42, 0.72)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
              }}
            >
              {isMuted ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                  <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
                  <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path>
                  <line x1="12" y1="19" x2="12" y2="23"></line>
                  <line x1="8" y1="23" x2="16" y2="23"></line>
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </svg>
              )}
            </button>
          </div>

          {/* Overlay: Bottom-left live batch info */}
          <div className="absolute bottom-3 left-3 pointer-events-none">
            <div
              className="px-3 py-1.5 rounded-lg"
              style={{
                background: 'rgba(15, 23, 42, 0.7)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
              }}
            >
              <div className="flex items-center gap-2">
                <span style={{ fontSize: 10, fontWeight: 700, color: '#38bdf8', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  Batch #IS-8924
                </span>
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10 }}>•</span>
                <span style={{ fontSize: 11, color: '#f1f5f9', fontWeight: 500 }}>
                  Scrap Slag &amp; Mineral Aggregates
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Card Lower Metrics Strip */}
        <div
          className="grid grid-cols-3 divide-x divide-slate-100 py-3 px-4"
          style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}
        >
          <div className="text-center px-2">
            <p style={{ fontSize: 10, color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Transfer Rate
            </p>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginTop: 1 }}>
              24.5 MT / day
            </p>
          </div>

          <div className="text-center px-2">
            <p style={{ fontSize: 10, color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Cluster Proximity
            </p>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginTop: 1 }}>
              14.2 km (Direct)
            </p>
          </div>

          <div className="text-center px-2">
            <p style={{ fontSize: 10, color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Purity Verified
            </p>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#16a34a', marginTop: 1 }}>
              98.4% Lab Pass
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
