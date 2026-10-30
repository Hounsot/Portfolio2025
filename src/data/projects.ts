export type Media =
  | { kind: 'image'; src: string; caption?: string }
  | { kind: 'video'; src: string; caption?: string }
  | { kind: 'embed'; src: string; caption?: string }

export type Metric = { value: string; label: string }

export type Project = {
  slug: string
  title: string
  short: string
  year: string
  roles: string[]
  summary: string
  cover: string
  /** Vertical 9:16 loop for the left reel. Falls back to cycling through `media` images. */
  reel?: string
  facts: { label: string; value: string }[]
  /** Placeholder values — real numbers will be supplied later. */
  metrics: Metric[]
  media: Media[]
  comingSoon?: boolean
}

// Assets are pre-optimised WebP (stills ≤1600px, animations as animated WebP).
const slides = (folder: string, count: number): Media[] =>
  Array.from({ length: count }, (_, i) => ({
    kind: 'image' as const,
    src: `/projects/${folder}/project_slide_${String(i + 1).padStart(2, '0')}.webp`,
  }))

const defaultFacts = (roles: string, platform: string, timeline = '— months', team = '—') => [
  { label: 'Role', value: roles },
  { label: 'Platform', value: platform },
  { label: 'Timeline', value: timeline },
  { label: 'Team', value: team },
]

export const projects: Project[] = [
  {
    slug: 'parametr',
    title: 'Parametr',
    short: 'Parametr website',
    year: '2024',
    roles: ['UI/UX', 'Management'],
    summary: "Brutal and functional website for PIK's new company building industrial parks.",
    cover: '/ParametrCover.webp',
    facts: defaultFacts('UI/UX, Management', 'Web'),
    metrics: [
      { value: '00%', label: 'Lead conversion' },
      { value: '0.0s', label: 'Time to first lead' },
      { value: '00', label: 'Templates shipped' },
    ],
    media: slides('parametr', 17),
  },
  {
    slug: 'adc',
    title: 'ADC community',
    short: 'ADC community',
    year: '2023',
    roles: ['Branding', 'UI/UX', 'Dev', 'Motion'],
    summary:
      'ADC is a community for young designers and developers with unique offers and opportunities to find connections in creative industries.',
    cover: '/ADCCover.webp',
    facts: defaultFacts('Branding, UI/UX, Dev, Motion', 'Web, Social'),
    metrics: [
      { value: '0k', label: 'Members' },
      { value: '00+', label: 'Partner offers' },
      { value: '00%', label: 'Monthly retention' },
    ],
    media: slides('adc', 13),
  },
  {
    slug: 'postcraft',
    title: 'Postcraft',
    short: 'Figma → HTML email generator',
    year: '2024',
    roles: ['UI/UX', 'Dev', 'Management'],
    summary:
      'Figma plugin that converts autolayout frames to email HTML code. Used by multiple companies, achieving up to 72X productivity improvements.',
    cover: '/PostcraftCover.webp',
    facts: defaultFacts('UI/UX, Dev, Management', 'Figma plugin'),
    metrics: [
      { value: '72×', label: 'Faster email production' },
      { value: '00', label: 'Companies onboard' },
      { value: '0k', label: 'Emails generated' },
    ],
    media: slides('postcraft', 4),
  },
  {
    slug: 'babank',
    title: 'BaBank',
    short: 'Multibanking app',
    year: '2023',
    roles: ['UI/UX', 'Digital'],
    summary:
      'Award-winning multibanking app concept designed for VTB hackathon. Simplified financial management by consolidating multiple bank accounts into a single, intuitive interface.',
    cover: '/BaBankCover.webp',
    facts: defaultFacts('UI/UX, Digital', 'iOS, Android', '48 hours'),
    metrics: [
      { value: '1st', label: 'Hackathon place' },
      { value: '00', label: 'Banks connected' },
      { value: '0 taps', label: 'To any transfer' },
    ],
    media: slides('babank', 13),
  },
  {
    slug: 'pik_hr',
    title: 'PIK × HH.RU',
    short: 'HR multi-platform',
    year: '2024',
    roles: ['UI', 'Web', 'Management'],
    summary:
      'A unified design system for numerous PIK units, ensuring consistent HR/brand communication across the entire company ecosystem.',
    cover: '/PikHrCover.webp',
    facts: defaultFacts('UI/UX, Communication', 'Web, HH.RU'),
    metrics: [
      { value: '00', label: 'Business units' },
      { value: '00%', label: 'Faster hiring pages' },
      { value: '000', label: 'Components' },
    ],
    media: slides('pik_hr', 7),
  },
  {
    slug: 'adc_hub',
    title: 'ADC Hub',
    short: 'Social network for designers',
    year: '2025',
    roles: ['Branding', 'UI/UX', 'Dev', 'Motion'],
    summary:
      'ADC Hub is a service hub for young designers with unique offers and networking opportunities. Full project delivery included promotion, design, and development.',
    cover: '/AdcHubCover.webp',
    facts: defaultFacts('Branding, UI/UX, Dev, Motion', 'Web app'),
    metrics: [
      { value: '0k', label: 'Registered users' },
      { value: '00%', label: 'WAU / MAU' },
      { value: '00', label: 'Features shipped' },
    ],
    media: [
      { kind: 'image', src: '/projects/adchub/AdcHubCover.webp' },
      { kind: 'embed', src: 'https://kinescope.io/tFYxxS3JPzUYwsfLRaJFXx' },
      ...slides('adchub', 21),
      { kind: 'embed', src: 'https://kinescope.io/7cYhUzJv2cftEZZUPjD6MS' },
    ],
  },
  {
    slug: 'mailru',
    title: 'Mail.ru',
    short: 'Rebranding concept',
    year: '2023',
    roles: ['Branding'],
    summary:
      'As part of a closed competition, our team developed a design concept for Mail.ru. The project focused on modernizing the visual identity.',
    cover: '/MailCover.webp',
    facts: defaultFacts('Branding, Digital', 'Identity'),
    metrics: [
      { value: '00', label: 'Brand assets' },
      { value: '0', label: 'Weeks' },
      { value: '0', label: 'Designers' },
    ],
    media: slides('mailru', 6),
  },
  {
    slug: 'dada',
    title: 'Neo-Dada Manifesto',
    short: 'Creative coding',
    year: '2022',
    roles: ['Motion', 'Creative coding'],
    summary:
      'Freedom: Dada Dada Dada, a roaring of tense colors, and interlacing of opposites and of all contradictions, grotesques, inconsistencies: LIFE',
    cover: '/DadaCover.webp',
    facts: defaultFacts('Motion, Creative coding', 'Generative'),
    metrics: [
      { value: '00', label: 'Sketches' },
      { value: '∞', label: 'Loops' },
      { value: '1', label: 'Manifesto' },
    ],
    media: [{ kind: 'image', src: '/projects/dada/project_slide_01.webp' }, ...slides('dada', 11).slice(1)],
  },
  {
    slug: 'samolet',
    title: 'Samolet',
    short: 'Coming soon',
    year: '2025',
    roles: ['UI/UX', 'Digital', 'Dev'],
    summary: 'Product work for one of the largest developers in Russia. Case study in progress.',
    cover: '/SamoletCover.webp',
    facts: [],
    metrics: [],
    media: [{ kind: 'image', src: '/SamoletCover.webp' }],
    comingSoon: true,
  },
  {
    slug: 'market',
    title: 'Yandex Market',
    short: 'Coming soon',
    year: '2025',
    roles: ['UI/UX'],
    summary: 'Marketplace product features. Case study in progress.',
    cover: '/MarketCover.webp',
    facts: [],
    metrics: [],
    media: [{ kind: 'image', src: '/MarketCover.webp' }],
    comingSoon: true,
  },
]

export const reelFrames = (p: Project) => p.media.filter((m) => m.kind === 'image').map((m) => m.src)

export const contacts = {
  email: 'hounsout@yandex.ru',
  telegram: 'https://t.me/hounsout',
  telegramHandle: '@hounsout',
  cv: '/CV.pdf',
}
