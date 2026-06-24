import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'

interface ProgressState {
  [sectionId: string]: 'not-started' | 'in-progress' | 'completed'
}

interface ProgressContextType {
  progress: ProgressState
  setSectionProgress: (sectionId: string, status: 'not-started' | 'in-progress' | 'completed') => void
  getSectionProgress: (sectionId: string) => 'not-started' | 'in-progress' | 'completed'
  getChapterProgress: (chapterId: number, sectionCount: number) => number
  getTotalProgress: (totalSections: number) => number
}

const ProgressContext = createContext<ProgressContextType | null>(null)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<ProgressState>(() => {
    try {
      const saved = localStorage.getItem('ksp-progress')
      return saved ? JSON.parse(saved) : {}
    } catch {
      return {}
    }
  })

  useEffect(() => {
    localStorage.setItem('ksp-progress', JSON.stringify(progress))
  }, [progress])

  const setSectionProgress = (sectionId: string, status: 'not-started' | 'in-progress' | 'completed') => {
    setProgress(prev => ({ ...prev, [sectionId]: status }))
  }

  const getSectionProgress = (sectionId: string): 'not-started' | 'in-progress' | 'completed' => {
    return progress[sectionId] || 'not-started'
  }

  const getChapterProgress = (chapterId: number, sectionCount: number): number => {
    if (sectionCount === 0) return 0
    let completed = 0
    for (let i = 1; i <= sectionCount; i++) {
      if (progress[`${chapterId}-${i}`] === 'completed') completed++
    }
    return Math.round((completed / sectionCount) * 100)
  }

  const getTotalProgress = (totalSections: number): number => {
    if (totalSections === 0) return 0
    const completed = Object.values(progress).filter(s => s === 'completed').length
    return Math.round((completed / totalSections) * 100)
  }

  return (
    <ProgressContext.Provider value={{ progress, setSectionProgress, getSectionProgress, getChapterProgress, getTotalProgress }}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider')
  return ctx
}
