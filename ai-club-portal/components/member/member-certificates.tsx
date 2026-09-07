'use client'

import { useState } from 'react'
import { Award, Eye, Medal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { CertificatePreview } from '@/components/certificates/certificate-preview'
import { formatDate } from '@/lib/format'
import type { Certificate } from '@/types'
import { auth } from '@/services/auth'

export function MemberCertificates({ certificates }: { certificates: Certificate[] }) {
  const [selected, setSelected] = useState<Certificate | null>(null)
  const currentUser = auth.getCurrentUser('member')
  const myCertificates = certificates.filter((certificate) => certificate.studentId === currentUser.id)
  return <>{myCertificates.length === 0 ? <p className="rounded-xl border border-dashed border-border/70 py-12 text-center text-sm text-muted-foreground">No certificates available yet.</p> : <div className="grid gap-4 md:grid-cols-2">{myCertificates.map((certificate) => {
    const winner = certificate.certificateType === 'Prize Winner'
    return <Card key={certificate.id} className="p-5"><div className="flex items-start gap-3"><div className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${winner ? 'bg-amber-500/15 text-amber-400' : 'bg-primary/15 text-primary'}`}>{winner ? <TrophyIcon /> : <Award className="size-5" />}</div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-start justify-between gap-2"><div><h3 className="font-semibold tracking-tight">{certificate.eventName}</h3><p className="mt-1 text-sm text-muted-foreground">{certificate.certificateTitle}</p></div><Badge variant="outline" className={winner ? 'border-amber-500/30 bg-amber-500/15 text-amber-400' : 'border-primary/30 bg-primary/15 text-primary'}>{winner ? `🏆 ${certificate.rank} Winner` : 'Participant'}</Badge></div><div className="mt-4 grid gap-1 text-sm text-muted-foreground"><p>{certificate.certificateType}{certificate.rank ? ` · ${certificate.rank}` : ''}</p><p>Issued {formatDate(certificate.issueDate)}</p><p className="text-emerald-400">{certificate.status}</p></div><Button variant="outline" size="sm" className="mt-4" onClick={() => setSelected(certificate)}><Eye className="size-4" />View Certificate</Button></div></div></Card>
  })}</div>}<Dialog open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}><DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-3xl"><DialogHeader><DialogTitle>My Certificate</DialogTitle><DialogDescription>Certificate preview</DialogDescription></DialogHeader>{selected && <CertificatePreview certificate={selected} />}</DialogContent></Dialog></>
}

function TrophyIcon() { return <Medal className="size-5" /> }
