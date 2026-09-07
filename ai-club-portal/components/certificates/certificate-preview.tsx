'use client'

import { formatDate } from '@/lib/format'
import type { Certificate } from '@/types'

export function CertificatePreview({ certificate }: { certificate: Pick<Certificate, 'studentName' | 'studentDepartment' | 'studentRollNo' | 'eventName' | 'eventDate' | 'certificateType' | 'rank' | 'issueDate' | 'credentialId' | 'templateDataUrl'> }) {
  return (
    <article className="certificate-sheet relative mx-auto w-full max-w-3xl overflow-hidden bg-white text-slate-900 shadow-lg" style={{ aspectRatio: '768 / 1086' }}>
      {certificate.templateDataUrl ? <img src={certificate.templateDataUrl} alt="Official college certificate template" className="absolute inset-0 size-full object-cover" /> : <div className="absolute inset-0 grid place-items-center border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">Upload the official {certificate.certificateType === 'Prize Winner' ? 'winner' : 'participant'} template to preview the approved design.</div>}
      {certificate.templateDataUrl && <div className="absolute left-[6.2%] right-[6.2%] top-[31%] text-center font-serif text-[clamp(12px,2.2vw,27px)] font-semibold italic leading-[1.9] text-[#393432]">
        <p>This is to certify that <span className="underline decoration-1 underline-offset-4">{certificate.studentName}</span>{certificate.studentRollNo ? ` (${certificate.studentRollNo})` : ''} has {certificate.certificateType === 'Prize Winner' ? `secured ${certificate.rank}` : 'participated'} in an event</p>
        <p>"{certificate.eventName}" organized by AI Club of C.K. College of Engineering and Technology, Cuddalore, Tamil Nadu, on {formatDate(certificate.eventDate ?? certificate.issueDate)}.</p>
      </div>}
      {certificate.templateDataUrl && <p className="absolute bottom-[19.5%] left-[10%] text-[clamp(7px,1vw,12px)] font-medium text-slate-700">Certificate ID: {certificate.credentialId}</p>}
      <span className="sr-only">{certificate.studentDepartment ? `Department: ${certificate.studentDepartment}. ` : ''}Generated {formatDate(certificate.issueDate)}</span>
    </article>
  )
}
