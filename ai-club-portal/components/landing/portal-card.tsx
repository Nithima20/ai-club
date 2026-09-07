'use client'

import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { auth } from '@/services/auth'
import type { AuthRole } from '@/types'

interface PortalCardProps {
  icon: LucideIcon
  title: string
  subtitle: string
  href: string
  cta: string
  accent: string
  index: number
  role: AuthRole
}

export function PortalCard({
  icon: Icon,
  title,
  subtitle,
  href,
  cta,
  accent,
  index,
  role,
}: PortalCardProps) {
  return (
    <Link
      href={href}
      onClick={() => auth.loginAsPortal(role)}
      style={{ animationDelay: `${index * 120}ms` }}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 p-7',
        'glass animate-in fade-in slide-in-from-bottom-6 fill-mode-both duration-700',
        'transition-all hover:-translate-y-1.5 hover:border-primary/50',
      )}
    >
      {/* glow ring on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at 50% 0%, ${accent}22, transparent 60%)`,
        }}
      />

      <div
        className="mb-6 flex size-14 items-center justify-center rounded-xl ring-1 ring-inset ring-white/10 transition-transform duration-500 group-hover:scale-110"
        style={{ background: `linear-gradient(140deg, ${accent}33, transparent)` }}
      >
        <Icon className="size-7" style={{ color: accent }} strokeWidth={1.6} />
      </div>

      <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground text-pretty">
        {subtitle}
      </p>

      <div
        className="mt-6 inline-flex items-center gap-2 text-sm font-medium transition-colors"
        style={{ color: accent }}
      >
        {cta}
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </Link>
  )
}
