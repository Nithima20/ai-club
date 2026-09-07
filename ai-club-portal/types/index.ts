// Core domain types for the AI Club platform.
// These are intentionally decoupled from the mock data so a real backend
// can implement the same shapes without touching UI components.

export type UserRole = 'staff' | 'coordinator' | 'member'
export type AuthRole = 'ADMIN' | 'COORDINATOR' | 'MEMBER'

export interface AuthSession {
  userId: string
  role: AuthRole
  accessToken?: string
  expiresAt?: string
}

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  department: string
  year?: string
  rollNo?: string
  designation?: string
  joinedAt: string
  points?: number
}

export type EventStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
export type EventCategory =
  | 'workshop'
  | 'hackathon'
  | 'seminar'
  | 'competition'
  | 'bootcamp'
  | 'talk'

export interface ClubEvent {
  id: string
  title: string
  description: string
  category: EventCategory
  status: EventStatus
  date: string
  time: string
  venue: string
  coordinatorId: string
  capacity: number
  registered: number
  image?: string
  points: number
}

export type RegistrationStatus = 'confirmed' | 'pending' | 'waitlisted' | 'cancelled'

export interface Registration {
  id: string
  eventId: string
  userId: string
  status: RegistrationStatus
  registeredAt: string
}

export interface AttendanceRecord {
  id: string
  eventId: string
  userId: string
  present: boolean
  markedAt: string
}

export type AnnouncementPriority = 'low' | 'normal' | 'high'

export interface Announcement {
  id: string
  title: string
  body: string
  author: string
  priority: AnnouncementPriority
  createdAt: string
  audience: UserRole[] | 'all'
}

export type ProjectStatus = 'submitted' | 'in-review' | 'approved' | 'rejected'

export interface Project {
  id: string
  title: string
  description: string
  members: string[]
  techStack: string[]
  status: ProjectStatus
  submittedAt: string
  repoUrl?: string
}

export type CertificateType = 'Participant' | 'Prize Winner'
export type CertificateRank = '1st Prize' | '2nd Prize' | '3rd Prize'
export type CertificateStatus = 'Issued'

export interface Certificate {
  id: string
  studentId: string
  studentName: string
  studentYear: string
  studentDepartment?: string
  studentRollNo?: string
  eventId: string
  eventName: string
  eventDate?: string
  certificateType: CertificateType
  rank?: CertificateRank
  certificateTitle: string
  issueDate: string
  status: CertificateStatus
  fileUrl?: string
  fileName?: string
  credentialId: string
  templateDataUrl?: string
}

export interface GalleryItem {
  id: string
  title: string
  eventId?: string
  image: string
  date: string
}

export type ResourceType = 'pdf' | 'video' | 'link' | 'dataset' | 'notebook'

export interface Resource {
  id: string
  title: string
  type: ResourceType
  url: string
  addedAt: string
  tags: string[]
}

export interface Activity {
  id: string
  actor: string
  action: string
  target: string
  timestamp: string
}

export interface Report {
  id: string
  title: string
  period: string
  generatedAt: string
  summary: string
  metric: string
}

export interface StatCard {
  label: string
  value: string
  change?: string
  trend?: 'up' | 'down' | 'neutral'
}
