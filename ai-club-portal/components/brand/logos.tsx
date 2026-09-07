import Image from 'next/image'
import { cn } from '@/lib/utils'

/**
 * Official logos — used EXACTLY as provided. Do not regenerate or restyle
 * the artwork itself; we only control layout sizing here.
 */

export function AiClubLogo({
  size = 40,
  className,
  showWordmark = false,
  presentation = 'default',
}: {
  size?: number
  className?: string
  showWordmark?: boolean
  presentation?: 'default' | 'landing'
}) {
  const isLanding = presentation === 'landing'

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div
        className={cn(
          'relative shrink-0 ring-1 ring-primary/40',
          isLanding
            ? 'rounded-xl bg-card p-1.5 shadow-sm ring-border/70'
            : 'overflow-hidden rounded-full',
        )}
        style={{ width: size, height: size }}
      >
        <Image
          src="/logos/ai-club-logo.jpeg"
          alt="AI Club logo"
          fill
          className={cn(isLanding ? 'object-contain p-1' : 'object-cover')}
          sizes="80px"
          priority
        />
      </div>
      {showWordmark && (
        <div className="leading-tight">
          <p className="font-semibold tracking-tight">AI Club</p>
          <p className="text-xs text-muted-foreground">CK College of Engineering</p>
        </div>
      )}
    </div>
  )
}

export function CollegeLogo({
  className,
  width = 180,
}: {
  className?: string
  width?: number
}) {
  return (
    <div
      className={cn('relative overflow-hidden rounded-md bg-white/95 p-1.5', className)}
      style={{ width }}
    >
      <Image
        src="/logos/college-logo.jpeg"
        alt="CK College of Engineering and Technology logo"
        width={width}
        height={Math.round(width * 0.33)}
        className="h-auto w-full object-contain"
        priority
      />
    </div>
  )
}
