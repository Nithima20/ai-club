import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { StatusBadge } from '@/components/dashboard/widgets'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { MapPin, Clock, Award } from 'lucide-react'
import { api } from '@/services/api'
import { formatDate } from '@/lib/format'

const COORDINATOR_ID = 'u2'

export default async function CoordinatorEventsPage() {
  const events = await api.getEventsByCoordinator(COORDINATOR_ID)

  return (
    <DashboardShell
      role="coordinator"
      title="My Events"
      description="Events assigned to you"
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {events.map((e) => {
          const fill = Math.round((e.registered / e.capacity) * 100)
          return (
            <Card key={e.id} className="flex flex-col p-5">
              <div className="mb-2 flex items-start justify-between gap-3">
                <h3 className="font-semibold tracking-tight text-balance">{e.title}</h3>
                <StatusBadge status={e.status} />
              </div>
              <p className="text-sm text-muted-foreground">{e.description}</p>

              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-3.5" />
                  {formatDate(e.date)} · {e.time}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-3.5" />
                  {e.venue}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Award className="size-3.5" />
                  {e.points} pts
                </span>
              </div>

              <div className="mt-4">
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <Badge variant="secondary" className="capitalize">
                    {e.category}
                  </Badge>
                  <span className="tabular-nums text-muted-foreground">
                    {e.registered}/{e.capacity} registered
                  </span>
                </div>
                <Progress value={fill} />
              </div>
            </Card>
          )
        })}
      </div>
    </DashboardShell>
  )
}
