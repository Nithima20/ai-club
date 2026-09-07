import type { LucideIcon } from 'lucide-react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export function StatTile({
  label,
  value,
  icon: Icon,
  change,
  trend = 'neutral',
  accent = '#a78bfa',
}: {
  label: string
  value: string | number
  icon: LucideIcon
  change?: string
  trend?: 'up' | 'down' | 'neutral'
  accent?: string
}) {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus
  return (
    <Card className="relative overflow-hidden p-5">
      <div
        aria-hidden
        className="absolute right-0 top-0 size-24 -translate-y-8 translate-x-8 rounded-full opacity-20 blur-2xl"
        style={{ background: accent }}
      />
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-1.5 text-2xl font-semibold tracking-tight">{value}</p>
        </div>
        <div
          className="flex size-10 items-center justify-center rounded-lg ring-1 ring-inset ring-white/10"
          style={{ background: `${accent}22` }}
        >
          <Icon className="size-5" style={{ color: accent }} strokeWidth={1.8} />
        </div>
      </div>
      {change && (
        <div
          className={cn(
            'mt-3 inline-flex items-center gap-1 text-xs font-medium',
            trend === 'up' && 'text-emerald-400',
            trend === 'down' && 'text-red-400',
            trend === 'neutral' && 'text-muted-foreground',
          )}
        >
          <TrendIcon className="size-3.5" />
          {change}
        </div>
      )}
    </Card>
  )
}

const statusStyles: Record<string, string> = {
  upcoming: 'bg-accent/15 text-accent border-accent/30',
  ongoing: 'bg-primary/15 text-primary border-primary/30',
  completed: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  cancelled: 'bg-red-500/15 text-red-400 border-red-500/30',
  confirmed: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  pending: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  waitlisted: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
  approved: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  rejected: 'bg-red-500/15 text-red-400 border-red-500/30',
  'in-review': 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  submitted: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
  high: 'bg-red-500/15 text-red-400 border-red-500/30',
  normal: 'bg-primary/15 text-primary border-primary/30',
  low: 'bg-muted text-muted-foreground border-border',
  issued: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
}

export function StatusBadge({ status }: { status: string }) {
  return (
    <Badge
      variant="outline"
      className={cn('capitalize', statusStyles[status] ?? 'bg-muted text-muted-foreground')}
    >
      {status.replace('-', ' ')}
    </Badge>
  )
}

export function SectionHeader({
  title,
  description,
  action,
}: {
  title: string
  description?: string
  action?: React.ReactNode
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-base font-semibold tracking-tight">{title}</h2>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  )
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/70 py-12 text-center text-sm text-muted-foreground">
      {message}
    </div>
  )
}
