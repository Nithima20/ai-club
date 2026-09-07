'use client'

import { useState } from 'react'
import { Check, X, GitBranch, Users as UsersIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { StatusBadge } from '@/components/dashboard/widgets'
import { toast } from 'sonner'
import { formatDate } from '@/lib/format'
import type { Project, ProjectStatus, User } from '@/types'

export function ProjectsReview({
  initial,
  users,
}: {
  initial: Project[]
  users: User[]
}) {
  const [projects, setProjects] = useState(initial)

  function setStatus(id: string, status: ProjectStatus) {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)))
    toast.success(`Project ${status === 'approved' ? 'approved' : 'rejected'}.`)
  }

  function memberNames(ids: string[]) {
    return ids.map((id) => users.find((u) => u.id === id)?.name ?? 'Unknown').join(', ')
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {projects.map((p) => (
        <Card key={p.id} className="flex flex-col p-5">
          <div className="mb-2 flex items-start justify-between gap-3">
            <h3 className="font-semibold tracking-tight">{p.title}</h3>
            <StatusBadge status={p.status} />
          </div>
          <p className="text-sm text-muted-foreground">{p.description}</p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {p.techStack.map((t) => (
              <Badge key={t} variant="secondary" className="text-xs">
                {t}
              </Badge>
            ))}
          </div>

          <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <UsersIcon className="size-3.5" />
            {memberNames(p.members)}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            Submitted {formatDate(p.submittedAt)}
          </div>

          <div className="mt-4 flex items-center gap-2 border-t border-border/60 pt-4">
            {p.repoUrl && (
              <Button
                render={
                  <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" />
                }
                variant="ghost"
                size="sm"
                className="mr-auto"
              >
                  <GitBranch className="size-4" />
                  Repo
              </Button>
            )}
            <div className={p.repoUrl ? '' : 'ml-auto flex gap-2'}>
              <Button
                size="sm"
                variant="outline"
                className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300"
                onClick={() => setStatus(p.id, 'approved')}
                disabled={p.status === 'approved'}
              >
                <Check className="size-4" />
                Approve
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="ml-2 border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                onClick={() => setStatus(p.id, 'rejected')}
                disabled={p.status === 'rejected'}
              >
                <X className="size-4" />
                Reject
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
