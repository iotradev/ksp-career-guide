import { useState } from 'react'
import { GlassCard, Input, PageHeader } from '../components/ui'

export default function TransferCalculator() {
  const [r1, setR1] = useState(700) // km, Kerbin orbit
  const [r2, setR2] = useState(12000) // km, target orbit
  const [mu, setMu] = useState(3531.6) // km³/s², Kerbin

  const transferDv = () => {
    if (r1 <= 0 || r2 <= 0 || r1 >= r2) return { dv1: 0, dv2: 0, total: 0, time: 0 }
    const a = (r1 + r2) / 2
    const v1 = Math.sqrt(mu / r1)
    const v2 = Math.sqrt(mu / r2)
    const vt1 = Math.sqrt(mu * (2 / r1 - 1 / a))
    const vt2 = Math.sqrt(mu * (2 / r2 - 1 / a))
    const dv1 = Math.abs(vt1 - v1)
    const dv2 = Math.abs(v2 - vt2)
    const T = 2 * Math.PI * Math.sqrt(Math.pow(a, 3) / mu)
    const time = T / 2
    return { dv1: dv1 * 1000, dv2: dv2 * 1000, total: (dv1 + dv2) * 1000, time }
  }

  const result = transferDv()

  const presets = [
    { name: 'Kerbin → Mun', r1: 700, r2: 12000, mu: 3531.6 },
    { name: 'Kerbin → Minmus', r1: 700, r2: 47000, mu: 3531.6 },
    { name: '低轨道 → 高轨道', r1: 700, r2: 2000, mu: 3531.6 },
    { name: 'Mun轨道 → Mun高轨道', r1: 200, r2: 1000, mu: 65.14 },
    { name: 'Kerbin → Duna', r1: 13599840, r2: 20726160, mu: 1172332800 },
    { name: 'Kerbin → Jool', r1: 13599840, r2: 68773560, mu: 1172332800 },
  ]

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
      <PageHeader
        icon="🔄"
        title="霍曼转移计算器"
        description="计算最省Δv的圆形轨道间转移参数"
      />

      <GlassCard>
        <div className="space-y-6">
          <div className="text-center text-sm text-muted-foreground bg-secondary/50 rounded-lg p-3 font-mono">
            最省Δv的轨道转移方式
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="初始轨道半径 r₁ (km)"
              type="number"
              value={r1}
              onChange={e => setR1(Number(e.target.value))}
            />
            <Input
              label="目标轨道半径 r₂ (km)"
              type="number"
              value={r2}
              onChange={e => setR2(Number(e.target.value))}
            />
            <Input
              label="引力参数 μ (km³/s²)"
              type="number"
              value={mu}
              onChange={e => setMu(Number(e.target.value))}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass rounded-xl p-5 text-center">
              <p className="text-sm text-muted-foreground mb-1">第一次点火 Δv₁</p>
              <p className="text-2xl font-bold text-ksp-blue font-mono">{result.dv1.toFixed(1)} <span className="text-sm">m/s</span></p>
              <p className="text-xs text-muted-foreground mt-1">初始轨道 → 转移轨道</p>
            </div>
            <div className="glass rounded-xl p-5 text-center">
              <p className="text-sm text-muted-foreground mb-1">第二次点火 Δv₂</p>
              <p className="text-2xl font-bold text-ksp-green font-mono">{result.dv2.toFixed(1)} <span className="text-sm">m/s</span></p>
              <p className="text-xs text-muted-foreground mt-1">转移轨道 → 目标轨道</p>
            </div>
          </div>

          <div className="glass rounded-xl p-6 text-center animate-pulse-glow">
            <p className="text-sm text-muted-foreground mb-1">总 Δv</p>
            <p className="text-4xl font-bold gradient-text font-mono">
              {result.total.toFixed(0)} <span className="text-lg">m/s</span>
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              转移时间: {(result.time / 3600).toFixed(1)} 小时
            </p>
          </div>

          {/* Presets */}
          <div>
            <h3 className="text-sm font-medium mb-3">常用转移预设</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {presets.map(p => (
                <button
                  key={p.name}
                  onClick={() => { setR1(p.r1); setR2(p.r2); setMu(p.mu) }}
                  className="px-3 py-2 rounded-lg text-xs font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors text-left"
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}
