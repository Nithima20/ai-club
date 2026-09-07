import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Megaphone,
  ClipboardCheck,
  FolderGit2,
  Award,
  BarChart3,
  BookOpen,
  Images,
  type LucideIcon,
} from 'lucide-react'
import type { UserRole } from '@/types'

export interface NavItem {
  label: string
  href: string
  icon: LucideIcon
}

export interface PortalConfig {
  role: UserRole
  title: string
  accent: string
  basePath: string
  nav: NavItem[]
}

export const portalConfigs: Record<UserRole, PortalConfig> = {
  staff: {
    role: 'staff',
    title: 'Staff Portal',
    accent: '#a78bfa',
    basePath: '/staff',
    nav: [
      { label: 'Overview', href: '/staff', icon: LayoutDashboard },
      { label: 'Events', href: '/staff/events', icon: CalendarDays },
      { label: 'Members', href: '/staff/members', icon: Users },
      { label: 'Announcements', href: '/staff/announcements', icon: Megaphone },
      { label: 'Projects', href: '/staff/projects', icon: FolderGit2 },
      { label: 'Certificates', href: '/staff/certificates', icon: Award },
      { label: 'Reports', href: '/staff/reports', icon: BarChart3 },
    ],
  },
  coordinator: {
    role: 'coordinator',
    title: 'Coordinator Portal',
    accent: '#38bdf8',
    basePath: '/coordinator',
    nav: [
      { label: 'Overview', href: '/coordinator', icon: LayoutDashboard },
      { label: 'My Events', href: '/coordinator/events', icon: CalendarDays },
      { label: 'Registrations', href: '/coordinator/registrations', icon: Users },
      { label: 'Attendance', href: '/coordinator/attendance', icon: ClipboardCheck },
      { label: 'Announcements', href: '/coordinator/announcements', icon: Megaphone },
    ],
  },
  member: {
    role: 'member',
    title: 'Member Portal',
    accent: '#34d399',
    basePath: '/member',
    nav: [
      { label: 'Overview', href: '/member', icon: LayoutDashboard },
      { label: 'Events', href: '/member/events', icon: CalendarDays },
      { label: 'Certificates', href: '/member/certificates', icon: Award },
      { label: 'Resources', href: '/member/resources', icon: BookOpen },
      { label: 'Gallery', href: '/member/gallery', icon: Images },
    ],
  },
}
