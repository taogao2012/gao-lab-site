export type AlumniDestination = {
  name: string;
  short?: string;
  logo: string;
  url?: string;
};

// Curated showcase of where SuPER Lab alumni go next.
// Logo files live at public/images/logos/<slug>.{svg,png}.
// When a logo file is missing, the destination renders as its short label as a fallback.
export const destinations: AlumniDestination[] = [
  { name: 'University of California, Los Angeles', short: 'UCLA',
    logo: '/images/logos/ucla.svg', url: 'https://www.ucla.edu' },
  { name: 'University of Colorado Boulder', short: 'CU Boulder',
    logo: '/images/logos/cu-boulder.svg', url: 'https://www.colorado.edu' },
  { name: 'University of Chicago', short: 'U Chicago',
    logo: '/images/logos/u-chicago.svg', url: 'https://www.uchicago.edu' },
  { name: 'Delft University of Technology', short: 'TU Delft',
    logo: '/images/logos/tu-delft.svg', url: 'https://www.tudelft.nl' },
  { name: 'Joby Aviation', short: 'Joby',
    logo: '/images/logos/joby.svg', url: 'https://www.jobyaviation.com' },
  { name: 'Element Energy', short: 'Element',
    logo: '/images/logos/element-energy.svg', url: 'https://www.elementenergy.com' },
  { name: 'Corning', short: 'Corning',
    logo: '/images/logos/corning.svg', url: 'https://www.corning.com' },
  { name: 'Rice University', short: 'Rice',
    logo: '/images/logos/rice.svg', url: 'https://www.rice.edu' },
  { name: 'University of California, Irvine', short: 'UC Irvine',
    logo: '/images/logos/uc-irvine.svg', url: 'https://uci.edu' },
  { name: 'University of California, Riverside', short: 'UC Riverside',
    logo: '/images/logos/uc-riverside.svg', url: 'https://www.ucr.edu' },
  { name: 'Bumpers', short: 'Bumpers',
    logo: '/images/logos/bumpers.svg' },
];
