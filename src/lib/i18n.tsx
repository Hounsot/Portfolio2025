import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Project } from '@/data/projects'

export type Lang = 'en' | 'ru'

const en = {
  name: 'Matvey Vasilyev',
  role: 'Senior product designer · MTS Bank, HSE',
  statusLine: 'Senior product designer',
  aboutMe: 'About me',
  experienceBank: 'Product design · R&D',
  experienceTeaching: 'Teaching web development',
  experiencePik: 'Lead Digital Designer',
  experienceSamolet: 'Senior Digital Designer',
  present: 'Present',
  likeCase: 'Like this case',
  unlikeCase: 'Remove like',
  likesUnavailable: 'Likes are temporarily unavailable',
  likeError: 'Could not save your like. Try again.',
  previously: 'Previously',
  selectedClients: 'Worked with',
  bankName: 'MTS Bank',
  universityName: 'HSE University',
  clientNames: 'Yandex Market, Magnit Market, VTB, HSE University and VK.',
  contactBlurb: 'Product design, design systems and AI workflows. Usually reply within a day.',
  email: 'Email',
  telegram: 'Telegram',
  sayHi: 'Say hi',
  copied: 'Copied',
  downloadCv: 'Download CV',
  close: 'Close',
  mute: 'Mute sound',
  unmute: 'Unmute sound',
  focusCase: 'Focus on case',
  focus: 'Focus',
  restoreReel: 'Restore split view',
  splitView: 'Split view',
  contactAria: 'Contact Matvey Vasilyev',
  cases: 'Cases',
  wall: 'Wall',
  allCases: 'All cases',
  casesCount: 'Cases · {n}',
  hoverHint: 'Hover to play · Click to open',
  wallCount: 'Wall · {n} frames from {m} cases',
  shuffle: 'Shuffle',
  openCase: 'Open case',
  previewImage: 'Preview image',
  pinned: 'Pinned',
  comingSoon: 'Coming soon',
  follow: 'Follow',
  originalSound: 'original sound',
  paused: 'Paused',
  talk: 'Talk',
  share: 'Share',
  prevCase: 'Previous case',
  nextCase: 'Next case',
  next: 'Next',
  overview: 'Overview',
  reelHint: 'hold to pause, double-tap to like.',
  ctaQuestion: 'Need this for your product?',
  ctaAction: 'Contact me',
  caption: 'Fig. {n} — Caption placeholder: what this screen shows and why it matters.',
  docTitle: 'Matvey Vasilyev — Product designer',
  readCase: 'Read the case',
  contactHeadline: "Let's build something people actually use.",
  back: 'Back',
}

const ru: typeof en = {
  name: 'Матвей Васильев',
  role: 'Senior продуктовый дизайнер · МТС Банк, ВШЭ',
  statusLine: 'Senior продуктовый дизайнер',
  aboutMe: 'Обо мне',
  experienceBank: 'Продуктовый дизайн · R&D',
  experienceTeaching: 'Преподаю веб-разработку',
  experiencePik: 'Lead Digital Designer',
  experienceSamolet: 'Senior Digital Designer',
  present: 'Сейчас',
  likeCase: 'Поставить лайк',
  unlikeCase: 'Убрать лайк',
  likesUnavailable: 'Лайки временно недоступны',
  likeError: 'Не удалось сохранить лайк. Попробуйте ещё раз.',
  previously: 'Ранее',
  selectedClients: 'Работал с',
  bankName: 'МТС Банк',
  universityName: 'ВШЭ',
  clientNames: 'Яндекс Маркет, Магнит Маркет, ВТБ, ВШЭ и ВК.',
  contactBlurb: 'Продуктовый дизайн, дизайн-системы и AI-воркфлоу. Обычно отвечаю в течение дня.',
  email: 'Почта',
  telegram: 'Telegram',
  sayHi: 'Написать',
  copied: 'Скопировано',
  downloadCv: 'Скачать резюме',
  close: 'Закрыть',
  mute: 'Выключить звук',
  unmute: 'Включить звук',
  focusCase: 'Сфокусироваться на кейсе',
  focus: 'Фокус',
  restoreReel: 'Вернуть рилс и описание',
  splitView: 'Разделённый вид',
  contactAria: 'Связаться с Матвеем Васильевым',
  cases: 'Кейсы',
  wall: 'Стена',
  allCases: 'Все кейсы',
  casesCount: 'Кейсы · {n}',
  hoverHint: 'Наведите, чтобы смотреть · Нажмите, чтобы открыть',
  wallCount: 'Стена · {n} кадров из {m} кейсов',
  shuffle: 'Перемешать',
  openCase: 'Открыть кейс',
  previewImage: 'Посмотреть изображение',
  pinned: 'Закреплено',
  comingSoon: 'Скоро',
  follow: 'Подписаться',
  originalSound: 'оригинальный звук',
  paused: 'Пауза',
  talk: 'Связь',
  share: 'Поделиться',
  prevCase: 'Предыдущий кейс',
  nextCase: 'Следующий кейс',
  next: 'Дальше',
  overview: 'Обзор',
  reelHint: 'удерживайте для паузы, двойной клик — лайк.',
  ctaQuestion: 'Нужно такое для вашего продукта?',
  ctaAction: 'Связаться',
  caption: 'Рис. {n} — Подпись-заглушка: что показывает экран и почему это важно.',
  docTitle: 'Матвей Васильев — продуктовый дизайнер',
  readCase: 'Читать кейс',
  contactHeadline: 'Давайте сделаем то, чем действительно пользуются.',
  back: 'Назад',
}

export type Key = keyof typeof en
const dict = { en, ru }

// Placeholder narrative — real copy will be supplied later.
export const notesByLang = {
  en: [
    { kicker: 'Problem', title: 'What was broken, and for whom.', text: 'Describe the user pain and the business constraint here. One or two sentences with a concrete number work best.' },
    { kicker: 'Solution', title: 'The feature, in one sentence.', text: 'Explain the key interaction shown in the reel: what the user does, what the system does in response.' },
    { kicker: 'Impact', title: 'What changed after launch.', text: 'Business and product outcomes: conversion, retention, time saved, support load. Add how it was measured.' },
  ],
  ru: [
    { kicker: 'Проблема', title: 'Что не работало и для кого.', text: 'Опишите боль пользователя и бизнес-ограничение. Лучше всего — одно-два предложения с конкретной цифрой.' },
    { kicker: 'Решение', title: 'Фича в одном предложении.', text: 'Объясните ключевое взаимодействие из ролика: что делает пользователь и как отвечает система.' },
    { kicker: 'Результат', title: 'Что изменилось после запуска.', text: 'Бизнес- и продуктовые результаты: конверсия, удержание, сэкономленное время, нагрузка на поддержку. И как это измеряли.' },
  ],
}

const projectRu: Record<string, { short: string; summary: string }> = {
  parametr: { short: 'Сайт Parametr', summary: 'Брутальный и функциональный сайт новой компании ПИК, которая строит индустриальные парки.' },
  adc: { short: 'Сообщество ADC', summary: 'ADC — сообщество молодых дизайнеров и разработчиков с уникальными предложениями и возможностью найти связи в креативных индустриях.' },
  postcraft: { short: 'Генератор HTML-писем из Figma', summary: 'Figma-плагин, превращающий автолейаут-фреймы в HTML-код писем. Используется несколькими компаниями и ускоряет работу до 72 раз.' },
  babank: { short: 'Мультибанкинг', summary: 'Концепт мультибанковского приложения для хакатона ВТБ, отмеченный наградой. Все счета в разных банках — в одном понятном интерфейсе.' },
  pik_hr: { short: 'HR-мультиплатформа', summary: 'Единая дизайн-система для подразделений ПИК — последовательная HR- и бренд-коммуникация во всей экосистеме компании.' },
  adc_hub: { short: 'Соцсеть для дизайнеров', summary: 'ADC Hub — сервис для молодых дизайнеров с уникальными предложениями и нетворкингом. Полный цикл: продвижение, дизайн и разработка.' },
  mailru: { short: 'Концепт ребрендинга', summary: 'В рамках закрытого конкурса наша команда разработала дизайн-концепцию для Mail.ru с фокусом на обновление визуальной идентичности.' },
  dada: { short: 'Креативное программирование', summary: 'Свобода: Дада Дада Дада, рёв напряжённых цветов, сплетение противоположностей и всех противоречий, гротеска, несуразностей: ЖИЗНЬ' },
  samolet: { short: 'Скоро', summary: 'Продуктовая работа для одного из крупнейших девелоперов России. Кейс в работе.' },
  market: { short: 'Скоро', summary: 'Продуктовые фичи маркетплейса. Кейс в работе.' },
}

const termRu: Record<string, string> = {
  Role: 'Роль',
  Platform: 'Платформа',
  Timeline: 'Сроки',
  Team: 'Команда',
  '— months': '— мес.',
  '48 hours': '48 часов',
  'Lead conversion': 'Конверсия в лид',
  'Time to first lead': 'Время до первого лида',
  'Templates shipped': 'Шаблонов запущено',
  Members: 'Участников',
  'Partner offers': 'Партнёрских офферов',
  'Monthly retention': 'Удержание за месяц',
  'Faster email production': 'Быстрее сборка писем',
  'Companies onboard': 'Компаний используют',
  'Emails generated': 'Писем сгенерировано',
  'Hackathon place': 'Место на хакатоне',
  'Banks connected': 'Банков подключено',
  'To any transfer': 'До любого перевода',
  'Business units': 'Подразделений',
  'Faster hiring pages': 'Быстрее страницы вакансий',
  Components: 'Компонентов',
  'Registered users': 'Пользователей',
  'WAU / MAU': 'WAU / MAU',
  'Features shipped': 'Фич запущено',
  'Brand assets': 'Бренд-носителей',
  Weeks: 'Недель',
  Designers: 'Дизайнеров',
  Sketches: 'Скетчей',
  Loops: 'Лупов',
  Manifesto: 'Манифест',
  '0 taps': '0 тапов',
  '1st': '1-е',
}

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: 'en', setLang: () => {} })

export function LangProvider({ children }: { children: ReactNode }) {
  // The language switcher is hidden for now, so the site is English-only; RU copy is kept for later.
  const [lang, setLang] = useState<Lang>('en')
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])
  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>
}

export function useLang() {
  const { lang, setLang } = useContext(Ctx)
  const t = (k: Key, vars?: Record<string, string | number>) =>
    Object.entries(vars ?? {}).reduce((s, [a, b]) => s.replace(`{${a}}`, String(b)), dict[lang][k])
  const term = (s: string) => (lang === 'ru' ? termRu[s] ?? s : s)
  /** Project copy in the current language (titles stay as brand names). */
  const loc = (p: Project) => ({
    short: lang === 'ru' ? projectRu[p.slug]?.short ?? p.short : p.short,
    summary: lang === 'ru' ? projectRu[p.slug]?.summary ?? p.summary : p.summary,
    facts: p.facts.map((f) => ({ label: term(f.label), value: term(f.value) })),
    metrics: p.metrics.map((m) => ({ value: term(m.value), label: term(m.label) })),
  })
  return { lang, setLang, t, loc }
}
