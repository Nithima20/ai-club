import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { EventsManager } from '@/components/staff/events-manager'
import { api } from '@/services/api'

export default async function StaffEventsPage() {
  const [events, coordinators] = await Promise.all([
    api.getEvents(),
    api.getUsersByRole('coordinator'),
  ])

  return (
    <DashboardShell
      role="staff"
      title="Events"
      description="Create and manage all club events"
    >
      <EventsManager initialEvents={events} coordinators={coordinators} />
    </DashboardShell>
  )
}
