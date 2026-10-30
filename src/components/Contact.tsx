import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { ArrowUpRight, Check, Copy, Download, X } from 'lucide-react'
import { contacts } from '@/data/projects'
import { useLang } from '@/lib/i18n'

const Ctx = createContext<{ open: () => void }>({ open: () => {} })
export const useContact = () => useContext(Ctx)

export function ContactProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const { t } = useLang()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const copy = async () => {
    await navigator.clipboard?.writeText(contacts.email).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  return (
    <Ctx.Provider value={{ open: () => setOpen(true) }}>
      {children}
      <div
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-[100] grid items-end sm:items-center justify-items-center transition-[visibility] ${isOpen ? 'visible' : 'invisible delay-300'}`}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        />
        <div
          role="dialog"
          aria-label="Contact"
          className={`relative w-full sm:w-[380px] rounded-t-[28px] sm:rounded-[24px] bg-zinc-50 text-zinc-950 px-6 pt-3 sm:p-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:pb-5 shadow-2xl transition-all duration-300 ease-[cubic-bezier(.2,.9,.3,1.15)] ${isOpen ? 'opacity-100 translate-y-0 sm:scale-100' : 'max-sm:translate-y-full sm:opacity-0 sm:scale-95 sm:translate-y-2'}`}
        >
          {/* grabber (phones) */}
          <div className="sm:hidden mx-auto mb-5 h-1 w-10 rounded-full bg-zinc-300" />

          <div className="flex items-center gap-3 max-sm:gap-4">
            <div className="relative shrink-0">
              <img src="/me-avatar.webp" alt="" className="size-16 sm:size-11 rounded-full object-cover" />
              <span className="absolute bottom-0 right-0 size-4 sm:size-3 rounded-full bg-emerald-500 ring-2 ring-zinc-50" />
            </div>
            <div className="flex-1 leading-tight">
              <div className="text-xl sm:text-base font-semibold sm:font-medium tracking-tight">{t('name')}</div>
              <div className="mt-0.5 text-[13px] sm:text-xs text-zinc-500">{t('statusLine')}</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="size-9 sm:size-8 self-start rounded-full grid place-items-center text-zinc-500 bg-zinc-200/60 sm:bg-transparent hover:bg-zinc-200 hover:text-zinc-950 transition-colors"
              aria-label={t('close')}
            >
              <X size={16} />
            </button>
          </div>

          <h2 className="sm:hidden mt-7 text-[32px] font-semibold leading-[1.02] tracking-[-0.04em]">{t('contactHeadline')}</h2>
          <p className="mt-3 sm:mt-4 text-[15px] sm:text-sm text-zinc-600 leading-relaxed">{t('contactBlurb')}</p>

          <div className="mt-6 sm:mt-4 flex flex-col gap-2 sm:gap-1.5">
            <a
              href={contacts.telegram}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 rounded-2xl sm:rounded-xl bg-zinc-950 text-zinc-50 px-4 sm:px-3.5 py-4 sm:py-3 transition-colors hover:bg-zinc-800 active:scale-[0.99]"
            >
              <span className="mono text-[10px] uppercase tracking-widest text-zinc-500 w-16">{t('telegram')}</span>
              <span className="flex-1 text-base sm:text-sm">{contacts.telegramHandle}</span>
              <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <button
              onClick={copy}
              className="group flex items-center gap-3 rounded-2xl sm:rounded-xl bg-zinc-100 sm:bg-zinc-100 max-sm:bg-zinc-200/60 hover:bg-zinc-200/70 px-4 sm:px-3.5 py-4 sm:py-3 text-left transition-colors active:scale-[0.99]"
            >
              <span className="mono text-[10px] uppercase tracking-widest text-zinc-500 w-16">{t('email')}</span>
              <span className="flex-1 text-base sm:text-sm">{contacts.email}</span>
              <span className="text-xs text-zinc-500 flex items-center gap-1">
                {copied ? (
                  <>
                    <Check size={14} /> {t('copied')}
                  </>
                ) : (
                  <Copy size={15} className="opacity-60 group-hover:opacity-100" />
                )}
              </span>
            </button>
          </div>

          <a href={contacts.cv} download className="mt-4 sm:mt-3 flex items-center justify-center gap-1.5 text-sm sm:text-xs text-zinc-500 hover:text-zinc-950 transition-colors">
            <Download size={13} /> {t('downloadCv')}
          </a>
        </div>
      </div>
    </Ctx.Provider>
  )
}
