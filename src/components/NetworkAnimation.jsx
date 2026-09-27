import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const NODES = [
  { id: 'A', x: 120, y: 200, label: 'Steel Mill',     color: '#2563eb' },
  { id: 'B', x: 340, y: 100, label: 'Cement Plant',   color: '#059669' },
  { id: 'C', x: 560, y: 220, label: 'Paper Mill',     color: '#7c3aed' },
  { id: 'D', x: 460, y: 360, label: 'Tile Mfr.',      color: '#d97706' },
  { id: 'E', x: 240, y: 340, label: 'Glass Factory',  color: '#db2777' },
  { id: 'F', x: 680, y: 130, label: 'Chem Plant',     color: '#0891b2' },
]

const EDGES = [
  { from: 'A', to: 'B', delay: 0    },
  { from: 'B', to: 'C', delay: 0.8  },
  { from: 'C', to: 'D', delay: 1.6  },
  { from: 'D', to: 'E', delay: 2.4  },
  { from: 'E', to: 'A', delay: 3.2  },
  { from: 'B', to: 'F', delay: 0.4  },
  { from: 'F', to: 'C', delay: 1.2  },
  { from: 'A', to: 'E', delay: 4.0  },
]

function getNodeById(id) { return NODES.find(n => n.id === id) }

function AnimatedEdge({ from, to, delay, viewW, viewH }) {
  const n1 = getNodeById(from)
  const n2 = getNodeById(to)
  if (!n1 || !n2) return null

  const scaleX = viewW / 800
  const scaleY = viewH / 480
  const x1 = n1.x * scaleX, y1 = n1.y * scaleY
  const x2 = n2.x * scaleX, y2 = n2.y * scaleY

  const len = Math.hypot(x2 - x1, y2 - y1)

  return (
    <g>
      {/* Static dashed line */}
      <line x1={x1} y1={y1} x2={x2} y2={y2}
        stroke="#e5e7eb" strokeWidth="1.5" strokeDasharray="5 6" />

      {/* Animated "material" dot travelling the line */}
      <motion.circle r="4" fill={n1.color} opacity={0.85}
        initial={{ cx: x1, cy: y1, opacity: 0, scale: 0 }}
        animate={{
          cx: [x1, x2, x2],
          cy: [y1, y2, y2],
          opacity: [0, 1, 1, 0],
          scale: [0, 1, 1, 0],
        }}
        transition={{
          duration: 2.4,
          delay,
          repeat: Infinity,
          repeatDelay: EDGES.length * 0.8,
          ease: 'easeInOut',
        }}
      />
    </g>
  )
}

export default function NetworkAnimation() {
  const containerRef = useRef(null)
  const svgRef = useRef(null)

  // Keep SVG responsive
  useEffect(() => {
    const obs = new ResizeObserver(() => {
      if (svgRef.current && containerRef.current) {
        svgRef.current.setAttribute('width',  containerRef.current.offsetWidth)
        svgRef.current.setAttribute('height', containerRef.current.offsetHeight)
      }
    })
    if (containerRef.current) obs.observe(containerRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="relative w-full h-full" aria-hidden="true">
      <svg ref={svgRef} width="100%" height="100%" style={{ overflow: 'visible' }}>
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Background grid */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" opacity="0.6"/>

        {/* Edges — static lines */}
        {EDGES.map(e => {
          const n1 = getNodeById(e.from), n2 = getNodeById(e.to)
          return (
            <line key={`static-${e.from}-${e.to}`}
              x1={`${(n1.x / 800) * 100}%`} y1={`${(n1.y / 480) * 100}%`}
              x2={`${(n2.x / 800) * 100}%`} y2={`${(n2.y / 480) * 100}%`}
              stroke="#e5e7eb" strokeWidth="1.5" strokeDasharray="5 6"
            />
          )
        })}

        {/* Animated tokens */}
        {EDGES.map(e => {
          const n1 = getNodeById(e.from), n2 = getNodeById(e.to)
          const x1p = `${(n1.x / 800) * 100}%`
          const y1p = `${(n1.y / 480) * 100}%`
          const x2p = `${(n2.x / 800) * 100}%`
          const y2p = `${(n2.y / 480) * 100}%`
          return (
            <motion.circle key={`tok-${e.from}-${e.to}`}
              r="4.5" fill={getNodeById(e.from).color}
              filter="url(#glow)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.9, 0.9, 0] }}
              transition={{ duration: 2.2, delay: e.delay, repeat: Infinity, repeatDelay: 6 }}
            >
              <animateMotion
                dur="2.2s"
                begin={`${e.delay}s`}
                repeatCount="indefinite"
                calcMode="spline"
                keySplines="0.42 0 0.58 1"
              >
                <mpath href={`#edge-path-${e.from}-${e.to}`} />
              </animateMotion>
            </motion.circle>
          )
        })}

        {/* Hidden paths for animateMotion */}
        <defs>
          {EDGES.map(e => {
            const n1 = getNodeById(e.from), n2 = getNodeById(e.to)
            return (
              <path key={`path-${e.from}-${e.to}`}
                id={`edge-path-${e.from}-${e.to}`}
                d={`M ${(n1.x/800)*100}% ${(n1.y/480)*100}% L ${(n2.x/800)*100}% ${(n2.y/480)*100}%`}
              />
            )
          })}
        </defs>

        {/* Nodes */}
        {NODES.map((node, i) => {
          const cx = `${(node.x / 800) * 100}%`
          const cy = `${(node.y / 480) * 100}%`
          return (
            <g key={node.id}>
              {/* Pulse ring */}
              <motion.circle
                cx={cx} cy={cy} r="22" fill="none"
                stroke={node.color} strokeWidth="1.5" opacity={0.2}
                animate={{ r: [18, 26, 18], opacity: [0.2, 0.05, 0.2] }}
                transition={{ duration: 3 + i * 0.3, repeat: Infinity, delay: i * 0.5 }}
              />
              {/* Node disc */}
              <circle cx={cx} cy={cy} r="16" fill="#fff"
                stroke="#e5e7eb" strokeWidth="1.5" />
              {/* Color dot */}
              <circle cx={cx} cy={cy} r="7" fill={node.color} opacity={0.9} />
              {/* Label */}
              <text x={cx} textAnchor="middle"
                dy={`calc(${(node.y/480)*100}% + 32px)`}
                style={{ fontSize: 11, fill: '#6b7280', fontFamily: 'Inter,sans-serif', fontWeight: 500 }}
              >{node.label}</text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
