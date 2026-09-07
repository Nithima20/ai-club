import { RoleGuard } from '@/components/auth/role-guard'

export default function MemberLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RoleGuard role="MEMBER">{children}</RoleGuard>
}
