import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-20 text-center space-y-8">
      <div className="text-8xl animate-float">🛸</div>
      <h1 className="text-4xl font-bold gradient-text">迷失在太空</h1>
      <p className="text-lg text-muted-foreground">
        你似乎偏离了轨道，这个页面不存在。<br />
        检查你的航向参数，或者返回已知的星系。
      </p>
      <div className="flex justify-center gap-4 pt-4">
        <Link
          to="/"
          className="px-7 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-all hover:scale-105 active:scale-95"
        >
          返回首页
        </Link>
        <Link
          to="/tools"
          className="px-7 py-3 bg-secondary text-secondary-foreground rounded-xl font-medium hover:bg-secondary/80 transition-all hover:scale-105 active:scale-95"
        >
          科学工具
        </Link>
      </div>
    </div>
  )
}
