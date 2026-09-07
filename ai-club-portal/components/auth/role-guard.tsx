'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/services/auth'
import type { AuthRole } from '@/types'

export function RoleGuard({
  role,
  children,
}: {
  role: AuthRole
  children: React.ReactNode
}) {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    if (auth.hasRole(role)) {
      setAuthorized(true)
      return
    }

    router.replace('/')
  }, [role, router])

  if (!authorized) return null
  return children
}
