import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { AttendanceMarker } from '@/components/coordinator/attendance-marker'
import { api } from '@/services/api'

const COORDINATOR_ID = 'u2'

export default async function CoordinatorAttendancePage() {
  const [events, registrations, users] = await Promise.all([
    api.getEventsByCoordinator(COORDINATOR_ID),
    api.getRegistrations(),
    api.getUsers(),
  ])

  const eventIds = new Set(events.map((e) => e.id))
  const attendees = registrations
    .filter((r) => eventIds.has(r.eventId) && r.status === 'confirmed')
    .map((r) => ({
      eventId: r.eventId,
      user: users.find((u) => u.id === r.userId)!,
    }))
    .filter((a) => a.user)

  return (
    <DashboardShell
      role="coordinator"
      title="Attendance"
      description="Check in participants for your events"
    >
      <AttendanceMarker events={events} attendees={attendees} />
    </DashboardShell>
  )
}
