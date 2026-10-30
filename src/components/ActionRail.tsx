import { useState } from 'react'
import { Heart, Link2, Check, MessageCircle } from 'lucide-react'
import { useLike } from '@/lib/likes'
import { useContact } from './Contact'
import { useLang } from '@/lib/i18n'

function RailButton({
  onClick,
  label,
  children,
  active,
  overlay,
}: {
  overlay?: boolean
  onClick?: () => void
  label: string
  children: React.ReactNode
  active?: boolean
}) {
  return (
    <button onClick={onClick} className="group flex flex-col items-center gap-1.5" aria-label={label}>
      <span
        className={`${overlay ? 'size-11' : 'size-12'} rounded-full grid place-items-center border transition-all duration-300 group-hover:scale-110 group-active:scale-90 ${active ? 'bg-zinc-50 text-zinc-950 border-zinc-50' : overlay ? 'border-white/15 bg-black/25 backdrop-blur-md text-zinc-50' : 'border-white/10 bg-white/5 text-zinc-50 group-hover:bg-white/10'}`}
      >
        {children}
      </span>
      <span className={`mono text-[11px] tabular-nums ${overlay ? 'text-white [text-shadow:0_1px_4px_rgba(0,0,0,.6)]' : 'text-zinc-400'}`}>{label}</span>
    </button>
  )
}

export default function ActionRail({ slug, url, overlay }: { slug: string; url: string; overlay?: boolean }) {
  const { liked, count, toggle } = useLike(slug)
  const { open } = useContact()
  const { t } = useLang()
  const [copied, setCopied] = useState(false)
  const share = async () => {
    await navigator.clipboard?.writeText(window.location.origin + url).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 1400)
  }
  return (
    <div className={`flex flex-col ${overlay ? 'gap-4' : 'gap-5'}`}>
      <RailButton overlay={overlay} onClick={toggle} label={String(count)} active={liked}>
        <Heart size={20} className={liked ? 'fill-current like-bounce' : ''} />
      </RailButton>
      <RailButton overlay={overlay} onClick={open} label={t('talk')}>
        <MessageCircle size={20} />
      </RailButton>
      <RailButton overlay={overlay} onClick={share} label={copied ? t('copied') : t('share')}>
        {copied ? <Check size={20} /> : <Link2 size={20} />}
      </RailButton>
    </div>
  )
}
