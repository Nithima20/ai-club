'use client'

import { certificates as seedCertificates } from '@/data/mock-data'
import type { Certificate } from '@/types'

export type CertificateIssueInput = Omit<Certificate, 'id' | 'credentialId' | 'status'>
const STORAGE_KEY = 'ai-club-certificates'
const COUNTER_KEY = 'ai-club-certificate-counter'

function readCertificates() {
  if (typeof window === 'undefined') return [...seedCertificates]
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored ? (JSON.parse(stored) as Certificate[]) : [...seedCertificates]
  } catch {
    return [...seedCertificates]
  }
}

function writeCertificates(certificates: Certificate[]) {
  if (typeof window !== 'undefined') window.localStorage.setItem(STORAGE_KEY, JSON.stringify(certificates))
}

function nextCertificateId() {
  const current = Number(window.localStorage.getItem(COUNTER_KEY) ?? '0') + 1
  window.localStorage.setItem(COUNTER_KEY, String(current))
  return `HADES-${new Date().getFullYear()}-${String(current).padStart(5, '0')}`
}

export const certificateService = {
  list: () => readCertificates(),
  listByStudent: (studentId: string) => readCertificates().filter((item) => item.studentId === studentId),
  issue: (input: CertificateIssueInput): Certificate => {
    const certificate: Certificate = {
      ...input,
      id: crypto.randomUUID(),
      credentialId: nextCertificateId(),
      status: 'Issued',
    }
    writeCertificates([certificate, ...readCertificates()])
    return certificate
  },
}
