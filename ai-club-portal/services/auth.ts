// Mock authentication + role-based access scaffold.
// Currently role selection is simulated. Swap these functions for real calls to
// an auth backend (Better Auth / Supabase / custom) without changing consumers.

import type { AuthRole, AuthSession, User, UserRole } from '@/types'
import { mockRepository } from '@/services/mock-repository'

const SESSION_KEY = 'ai-club-session'

// A representative user for each role, used when a portal is entered directly.
const roleDefaults: Record<UserRole, string> = {
  staff: 'u1',
  coordinator: 'u2',
  member: 'u3',
}

const roleMap: Record<AuthRole, UserRole> = {
  ADMIN: 'staff',
  COORDINATOR: 'coordinator',
  MEMBER: 'member',
}

function isAuthRole(value: unknown): value is AuthRole {
  return value === 'ADMIN' || value === 'COORDINATOR' || value === 'MEMBER'
}

function isSession(value: unknown): value is AuthSession {
  if (!value || typeof value !== 'object') return false
  const session = value as Partial<AuthSession>
  return typeof session.userId === 'string' && isAuthRole(session.role)
}

export const auth = {
  // Simulated login by the portal role selected on the landing page.
  loginAsPortal(role: AuthRole): User {
    return this.loginAsDomainRole(roleMap[role], role)
  },

  loginAs(role: UserRole): User {
    const authRole: AuthRole = role === 'staff' ? 'ADMIN' : role === 'coordinator' ? 'COORDINATOR' : 'MEMBER'
    return this.loginAsDomainRole(role, authRole)
  },

  loginAsDomainRole(role: UserRole, authRole: AuthRole): User {
    const user = mockRepository.users.find((u) => u.id === roleDefaults[role]) ?? mockRepository.users[0]
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(SESSION_KEY, JSON.stringify({ userId: user.id, role: authRole }))
    }
    return user
  },

  getSession(): AuthSession | null {
    if (typeof window === 'undefined') return null
    const raw = window.localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    try {
      const parsed: unknown = JSON.parse(raw)
      return isSession(parsed) ? parsed : null
    } catch {
      return null
    }
  },

  getCurrentUser(fallbackRole: UserRole): User {
    const session = this.getSession()
    const id = session?.userId ?? roleDefaults[fallbackRole]
    return mockRepository.users.find((u) => u.id === id) ?? mockRepository.users[0]
  },

  hasRole(role: AuthRole): boolean {
    return this.getSession()?.role === role
  },

  logout() {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(SESSION_KEY)
    }
  },
}
