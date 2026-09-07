'use client'

import { useMemo, useState } from 'react'
import { Download, Eye, FileImage, Trophy } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { CertificatePreview } from '@/components/certificates/certificate-preview'
import { certificateService } from '@/services/certificate-service'
import { formatDate } from '@/lib/format'
import type { Certificate, CertificateRank, CertificateType, ClubEvent, User } from '@/types'

const ranks: CertificateRank[] = ['1st Prize', '2nd Prize', '3rd Prize']
const today = new Date().toISOString().slice(0, 10)
type TemplateMap = { Participant?: string; 'Prize Winner'?: string }

export function CertificatesManager({ initialCertificates, members, events }: { initialCertificates: Certificate[]; members: User[]; events: ClubEvent[] }) {
  const [certificates, setCertificates] = useState(initialCertificates)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Certificate | null>(null)
  const [templates, setTemplates] = useState<TemplateMap>({})
  const [form, setForm] = useState({ eventId: '', certificateType: 'Participant' as CertificateType, rank: '' as CertificateRank | '', issueDate: today })
  const [memberIds, setMemberIds] = useState<string[]>([])
  const event = events.find((item) => item.id === form.eventId)
  const selectedMembers = members.filter((member) => memberIds.includes(member.id))
  const filteredMembers = useMemo(() => members.filter((member) => `${member.name} ${member.rollNo ?? ''} ${member.department}`.toLowerCase().includes(query.toLowerCase())), [members, query])
  const filteredCertificates = useMemo(() => certificates.filter((item) => `${item.studentName} ${item.eventName} ${item.credentialId}`.toLowerCase().includes(query.toLowerCase())), [certificates, query])
  const template = templates[form.certificateType]

  function readTemplate(type: CertificateType, file?: File) {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setTemplates((current) => ({ ...current, [type]: String(reader.result) }))
    reader.readAsDataURL(file)
  }

  function toggleMember(id: string) { setMemberIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]) }

  function draftFor(member: User): Certificate {
    return { id: 'preview', studentId: member.id, studentName: member.name, studentYear: member.year ?? '', studentDepartment: member.department, studentRollNo: member.rollNo, eventId: event!.id, eventName: event!.title, eventDate: event!.date, certificateType: form.certificateType, rank: form.rank || undefined, certificateTitle: form.certificateType === 'Prize Winner' ? 'Certificate of Appreciation' : 'Certificate of Participation', issueDate: form.issueDate, status: 'Issued', credentialId: 'PREVIEW', templateDataUrl: template }
  }

  function showPreview() {
    if (!event || selectedMembers.length === 0 || !template || (form.certificateType === 'Prize Winner' && !form.rank)) return toast.error('Choose an event, template, member, and winner position where required.')
    setSelected(draftFor(selectedMembers[0]))
  }

  function generate() {
    if (!event || selectedMembers.length === 0 || !template || !form.issueDate || (form.certificateType === 'Prize Winner' && !form.rank)) return toast.error('Complete the event, template, members, date, and winner position fields.')
    const issued = selectedMembers.map((member) => certificateService.issue(draftFor(member)))
    setCertificates((current) => [...issued, ...current])
    setSelected(issued[0])
    setMemberIds([])
    toast.success(`${issued.length} certificate${issued.length === 1 ? '' : 's'} generated.`)
  }

  function printCertificate(certificate: Certificate) { setSelected(certificate); window.setTimeout(() => window.print(), 50) }

  return <div className="grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)]">
    <Card className="h-fit p-5"><div className="mb-5"><h2 className="font-semibold">Generate e-certificates</h2><p className="text-sm text-muted-foreground">Use the approved image template for each certificate type.</p></div><div className="grid gap-4">
      <div className="grid gap-2"><Label>Certificate Type</Label><Select value={form.certificateType} onValueChange={(value) => setForm({ ...form, certificateType: value as CertificateType, rank: '' })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Participant">Participant</SelectItem><SelectItem value="Prize Winner">Winner</SelectItem></SelectContent></Select></div>
      <div className="grid gap-2"><Label>Official {form.certificateType === 'Prize Winner' ? 'winner' : 'participant'} template</Label><label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-border px-3 py-3 text-sm text-muted-foreground hover:bg-muted/40"><FileImage className="size-4" />{template ? 'Template loaded' : 'Choose PNG or JPG template'}<Input className="sr-only" type="file" accept="image/png,image/jpeg" onChange={(event) => readTemplate(form.certificateType, event.target.files?.[0])} /></label></div>
      <div className="grid gap-2"><Label>Event</Label><Select value={form.eventId} onValueChange={(eventId) => setForm({ ...form, eventId })}><SelectTrigger><SelectValue placeholder="Select an event" /></SelectTrigger><SelectContent>{events.map((item) => <SelectItem key={item.id} value={item.id}>{item.title} · {formatDate(item.date)}</SelectItem>)}</SelectContent></Select></div>
      {form.certificateType === 'Prize Winner' && <div className="grid gap-2"><Label>Position / achievement</Label><Select value={form.rank} onValueChange={(rank) => setForm({ ...form, rank: rank as CertificateRank })}><SelectTrigger><SelectValue placeholder="Select position" /></SelectTrigger><SelectContent>{ranks.map((rank) => <SelectItem key={rank} value={rank}>{rank}</SelectItem>)}</SelectContent></Select></div>}
      <div className="grid gap-2"><Label htmlFor="issue-date">Issue date</Label><Input id="issue-date" type="date" value={form.issueDate} onChange={(event) => setForm({ ...form, issueDate: event.target.value })} /></div>
      <div className="grid gap-2"><Label>Club members ({memberIds.length} selected)</Label><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name, register number, department" /><div className="max-h-56 overflow-y-auto rounded-lg border border-border">{filteredMembers.map((member) => <label key={member.id} className="flex cursor-pointer items-center gap-3 border-b border-border/60 px-3 py-2.5 text-sm last:border-0 hover:bg-muted/40"><input type="checkbox" checked={memberIds.includes(member.id)} onChange={() => toggleMember(member.id)} /><span className="min-w-0 flex-1"><span className="block font-medium">{member.name}</span><span className="block text-xs text-muted-foreground">{member.rollNo ?? 'No register number'} · {member.department} · {member.year ?? 'Year not set'}</span></span></label>)}</div></div>
      <div className="flex flex-wrap gap-2 pt-1"><Button variant="outline" onClick={showPreview}><Eye className="size-4" />Preview</Button><Button onClick={generate}><Trophy className="size-4" />Generate {memberIds.length > 1 ? `${memberIds.length} certificates` : 'certificate'}</Button></div>
    </div></Card>
    <Card className="p-5"><div className="mb-4"><h2 className="font-semibold">Certificate history</h2><p className="text-sm text-muted-foreground">Generated records and printable downloads.</p></div><div className="overflow-x-auto"><Table><TableHeader><TableRow><TableHead>Certificate ID</TableHead><TableHead>Student</TableHead><TableHead>Event</TableHead><TableHead>Type</TableHead><TableHead>Generated</TableHead><TableHead>Action</TableHead></TableRow></TableHeader><TableBody>{filteredCertificates.map((certificate) => <TableRow key={certificate.id}><TableCell className="whitespace-nowrap font-mono text-xs">{certificate.credentialId}</TableCell><TableCell><p className="font-medium">{certificate.studentName}</p><p className="text-xs text-muted-foreground">{certificate.studentRollNo ?? certificate.studentYear}</p></TableCell><TableCell className="max-w-36 text-sm">{certificate.eventName}</TableCell><TableCell><p className="text-sm">{certificate.certificateType === 'Prize Winner' ? 'Winner' : 'Participant'}</p>{certificate.rank && <p className="text-xs text-amber-400">{certificate.rank}</p>}</TableCell><TableCell className="whitespace-nowrap text-sm text-muted-foreground">{formatDate(certificate.issueDate)}</TableCell><TableCell><div className="flex gap-1"><Button variant="ghost" size="sm" onClick={() => setSelected(certificate)}><Eye className="size-4" />Preview</Button><Button variant="ghost" size="sm" onClick={() => printCertificate(certificate)}><Download className="size-4" />PDF</Button></div></TableCell></TableRow>)}</TableBody></Table></div></Card>
    <Dialog open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}><DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-3xl"><DialogHeader><DialogTitle>Certificate preview</DialogTitle><DialogDescription>Print this official template to PDF from your browser.</DialogDescription></DialogHeader>{selected && <CertificatePreview certificate={selected} />}</DialogContent></Dialog>
  </div>
}
