import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Heart, Volume2, VolumeX } from 'lucide-react'
import { useLang } from '@/lib/i18n'

type Props = {
  frames: string[]
  video?: string
  duration?: number
  paused?: boolean
  onDoubleLike?: () => void
  overlay?: ReactNode
  /** Hide the progress bar and shading (used for hover previews). */
  bare?: boolean
  /** No Ken Burns pan — frames simply crossfade. */
  still?: boolean
  /** Match a wrapping card's radius instead of rounding the media a second time. */
  inheritRadius?: boolean
  soundControl?: boolean
  compactControls?: boolean
  className?: string
}

/**
 * Vertical 9:16 loop that behaves like a single video: one progress bar from start to end.
 * Plays a real video when provided; until then it plays the case slides as a slow, panning loop.
 */
export default function Reel({ frames, video, duration = 3600, paused, onDoubleLike, overlay, bare, still, inheritRadius, soundControl, compactControls, className = '' }: Props) {
  const [current, setCurrent] = useState(0)
  const [muted, setMuted] = useState(true)
  const [videoProgress, setVideoProgress] = useState(0)
  const [hold, setHold] = useState(false)
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([])
  const ref = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const lastTap = useRef(0)
  const isPaused = paused || hold
  const { t } = useLang()
  const n = Math.max(1, frames.length)

  useEffect(() => {
    if (video || isPaused || frames.length < 2) return
    const timer = setTimeout(() => setCurrent((c) => (c + 1) % frames.length), duration)
    return () => clearTimeout(timer)
  }, [current, isPaused, frames.length, duration, video])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (isPaused) v.pause()
    else v.play().catch(() => {})
  }, [isPaused, video])

  const onDouble = (e: { clientX: number; clientY: number }) => {
    const r = ref.current!.getBoundingClientRect()
    const id = Date.now()
    setHearts((h) => [...h, { id, x: e.clientX - r.left, y: e.clientY - r.top }])
    setTimeout(() => setHearts((h) => h.filter((x) => x.id !== id)), 900)
    onDoubleLike?.()
  }

  return (
    <div
      ref={ref}
      className={`relative aspect-[9/16] overflow-hidden ${inheritRadius ? 'rounded-[inherit]' : 'rounded-[28px]'} bg-zinc-900 select-none ${className}`}
      onPointerDown={() => setHold(true)}
      onPointerUp={(e) => {
        setHold(false)
        // dblclick is unreliable on touch screens — detect the double tap ourselves
        if (e.pointerType === 'mouse') return
        const now = Date.now()
        if (now - lastTap.current < 280) onDouble(e)
        lastTap.current = now
      }}
      onPointerLeave={() => setHold(false)}
      onPointerCancel={() => setHold(false)}
      onDoubleClick={(e) => Date.now() - lastTap.current > 600 && onDouble(e)}
      onContextMenu={(e) => e.preventDefault()}
    >
      {video ? (
        <video
          ref={videoRef}
          src={video}
          className="absolute inset-0 size-full object-cover"
          autoPlay
          muted={!soundControl || muted}
          loop
          playsInline
          onTimeUpdate={(e) => setVideoProgress(e.currentTarget.currentTime / (e.currentTarget.duration || 1))}
        />
      ) : (
        frames.map((src, i) => {
          // only the current frame and its neighbours live in the DOM (crossfade + preload)
          const d = (i - current + n) % n
          if (d > 1 && d < n - 1) return null
          return (
          <img
            key={src + i}
            src={src}
            alt=""
            draggable={false}
            decoding="async"
            className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ${i === current ? `opacity-100 ${still ? '' : 'reel-pan'}` : 'opacity-0'}`}
            style={{
              animationDuration: `${duration + 700}ms`,
              animationPlayState: isPaused ? 'paused' : 'running',
              animationDirection: i % 2 ? 'reverse' : 'normal',
            }}
          />
          )
        })
      )}

      {/* top + bottom shading like a native reel */}
      {!bare && <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-transparent via-25% to-black/70" />}

      {overlay}
      {soundControl && (
        <button
          type="button"
          aria-label={muted ? t('unmute') : t('mute')}
          title={muted ? t('unmute') : t('mute')}
          aria-pressed={muted}
          onPointerDown={(e) => e.stopPropagation()}
          onPointerUp={(e) => e.stopPropagation()}
          onDoubleClick={(e) => e.stopPropagation()}
          onClick={(e) => { e.stopPropagation(); setMuted((value) => !value) }}
          className={`absolute ${compactControls ? 'top-1.5 right-1.5' : 'top-3 right-3'} z-30 size-10 rounded-full bg-black/35 backdrop-blur-md text-white grid place-items-center hover:bg-black/55 transition-colors focus-visible:outline-2 focus-visible:outline-white`}
        >
          {muted ? <VolumeX size={19} /> : <Volume2 size={19} />}
        </button>
      )}

      {/* one progress bar for the whole loop */}
      {!bare && (
        <div className="pointer-events-none absolute inset-x-4 bottom-3 h-[2px] rounded-full bg-white/20 overflow-hidden">
          {video ? (
            <span className="block h-full bg-white transition-[width] duration-300 ease-linear" style={{ width: `${videoProgress * 100}%` }} />
          ) : (
            <span
              key={current}
              className="reel-span block h-full bg-white"
              style={
                {
                  '--from': `${(current / n) * 100}%`,
                  '--to': `${((current + 1) / n) * 100}%`,
                  animationDuration: `${duration}ms`,
                  animationPlayState: isPaused ? 'paused' : 'running',
                } as React.CSSProperties
              }
            />
          )}
        </div>
      )}


      {hearts.map((h) => (
        <Heart
          key={h.id}
          size={96}
          className="heart-pop pointer-events-none absolute text-white fill-white"
          style={{ left: h.x - 48, top: h.y - 48 }}
        />
      ))}

      {hold && (
        <div className="pointer-events-none absolute top-5 left-1/2 -translate-x-1/2 mono text-[10px] uppercase tracking-widest bg-black/50 rounded-full px-3 py-1">
          {t('paused')}
        </div>
      )}
    </div>
  )
}
