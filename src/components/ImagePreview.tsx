import { useLayoutEffect, useRef } from 'react'
import { ArrowRight, X } from 'lucide-react'
import { useLang } from '@/lib/i18n'
import type { Project } from '@/data/projects'

type Props = {
  src: string
  project: Project
  onClose: () => void
  onRead?: () => void
}

/** A wall image opens independently from its case, without changing the wall's scroll position. */
export default function ImagePreview({ src, project, onClose, onRead }: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  const { t, loc } = useLang()

  useLayoutEffect(() => {
    const dialog = ref.current!
    const trigger = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.showModal()
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      if (trigger?.isConnected) trigger.focus({ preventScroll: true })
    }
  }, [])

  return (
    <dialog
      ref={ref}
      aria-label={`${t('previewImage')}: ${project.title}`}
      onCancel={(event) => { event.preventDefault(); onClose() }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose() }}
      className="fixed inset-0 m-0 w-screen h-dvh max-w-none max-h-none border-0 p-0 overflow-y-auto bg-transparent text-zinc-50 backdrop:bg-black/80 backdrop:backdrop-blur-md"
    >
      <button
        onClick={onClose}
        aria-label={t('close')}
        className="fixed right-4 top-4 sm:right-6 sm:top-6 z-10 size-10 rounded-full bg-white/10 hover:bg-white/20 grid place-items-center transition-colors focus-visible:outline-2 focus-visible:outline-white"
      >
        <X size={21} />
      </button>
      <div className="pointer-events-none min-h-full flex flex-col items-center justify-center gap-5 px-4 sm:px-8 pt-20 pb-6 fade-in">
        <figure className="flex flex-col items-center gap-4 max-w-full">
          <img
            src={src}
            alt={project.title}
            className="pointer-events-auto block w-auto h-auto max-w-[min(1200px,calc(100vw-32px))] sm:max-w-[min(1200px,calc(100vw-64px))] rounded-xl object-contain"
            style={{ maxHeight: onRead ? 'calc(100dvh - 240px)' : 'calc(100dvh - 180px)' }}
          />
          <figcaption className="pointer-events-auto px-4 text-center">
            <h2 className="text-sm font-medium">{project.title}</h2>
            <p className="mt-1 text-xs text-zinc-400">{loc(project).short}</p>
          </figcaption>
        </figure>
        {onRead && <button
          onClick={onRead}
          className="pointer-events-auto shrink-0 flex items-center justify-center gap-3 rounded-full bg-zinc-50 px-5 py-3 text-sm font-medium text-zinc-950 hover:bg-white transition-colors"
        >
          {t('readCase')} <ArrowRight size={16} />
        </button>}
      </div>
    </dialog>
  )
}
