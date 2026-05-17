import type { AlumniDestination } from './alumni-destinations';

// Curated showcase of where current SuPER-AI Lab members did their previous training.
// Same shape as AlumniDestination — reusable type.
// Logo files live at public/images/logos/<slug>.{svg,png,jpg}.
// When a logo file is missing, the institution renders as its short label as a fallback.
export const origins: AlumniDestination[] = [
  { name: 'Tianjin University', short: 'Tianjin U.',
    logo: '/images/logos/tianjin.jpg', url: 'https://www.tju.edu.cn/english/' },
  { name: 'South China University of Technology', short: 'SCUT',
    logo: '/images/logos/scut.png', url: 'https://www.scut.edu.cn/en/' },
  { name: 'Washington University in St. Louis', short: 'WashU',
    logo: '/images/logos/washu.svg', url: 'https://www.wustl.edu' },
  { name: 'Worcester Polytechnic Institute', short: 'WPI',
    logo: '/images/logos/wpi.svg', url: 'https://www.wpi.edu' },
  { name: 'Central Electrochemical Research Institute, India', short: 'CECRI',
    logo: '/images/logos/cecri.png', url: 'https://www.cecri.res.in' },
  { name: 'Incheon National University', short: 'Incheon NU',
    logo: '/images/logos/incheon.svg', url: 'https://www.inu.ac.kr/sites/inuengl/' },
  { name: 'Tsinghua University', short: 'Tsinghua',
    logo: '/images/logos/tsinghua.svg', url: 'https://www.tsinghua.edu.cn/en/' },
  { name: 'University of Maryland', short: 'UMD',
    logo: '/images/logos/umd.svg', url: 'https://umd.edu' },
  { name: 'Massachusetts Institute of Technology', short: 'MIT',
    logo: '/images/logos/mit.svg', url: 'https://www.mit.edu' },
  { name: 'Beijing Forestry University', short: 'BFU',
    logo: '/images/logos/bfu.jpg', url: 'https://english.bjfu.edu.cn' },
  { name: 'Chongqing University', short: 'Chongqing U.',
    logo: '/images/logos/chongqing.png', url: 'https://english.cqu.edu.cn' },
  { name: 'University of Utah', short: 'U of Utah',
    logo: '/images/logos/utah.svg', url: 'https://www.utah.edu' },
  { name: 'University of Pennsylvania', short: 'Penn',
    logo: '/images/logos/upenn.svg', url: 'https://www.upenn.edu' },
];
