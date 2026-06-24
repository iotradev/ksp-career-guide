import { useState, useMemo } from 'react'
import { glossary } from '../data/glossary'

const categories = ['全部', ...new Set(glossary.map(t => t.category))]

export default function Glossary() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('全部')

  const filtered = useMemo(() => {
    return glossary.filter(term => {
      const matchCategory = category === '全部' || term.category === category
      const matchSearch = !search ||
        term.term.toLowerCase().includes(search.toLowerCase()) ||
        term.termEn.toLowerCase().includes(search.toLowerCase()) ||
        term.definition.toLowerCase().includes(search.toLowerCase())
      return matchCategory && matchSearch
    })
  }, [search, category])

  const categoryColors: Record<string, string> = {
    '轨道力学': 'bg-ksp-blue/20 text-ksp-blue',
    '推进系统': 'bg-ksp-orange/20 text-ksp-orange',
    '任务规划': 'bg-ksp-green/20 text-ksp-green',
    '游戏机制': 'bg-ksp-purple/20 text-ksp-purple',
    '天体名称': 'bg-ksp-cyan/20 text-ksp-cyan',
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      <div className="text-center space-y-2">
        <span className="text-5xl">📖</span>
        <h1 className="text-3xl font-bold gradient-text">术语表</h1>
        <p className="text-muted-foreground">KSP 与真实航天术语对照</p>
      </div>

      {/* Search & Filter */}
      <div className="glass rounded-2xl p-5 space-y-4">
        <input
          type="text"
          placeholder="搜索术语..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                category === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">共 {filtered.length} 个术语</p>
      </div>

      {/* Terms */}
      <div className="space-y-3">
        {filtered.map(term => (
          <div key={term.id} id={term.id} className="glass rounded-xl p-5 scroll-mt-20">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-lg">{term.term}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${categoryColors[term.category] || 'bg-secondary text-muted-foreground'}`}>
                    {term.category}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-1">英文: {term.termEn}</p>
                <p className="text-foreground text-sm leading-relaxed">{term.definition}</p>
                {term.relatedTerms && term.relatedTerms.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    <span className="text-xs text-muted-foreground mr-1">相关:</span>
                    {term.relatedTerms.map(rt => (
                      <span key={rt} className="text-xs px-2 py-0.5 bg-secondary rounded-full text-secondary-foreground">
                        {rt}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
