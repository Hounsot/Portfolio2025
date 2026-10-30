import type { ReactNode } from 'react'

/** Project caption with an optional full-width action underneath. */
export default function ReelOverlay({
  caption,
  captionClassName = '',
  children,
}: {
  caption: ReactNode
  /** e.g. right padding so the caption clears an overlaid action rail */
  captionClassName?: string
  children?: ReactNode
}) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 px-4 pt-5 pb-7 flex flex-col gap-2.5">
      <div className={`text-sm leading-snug text-white/90 line-clamp-2 ${captionClassName}`}>{caption}</div>
      {children && <div className="pointer-events-auto pt-1">{children}</div>}
    </div>
  )
}
