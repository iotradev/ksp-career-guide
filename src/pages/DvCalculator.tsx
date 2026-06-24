import { useState } from 'react'
import { GlassCard, Input, StatCard, PageHeader } from '../components/ui'

export default function DvCalculator() {
  const [isp, setIsp] = useState(320)
  const [wetMass, setWetMass] = useState(20)
  const [dryMass, setDryMass] = useState(5)

  const g0 = 9.81
  const isValid = wetMass > 0 && dryMass > 0 && wetMass > dryMass
  const dv = isValid ? isp * g0 * Math.log(wetMass / dryMass) : 0
  const massRatio = dryMass > 0 ? wetMass / dryMass : 0
  const fuelMass = wetMass - dryMass
  const fuelFraction = wetMass > 0 ? ((fuelMass / wetMass) * 100) : 0

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
      <PageHeader
        icon="📊"
        title="Δv 计算器"
        description="基于火箭方程计算速度增量"
      />

      <GlassCard>
        <div className="space-y-6">
          <div className="text-center text-sm text-muted-foreground bg-secondary/50 rounded-lg p-3 font-mono">
            Δv = Isp × g₀ × ln(m₀ / mf)
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="比冲 Isp (秒)"
              description="发动机效率指标"
              type="number"
              value={isp}
              onChange={e => setIsp(Number(e.target.value))}
            />
            <Input
              label="湿质量 m₀ (吨)"
              description="满燃料总质量"
              type="number"
              value={wetMass}
              onChange={e => setWetMass(Number(e.target.value))}
            />
            <Input
              label="干质量 mf (吨)"
              description="空燃料总质量"
              type="number"
              value={dryMass}
              onChange={e => setDryMass(Number(e.target.value))}
            />
          </div>

          {/* Result */}
          <div className="glass rounded-xl p-6 text-center animate-pulse-glow">
            <p className="text-sm text-muted-foreground mb-1">速度增量 Δv</p>
            {isValid ? (
              <p className="text-4xl font-bold gradient-text font-mono">
                {dv.toFixed(0)} <span className="text-lg">m/s</span>
              </p>
            ) : (
              <p className="text-lg text-ksp-red font-medium">
                请输入有效参数：湿质量 &gt; 干质量 &gt; 0
              </p>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard label="质量比" value={massRatio.toFixed(2)} />
            <StatCard label="燃料质量" value={fuelMass.toFixed(1)} unit="吨" />
            <StatCard label="燃料占比" value={fuelFraction.toFixed(1)} unit="%" />
            <StatCard label="有效载荷比" value={(100 - fuelFraction).toFixed(1)} unit="%" />
          </div>

          {/* Presets */}
          <div>
            <h3 className="text-sm font-medium mb-3">常用发动机预设</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { name: 'Swivel', isp: 320 },
                { name: 'Reliant', isp: 310 },
                { name: 'Terrier', isp: 345 },
                { name: 'Poodle', isp: 350 },
                { name: 'Skipper', isp: 320 },
                { name: 'Mainsail', isp: 310 },
                { name: 'Vector', isp: 315 },
                { name: 'LV-N Nerv', isp: 800 },
              ].map(engine => (
                <button
                  key={engine.name}
                  onClick={() => setIsp(engine.isp)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    isp === engine.isp
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {engine.name} ({engine.isp}s)
                </button>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}
