import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { StatTile, StatusBadge, SectionHeader } from '@/components/dashboard/widgets'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Users, CircleCheck, Clock } from 'lucide-react'
import { api } from '@/services/api'
import { formatDate } from '@/lib/format'

const COORDINATOR_ID = 'u2'

function initials(name: string) {
  return name.split(' ').map((n) => n[0]).slice(0, 2).join('')
}

export default async function CoordinatorRegistrationsPage() {
  const [events, registrations, users] = await Promise.all([
    api.getEventsByCoordinator(COORDINATOR_ID),
    api.getRegistrations(),
    api.getUsers(),
  ])

  const eventIds = new Set(events.map((e) => e.id))
  const myRegs = registrations.filter((r) => eventIds.has(r.eventId))
  const confirmed = myRegs.filter((r) => r.status === 'confirmed').length
  const pending = myRegs.filter((r) => r.status === 'pending' || r.status === 'waitlisted').length

  const userName = (id: string) => users.find((u) => u.id === id)?.name ?? 'Unknown'
  const eventName = (id: string) => events.find((e) => e.id === id)?.title ?? '—'

  return (
    <DashboardShell
      role="coordinator"
      title="Registrations"
      description="Participants across your events"
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <StatTile label="Total" value={myRegs.length} icon={Users} accent="#38bdf8" />
        <StatTile label="Confirmed" value={confirmed} icon={CircleCheck} accent="#34d399" />
        <StatTile label="Pending" value={pending} icon={Clock} accent="#f59e0b" />
      </div>

      <Card className="mt-6 p-5">
        <SectionHeader title="All registrations" />
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Participant</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Registered</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myRegs.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8">
                        <AvatarFallback className="bg-secondary text-xs">
                          {initials(userName(r.userId))}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{userName(r.userId)}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {eventName(r.eventId)}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={r.status} />
                  </TableCell>
                  <TableCell className="text-right text-sm text-muted-foreground">
                    {formatDate(r.registeredAt)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </DashboardShell>
  )
}
