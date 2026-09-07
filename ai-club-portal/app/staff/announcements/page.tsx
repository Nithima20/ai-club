import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { AnnouncementsManager } from '@/components/staff/announcements-manager'
import { api } from '@/services/api'

export default async function StaffAnnouncementsPage() {
  const announcements = await api.getAnnouncements()

  return (
    <DashboardShell
      role="staff"
      title="Announcements"
      description="Broadcast messages to the club"
    >
      <AnnouncementsManager initial={announcements} author="Dr. Priya Ramesh" />
    </DashboardShell>
  )
}
