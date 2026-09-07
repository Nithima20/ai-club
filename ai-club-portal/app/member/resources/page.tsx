import { BookOpen, ExternalLink } from 'lucide-react'
import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { SectionHeader } from '@/components/dashboard/widgets'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { api } from '@/services/api'
import { formatDate } from '@/lib/format'

export default async function MemberResourcesPage() {
  const resources = await api.getResources()

  return (
    <DashboardShell
      role="member"
      title="Resources"
      description="Learning material curated for AI Club members"
    >
      <SectionHeader title="Club resources" description="Notes, videos, notebooks and useful links" />
      <div className="grid gap-4 md:grid-cols-2">
        {resources.map((resource) => (
          <Card key={resource.id} className="p-5">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
                <BookOpen className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold tracking-tight">{resource.title}</h3>
                  <ExternalLink className="size-4 shrink-0 text-muted-foreground" />
                </div>
                <p className="mt-1 text-xs capitalize text-muted-foreground">
                  {resource.type} · added {formatDate(resource.addedAt)}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {resource.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </DashboardShell>
  )
}
