import {
  users,
  events,
  registrations,
  attendance,
  announcements,
  projects,
  certificates,
  gallery,
  resources,
  activities,
  reports,
} from '@/data/mock-data'
import type {
  Activity,
  Announcement,
  AttendanceRecord,
  Certificate,
  ClubEvent,
  GalleryItem,
  Project,
  Registration,
  Report,
  Resource,
  User,
} from '@/types'

export interface MockRepository {
  users: readonly User[]
  events: readonly ClubEvent[]
  registrations: readonly Registration[]
  attendance: readonly AttendanceRecord[]
  announcements: readonly Announcement[]
  projects: readonly Project[]
  certificates: readonly Certificate[]
  gallery: readonly GalleryItem[]
  resources: readonly Resource[]
  activities: readonly Activity[]
  reports: readonly Report[]
}

export const mockRepository: MockRepository = {
  users,
  events,
  registrations,
  attendance,
  announcements,
  projects,
  certificates,
  gallery,
  resources,
  activities,
  reports,
}
