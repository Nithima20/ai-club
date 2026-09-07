import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { StatTile, SectionHeader, StatusBadge } from '@/components/dashboard/widgets'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { CalendarDays, Users, ClipboardCheck, Percent } from 'lucide-react'
import { api } from '@/services/api'
import { formatDate } from '@/lib/format'

const COORDINATOR_ID = 'u2'

export default async function CoordinatorOverviewPage() {
  const [events, registrations, attendance] = await Promise.all([
    api.getEventsByCoordinator(COORDINATOR_ID),
    api.getRegistrations(),
    api.getAttendance(),
  ])

  const eventIds = new Set(events.map((e) => e.id))
  const myRegs = registrations.filter((r) => eventIds.has(r.eventId))
  const myAttendance = attendance.filter((a) => eventIds.has(a.eventId))
  const present = myAttendance.filter((a) => a.present).length
  const attendanceRate = myAttendance.length
    ? Math.round((present / myAttendance.length) * 100)
    : 0

  return (
    <DashboardShell
      role="coordinator"
      title="Overview"
      description="Your events, registrations and attendance at a glance"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="My events" value={events.length} icon={CalendarDays} accent="#38bdf8" />
        <StatTile label="Registrations" value={myRegs.length} icon={Users} accent="#a78bfa" />
        <StatTile label="Checked in" value={present} icon={ClipboardCheck} accent="#34d399" />
        <StatTile label="Attendance rate" value={`${attendanceRate}%`} icon={Percent} accent="#f472b6" />
      </div>

      <div className="mt-6">
        <SectionHeader title="My events" description="Events you coordinate" />
        <div className="grid gap-4 lg:grid-cols-2">
          {events.map((e) => {
            const fill = Math.round((e.registered / e.capacity) * 100)
            return (
              <Card key={e.id} className="p-5">
                <div className="mb-2 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold tracking-tight">{e.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(e.date)} · {e.time} · {e.venue}
                    </p>
                  </div>
                  <StatusBadge status={e.status} />
                </div>
                <div className="mt-3">
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Capacity</span>
                    <span className="tabular-nums">
                      {e.registered}/{e.capacity}
                    </span>
                  </div>
                  <Progress value={fill} />
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </DashboardShell>
  )
}
