import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { StatTile, SectionHeader } from '@/components/dashboard/widgets'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Users, CalendarDays, Percent, Trophy, Download } from 'lucide-react'
import { api } from '@/services/api'
import { formatDate } from '@/lib/format'

export default async function StaffReportsPage() {
  const [reports, events, registrations, attendance, users] = await Promise.all([
    api.getReports(),
    api.getEvents(),
    api.getRegistrations(),
    api.getAttendance(),
    api.getUsers(),
  ])

  const totalPresent = attendance.filter((a) => a.present).length
  const attendanceRate = attendance.length
    ? Math.round((totalPresent / attendance.length) * 100)
    : 0

  const byCategory = events.reduce<Record<string, number>>((acc, e) => {
    acc[e.category] = (acc[e.category] ?? 0) + 1
    return acc
  }, {})
  const maxCat = Math.max(...Object.values(byCategory), 1)

  const topMembers = [...users]
    .filter((u) => typeof u.points === 'number')
    .sort((a, b) => (b.points ?? 0) - (a.points ?? 0))
    .slice(0, 5)

  return (
    <DashboardShell
      role="staff"
      title="Reports"
      description="Club performance and engagement analytics"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Members" value={users.length} icon={Users} accent="#a78bfa" />
        <StatTile label="Events held" value={events.length} icon={CalendarDays} accent="#38bdf8" />
        <StatTile label="Registrations" value={registrations.length} icon={Trophy} accent="#f472b6" />
        <StatTile
          label="Attendance rate"
          value={`${attendanceRate}%`}
          icon={Percent}
          accent="#34d399"
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <SectionHeader title="Events by category" description="Distribution across formats" />
          <div className="flex flex-col gap-4">
            {Object.entries(byCategory).map(([cat, count]) => (
              <div key={cat}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="capitalize">{cat}</span>
                  <span className="tabular-nums text-muted-foreground">{count}</span>
                </div>
                <Progress value={(count / maxCat) * 100} />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <SectionHeader title="Leaderboard" description="Top members by points" />
          <ol className="flex flex-col gap-3">
            {topMembers.map((u, i) => (
              <li key={u.id} className="flex items-center gap-3">
                <span
                  className="flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold tabular-nums ring-1 ring-inset ring-white/10"
                  style={{ background: i === 0 ? '#fbbf2422' : 'var(--secondary)', color: i === 0 ? '#fbbf24' : undefined }}
                >
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{u.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{u.department}</p>
                </div>
                <span className="text-sm font-semibold tabular-nums text-primary">{u.points}</span>
              </li>
            ))}
          </ol>
        </Card>
      </div>

      <div className="mt-6">
        <SectionHeader title="Generated reports" description="Downloadable summaries" />
        <div className="grid gap-4 md:grid-cols-2">
          {reports.map((r) => (
            <Card key={r.id} className="flex flex-col p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold tracking-tight">{r.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    {r.period} · generated {formatDate(r.generatedAt)}
                  </p>
                </div>
                <span className="rounded-md bg-primary/15 px-2 py-1 text-xs font-medium text-primary">
                  {r.metric}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{r.summary}</p>
              <Button variant="outline" size="sm" className="mt-4 self-start">
                <Download className="size-4" />
                Export PDF
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </DashboardShell>
  )
}
