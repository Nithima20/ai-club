// Service facade. Replace repository calls with HTTP requests when the backend
// is introduced; route pages and UI components can keep their current contracts.

import { mockRepository } from '@/services/mock-repository'
import type {
  User,
  ClubEvent,
  Registration,
  AttendanceRecord,
  Announcement,
  Project,
  Certificate,
  GalleryItem,
  Resource,
  Activity,
  Report,
  UserRole,
} from '@/types'

// Simulates network latency so loading states behave realistically.
const delay = <T>(data: T, ms = 250): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms))

const list = <T>(data: readonly T[]): T[] => [...data]

export const api = {
  // Users
  getUsers: () => delay(list(mockRepository.users)),
  getUsersByRole: (role: UserRole) => delay(mockRepository.users.filter((u) => u.role === role)),
  getUser: (id: string) => delay(mockRepository.users.find((u) => u.id === id) ?? null),

  // Events
  getEvents: () => delay(list(mockRepository.events)),
  getEvent: (id: string) => delay(mockRepository.events.find((e) => e.id === id) ?? null),
  getEventsByCoordinator: (coordinatorId: string) =>
    delay(mockRepository.events.filter((e) => e.coordinatorId === coordinatorId)),

  // Registrations
  getRegistrations: () => delay(list(mockRepository.registrations)),
  getRegistrationsByUser: (userId: string) =>
    delay(mockRepository.registrations.filter((r) => r.userId === userId)),
  getRegistrationsByEvent: (eventId: string) =>
    delay(mockRepository.registrations.filter((r) => r.eventId === eventId)),

  // Attendance
  getAttendance: () => delay(list(mockRepository.attendance)),
  getAttendanceByUser: (userId: string) =>
    delay(mockRepository.attendance.filter((a) => a.userId === userId)),

  // Announcements
  getAnnouncements: () => delay(list(mockRepository.announcements)),

  // Projects
  getProjects: () => delay(list(mockRepository.projects)),
  getProjectsByMember: (userId: string) =>
    delay(mockRepository.projects.filter((p) => p.members.includes(userId))),

  // Certificates
  getCertificates: () => delay(list(mockRepository.certificates)),
  getCertificatesByUser: (userId: string) =>
    delay(mockRepository.certificates.filter((c) => c.studentId === userId)),

  // Gallery
  getGallery: () => delay(list(mockRepository.gallery)),

  // Resources
  getResources: () => delay(list(mockRepository.resources)),

  // Activities
  getActivities: () => delay(list(mockRepository.activities)),

  // Reports
  getReports: () => delay(list(mockRepository.reports)),
}

export type {
  User,
  ClubEvent,
  Registration,
  AttendanceRecord,
  Announcement,
  Project,
  Certificate,
  GalleryItem,
  Resource,
  Activity,
  Report,
}
