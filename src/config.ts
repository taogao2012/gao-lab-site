export const site = {
  name: 'SuPER Lab',
  longName: 'SuPER Lab',
  longNameExpansion: 'Sustainable Processing and Energy Resilience Lab',
  url: 'https://www.taogao-echem.net',
  description:
    'The SuPER Lab at North Carolina State University develops electrochemical materials and processes for sustainable energy storage, separation, and manufacturing.',
  // Google Analytics 4 Measurement ID, e.g. 'G-XXXXXXXXXX'. Empty string = analytics off.
  analytics: { ga4: 'G-JNJY1CM2QM' },
  pi: {
    name: 'Tao Gao',
    title: 'Associate Professor',
    department: 'Department of Chemical and Biomolecular Engineering',
    institution: 'North Carolina State University',
    orcid: '0000-0003-0204-3269',
  },
  social: {
    linkedin: 'https://www.linkedin.com/in/taogao/',
    twitter: 'https://twitter.com/TaoGao_Utah',
    twitterHandle: '@TaoGao_Utah',
    scholar: 'https://scholar.google.com/citations?user=73w5AAcAAAAJ&hl=en',
    orcid: 'https://orcid.org/0000-0003-0204-3269',
    github: 'https://github.com/',
  },
  intranet: {
    label: 'Lab Members',
    url: 'https://www.notion.so/35c58095a3ba812cb018e027060b607c',
    note: 'Notion workspace — invite required',
  },
  nav: [
    { label: 'Highlights', href: '/highlights/' },
    {
      label: 'Research',
      href: '/research/',
      children: [
        { label: 'Sustainable Processing and Critical Materials', href: '/research/01-sustainable-processing/' },
        { label: 'Energy Storage and Batteries', href: '/research/02-energy-storage/' },
        { label: 'AI and Machine Learning', href: '/research/03-ai-powered-design/' },
      ],
    },
    {
      label: 'People',
      href: '/people/',
      children: [
        { label: 'Current Members', href: '/people/current/' },
        { label: 'Alumni', href: '/people/alumni/' },
      ],
    },
    { label: 'Dr. Gao', href: '/people/pi/' },
    {
      label: 'Publications',
      href: '/publications/',
      children: [
        { label: 'Research Papers', href: '/publications/' },
        { label: 'Preprints', href: '/publications/preprints/' },
        { label: 'Conference Presentations', href: '/publications/conferences/' },
        { label: 'Patents', href: '/publications/patents/' },
      ],
    },
    { label: 'Gallery', href: '/gallery/' },
    { label: 'News', href: '/news/' },
  ],
} as const;

export type SiteConfig = typeof site;
export type NavItem = {
  label: string;
  href: string;
  children?: ReadonlyArray<{ label: string; href: string }>;
};
