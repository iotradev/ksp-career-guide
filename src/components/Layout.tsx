import { useState, useRef, useEffect } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { chapters } from '../data/chapters'
import { cn } from '../lib/utils'

const navItems = [
  { path: '/', label: '首页', icon: '🏠' },
  { path: '/tools', label: '科学工具', icon: '🛠️' },
  { path: '/glossary', label: '术语表', icon: '📖' },
  { path: '/search', label: '搜索', icon: '🔍' },
]

export default function Layout() {
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    const onScroll = () => setShowBackToTop(el.scrollTop > 300)
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile menu button */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden glass rounded-lg p-2 hover-lift"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <span className="text-xl">{mobileMenuOpen ? '✕' : '☰'}</span>
      </button>

      {/* Sidebar */}
      <aside className={cn(
        'fixed md:static inset-y-0 left-0 z-40 w-72 bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 ease-in-out',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:w-16',
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      )}>
        {/* Logo */}
        <div className="p-4 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-3 group" onClick={() => setMobileMenuOpen(false)}>
            <span className="text-3xl group-hover:animate-float">🚀</span>
            {sidebarOpen && (
              <div>
                <h1 className="text-lg font-bold gradient-text">KSP 生涯指南</h1>
                <p className="text-xs text-muted-foreground">交互式教程</p>
              </div>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200',
                location.pathname === item.path
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium shadow-sm'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
              )}
            >
              <span className="text-lg">{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}

          {sidebarOpen && <div className="pt-3 pb-1 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">教程章节</div>}

          {chapters.map(chapter => {
            const isActive = location.pathname.startsWith(`/chapter/${chapter.id}`)
            return (
              <Link
                key={chapter.id}
                to={`/chapter/${chapter.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200',
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium shadow-sm'
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                )}
              >
                <span className="text-lg">{chapter.icon}</span>
                {sidebarOpen && (
                  <span className="truncate">{chapter.title}</span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Sidebar toggle (desktop) */}
        <div className="hidden md:block p-3 border-t border-sidebar-border">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-sidebar-accent/50 transition-colors"
          >
            <span className="transition-transform duration-300" style={{ transform: sidebarOpen ? 'rotate(0deg)' : 'rotate(180deg)' }}>◀</span>
            {sidebarOpen && <span>收起侧栏</span>}
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden animate-fade-in transition-all duration-300"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="glass border-b border-border px-6 py-3 flex items-center justify-between">
          <div className="pl-12 md:pl-0">
            <h2 className="text-sm font-medium text-foreground">
              {chapters.find(c => location.pathname.startsWith(`/chapter/${c.id}`))?.title ||
               navItems.find(n => location.pathname === n.path)?.label ||
               'KSP 生涯模式教程'}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-secondary transition-all duration-200 text-lg hover:scale-110 active:scale-95"
              title={theme === 'dark' ? '切换亮色模式' : '切换暗色模式'}
            >
              <span className="inline-block transition-transform duration-500" style={{ transform: theme === 'dark' ? 'rotate(0deg)' : 'rotate(360deg)' }}>
                {theme === 'dark' ? '☀️' : '🌙'}
              </span>
            </button>
          </div>
        </header>

        {/* Page content with transition */}
        <div ref={contentRef} className="flex-1 overflow-y-auto ksp-grid-bg">
          <div key={location.pathname} className="page-enter">
            <Outlet />
          </div>
        </div>

        {/* Back to top */}
        {showBackToTop && (
          <button
            onClick={() => contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-50 w-11 h-11 rounded-full glass border border-border/60 flex items-center justify-center text-primary text-lg shadow-lg hover-lift animate-fade-in"
            aria-label="回到顶部"
          >
            ↑
          </button>
        )}
      </main>
    </div>
  )
}
