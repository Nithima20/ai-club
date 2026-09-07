import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { SectionHeader } from '@/components/dashboard/widgets'
import { MemberCertificates } from '@/components/member/member-certificates'
import { api } from '@/services/api'

export default async function MemberCertificatesPage() {
  const certificates = await api.getCertificates()

  return (
    <DashboardShell
      role="member"
      title="Certificates"
      description="Your AI Club achievements and credentials"
    >
      <SectionHeader title="My certificates" description="Certificates issued for your participation" />
      <MemberCertificates certificates={certificates} />
    </DashboardShell>
  )
}
