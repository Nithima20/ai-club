import { CalendarDays, Users, FolderGit2, TrendingUp, Activity as ActivityIcon } from 'lucide-react'
import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { StatTile, SectionHeader, StatusBadge } from '@/components/dashboard/widgets'
import { Card } from '@/components/ui/card'
import { api } from '@/services/api'
import { formatDate } from '@/lib/format'

const accent = '#a78bfa'

export default async function StaffOverview() {
  const [events, users, projects, announcements, activities] = await Promise.all([
    api.getEvents(),
    api.getUsers(),
    api.getProjects(),
    api.getAnnouncements(),
    api.getActivities(),
  ])

  const upcoming = events.filter((e) => e.status === 'upcoming')
  const members = users.filter((u) => u.role === 'member')
  const pendingProjects = projects.filter((p) => p.status !== 'approved' && p.status !== 'rejected')

  return (
    <DashboardShell
      role="staff"
      title="Overview"
      description="Full control of every AI Club activity"
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile label="Total Events" value={events.length} icon={CalendarDays} change={`${upcoming.length} upcoming`} trend="up" accent={accent} />
        <StatTile label="Club Members" value={users.length} icon={Users} change="+6 this month" trend="up" accent="#38bdf8" />
        <StatTile label="Active Projects" value={projects.length} icon={FolderGit2} change={`${pendingProjects.length} in review`} trend="neutral" accent="#34d399" />
        <StatTile label="Engagement" value="87%" icon={TrendingUp} change="+18% vs last month" trend="up" accent="#f472b6" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Upcoming events */}
        <Card className="p-5 lg:col-span-2">
          <SectionHeader title="Upcoming Events" description="Next activities on the calendar" />
          <div className="flex flex-col divide-y divide-border/60">
            {upcoming.map((e) => {
              const coordinator = users.find((u) => u.id === e.coordinatorId)
              return (
                <div key={e.id} className="flex items-center gap-4 py-3.5">
                  <div className="flex size-11 flex-col items-center justify-center rounded-lg bg-secondary/60 text-center">
                    <span className="text-sm font-semibold leading-none">
                      {new Date(e.date).getDate()}
                    </span>
                    <span className="text-[10px] uppercase text-muted-foreground">
                      {new Date(e.date).toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{e.title}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {e.venue} · {coordinator?.name ?? 'Unassigned'}
                    </p>
                  </div>
                  <div className="text-right">
                    <StatusBadge status={e.status} />
                    <p className="mt-1 text-xs text-muted-foreground">
                      {e.registered}/{e.capacity} registered
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        {/* Activity feed */}
        <Card className="p-5">
          <SectionHeader title="Recent Activity" />
          <div className="flex flex-col gap-4">
            {activities.map((a) => (
              <div key={a.id} className="flex gap-3">
                <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary/60">
                  <ActivityIcon className="size-3.5 text-accent" />
                </div>
                <div className="min-w-0 text-sm">
                  <p className="leading-snug">
                    <span className="font-medium">{a.actor}</span>{' '}
                    <span className="text-muted-foreground">{a.action}</span>{' '}
                    <span className="font-medium">{a.target}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{a.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Announcements */}
      <Card className="mt-6 p-5">
        <SectionHeader title="Latest Announcements" />
        <div className="grid gap-4 md:grid-cols-3">
          {announcements.map((an) => (
            <div key={an.id} className="rounded-xl border border-border/60 bg-secondary/30 p-4">
              <div className="mb-2 flex items-center justify-between gap-2">
                <StatusBadge status={an.priority} />
                <span className="text-xs text-muted-foreground">{formatDate(an.createdAt)}</span>
              </div>
              <p className="text-sm font-medium">{an.title}</p>
              <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{an.body}</p>
              <p className="mt-3 text-xs text-muted-foreground">— {an.author}</p>
            </div>
          ))}
        </div>
      </Card>
    </DashboardShell>
  )
}
