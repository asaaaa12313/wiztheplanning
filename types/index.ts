export interface Feature {
  title: string
  description: string
}

export interface StatItem {
  value: string
  label: string
}

export interface Highlight {
  title: string
  description: string
}

export interface PricingTier {
  name: string
  spec: string
  price: string
}

export interface FunnelStep {
  label: string
  value: string
  percent: number
}

export interface MediaPartner {
  name: string
  subtitle: string
  color: string
  stats: string
  description: string
  points: string[]
  tagline: string
  statItems: StatItem[]
  highlights: Highlight[]
  coverage?: string
  colorLight?: string
  colorDark?: string
  descriptionLong?: string
  mediaType?: string
  differentiator?: string
  pricing?: PricingTier[]
  funnel?: FunnelStep[]
  adSpec?: string
  dailyExposure?: string
  caseStudies?: string[]
  images?: string[]
}

export interface Service {
  id: string
  label: string
  name: string
  bigText: string
  heroTitle: string
  font: string
  subtitle: string
  accent: string
  description: string
  tags: string[]
  bgGradient: string
  decoGradient: string
  heroBg: string
  heroDeco: string
  features: Feature[]
  media?: MediaPartner[]
  video?: string
}

export interface Industry {
  name: string
  copy: string
  services: string
}
