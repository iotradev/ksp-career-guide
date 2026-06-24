import { Link } from 'react-router-dom'
import { chapters } from '../data/chapters'
import { useProgress } from '../context/ProgressContext'

const totalSections = chapters.reduce((sum, ch) => sum + ch.sections.length, 0)

export default function Home() {
  const { getChapterProgress, getTotalProgress } = useProgress()
  const totalPct = getTotalProgress(totalSections)

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-12">
      {/* Hero */}
      <section className="text-center space-y-5 py-10 relative">
        {/* Decorative orbit ring */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-64 h-64 rounded-full border border-primary/30 animate-orbit" />
        </div>

        <div className="text-7xl mb-2 animate-float relative z-10">🚀</div>
        <h1 className="text-4xl md:text-5xl font-bold gradient-text animate-fade-in">
          KSP 生涯模式教程
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.15s' }}>
          从发射台到星际探索的完整学习路径。<br className="hidden md:block" />
          涵盖火箭设计、轨道力学、行星际旅行等核心知识。
        </p>
        <div className="flex justify-center gap-4 pt-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <Link
            to="/chapter/1"
            className="px-7 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-all hover:scale-105 active:scale-95"
          >
            开始学习
          </Link>
          <Link
            to="/tools"
            className="px-7 py-3 bg-secondary text-secondary-foreground rounded-xl font-medium hover:bg-secondary/80 transition-all hover:scale-105 active:scale-95"
          >
            科学工具
          </Link>
        </div>
      </section>

      {/* Progress */}
      <section className="glass rounded-2xl p-6 hover-glow animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">学习进度</h2>
          <span className="text-2xl font-bold text-primary tabular-nums">{totalPct}%</span>
        </div>
        <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-ksp-purple rounded-full transition-all duration-700 ease-out progress-bar-animated"
            style={{ width: `${totalPct}%` }}
          />
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          已完成 {Math.round(totalSections * totalPct / 100)} / {totalSections} 个小节
        </p>
      </section>

      {/* Chapter cards */}
      <section>
        <h2 className="text-2xl font-bold mb-6">教程章节</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
          {chapters.map(chapter => {
            const pct = getChapterProgress(chapter.id, chapter.sections.length)
            return (
              <Link
                key={chapter.id}
                to={`/chapter/${chapter.id}`}
                className="glass rounded-xl p-5 hover-lift hover-glow group block"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl group-hover:animate-float">{chapter.icon}</span>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    pct === 100 ? 'bg-ksp-green/20 text-ksp-green' :
                    pct > 0 ? 'bg-ksp-yellow/20 text-ksp-yellow' :
                    'bg-secondary text-muted-foreground'
                  }`}>
                    {pct === 100 ? '已完成' : pct > 0 ? `${pct}%` : '未开始'}
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                  第{chapter.id}章 · {chapter.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{chapter.description}</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{chapter.sections.length} 个小节</span>
                  <span>·</span>
                  <span>约 {chapter.sections.length * 5} 分钟</span>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Quick links */}
      <section>
        <h2 className="text-2xl font-bold mb-6">快速工具</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
          {[
            { path: '/tools/dv-calculator', icon: '📊', title: 'Δv 计算器', desc: '计算火箭速度增量' },
            { path: '/tools/transfer', icon: '🔄', title: '转移轨道', desc: '计算霍曼转移参数' },
            { path: '/tools/launch-window', icon: '🪟', title: '发射窗口', desc: '行星际窗口计算' },
            { path: '/tools/orbit-viewer', icon: '🌐', title: '轨道可视化', desc: '交互式轨道图示' },
          ].map(tool => (
            <Link
              key={tool.path}
              to={tool.path}
              className="glass rounded-xl p-4 hover-lift hover-glow group block"
            >
              <span className="text-2xl group-hover:animate-float inline-block">{tool.icon}</span>
              <h3 className="font-medium mt-2 group-hover:text-primary transition-colors">{tool.title}</h3>
              <p className="text-xs text-muted-foreground">{tool.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
