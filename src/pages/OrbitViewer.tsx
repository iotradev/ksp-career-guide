import { useRef, useEffect, useState, useCallback } from 'react'
import { useTheme } from '../context/ThemeContext'

interface OrbitConfig {
  name: string
  semiMajor: number
  eccentricity: number
  color: string
  speed: number
}

const presets: Record<string, OrbitConfig[]> = {
  'Kerbin系统': [
    { name: 'Kerbin', semiMajor: 0, eccentricity: 0, color: '#3b82f6', speed: 0 },
    { name: 'Mun', semiMajor: 120, eccentricity: 0, color: '#a855f7', speed: 0.3 },
    { name: 'Minmus', semiMajor: 180, eccentricity: 0, color: '#06b6d4', speed: 0.15 },
  ],
  '椭圆轨道': [
    { name: '近圆轨道', semiMajor: 120, eccentricity: 0.1, color: '#22c55e', speed: 0.4 },
    { name: '椭圆轨道', semiMajor: 120, eccentricity: 0.5, color: '#f97316', speed: 0.3 },
    { name: '高椭圆轨道', semiMajor: 120, eccentricity: 0.8, color: '#ef4444', speed: 0.2 },
  ],
  '转移轨道': [
    { name: '低轨道', semiMajor: 60, eccentricity: 0.02, color: '#3b82f6', speed: 0.5 },
    { name: '转移轨道', semiMajor: 100, eccentricity: 0.5, color: '#f97316', speed: 0.25 },
    { name: '高轨道', semiMajor: 160, eccentricity: 0.02, color: '#22c55e', speed: 0.2 },
  ],
}

export default function OrbitViewer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const [preset, setPreset] = useState('Kerbin系统')
  const [showLabels, setShowLabels] = useState(true)
  const [showTrails, setShowTrails] = useState(true)
  const animRef = useRef<number>(0)
  const timeRef = useRef(0)
  const trailsRef = useRef<Map<string, { x: number; y: number }[]>>(new Map())

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)
    const w = rect.width
    const h = rect.height
    const cx = w / 2
    const cy = h / 2

    // Clear
    ctx.fillStyle = theme === 'dark' ? '#0a0a0f' : '#f0f2f7'
    ctx.fillRect(0, 0, w, h)

    // Grid
    ctx.strokeStyle = theme === 'dark' ? 'rgba(99, 102, 241, 0.06)' : 'rgba(67, 56, 202, 0.06)'
    ctx.lineWidth = 1
    for (let x = 0; x < w; x += 30) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke()
    }
    for (let y = 0; y < h; y += 30) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke()
    }

    const orbits = presets[preset]
    if (!orbits) return

    timeRef.current += 0.008

    // Draw center body
    ctx.fillStyle = theme === 'dark' ? '#6366f1' : '#4338ca'
    ctx.beginPath()
    ctx.arc(cx, cy, 8, 0, Math.PI * 2)
    ctx.fill()
    if (showLabels) {
      ctx.fillStyle = theme === 'dark' ? '#8888a4' : '#374151'
      ctx.font = '11px Inter, sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(orbits[0].name, cx, cy - 14)
    }

    orbits.forEach((orbit, idx) => {
      if (idx === 0) return
      const a = orbit.semiMajor
      const e = orbit.eccentricity
      const b = a * Math.sqrt(1 - e * e)
      const c = a * e

      // Draw orbit path
      ctx.strokeStyle = orbit.color + '40'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.ellipse(cx - c, cy, a, b, 0, 0, Math.PI * 2)
      ctx.stroke()

      // Animate position
      const angle = timeRef.current * orbit.speed + idx * 1.5
      const r = a * (1 - e * e) / (1 + e * Math.cos(angle))
      const px = cx + r * Math.cos(angle) - c
      const py = cy + r * Math.sin(angle)

      // Trail
      if (showTrails) {
        if (!trailsRef.current.has(orbit.name)) {
          trailsRef.current.set(orbit.name, [])
        }
        const trail = trailsRef.current.get(orbit.name)!
        trail.push({ x: px, y: py })
        if (trail.length > 80) trail.shift()
        if (trail.length > 2) {
          ctx.strokeStyle = orbit.color + '30'
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(trail[0].x, trail[0].y)
          for (let i = 1; i < trail.length; i++) {
            ctx.lineTo(trail[i].x, trail[i].y)
          }
          ctx.stroke()
        }
      }

      // Body
      ctx.fillStyle = orbit.color
      ctx.beginPath()
      ctx.arc(px, py, 5, 0, Math.PI * 2)
      ctx.fill()

      // Glow
      const grd = ctx.createRadialGradient(px, py, 0, px, py, 15)
      grd.addColorStop(0, orbit.color + '40')
      grd.addColorStop(1, orbit.color + '00')
      ctx.fillStyle = grd
      ctx.beginPath()
      ctx.arc(px, py, 15, 0, Math.PI * 2)
      ctx.fill()

      if (showLabels) {
        ctx.fillStyle = orbit.color
        ctx.font = '11px Inter, sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(orbit.name, px, py - 12)
      }
    })

    animRef.current = requestAnimationFrame(draw)
  }, [preset, showLabels, showTrails, theme])

  useEffect(() => {
    trailsRef.current.clear()
    animRef.current = requestAnimationFrame(draw)
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current) }
  }, [draw])

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
      <div className="text-center space-y-2">
        <span className="text-5xl">🌐</span>
        <h1 className="text-3xl font-bold">轨道可视化</h1>
        <p className="text-muted-foreground">交互式轨道示意图</p>
      </div>

      <div className="glass rounded-2xl p-4 space-y-4">
        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex gap-2">
            {Object.keys(presets).map(name => (
              <button
                key={name}
                onClick={() => setPreset(name)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  preset === name
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
          <div className="flex gap-2 ml-auto">
            <button
              onClick={() => setShowLabels(!showLabels)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                showLabels ? 'bg-ksp-blue/20 text-ksp-blue' : 'bg-secondary text-muted-foreground'
              }`}
            >
              标签
            </button>
            <button
              onClick={() => setShowTrails(!showTrails)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                showTrails ? 'bg-ksp-green/20 text-ksp-green' : 'bg-secondary text-muted-foreground'
              }`}
            >
              轨迹
            </button>
          </div>
        </div>

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full rounded-xl"
          style={{ height: '400px', background: theme === 'dark' ? '#0a0a0f' : '#f0f2f7' }}
        />

        {/* Info */}
        <div className="grid grid-cols-3 gap-3 text-center text-xs text-muted-foreground">
          <div>
            <span className="inline-block w-2 h-2 rounded-full bg-primary mr-1 align-middle" />
            中心天体
          </div>
          <div>
            <span className="inline-block w-2 h-2 rounded-full bg-ksp-orange mr-1 align-middle" />
            椭圆轨道
          </div>
          <div>
            <span className="inline-block w-2 h-2 rounded-full bg-ksp-green mr-1 align-middle" />
            圆形轨道
          </div>
        </div>
      </div>
    </div>
  )
}
