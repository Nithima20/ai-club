'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Home } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { AiClubLogo } from '@/components/brand/logos'
import { portalConfigs } from './nav-config'
import { auth } from '@/services/auth'
import type { UserRole } from '@/types'

function initials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
}

function NavLinks({
  role,
  onNavigate,
}: {
  role: UserRole
  onNavigate?: () => void
}) {
  const pathname = usePathname()
  const config = portalConfigs[role]

  return (
    <nav className="flex flex-col gap-1">
      {config.nav.map((item) => {
        const active = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
              active
                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                : 'text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground',
            )}
          >
            <item.icon
              className="size-4.5 shrink-0"
              style={active ? { color: config.accent } : undefined}
              strokeWidth={1.8}
            />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

function SidebarContent({
  role,
  onNavigate,
}: {
  role: UserRole
  onNavigate?: () => void
}) {
  const config = portalConfigs[role]
  const user = auth.getCurrentUser(role)

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 px-5 py-5">
        <AiClubLogo size={38} />
        <div className="leading-tight">
          <p className="text-sm font-semibold">AI Club</p>
          <p className="text-xs" style={{ color: config.accent }}>
            {config.title}
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-2">
        <NavLinks role={role} onNavigate={onNavigate} />
      </div>

      <div className="border-t border-sidebar-border px-3 py-3">
        <div className="mb-2 flex items-center gap-3 rounded-lg px-2 py-2">
          <Avatar className="size-9">
            <AvatarFallback className="bg-secondary text-xs">
              {initials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 leading-tight">
            <p className="truncate text-sm font-medium">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">
              {user.designation ?? user.year ?? user.department}
            </p>
          </div>
        </div>
        <Button
          nativeButton={false}
          render={
            <Link
              href="/"
              onClick={() => auth.logout()}
              className="w-full justify-start text-muted-foreground"
            />
          }
          variant="ghost"
          size="sm"
        >
            <Home className="size-4" />
            Back to Home
        </Button>
      </div>
    </div>
  )
}

export function DashboardShell({
  role,
  title,
  description,
  action,
  children,
}: {
  role: UserRole
  title: string
  description?: string
  action?: React.ReactNode
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex min-h-dvh bg-background">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 border-r border-sidebar-border bg-sidebar lg:block">
        <SidebarContent role={role} />
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-4 border-b border-border/60 bg-background/80 px-4 py-3.5 backdrop-blur-md sm:px-6">
          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="lg:hidden" />
              }
            >
              <Menu className="size-5" />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 bg-sidebar p-0">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <SidebarContent role={role} onNavigate={() => setOpen(false)} />
            </SheetContent>
          </Sheet>

          <div className="min-w-0 flex-1">
            <h1 className="truncate text-lg font-semibold tracking-tight sm:text-xl">
              {title}
            </h1>
            {description && (
              <p className="truncate text-sm text-muted-foreground">{description}</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            {action}
            <Button
              nativeButton={false}
              render={<Link href="/" aria-label="Home" />}
              variant="ghost"
              size="icon"
              className="hidden sm:inline-flex"
            >
                <Home className="size-5" />
            </Button>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  )
}
