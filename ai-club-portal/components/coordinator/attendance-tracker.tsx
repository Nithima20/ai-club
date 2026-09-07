'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SectionHeader } from '@/components/dashboard/widgets'
import { CheckCircle2, XCircle, Save } from 'lucide-react'
import type { ClubEvent, User } from '@/types'

interface Participant {
  id: string
  name: string
  present: boolean
}

interface AttendanceTrackerProps {
  events: ClubEvent[]
  participantsByEvent: Record<string, User[]>
}

function initials(name: string) {
  return name.split(' ').map((n) => n[0]).slice(0, 2).join('')
}

export function AttendanceTracker({ events, participantsByEvent }: AttendanceTrackerProps) {
  const [eventId, setEventId] = useState(events[0]?.id ?? '')
  const [saved, setSaved] = useState(false)
  const [roster, setRoster] = useState<Record<string, Participant[]>>(() => {
    const initial: Record<string, Participant[]> = {}
    for (const ev of events) {
      initial[ev.id] = (participantsByEvent[ev.id] ?? []).map((u) => ({
        id: u.id,
        name: u.name,
        present: true,
      }))
    }
    return initial
  })

  const participants = roster[eventId] ?? []
  const presentCount = participants.filter((p) => p.present).length

  function toggle(id: string, present: boolean) {
    setSaved(false)
    setRoster((prev) => ({
      ...prev,
      [eventId]: prev[eventId].map((p) => (p.id === id ? { ...p, present } : p)),
    }))
  }

  function markAll(present: boolean) {
    setSaved(false)
    setRoster((prev) => ({
      ...prev,
      [eventId]: prev[eventId].map((p) => ({ ...p, present })),
    }))
  }

  return (
    <Card className="p-5">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-52 flex-1">
          <label className="mb-1.5 block text-sm text-muted-foreground">Select event</label>
          <Select value={eventId} onValueChange={(value) => { if (value) setEventId(value); setSaved(false) }}>
            <SelectTrigger>
              <SelectValue placeholder="Choose an event" />
            </SelectTrigger>
            <SelectContent>
              {events.map((e) => (
                <SelectItem key={e.id} value={e.id}>
                  {e.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Badge variant="secondary" className="h-9 px-3 text-sm tabular-nums">
          {presentCount}/{participants.length} present
        </Badge>
      </div>

      <div className="mb-3 flex items-center justify-between">
        <SectionHeader title="Roster" />
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => markAll(true)}>
            All present
          </Button>
          <Button variant="outline" size="sm" onClick={() => markAll(false)}>
            All absent
          </Button>
        </div>
      </div>

      <ul className="divide-y divide-border">
        {participants.map((p) => (
          <li key={p.id} className="flex items-center justify-between gap-3 py-2.5">
            <div className="flex items-center gap-3">
              <Avatar className="size-8">
                <AvatarFallback className="bg-secondary text-xs">{initials(p.name)}</AvatarFallback>
              </Avatar>
              <span className="font-medium">{p.name}</span>
            </div>
            <div className="flex gap-1.5">
              <Button
                variant={p.present ? 'default' : 'outline'}
                size="sm"
                className="gap-1.5"
                onClick={() => toggle(p.id, true)}
                aria-pressed={p.present}
              >
                <CheckCircle2 className="size-4" />
                Present
              </Button>
              <Button
                variant={!p.present ? 'destructive' : 'outline'}
                size="sm"
                className="gap-1.5"
                onClick={() => toggle(p.id, false)}
                aria-pressed={!p.present}
              >
                <XCircle className="size-4" />
                Absent
              </Button>
            </div>
          </li>
        ))}
        {participants.length === 0 && (
          <li className="py-6 text-center text-sm text-muted-foreground">
            No participants registered for this event yet.
          </li>
        )}
      </ul>

      <div className="mt-5 flex items-center justify-end gap-3">
        {saved && <span className="text-sm text-[color:var(--chart-2)]">Attendance saved</span>}
        <Button className="gap-1.5" onClick={() => setSaved(true)} disabled={participants.length === 0}>
          <Save className="size-4" />
          Save attendance
        </Button>
      </div>
    </Card>
  )
}
