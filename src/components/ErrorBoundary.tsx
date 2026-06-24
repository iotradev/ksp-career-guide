import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center space-y-6 max-w-md px-6">
            <span className="text-7xl">💥</span>
            <h1 className="text-3xl font-bold gradient-text">系统异常</h1>
            <p className="text-muted-foreground">
              你的飞船遇到了未知异常，系统已自动记录错误日志。
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => this.setState({ hasError: false })}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-all"
              >
                重试
              </button>
              <Link
                to="/"
                className="px-6 py-3 bg-secondary text-secondary-foreground rounded-xl font-medium hover:bg-secondary/80 transition-all"
              >
                返回首页
              </Link>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
