'use client'

import { useState } from 'react'
import { Plus, Megaphone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
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
import type { Announcement, AnnouncementPriority } from '@/types'

export function AnnouncementsManager({
  initial,
  author,
}: {
  initial: Announcement[]
  author: string
}) {
  const [items, setItems] = useState(initial)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    title: '',
    body: '',
    priority: 'normal' as AnnouncementPriority,
  })

  function handleCreate() {
    if (!form.title || !form.body) {
      toast.error('Please add a title and message.')
      return
    }
    const item: Announcement = {
      id: `an${Date.now()}`,
      title: form.title,
      body: form.body,
      author,
      priority: form.priority,
      createdAt: new Date().toISOString(),
      audience: 'all',
    }
    setItems((prev) => [item, ...prev])
    setForm({ title: '', body: '', priority: 'normal' })
    setOpen(false)
    toast.success('Announcement published.')
  }

  return (
    <>
      <div className="mb-4 flex justify-end">
        <Button onClick={() => setOpen(true)}>
          <Plus className="size-4" />
          New Announcement
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {items.map((an) => (
          <Card key={an.id} className="p-5">
            <div className="mb-2 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-secondary/60">
                  <Megaphone className="size-4 text-accent" />
                </div>
                <StatusBadge status={an.priority} />
              </div>
              <span className="text-xs text-muted-foreground">{formatDate(an.createdAt)}</span>
            </div>
            <p className="font-medium">{an.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{an.body}</p>
            <p className="mt-3 text-xs text-muted-foreground">
              — {an.author} ·{' '}
              {Array.isArray(an.audience) ? an.audience.join(', ') : 'all members'}
            </p>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>New announcement</DialogTitle>
            <DialogDescription>Broadcast a message to the club.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="an-title">Title</Label>
              <Input
                id="an-title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="an-body">Message</Label>
              <Textarea
                id="an-body"
                value={form.body}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label>Priority</Label>
              <Select
                value={form.priority}
                onValueChange={(v) => setForm({ ...form, priority: v as AnnouncementPriority })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate}>Publish</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
