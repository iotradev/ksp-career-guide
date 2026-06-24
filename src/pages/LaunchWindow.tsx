import { useState } from 'react'
import { GlassCard, PageHeader } from '../components/ui'

interface PlanetData {
  name: string
  nameCn: string
  orbitalPeriod: number // days
  semiMajorAxis: number // AU relative to Kerbin
  transferDv: number // m/s from LKO
  color: string
}

const planets: PlanetData[] = [
  { name: 'Moho', nameCn: 'Moho', orbitalPeriod: 100, semiMajorAxis: 0.4, transferDv: 5000, color: 'text-ksp-orange' },
  { name: 'Eve', nameCn: 'Eve', orbitalPeriod: 216, semiMajorAxis: 0.7, transferDv: 1200, color: 'text-ksp-purple' },
  { name: 'Duna', nameCn: 'Duna', orbitalPeriod: 687, semiMajorAxis: 1.5, transferDv: 1300, color: 'text-ksp-red' },
  { name: 'Dres', nameCn: 'Dres', orbitalPeriod: 2210, semiMajorAxis: 2.9, transferDv: 2000, color: 'text-muted-foreground' },
  { name: 'Jool', nameCn: 'Jool', orbitalPeriod: 4356, semiMajorAxis: 5.2, transferDv: 2700, color: 'text-ksp-green' },
  { name: 'Eeloo', nameCn: 'Eeloo', orbitalPeriod: 8703, semiMajorAxis: 7.8, transferDv: 3000, color: 'text-ksp-cyan' },
]

export default function LaunchWindow() {
  const [target, setTarget] = useState(2) // Duna by default
  const planet = planets[target]

  const transferTime = Math.pow((1 + planet.semiMajorAxis) / 2, 1.5) * planet.orbitalPeriod / 2

  const phaseAngle = 180 - (transferTime / planet.orbitalPeriod) * 360

  const windowInterval = Math.abs(planet.orbitalPeriod * 365.25 / (planet.orbitalPeriod - 365.25))

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
      <PageHeader
        icon="🪟"
        title="发射窗口计算器"
        description="计算行星际转移的相位角和窗口时机"
      />

      <GlassCard>
        <div className="space-y-6">
          {/* Planet selector */}
          <div>
            <h3 className="text-sm font-medium mb-3">选择目标行星</h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {planets.map((p, i) => (
                <button
                  key={p.name}
                  onClick={() => setTarget(i)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    target === i
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {p.nameCn}
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass rounded-xl p-5 text-center">
              <p className="text-sm text-muted-foreground mb-1">相位角</p>
              <p className={`text-3xl font-bold font-mono ${planet.color}`}>
                {phaseAngle.toFixed(1)}°
              </p>
              <p className="text-xs text-muted-foreground mt-1">目标应在Kerbin前方此角度</p>
            </div>
            <div className="glass rounded-xl p-5 text-center">
              <p className="text-sm text-muted-foreground mb-1">转移时间</p>
              <p className="text-3xl font-bold font-mono text-ksp-yellow">
                {transferTime.toFixed(0)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">天（游戏时间）</p>
            </div>
            <div className="glass rounded-xl p-5 text-center">
              <p className="text-sm text-muted-foreground mb-1">所需 Δv</p>
              <p className="text-3xl font-bold font-mono text-primary">
                {planet.transferDv.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground mt-1">m/s（从低轨道）</p>
            </div>
          </div>

          <div className="glass rounded-xl p-5 text-center">
            <p className="text-sm text-muted-foreground mb-1">窗口间隔</p>
            <p className="text-2xl font-bold font-mono text-ksp-purple">
              约 {(windowInterval / 365.25).toFixed(1)} 年
            </p>
            <p className="text-xs text-muted-foreground mt-1">（约 {windowInterval.toFixed(0)} 天）</p>
          </div>

          {/* Explanation */}
          <div className="text-sm text-muted-foreground space-y-2 bg-secondary/30 rounded-lg p-4">
            <p><strong className="text-foreground">如何使用：</strong></p>
            <p>1. 在地图视图中观察 {planet.nameCn} 相对于 Kerbin 的位置</p>
            <p>2. 当 {planet.nameCn} 在 Kerbin 轨道前方 {phaseAngle.toFixed(0)}° 时，发射窗口开启</p>
            <p>3. 从 Kerbin 低轨道(70-100km)向顺行方向点火，消耗约 {planet.transferDv.toLocaleString()} m/s Δv</p>
            <p>4. 转移时间约 {transferTime.toFixed(0)} 天，提前规划好燃料和生命维持</p>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}
