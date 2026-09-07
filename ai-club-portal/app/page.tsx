'use client'

import { useEffect, useState } from 'react'
import { Shield, Compass, Users, Sparkles } from 'lucide-react'
import { PortalCard } from '@/components/landing/portal-card'
import { ThemeToggle, type LandingTheme } from '@/components/landing/theme-toggle'
import { AiClubLogo, CollegeLogo } from '@/components/brand/logos'

const portals = [
  {
    icon: Shield,
    title: 'Staff Portal',
    subtitle:
      'Manage events, members, announcements, reports and every club activity from one command center.',
    href: '/staff',
    role: 'ADMIN' as const,
    cta: 'Enter Staff Portal',
    accent: '#a78bfa',
  },
  {
    icon: Compass,
    title: 'Student Coordinator Portal',
    subtitle:
      'Manage assigned events, registrations, attendance and announcements with coordinator tools.',
    href: '/coordinator',
    role: 'COORDINATOR' as const,
    cta: 'Enter Coordinator Portal',
    accent: '#38bdf8',
  },
  {
    icon: Users,
    title: 'Club Member Portal',
    subtitle:
      'Register for events, track attendance, view certificates and explore all club activities.',
    href: '/member',
    role: 'MEMBER' as const,
    cta: 'Enter Member Portal',
    accent: '#34d399',
  },
]

export default function LandingPage() {
  const [theme, setTheme] = useState<LandingTheme>('dark')

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('ai-club-theme')
    if (savedTheme === 'light' || savedTheme === 'dark') setTheme(savedTheme)
  }, [])

  function toggleTheme() {
    setTheme((currentTheme) => {
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark'
      window.localStorage.setItem('ai-club-theme', nextTheme)
      return nextTheme
    })
  }

  return (
    <main className={`landing-page ${theme === 'light' ? 'landing-light' : ''} relative min-h-screen overflow-x-hidden overflow-y-auto`}>

      {/* Header */}
      <header className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-1 px-6 py-2.5 text-center sm:py-3">
        <div className="absolute right-6 top-3">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
        <CollegeLogo width={170} />
        <div className="space-y-0.5">
          <p className="text-sm font-medium text-foreground sm:text-base">
            CK College of Engineering and Technology
          </p>
          <p className="text-xs text-muted-foreground">(Autonomous Institution)</p>
        </div>
      </header>

      <div className="relative z-10 mx-auto w-[min(92%,72rem)] border-t border-border/60" />

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-4 pt-4 text-center sm:pb-5 sm:pt-5">
        <div className="mx-auto mt-3 flex max-w-5xl flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <div className="flex shrink-0 items-center justify-center">
            <AiClubLogo
              size={128}
              presentation="landing"
              className="[&>div:first-child]:!size-[clamp(6rem,10vw,8rem)]"
            />
          </div>
          <div className="hidden h-[clamp(6rem,10vw,8rem)] w-px bg-border/70 sm:block" />
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 glass px-3.5 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="size-3.5 text-primary" />
              Official Digital Platform · AI Club
            </div>
            <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent text-glow">
                AI Club
              </span>
            </h1>
            <p className="mt-2 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
              Innovate. Learn. Build the Future with AI.
            </p>
          </div>
        </div>
      </section>

      <div className="relative z-10 mx-auto w-[min(92%,72rem)] border-t border-border/60" />

      {/* Portals */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-4 pt-4 sm:pb-5 sm:pt-5">
        <div className="mb-3 text-center">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Choose your portal</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Role-based access for staff, coordinators and members.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {portals.map((p, i) => (
            <PortalCard key={p.title} {...p} index={i} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-3 text-center text-xs text-muted-foreground sm:flex-row sm:text-left">
          <p>AI Club · CK College of Engineering and Technology</p>
          <p className="text-xs">An Autonomous Institution · CavinKare Patronized Institution</p>
        </div>
      </footer>
    </main>
  )
}
