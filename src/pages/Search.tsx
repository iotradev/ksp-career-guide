import { useState, useMemo, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { chapters } from '../data/chapters'
import { glossary } from '../data/glossary'

interface SearchResult {
  type: 'chapter' | 'section' | 'glossary'
  title: string
  subtitle: string
  path: string
  matchedText: string
}

export default function Search() {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === '/' || (e.ctrlKey && e.key === 'k')) && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const results = useMemo<SearchResult[]>(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()

    const found: SearchResult[] = []

    chapters.forEach(chapter => {
      if (chapter.title.toLowerCase().includes(q) || chapter.description.toLowerCase().includes(q)) {
        found.push({
          type: 'chapter',
          title: chapter.title,
          subtitle: `第${chapter.id}章`,
          path: `/chapter/${chapter.id}`,
          matchedText: chapter.description
        })
      }
      chapter.sections.forEach(section => {
        const content = section.content.toLowerCase()
        if (section.title.toLowerCase().includes(q) || content.includes(q)) {
          const idx = content.indexOf(q)
          const start = Math.max(0, idx - 40)
          const end = Math.min(content.length, idx + q.length + 60)
          const snippet = (start > 0 ? '...' : '') + section.content.slice(start, end).replace(/\*\*/g, '') + (end < content.length ? '...' : '')

          found.push({
            type: 'section',
            title: section.title,
            subtitle: `第${chapter.id}章 · ${chapter.title}`,
            path: `/chapter/${chapter.id}/${section.id}`,
            matchedText: snippet
          })
        }
      })
    })

    glossary.forEach(term => {
      if (term.term.toLowerCase().includes(q) || term.termEn.toLowerCase().includes(q) || term.definition.toLowerCase().includes(q)) {
        found.push({
          type: 'glossary',
          title: term.term,
          subtitle: term.termEn,
          path: `/glossary#${term.id}`,
          matchedText: term.definition.slice(0, 100) + '...'
        })
      }
    })

    return found
  }, [query])

  const typeLabels: Record<string, { label: string; color: string }> = {
    chapter: { label: '章节', color: 'bg-ksp-blue/20 text-ksp-blue' },
    section: { label: '小节', color: 'bg-ksp-green/20 text-ksp-green' },
    glossary: { label: '术语', color: 'bg-ksp-purple/20 text-ksp-purple' },
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
      <div className="text-center space-y-2">
        <span className="text-5xl">🔍</span>
        <h1 className="text-3xl font-bold">搜索</h1>
        <p className="text-muted-foreground">搜索教程内容、术语和科学概念</p>
      </div>

      <div className="glass rounded-2xl p-5">
        <input
          ref={inputRef}
          type="text"
          placeholder="输入关键词搜索..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          autoFocus
          className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <p className="text-xs text-muted-foreground mt-2 text-center">按 <kbd className="px-1.5 py-0.5 rounded bg-secondary border border-border text-[10px] font-mono">/</kbd> 或 <kbd className="px-1.5 py-0.5 rounded bg-secondary border border-border text-[10px] font-mono">Ctrl+K</kbd> 快速搜索</p>
      </div>

      {query.trim() && (
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
            找到 {results.length} 个结果
          </p>
        </div>
      )}

      <div className="space-y-3">
        {results.map((result, idx) => (
          <Link
            key={idx}
            to={result.path}
            className="glass rounded-xl p-5 block hover:scale-[1.01] transition-transform group"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs px-2 py-0.5 rounded-full ${typeLabels[result.type].color}`}>
                {typeLabels[result.type].label}
              </span>
              <h3 className="font-medium group-hover:text-primary transition-colors">{result.title}</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-1">{result.subtitle}</p>
            <p className="text-sm text-foreground line-clamp-2">{result.matchedText}</p>
          </Link>
        ))}

        {query.trim() && results.length === 0 && (
          <div className="text-center py-12">
            <span className="text-5xl">🔭</span>
            <p className="text-muted-foreground mt-4">没有找到相关结果</p>
            <p className="text-sm text-muted-foreground">试试其他关键词</p>
          </div>
        )}

        {!query.trim() && (
          <div className="text-center py-12">
            <span className="text-5xl">🛰️</span>
            <p className="text-muted-foreground mt-4">输入关键词开始搜索</p>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {['Δv', '轨道', 'Mun', '发射窗口', '引力辅助', '对接'].map(hint => (
                <button
                  key={hint}
                  onClick={() => setQuery(hint)}
                  className="px-3 py-1.5 rounded-lg text-xs bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                >
                  {hint}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
