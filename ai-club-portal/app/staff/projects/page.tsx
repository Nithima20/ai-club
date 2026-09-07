import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { StatTile } from '@/components/dashboard/widgets'
import { ProjectsReview } from '@/components/staff/projects-review'
import { FolderGit2, Clock, CircleCheck } from 'lucide-react'
import { api } from '@/services/api'

export default async function StaffProjectsPage() {
  const [projects, users] = await Promise.all([api.getProjects(), api.getUsers()])
  const pending = projects.filter((p) => p.status === 'submitted' || p.status === 'in-review').length
  const approved = projects.filter((p) => p.status === 'approved').length

  return (
    <DashboardShell
      role="staff"
      title="Projects"
      description="Review and approve member project submissions"
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <StatTile label="Total submissions" value={projects.length} icon={FolderGit2} accent="#a78bfa" />
        <StatTile label="Awaiting review" value={pending} icon={Clock} accent="#f59e0b" />
        <StatTile label="Approved" value={approved} icon={CircleCheck} accent="#34d399" />
      </div>

      <div className="mt-6">
        <ProjectsReview initial={projects} users={users} />
      </div>
    </DashboardShell>
  )
}
