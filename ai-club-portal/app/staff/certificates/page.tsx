import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { CertificatesManager } from '@/components/staff/certificates-manager'
import { api } from '@/services/api'

export default async function StaffCertificatesPage() {
  const [initialCertificates, members, events] = await Promise.all([api.getCertificates(), api.getUsersByRole('member'), api.getEvents()])
  return <DashboardShell role="staff" title="Certificate Management" description="Issue and manage AI Club certificates"><CertificatesManager initialCertificates={initialCertificates} members={members} events={events} /></DashboardShell>
}
