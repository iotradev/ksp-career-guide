import { useParams, Link } from 'react-router-dom'
import { chapters } from '../data/chapters'
import { useProgress } from '../context/ProgressContext'
import { useEffect } from 'react'
import type { JSX } from 'react'

export default function Section() {
  const { chapterId, sectionId } = useParams<{ chapterId: string; sectionId: string }>()
  const chapter = chapters.find(c => c.id === Number(chapterId))
  const section = chapter?.sections.find(s => s.id === sectionId)
  const { getSectionProgress, setSectionProgress } = useProgress()

  useEffect(() => {
    if (sectionId && getSectionProgress(sectionId) === 'not-started') {
      setSectionProgress(sectionId, 'in-progress')
    }
  }, [sectionId, getSectionProgress, setSectionProgress])

  if (!chapter || !section) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <span className="text-6xl">🔭</span>
          <h2 className="text-2xl font-bold mt-4">小节未找到</h2>
          <Link to="/" className="text-primary hover:underline mt-2 inline-block">返回首页</Link>
        </div>
      </div>
    )
  }

  const currentIdx = chapter.sections.findIndex(s => s.id === sectionId)
  const prevSection = currentIdx > 0 ? chapter.sections[currentIdx - 1] : null
  const nextSection = currentIdx < chapter.sections.length - 1 ? chapter.sections[currentIdx + 1] : null
  const status = getSectionProgress(sectionId!)

  const renderContent = (text: string) => {
    const lines = text.trim().split('\n')
    const elements: JSX.Element[] = []
    let inTable = false
    let tableRows: string[][] = []
    let inCodeBlock = false
    let codeLines: string[] = []

    const flushTable = () => {
      if (tableRows.length === 0) return
      const header = tableRows[0]
      const body = tableRows.slice(2)
      elements.push(
        <div key={`table-${elements.length}`} className="overflow-x-auto my-6 rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-secondary border-b-2 border-border">
                {header.map((cell, i) => (
                  <th key={i} className="text-left px-5 py-3 font-semibold text-foreground">
                    {cell.trim()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row, ri) => (
                <tr key={ri} className="border-b border-border/40 even:bg-muted/40 hover:bg-muted/60 transition-colors">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-5 py-2.5 text-foreground">
                      {renderInline(cell.trim())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
      tableRows = []
      inTable = false
    }

    const flushCodeBlock = () => {
      if (codeLines.length === 0) return
      elements.push(
        <pre key={`code-${elements.length}`} className="my-6 rounded-xl border border-border/60 bg-muted/50 p-5 overflow-x-auto">
          <code className="text-sm font-mono text-foreground">{codeLines.join('\n')}</code>
        </pre>
      )
      codeLines = []
      inCodeBlock = false
    }

    const renderInline = (text: string) => {
      const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/)
      return parts.map((part, j) => {
        if (part.startsWith('`') && part.endsWith('`')) {
          return <code key={j} className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">{part.slice(1, -1)}</code>
        }
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={j} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>
        }
        const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
        if (linkMatch) {
          return <a key={j} href={linkMatch[2]} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">{linkMatch[1]}</a>
        }
        return <span key={j}>{part}</span>
      })
    }

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      // Code block toggle
      if (line.trim().startsWith('```')) {
        if (inCodeBlock) {
          flushCodeBlock()
        } else {
          if (inTable) flushTable()
          inCodeBlock = true
        }
        continue
      }
      if (inCodeBlock) {
        codeLines.push(line)
        continue
      }

      // Table detection
      if (line.trim().startsWith('|')) {
        if (!inTable) inTable = true
        const cells = line.split('|').filter(c => c.trim() !== '')
        if (!cells.every(c => /^[-:]+$/.test(c.trim()))) {
          tableRows.push(cells)
        } else {
          tableRows.push(cells)
        }
        continue
      } else if (inTable) {
        flushTable()
      }

      // Headings
      if (line.startsWith('### ')) {
        elements.push(<h4 key={i} className="text-lg font-bold mt-6 mb-2 text-foreground">{renderInline(line.slice(4))}</h4>)
      } else if (line.startsWith('## ')) {
        elements.push(<h3 key={i} className="text-xl font-bold mt-8 mb-3 pl-3 border-l-4 border-primary text-foreground">{renderInline(line.slice(3))}</h3>)
      } else if (line.startsWith('# ')) {
        elements.push(<h2 key={i} className="text-2xl font-bold mt-8 mb-3 text-foreground">{renderInline(line.slice(2))}</h2>)
      } else if (line.startsWith('> ')) {
        elements.push(
          <blockquote key={i} className="my-3 pl-4 border-l-4 border-primary/50 text-muted-foreground italic bg-muted/30 py-2 pr-4 rounded-r-lg">
            {renderInline(line.slice(2))}
          </blockquote>
        )
      } else if (line.startsWith('**') && line.endsWith('**') && !line.slice(2, -2).includes('**')) {
        elements.push(<h3 key={i} className="text-xl font-bold mt-8 mb-3 pl-3 border-l-4 border-primary text-foreground">{line.slice(2, -2)}</h3>)
      } else if (/^\d+\.\s/.test(line)) {
        elements.push(
          <div key={i} className="flex gap-2.5 my-2 ml-4">
            <span className="text-primary font-mono text-sm font-bold mt-0.5 min-w-[1.5rem]">{line.match(/^\d+/)?.[0]}.</span>
            <span className="text-foreground leading-relaxed">{renderInline(line.replace(/^\d+\.\s*/, ''))}</span>
          </div>
        )
      } else if (line.startsWith('- ')) {
        elements.push(
          <div key={i} className="flex gap-2.5 my-2 ml-4">
            <span className="text-primary mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
            <span className="text-foreground leading-relaxed">{renderInline(line.slice(2))}</span>
          </div>
        )
      } else if (line.trim() === '') {
        elements.push(<div key={i} className="h-3" />)
      } else {
        elements.push(<p key={i} className="text-foreground my-2.5 leading-[1.85]">{renderInline(line)}</p>)
      }
    }
    if (inCodeBlock) flushCodeBlock()
    if (inTable) flushTable()
    return elements
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground transition-colors">首页</Link>
        <span className="text-border">/</span>
        <Link to={`/chapter/${chapter.id}`} className="hover:text-foreground transition-colors">第{chapter.id}章 {chapter.title}</Link>
        <span className="text-border">/</span>
        <span className="text-foreground font-medium">{section.title}</span>
      </nav>

      {/* Header */}
      <div className="space-y-3 pb-2">
        <div className="flex items-center gap-4">
          <span className="text-4xl">{chapter.icon}</span>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">第{chapter.id}章 · 小节 {currentIdx + 1}/{chapter.sections.length}</p>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{section.title}</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="glass rounded-2xl p-7 md:p-10 text-foreground">
        {renderContent(section.content)}
      </article>

      {/* Tips */}
      {section.tips && section.tips.length > 0 && (
        <div className="glass rounded-2xl p-7 border-l-4 border-ksp-cyan">
          <h3 className="font-semibold text-ksp-cyan mb-4 flex items-center gap-2 text-base">
            <span>💡</span> 小贴士
          </h3>
          <ul className="space-y-3 text-foreground">
            {section.tips.map((tip, i) => (
              <li key={i} className="text-sm leading-relaxed flex gap-2.5">
                <span className="text-ksp-cyan mt-1.5 w-1.5 h-1.5 rounded-full bg-ksp-cyan flex-shrink-0" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Key Points */}
      {section.keyPoints && section.keyPoints.length > 0 && (
        <div className="glass rounded-2xl p-7 border-l-4 border-ksp-green">
          <h3 className="font-semibold text-ksp-green mb-4 flex items-center gap-2 text-base">
            <span>🎯</span> 核心要点
          </h3>
          <ul className="space-y-3 text-foreground">
            {section.keyPoints.map((point, i) => (
              <li key={i} className="text-sm leading-relaxed flex gap-2.5">
                <span className="text-ksp-green mt-1.5 w-1.5 h-1.5 rounded-full bg-ksp-green flex-shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Warnings */}
      {section.warnings && section.warnings.length > 0 && (
        <div className="glass rounded-2xl p-7 border-l-4 border-ksp-red">
          <h3 className="font-semibold text-ksp-red mb-4 flex items-center gap-2 text-base">
            <span>⚠️</span> 注意事项
          </h3>
          <ul className="space-y-3 text-foreground">
            {section.warnings.map((warn, i) => (
              <li key={i} className="text-sm leading-relaxed flex gap-2.5">
                <span className="text-ksp-red mt-1.5 w-1.5 h-1.5 rounded-full bg-ksp-red flex-shrink-0" />
                {warn}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Progress toggle */}
      <div className="flex justify-center gap-3">
        <button
          onClick={() => setSectionProgress(sectionId!, status === 'completed' ? 'in-progress' : 'completed')}
          className={`px-6 py-2.5 rounded-xl font-medium transition-all ${
            status === 'completed'
              ? 'bg-ksp-green/20 text-ksp-green border border-ksp-green/30'
              : 'bg-primary text-primary-foreground hover:opacity-90'
          }`}
        >
          {status === 'completed' ? '✓ 已完成 · 点击重置' : '标记为已完成'}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-2 pb-8">
        {prevSection ? (
          <Link
            to={`/chapter/${chapter.id}/${prevSection.id}`}
            className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors text-sm"
          >
            ← {prevSection.title}
          </Link>
        ) : <div />}
        <Link
          to={`/chapter/${chapter.id}`}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          返回章节列表
        </Link>
        {nextSection ? (
          <Link
            to={`/chapter/${chapter.id}/${nextSection.id}`}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity text-sm"
          >
            {nextSection.title} →
          </Link>
        ) : chapter.id < chapters.length ? (
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
