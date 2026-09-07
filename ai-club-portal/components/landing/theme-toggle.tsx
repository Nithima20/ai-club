'use client'

import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

export type LandingTheme = 'dark' | 'light'

export function ThemeToggle({
  theme,
  onToggle,
}: {
  theme: LandingTheme
  onToggle: () => void
}) {
  const isLight = theme === 'light'

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={onToggle}
      aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      title={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      className="border-border/70 bg-card/80 shadow-sm transition-colors hover:bg-card"
    >
      {isLight ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  )
}
