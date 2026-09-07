'use client'

import { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { StatusBadge } from '@/components/dashboard/widgets'
import { toast } from 'sonner'
import { formatDate } from '@/lib/format'
import type { ClubEvent, EventCategory, User } from '@/types'

export function EventsManager({
  initialEvents,
  coordinators,
}: {
  initialEvents: ClubEvent[]
  coordinators: User[]
}) {
  const [events, setEvents] = useState(initialEvents)
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'workshop' as EventCategory,
    date: '',
    time: '',
    venue: '',
    coordinatorId: coordinators[0]?.id ?? '',
    capacity: '50',
  })

  const filtered = events.filter(
    (e) =>
      e.title.toLowerCase().includes(query.toLowerCase()) ||
      e.venue.toLowerCase().includes(query.toLowerCase()),
  )

  function handleCreate() {
    if (!form.title || !form.date || !form.venue) {
      toast.error('Please fill in title, date and venue.')
      return
    }
    const newEvent: ClubEvent = {
      id: `e${Date.now()}`,
      title: form.title,
      description: form.description,
      category: form.category,
      status: 'upcoming',
      date: form.date,
      time: form.time || '10:00 AM',
      venue: form.venue,
      coordinatorId: form.coordinatorId,
      capacity: Number(form.capacity) || 50,
      registered: 0,
      points: 50,
    }
    setEvents((prev) => [newEvent, ...prev])
    setOpen(false)
    setForm((f) => ({ ...f, title: '', description: '', date: '', time: '', venue: '' }))
    toast.success('Event created successfully.')
  }

  return (
    <Card className="p-5">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search events..."
            className="pl-9"
          />
        </div>
        <Button onClick={() => setOpen(true)}>
          <Plus className="size-4" />
          Create Event
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Coordinator</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Registered</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((e) => {
              const coordinator = coordinators.find((c) => c.id === e.coordinatorId)
              return (
                <TableRow key={e.id}>
                  <TableCell>
                    <p className="font-medium">{e.title}</p>
                    <p className="text-xs capitalize text-muted-foreground">
                      {e.category} · {e.venue}
                    </p>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                    {formatDate(e.date)}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {coordinator?.name ?? '—'}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={e.status} />
                  </TableCell>
                  <TableCell className="text-right text-sm tabular-nums">
                    {e.registered}/{e.capacity}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Create new event</DialogTitle>
            <DialogDescription>Publish a new activity for the AI Club.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Intro to Neural Networks"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="desc">Description</Label>
              <Textarea
                id="desc"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="What is this event about?"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(v) => setForm({ ...form, category: v as EventCategory })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {['workshop', 'hackathon', 'seminar', 'competition', 'bootcamp', 'talk'].map(
                      (c) => (
                        <SelectItem key={c} value={c} className="capitalize">
                          {c}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Coordinator</Label>
                <Select
                  value={form.coordinatorId}
                  onValueChange={(value) => value && setForm({ ...form, coordinatorId: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {coordinators.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  placeholder="10:00 AM"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="venue">Venue</Label>
                <Input
                  id="venue"
                  value={form.venue}
                  onChange={(e) => setForm({ ...form, venue: e.target.value })}
                  placeholder="AI Lab, Block C"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cap">Capacity</Label>
                <Input
                  id="cap"
                  type="number"
                  value={form.capacity}
                  onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate}>Create Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
