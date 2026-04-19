import { cn } from '@/lib/utils'

function Spinner({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn('relative flex items-center justify-center', className)}
      {...props}
    >
      {/* Outer slow ring */}
      <span
        className="absolute inline-block rounded-full border-4 border-accent/20 animate-spin"
        style={{
          width: '72px',
          height: '72px',
          borderTopColor: 'var(--color-accent, oklch(0.45 0.15 60))',
          animationDuration: '1s',
        }}
      />
      {/* Inner fast ring */}
      <span
        className="absolute inline-block rounded-full border-4 border-transparent animate-spin"
        style={{
          width: '48px',
          height: '48px',
          borderTopColor: 'var(--color-accent, oklch(0.45 0.15 60))',
          opacity: 0.5,
          animationDuration: '0.6s',
          animationDirection: 'reverse',
        }}
      />
      {/* Centre dot */}
      <span
        className="inline-block rounded-full bg-accent"
        style={{ width: '10px', height: '10px' }}
      />
    </div>
  )
}

export { Spinner }
