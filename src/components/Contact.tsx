import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { ArrowUpRight, Check, Copy, Download, X } from 'lucide-react'
import { contacts } from '@/data/projects'
import { useLang } from '@/lib/i18n'

const Ctx = createContext<{ open: () => void }>({ open: () => {} })
export const useContact = () => useContext(Ctx)

export function ContactProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const { t, lang } = useLang()
  const employmentDate = (value: string) => new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : 'ru-RU', {
    day: value.length === 10 ? 'numeric' : undefined,
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${value.length === 7 ? `${value}-01` : value}T00:00:00Z`))

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
          className={`relative w-full sm:w-[380px] max-h-[90dvh] overflow-y-auto rounded-t-[28px] sm:rounded-[24px] bg-zinc-50 text-zinc-950 px-6 pt-3 sm:p-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:pb-5 shadow-2xl transition-all duration-300 ease-[cubic-bezier(.2,.9,.3,1.15)] ${isOpen ? 'opacity-100 translate-y-0 sm:scale-100' : 'max-sm:translate-y-full sm:opacity-0 sm:scale-95 sm:translate-y-2'}`}
        >
          {/* grabber (phones) */}
          <div className="sm:hidden mx-auto mb-5 h-1 w-10 rounded-full bg-zinc-300" />

          <div className="flex items-center gap-4">
            <div className="shrink-0">
              <img src="/me-avatar.jpg" alt={t('name')} className="size-20 rounded-full object-cover" />
            </div>
            <div className="flex-1 leading-tight">
              <div className="text-xl font-medium tracking-tight">{t('name')}</div>
              <div className="mt-1 text-[13px] text-zinc-500">{t('statusLine')}</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 size-8 rounded-full grid place-items-center text-zinc-500 hover:bg-zinc-200 hover:text-zinc-950 transition-colors"
              aria-label={t('close')}
            >
              <X size={16} />
            </button>
          </div>

          <section aria-label={t('aboutMe')} className="mt-5 border-t border-zinc-200 pt-4">
            <dl className="space-y-4 text-sm">
              {[
                { company: t('bankName'), role: t('experienceBank'), start: '2025-11-06', end: null },
                { company: t('universityName'), role: t('experienceTeaching'), start: '2025-09-01', end: null },
                { company: 'PIK', role: t('experiencePik'), start: '2024-07', end: '2025-11' },
                { company: 'Samolet', role: t('experienceSamolet'), start: '2023-01', end: '2024-07' },
              ].map(({ company, role, start, end }) => <div key={company}>
                <dt className="flex items-center justify-between gap-3 font-medium">
                  <span>{company}</span>
                  <span className="shrink-0 text-[11px] font-normal tabular-nums text-zinc-500">
                    <time dateTime={start}>{employmentDate(start)}</time>
                    {' — '}
                    {end ? <time dateTime={end}>{employmentDate(end)}</time> : t('present')}
                  </span>
                </dt>
                <dd className="mt-0.5 text-xs text-zinc-500">{role}</dd>
              </div>)}
            </dl>
            <p className="mt-4 text-xs leading-relaxed text-zinc-600"><span className="text-zinc-500">{t('selectedClients')} </span>{t('clientNames')}</p>
          </section>

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
