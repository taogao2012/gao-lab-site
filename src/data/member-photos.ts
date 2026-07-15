// Photos copied from G:\My Drive\6-website\people\ into public/images/people/.
// Slugs are kebab-case of full name; some entries also map cropped variants
// or name spellings used in the CV. If a name isn't here, the page falls
// back to a placeholder.
//
// To add a member's photo:
//   1. Drop the photo at public/images/people/<slug>.jpg
//   2. Add an entry to nameToPhoto below.
//
// Naming: prefer headshots, square crops, ~600px on the long side.

const nameToPhoto: Record<string, string> = {
  // PI
  'Tao Gao': '/images/people/tao-gao.jpg',

  // Current grad
  'Induja Selvaraju': '/images/people/induja-selvaraju.jpg',
  'Jaydipkumar Bhaliya': '/images/people/jaydipkumar-bhaliya.jpg',
  'Santhana Srinivasan': '/images/people/santhana-srinivasan.jpg',
  'Thomas Webb': '/images/people/thomas-webb.jpg',
  'Xiayueyang Mei': '/images/people/xiayueyang-mei.jpg',
  'Mohammed A. Al-Ibrahim': '/images/people/mohammed-al-ibrahim.jpg',
  'Zongjian (Zach) Li': '/images/people/zongjian-li.jpg',
  'Yuxin Li': '/images/people/yuxin-li.jpg',

  // Recent grad alumni
  'Yunan (Yana) Qin': '/images/people/yunan-qin.jpg',
  'Jing Liu': '/images/people/jing-liu.png',
  'Jiwei Yao': '/images/people/jiwei-yao.jpg',
  'Shishir Gupta': '/images/people/shishir-gupta.jpg',

  // Postdocs
  'Jaemin Kim': '/images/people/jaemin-kim.jpg',
  'Yunan Qin': '/images/people/yunan-qin.jpg',
  'Sreedeep Sreekumar': '/images/people/sreedeep-sreekumar.jpg',
  'Shitong Wang': '/images/people/shitong-wang.jpg',

  // Visiting scholars
  'Faezeh Mohammadibarzlaghi': '/images/people/faezeh-mohammadibarzlaghi.jpg',

  // Current undergrads
  'Andrew Wolf': '/images/people/andrew-wolf.jpg',
  'Juliana Ortiz Castillo': '/images/people/juliana-ortiz-castillo.jpg',
  'Xzavier Oakes': '/images/people/xzavier-oakes.jpg',

  // Undergrad alumni
  'Richard Gonzalez': '/images/people/richard-gonzalez.jpg',
  'Seong Gyu Choi': '/images/people/seong-gyu-choi.jpg',
  'Hannah Frost': '/images/people/hannah-frost.jpg',
  'Lucia Mason': '/images/people/lucia-mason.jpg',
  'Brendan Wagley': '/images/people/brendan-wagley.jpg',
  'Michael Barkdull': '/images/people/michael-barkdull.jpg',
  'Alexis Friedman': '/images/people/alexis-friedman.jpg',
  'Kevin Chandler': '/images/people/kevin-chandler.jpg',
  'Nathan Jensen': '/images/people/nathan-jensen.jpg',
  'Sammy Partridge': '/images/people/sammy-partridge.png',
  'Dillon Fehlau': '/images/people/dillon-fehlau.jpg',
  'Nicolai Andreas': '/images/people/nicolai-andreas.jpg',
  'Alan Larrea Caro': '/images/people/alan-larrea-caro.jpg',

  // High-school alumni
  'Xinying Bi': '/images/people/xinying-bi.jpg',
};

export function photoFor(name: string): string | null {
  return nameToPhoto[name] ?? null;
}

export function slugFor(name: string): string {
  return name
    .toLowerCase()
    .replace(/\([^)]*\)/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
