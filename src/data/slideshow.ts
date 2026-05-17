// Curated research-accomplishment slides for the moving banner at the top of /news/.
// Each slide pairs an image with a one-line caption and a link the user can click.
// Edit this list to add, remove, or reorder slides.

export type Slide = {
  image: string;
  caption: string;
  href: string;
};

export const slides: Slide[] = [
  {
    image: '/images/slideshow/nsf-career.png',
    caption: 'Dr. Gao receives the NSF CAREER Award (2025)',
    href: 'https://www.che.utah.edu/career-tao-gao-is-exploring-iron-chemistry-for-green-applications/',
  },
  {
    image: '/images/slideshow/doe-grant.jpg',
    caption: 'DOE grant on co-production of Li, K, Mg from Great Salt Lake brine',
    href: '/news/',
  },
  {
    image: '/images/slideshow/investigator-on-rise.png',
    caption: 'Dr. Gao receives Investigator on the Rise Award from U of Utah',
    href: 'https://www.price.utah.edu/2025/10/14/investigator-on-the-rise-tao-gao',
  },
  {
    image: '/images/slideshow/jing-liu.jpg',
    caption: "Jing Liu's paper on electrolytic ironmaking published",
    href: 'https://doi.org/10.1016/j.electacta.2025.147367',
  },
  {
    image: '/images/slideshow/rising-star-2022.jpg',
    caption: 'Dr. Gao recognized as 2022 Rising Star of Science',
    href: '/news/',
  },
  {
    image: '/images/slideshow/wos-highly-cited.png',
    caption: 'Dr. Gao receives Web of Science Highly cited researcher recognition',
    href: 'https://www.webofscience.com/wos/author/record/ABD-1559-2021',
  },
  {
    image: '/images/slideshow/jpcc-transition-metal.png',
    caption: 'Our work on the thermodynamics of transition metal deposition published in Journal of Physical Chemistry',
    href: 'https://pubs.acs.org/doi/abs/10.1021/acs.jpcc.5c06609',
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
