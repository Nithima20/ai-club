'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { StatusBadge } from '@/components/dashboard/widgets'
import { MapPin, Clock, Award, Check } from 'lucide-react'
import { toast } from 'sonner'
import { formatDate } from '@/lib/format'
import type { ClubEvent } from '@/types'

export function EventsBrowser({
  events,
  registeredIds,
}: {
  events: ClubEvent[]
  registeredIds: string[]
}) {
  const [registered, setRegistered] = useState<Set<string>>(new Set(registeredIds))
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed'>('all')

  const filtered = events.filter((e) => {
    if (filter === 'upcoming') return e.status === 'upcoming' || e.status === 'ongoing'
    if (filter === 'completed') return e.status === 'completed'
    return true
  })

  function register(e: ClubEvent) {
    setRegistered((prev) => new Set(prev).add(e.id))
    toast.success(`Registered for ${e.title}`)
  }

  return (
    <>
      <div className="mb-5 flex flex-wrap gap-2">
        {(['all', 'upcoming', 'completed'] as const).map((f) => (
          <Button
            key={f}
            variant={filter === f ? 'default' : 'outline'}
            size="sm"
            className="capitalize"
            onClick={() => setFilter(f)}
          >
            {f}
          </Button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {filtered.map((e) => {
          const isRegistered = registered.has(e.id)
          const isPast = e.status === 'completed' || e.status === 'cancelled'
          const fill = Math.round((e.registered / e.capacity) * 100)
          return (
            <Card key={e.id} className="flex flex-col p-5">
              <div className="mb-2 flex items-start justify-between gap-3">
                <h3 className="font-semibold tracking-tight text-balance">{e.title}</h3>
                <StatusBadge status={e.status} />
              </div>
              <p className="text-sm text-muted-foreground">{e.description}</p>

              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-3.5" />
                  {formatDate(e.date)} · {e.time}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-3.5" />
                  {e.venue}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Award className="size-3.5" />
                  {e.points} pts
                </span>
              </div>

              <div className="mt-4">
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <Badge variant="secondary" className="capitalize">
                    {e.category}
                  </Badge>
                  <span className="tabular-nums text-muted-foreground">
                    {e.registered}/{e.capacity}
                  </span>
                </div>
                <Progress value={fill} />
              </div>

              <div className="mt-4 border-t border-border/60 pt-4">
                {isRegistered ? (
                  <Button variant="secondary" size="sm" className="w-full" disabled>
                    <Check className="size-4" />
                    Registered
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    className="w-full"
                    disabled={isPast}
                    onClick={() => register(e)}
                  >
                    {isPast ? 'Event ended' : 'Register'}
                  </Button>
                )}
              </div>
            </Card>
          )
        })}
      </div>
    </>
  )
}
