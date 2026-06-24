import { cn } from '../../lib/utils'

interface StatCardProps {
  label: string
  value: string | number
  unit?: string
  className?: string
}

export default function StatCard({ label, value, unit, className }: StatCardProps) {
  return (
    <div className={cn('bg-secondary/50 rounded-lg p-3 text-center', className)}>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-lg font-bold font-mono">
        {value}
        {unit && <span className="text-xs text-muted-foreground ml-1">{unit}</span>}
      </p>
    </div>
  )
}
