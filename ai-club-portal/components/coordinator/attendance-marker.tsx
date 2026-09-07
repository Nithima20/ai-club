'use client'

import { useMemo, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SectionHeader } from '@/components/dashboard/widgets'
import { toast } from 'sonner'
import type { ClubEvent, User } from '@/types'

interface Attendee {
  user: User
  eventId: string
}

function initials(name: string) {
  return name.split(' ').map((n) => n[0]).slice(0, 2).join('')
}

export function AttendanceMarker({
  events,
  attendees,
}: {
  events: ClubEvent[]
  attendees: Attendee[]
}) {
  const [eventId, setEventId] = useState(events[0]?.id ?? '')
  const [present, setPresent] = useState<Record<string, boolean>>({})

  const roster = useMemo(
    () => attendees.filter((a) => a.eventId === eventId),
    [attendees, eventId],
  )

  const presentCount = roster.filter((a) => present[`${eventId}:${a.user.id}`]).length

  function toggle(userId: string, value: boolean) {
    const key = `${eventId}:${userId}`
    setPresent((prev) => ({ ...prev, [key]: value }))
    toast.success(value ? 'Marked present' : 'Marked absent')
  }

  return (
    <Card className="p-5">
      <SectionHeader
        title="Mark attendance"
        description={`${presentCount} of ${roster.length} present`}
        action={
          <Select value={eventId} onValueChange={(value) => value && setEventId(value)}>
            <SelectTrigger className="w-56">
              <SelectValue placeholder="Select event" />
            </SelectTrigger>
            <SelectContent>
              {events.map((e) => (
                <SelectItem key={e.id} value={e.id}>
                  {e.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        }
      />

      {roster.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/70 py-12 text-center text-sm text-muted-foreground">
          No confirmed participants for this event yet.
        </div>
      ) : (
        <ul className="flex flex-col divide-y divide-border/60">
          {roster.map(({ user }) => {
            const key = `${eventId}:${user.id}`
            const isPresent = !!present[key]
            return (
              <li key={user.id} className="flex items-center gap-3 py-3">
                <Avatar className="size-9">
                  <AvatarFallback className="bg-secondary text-xs">
                    {initials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{user.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {user.rollNo} · {user.department}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={
                    isPresent
                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                      : 'bg-muted text-muted-foreground'
                  }
                >
                  {isPresent ? 'Present' : 'Absent'}
                </Badge>
                <Switch
                  checked={isPresent}
                  onCheckedChange={(value) => toggle(user.id, value)}
                  aria-label={`Mark ${user.name} present`}
                />
              </li>
            )
          })}
        </ul>
      )}
    </Card>
  )
}
