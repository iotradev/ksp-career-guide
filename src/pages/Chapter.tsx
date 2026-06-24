import { useParams, Link } from 'react-router-dom'
import { chapters } from '../data/chapters'
import { useProgress } from '../context/ProgressContext'

export default function Chapter() {
  const { id } = useParams<{ id: string }>()
  const chapter = chapters.find(c => c.id === Number(id))
  const { getSectionProgress, getChapterProgress } = useProgress()

  if (!chapter) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <span className="text-6xl">🔭</span>
          <h2 className="text-2xl font-bold mt-4">章节未找到</h2>
          <Link to="/" className="text-primary hover:underline mt-2 inline-block">返回首页</Link>
        </div>
      </div>
    )
  }

  const pct = getChapterProgress(chapter.id, chapter.sections.length)
  const colorMap: Record<string, string> = {
    'ksp-orange': 'from-ksp-orange/20 to-ksp-orange/5 border-ksp-orange/30',
    'ksp-blue': 'from-ksp-blue/20 to-ksp-blue/5 border-ksp-blue/30',
    'ksp-green': 'from-ksp-green/20 to-ksp-green/5 border-ksp-green/30',
    'ksp-yellow': 'from-ksp-yellow/20 to-ksp-yellow/5 border-ksp-yellow/30',
    'ksp-purple': 'from-ksp-purple/20 to-ksp-purple/5 border-ksp-purple/30',
    'ksp-cyan': 'from-ksp-cyan/20 to-ksp-cyan/5 border-ksp-cyan/30',
    'ksp-pink': 'from-ksp-pink/20 to-ksp-pink/5 border-ksp-pink/30',
    'ksp-red': 'from-ksp-red/20 to-ksp-red/5 border-ksp-red/30',
  }
  const badgeColorMap: Record<string, string> = {
    'ksp-orange': 'bg-ksp-orange/20 text-ksp-orange',
    'ksp-blue': 'bg-ksp-blue/20 text-ksp-blue',
    'ksp-green': 'bg-ksp-green/20 text-ksp-green',
    'ksp-yellow': 'bg-ksp-yellow/20 text-ksp-yellow',
    'ksp-purple': 'bg-ksp-purple/20 text-ksp-purple',
    'ksp-cyan': 'bg-ksp-cyan/20 text-ksp-cyan',
    'ksp-pink': 'bg-ksp-pink/20 text-ksp-pink',
    'ksp-red': 'bg-ksp-red/20 text-ksp-red',
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      {/* Chapter header */}
      <div className={`rounded-2xl p-8 bg-gradient-to-br border ${colorMap[chapter.color] || colorMap['ksp-blue']} animate-slide-up`}>
        <div className="flex items-start justify-between">
          <div>
            <span className="text-5xl">{chapter.icon}</span>
            <h1 className="text-3xl font-bold mt-4">第{chapter.id}章 · {chapter.title}</h1>
            <p className="text-muted-foreground mt-2">{chapter.description}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-primary">{pct}%</div>
            <div className="text-xs text-muted-foreground">完成度</div>
          </div>
        </div>
        <div className="mt-4 w-full h-2 bg-secondary/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Sections list */}
      <div className="space-y-3 stagger-children">
        {chapter.sections.map((section, idx) => {
          const status = getSectionProgress(section.id)
          return (
            <Link
              key={section.id}
              to={`/chapter/${chapter.id}/${section.id}`}
              className="glass rounded-xl p-5 flex items-center gap-4 hover-lift hover-glow group block"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold ${
                status === 'completed' ? 'bg-ksp-green/20 text-ksp-green' :
                status === 'in-progress' ? 'bg-ksp-yellow/20 text-ksp-yellow' :
                'bg-secondary text-muted-foreground'
              }`}>
                {status === 'completed' ? '✓' : idx + 1}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium group-hover:text-primary transition-colors">{section.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
                  {section.content.split('\n')[0].replace(/\*\*/g, '').slice(0, 80)}...
                </p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${badgeColorMap[chapter.color] || 'bg-secondary text-muted-foreground'}`}>
                {status === 'completed' ? '已完成' : status === 'in-progress' ? '进行中' : '开始'}
              </span>
            </Link>
          )
        })}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        {chapter.id > 1 ? (
          <Link
            to={`/chapter/${chapter.id - 1}`}
            className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors text-sm"
          >
            ← 上一章
          </Link>
        ) : <div />}
        {chapter.id < chapters.length ? (
          <Link
            to={`/chapter/${chapter.id + 1}`}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity text-sm"
          >
            下一章 →
          </Link>
        ) : <div />}
      </div>
    </div>
  )
}
