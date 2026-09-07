import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { EventsBrowser } from '@/components/member/events-browser'
import { api } from '@/services/api'

const MEMBER_ID = 'u3'

export default async function MemberEventsPage() {
  const [events, registrations] = await Promise.all([
    api.getEvents(),
    api.getRegistrationsByUser(MEMBER_ID),
  ])

  return (
    <DashboardShell
      role="member"
      title="Events"
      description="Explore and register for AI Club events"
    >
      <EventsBrowser
        events={events}
        registeredIds={registrations.map((registration) => registration.eventId)}
      />
    </DashboardShell>
  )
}
