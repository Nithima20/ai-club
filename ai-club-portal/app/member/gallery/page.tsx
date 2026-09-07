import Image from 'next/image'
import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { SectionHeader } from '@/components/dashboard/widgets'
import { Card } from '@/components/ui/card'
import { api } from '@/services/api'
import { formatDate } from '@/lib/format'

export default async function MemberGalleryPage() {
  const gallery = await api.getGallery()

  return (
    <DashboardShell
      role="member"
      title="Gallery"
      description="Moments from AI Club events and activities"
    >
      <SectionHeader title="Club gallery" description="Highlights from recent activities" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {gallery.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="relative aspect-video">
              <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{formatDate(item.date)}</p>
            </div>
          </Card>
        ))}
      </div>
    </DashboardShell>
  )
}
