import type { IconMap, SocialLink, Site } from '@/types'

export const SITE: Site = {
  title: 'Matteo Morotti',
  description:
    'Junior Portfolio Manager at Valeur SA. Finance professional with a Master\'s from Bocconi University, exploring portfolio management, investing, and the intersection of finance and technology.',
  href: 'https://matteomorotti.com',
  author: 'Matteo Morotti',
  locale: 'en-US',
  featuredPostCount: 2,
  postsPerPage: 3,
}

export const NAV_LINKS: SocialLink[] = [
  {
    href: '/blog',
    label: 'blog',
  },
  {
    href: '/authors',
    label: 'authors',
  },
  {
    href: '/about',
    label: 'about',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://www.linkedin.com/in/matteo-morotti/',
    label: 'LinkedIn',
  },
  {
    href: 'https://github.com/matteomorotti00',
    label: 'GitHub',
  },
  {
    href: 'mailto:matteo.morotti.it@gmail.com',
    label: 'Email',
  },
  {
    href: '/rss.xml',
    label: 'RSS',
  },
]

export const ICON_MAP: IconMap = {
  Website: 'lucide:globe',
  GitHub: 'lucide:github',
  LinkedIn: 'lucide:linkedin',
  Twitter: 'lucide:twitter',
  Email: 'lucide:mail',
  RSS: 'lucide:rss',
}
