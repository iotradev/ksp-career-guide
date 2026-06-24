import { Link } from 'react-router-dom'
import { GlassCard, PageHeader } from '../components/ui'

const tools = [
  {
    path: '/tools/dv-calculator',
    icon: '📊',
    title: 'Δv 计算器',
    description: '根据发动机参数、燃料量和载荷质量计算火箭的速度增量(Δv)。',
    color: 'border-ksp-blue/30 hover:border-ksp-blue/60'
  },
  {
    path: '/tools/transfer',
    icon: '🔄',
    title: '霍曼转移计算器',
    description: '计算从一个圆形轨道转移到另一个圆形轨道所需的Δv和转移时间。',
    color: 'border-ksp-green/30 hover:border-ksp-green/60'
  },
  {
    path: '/tools/launch-window',
    icon: '🪟',
    title: '发射窗口计算器',
    description: '计算行星际转移的相位角和发射窗口时机。',
    color: 'border-ksp-purple/30 hover:border-ksp-purple/60'
  },
  {
    path: '/tools/orbit-viewer',
    icon: '🌐',
    title: '轨道可视化',
    description: '交互式Canvas绘制的轨道示意图，理解椭圆轨道、转移轨道等概念。',
    color: 'border-ksp-orange/30 hover:border-ksp-orange/60'
  }
]

export default function Tools() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      <PageHeader
        icon="🛠️"
        title="科学工具箱"
        description="KSP任务规划实用计算工具"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {tools.map(tool => (
          <Link
            key={tool.path}
            to={tool.path}
            className={`glass rounded-2xl p-6 hover:scale-[1.02] transition-all group border ${tool.color}`}
          >
            <span className="text-4xl">{tool.icon}</span>
            <h2 className="text-xl font-semibold mt-3 group-hover:text-primary transition-colors">{tool.title}</h2>
            <p className="text-sm text-muted-foreground mt-2">{tool.description}</p>
          </Link>
        ))}
      </div>

      {/* Reference section */}
      <GlassCard>
        <div className="space-y-4">
          <h2 className="text-xl font-bold">📐 常用Δv参考</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground mb-2">从Kerbin低轨道出发</h3>
              <div className="space-y-1 text-sm">
                {[
                  ['Mun 转移', '860 m/s'],
                  ['Minmus 转移', '1,100 m/s'],
                  ['Duna 转移', '1,300 m/s'],
                  ['Eve 转移', '1,200 m/s'],
                  ['Jool 转移', '2,700 m/s'],
                ].map(([name, dv]) => (
                  <div key={name} className="flex justify-between py-1 border-b border-border/30">
                    <span>{name}</span>
                    <span className="text-primary font-mono">{dv}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground mb-2">发射到轨道</h3>
              <div className="space-y-1 text-sm">
                {[
                  ['Kerbin 低轨道', '3,400 m/s'],
                  ['Kerbin 高轨道', '3,800 m/s'],
                  ['逃逸轨道', '4,200 m/s'],
                  ['Mun 轨道', '5,800 m/s'],
                  ['Minmus 轨道', '5,600 m/s'],
                ].map(([name, dv]) => (
                  <div key={name} className="flex justify-between py-1 border-b border-border/30">
                    <span>{name}</span>
                    <span className="text-primary font-mono">{dv}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}
