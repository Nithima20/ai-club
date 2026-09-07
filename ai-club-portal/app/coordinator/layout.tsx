import { RoleGuard } from '@/components/auth/role-guard'

export default function CoordinatorLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RoleGuard role="COORDINATOR">{children}</RoleGuard>
}
