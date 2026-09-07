import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { StatTile, SectionHeader, StatusBadge } from '@/components/dashboard/widgets'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CalendarCheck, Award, Trophy, Megaphone, MapPin, Clock } from 'lucide-react'
import { api } from '@/services/api'
import { formatDate } from '@/lib/format'

const MEMBER_ID = 'u3'

export default async function MemberOverviewPage() {
  const [me, registrations, certificates, events, announcements] = await Promise.all([
    api.getUser(MEMBER_ID),
    api.getRegistrationsByUser(MEMBER_ID),
    api.getCertificatesByUser(MEMBER_ID),
    api.getEvents(),
    api.getAnnouncements(),
  ])

  const registeredEventIds = new Set(registrations.map((r) => r.eventId))
  const myUpcoming = events.filter(
    (e) => registeredEventIds.has(e.id) && (e.status === 'upcoming' || e.status === 'ongoing'),
  )
  const visibleAnnouncements = announcements
    .filter((a) => a.audience === 'all' || (Array.isArray(a.audience) && a.audience.includes('member')))
    .slice(0, 3)

  const regStatus = (eventId: string) =>
    registrations.find((r) => r.eventId === eventId)?.status ?? 'pending'

  return (
    <DashboardShell
      role="member"
      title={`Welcome, ${me?.name.split(' ')[0] ?? 'Member'}`}
      description="Your AI Club activity and upcoming events"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Points" value={me?.points ?? 0} icon={Trophy} accent="#34d399" />
        <StatTile label="Registered" value={registrations.length} icon={CalendarCheck} accent="#38bdf8" />
        <StatTile label="Certificates" value={certificates.length} icon={Award} accent="#f472b6" />
        <StatTile label="Upcoming" value={myUpcoming.length} icon={Clock} accent="#a78bfa" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SectionHeader title="Your upcoming events" description="Events you've registered for" />
          <div className="flex flex-col gap-4">
            {myUpcoming.map((e) => (
              <Card key={e.id} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold tracking-tight">{e.title}</h3>
                    <Badge variant="secondary" className="capitalize">
                      {e.category}
                    </Badge>
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="size-3.5" />
                      {formatDate(e.date)} · {e.time}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="size-3.5" />
                      {e.venue}
                    </span>
                  </div>
                </div>
                <StatusBadge status={regStatus(e.id)} />
              </Card>
            ))}
          </div>
        </div>

        <div>
          <SectionHeader title="Announcements" />
          <div className="flex flex-col gap-3">
            {visibleAnnouncements.map((a) => (
              <Card key={a.id} className="p-4">
                <div className="flex items-center gap-2">
                  <Megaphone className="size-3.5 text-primary" />
                  <StatusBadge status={a.priority} />
                </div>
                <h4 className="mt-2 text-sm font-medium">{a.title}</h4>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{a.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
