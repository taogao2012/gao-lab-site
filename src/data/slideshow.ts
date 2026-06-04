// Curated research-accomplishment slides for the moving banner at the top of /news/.
// Each slide pairs an image with a one-line caption and a link the user can click.
// Source images live at G:\My Drive\6-website\home-gallery\ (top level — current highlights).
// Older highlights in home-gallery\previous\ feed the gallery's "highlights" category instead.

export type Slide = {
  image: string;
  caption: string;
  href: string;
};

export const slides: Slide[] = [
  {
    image: '/images/slideshow/nsf-career.png',
    caption: 'Dr. Gao receives NSF CAREER award',
    href: 'https://www.che.utah.edu/career-tao-gao-is-exploring-iron-chemistry-for-green-applications/',
  },
  {
    image: '/images/slideshow/doe-grant.jpg',
    caption: 'SuPER AI lab awarded DOE grant on co-production of Li, Mg, K',
    href: '/news/',
  },
  {
    image: '/images/slideshow/science-insertion-kinetics.png',
    caption: 'Our work on the insertion reaction kinetics is published in Science',
    href: 'https://www.science.org/doi/abs/10.1126/science.adq2541',
  },
  {
    image: '/images/slideshow/nature-chem-li-deposition.png',
    caption: 'Our views on Li deposition is published in Nature Chemistry',
    href: 'https://www.nature.com/articles/s41557-025-02023-3/figures/1',
  },
];
