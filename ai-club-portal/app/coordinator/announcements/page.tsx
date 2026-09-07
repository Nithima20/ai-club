import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { StatusBadge, EmptyState } from '@/components/dashboard/widgets'
import { Card } from '@/components/ui/card'
import { Megaphone } from 'lucide-react'
import { api } from '@/services/api'
import { formatDate } from '@/lib/format'

export default async function CoordinatorAnnouncementsPage() {
  const all = await api.getAnnouncements()
  const visible = all.filter(
    (a) => a.audience === 'all' || (Array.isArray(a.audience) && a.audience.includes('coordinator')),
  )

  return (
    <DashboardShell
      role="coordinator"
      title="Announcements"
      description="Updates from staff and fellow coordinators"
    >
      {visible.length === 0 ? (
        <EmptyState message="No announcements right now." />
      ) : (
        <div className="flex flex-col gap-4">
          {visible.map((a) => (
            <Card key={a.id} className="p-5">
              <div className="flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent/15 ring-1 ring-inset ring-accent/30">
                  <Megaphone className="size-4 text-accent" strokeWidth={1.8} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold tracking-tight">{a.title}</h3>
                    <StatusBadge status={a.priority} />
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{a.body}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {a.author} · {formatDate(a.createdAt)}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </DashboardShell>
  )
}
