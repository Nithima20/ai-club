import { RoleGuard } from '@/components/auth/role-guard'

export default function StaffLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RoleGuard role="ADMIN">{children}</RoleGuard>
}
