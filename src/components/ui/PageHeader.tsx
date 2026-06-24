import { cn } from '../../lib/utils'

interface PageHeaderProps {
  icon: string
  title: string
  description?: string
  className?: string
}

export default function PageHeader({ icon, title, description, className }: PageHeaderProps) {
  return (
    <div className={cn('text-center space-y-2', className)}>
      <span className="text-5xl">{icon}</span>
      <h1 className="text-3xl font-bold gradient-text">{title}</h1>
      {description && (
        <p className="text-muted-foreground">{description}</p>
      )}
    </div>
  )
}
