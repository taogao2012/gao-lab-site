// Gallery items. Captions derived from the descriptive filenames in
// G:\My Drive\6-website\Gallery (the PI labels each file by hand).

export interface GalleryItem {
  src: string;
  alt: string;
  caption?: string;
  date?: string;
  category: 'highlights' | 'group' | 'event' | 'campus' | 'utah' | 'equipment' | 'pioneers';
  // YouTube video ID. If set, the item renders as an embedded video using
  // `src` as the poster/thumbnail (fall back to YouTube's hqdefault).
  youtubeId?: string;
  // External link target. When set, clicking the figure opens this URL
  // instead of the raw image.
  href?: string;
  // How the image fits its frame. Defaults to 'cover' (fills the figure and
  // may crop). Use 'contain' for logos or graphics that shouldn't be cropped.
  fit?: 'cover' | 'contain';
  // Which part of the image to keep when cropped (object-position). Defaults to
  // 'center'. Use 'top' for portrait people photos so heads aren't cut off.
  position?: 'top' | 'center' | 'bottom';
  // Extra zoom for the cropped thumbnail (e.g. 1.3 = zoom in 30%). Enlarges the
  // image within its frame; the surrounding overflow is clipped.
  zoom?: number;
}

export const galleryItems: GalleryItem[] = [
  // Highlights — older awards, grants, and research milestones.
  // Source files live in G:\My Drive\6-website\home-gallery\highlights\ (the
  // top level of home-gallery feeds the /news/ slideshow instead).
  { src: '/images/slideshow/wos-highly-cited.png', alt: 'Dr. Gao is recognized as a Web of Science Highly Cited Researcher', caption: 'Dr. Gao is recognized as a Web of Science Highly Cited Researcher', date: '2022', category: 'highlights', href: 'https://www.webofscience.com/wos/author/record/ABD-1559-2021', fit: 'contain' },
  { src: '/images/slideshow/rising-star-2022.jpg', alt: 'Dr. Gao is named a Rising Star of Science in 2022', caption: 'Dr. Gao is named a Rising Star of Science in 2022', date: '2022', category: 'highlights', fit: 'contain' },
  { src: '/images/slideshow/jing-liu.jpg', alt: 'Jing develops a new battery for the environment', caption: 'Jing develops a new battery for the environment', date: '2023-03', category: 'highlights', href: 'https://lassonde.utah.edu/a-new-battery-for-the-environment/' },
  { src: '/images/slideshow/mg-flow.png', alt: 'The Gao Lab develops magnesium flow batteries for grid-scale energy storage', caption: 'The Gao Lab develops magnesium flow batteries for grid-scale energy storage', date: '2022-03', category: 'highlights', href: 'https://doi.org/10.1021/acsaem.2c00363' },
  { src: '/images/slideshow/capture-jpg.jpg', alt: 'Dr. Gao demonstrates how to assemble a coin cell battery in a glove box', caption: 'Dr. Gao demonstrates how to assemble a coin cell battery in a glove box', date: '2021', category: 'highlights' },
  { src: '/images/slideshow/workshop-gift-goodenough.jpg', alt: "Dr. Gao attends Prof. John B. Goodenough's 98th birthday symposium in 2020", caption: "Dr. Gao attends Prof. John B. Goodenough's 98th birthday symposium in 2020", date: '2020', category: 'highlights' },
  { src: '/images/slideshow/yanaquin-lassonde.jpg', alt: 'Yana develops a magnesium-organic flow battery for low-cost energy storage', caption: 'Yana develops a magnesium-organic flow battery for low-cost energy storage', date: '2025-03', category: 'highlights', href: 'https://lassonde.utah.edu/low-cost-energy-storage/' },
  { src: '/images/slideshow/innovation-awards-2025.png', alt: 'Dr. Gao receives the Investigator on the Rise award at the 2025 U of U Innovation Awards', caption: 'Dr. Gao receives the Investigator on the Rise award at the 2025 U of U Innovation Awards', date: '2025-10', category: 'highlights', href: 'https://attheu.utah.edu/facultystaff/2025-innovation-awards-recipients/' },
  { src: '/images/slideshow/nsf-logo.svg', alt: 'Dr. Gao receives the NSF CAREER award to explore iron chemistry for green applications', caption: 'Dr. Gao receives the NSF CAREER award to explore iron chemistry for green applications', date: '2025-06', category: 'highlights', href: 'https://www.price.utah.edu/2025/06/26/career-tao-gao-is-exploring-iron-chemistry-for-green-applications', fit: 'contain' },
  { src: '/images/slideshow/our-awards-2026.png', alt: 'Dr. Gao receives the Outstanding Undergraduate Research Mentor Award from the University of Utah in 2026', caption: 'Dr. Gao receives the Outstanding Undergraduate Research Mentor Award from the University of Utah in 2026', date: '2026-04', category: 'highlights', href: 'https://our.utah.edu/awards-recognition/our-awards/' },
  { src: '/images/slideshow/our-awards-2026-plaque.jpg', alt: 'Dr. Gao with the Outstanding Undergraduate Research Mentor Award plaque from the University of Utah, 2026', caption: 'The Outstanding Undergraduate Research Mentor Award (University of Utah, 2026)', date: '2026-04', category: 'highlights', href: 'https://our.utah.edu/awards-recognition/our-awards/' },
  { src: '/images/slideshow/jpcc-transition-metal.png', alt: "Jing's work on transition metal thermodynamics is published in Journal of Physical Chemistry C", caption: "Jing's work on transition metal thermodynamics is published in Journal of Physical Chemistry C", date: '2026-02', category: 'highlights', href: 'https://doi.org/10.1021/acs.jpcc.5c06609' },
  { src: '/images/slideshow/ea-2025.png', alt: "Jing's work on iron electrowinning is published in Electrochimica Acta", caption: "Jing's work on iron electrowinning is published in Electrochimica Acta", date: '2025-09', category: 'highlights', href: 'https://doi.org/10.1016/j.electacta.2025.147367' },
  { src: '/images/slideshow/qin-2025-chemical-science.png', alt: "Yana's work on conjugated amine electrolytes is published in Chemical Science", caption: "Yana's work on conjugated amine electrolytes is published in Chemical Science", date: '2025-01', category: 'highlights', href: 'https://doi.org/10.1039/d5sc04532k', fit: 'contain' },
  { src: '/images/slideshow/yao-2024.png', alt: "Jiwei's work on physics-guided machine learning is published in Batteries", caption: "Jiwei's work on physics-guided machine learning is published in Batteries", date: '2024-08', category: 'highlights', href: 'https://doi.org/10.3390/batteries10080283' },
  { src: '/images/slideshow/qin-2024.png', alt: "Yana's work on carboxylate ester electrolytes is published in Chemical Science", caption: "Yana's work on carboxylate ester electrolytes is published in Chemical Science", date: '2024-01', category: 'highlights', href: 'https://doi.org/10.1039/d4sc02266a', fit: 'contain' },
  { src: '/images/slideshow/li-2023.png', alt: "Zongjian's work on single-oxygen ether electrolytes is published in Journal of Materials Chemistry A", caption: "Zongjian's work on single-oxygen ether electrolytes is published in Journal of Materials Chemistry A", date: '2023-01', category: 'highlights', href: 'https://doi.org/10.1039/d3ta01956j' },
  { src: '/images/slideshow/liu-2022.png', alt: "Jing's work on aqueous Fe metal batteries is published in ACS Central Science", caption: "Jing's work on aqueous Fe metal batteries is published in ACS Central Science", date: '2022-05', category: 'highlights', href: 'https://doi.org/10.1021/acscentsci.2c00293' },
  { src: '/images/slideshow/sun-2022.png', alt: "Junhui's work on lithium deposition mechanisms is published in Energy & Environmental Science", caption: "Junhui's work on lithium deposition mechanisms is published in Energy & Environmental Science", date: '2022-01', category: 'highlights', href: 'https://doi.org/10.1039/d2ee01833k', fit: 'contain' },

  // Group photos (from "group pictures/<season year>.jpg")
  { src: '/images/gallery/group/spring-2026.jpg', alt: 'Group photo, Spring 2026', caption: 'Spring 2026', date: '2026-04', category: 'group' },
  { src: '/images/gallery/group/summer-2025.png', alt: 'Group photo, Summer 2025', caption: 'Summer 2025', date: '2025-07', category: 'group' },
  { src: '/images/gallery/group/winter-2021.jpg', alt: 'Group photo, Winter 2021', caption: 'Winter 2021', date: '2021-12', category: 'group' },

  // With the pioneers in my field
  { src: '/images/gallery/pioneers/henry-white-utah-2025.jpg', alt: 'With Prof. Henry White at the Utah Electrochemistry Symposium, 2025', caption: 'With Henry White at the Utah Electrochemistry Symposium', date: '2025-07', category: 'pioneers', position: 'top' },
  { src: '/images/gallery/pioneers/john-newman-nc-state.jpg', alt: 'With Prof. John Newman at the NC State Battery Symposium, January 2025', caption: 'With John Newman at the NC State Battery Symposium', date: '2025-01', category: 'pioneers', zoom: 1.3 },
  { src: '/images/gallery/events/goodenough-97th.jpg', alt: "Celebrating Prof. John B. Goodenough's 97th birthday, Spring 2017", caption: "Celebrating Goodenough's 97th birthday", date: '2017-05', category: 'pioneers' },

  // Events (filenames carry the description)
  { src: '/images/gallery/events/2022-graduation.jpg', alt: 'Graduation of Dillon and Nico, May 2022', caption: 'Graduation of Dillon and Nico', date: '2022-05', category: 'event' },
  { src: '/images/gallery/events/2022-camping.jpg', alt: "Making S'mores during camping, June 2022", caption: "Making S'mores during camping", date: '2022-06', category: 'event' },
  { src: '/images/gallery/events/2022-camping-strawberry.jpg', alt: 'Catching crawfish at Strawberry Lake, June 2022', caption: 'Catching crawfish at Strawberry Lake', date: '2022-06', category: 'event' },
  { src: '/images/gallery/events/group-dinner-2023.jpg', alt: 'Group dinner, Fall 2023', caption: 'Group dinner', date: '2023-11', category: 'event' },
  { src: '/images/gallery/events/acs-meeting-2023.webp', alt: 'Lab students attending the ACS Meeting, Fall 2023', caption: 'Lab students at the ACS Meeting', date: '2023-09', category: 'event' },
  { src: '/images/gallery/events/first-phd-defense.png', alt: "Yana's PhD defense, Summer 2025", caption: "Yana's PhD defense", date: '2025-06', category: 'event' },
  { src: '/images/gallery/events/snack-before-seminar.jpg', alt: 'Snack before group seminar, Summer 2025', caption: 'Snack before group seminar', date: '2025-07', category: 'event' },
  { src: '/images/gallery/events/yana-glovebox-farewell-2026.jpg', alt: "Yana and Dr. Gao at the glovebox where she worked for five years; the 3-electrode schematic on the glass marks the start of her PhD, May 2026", caption: 'Yana at the glovebox where her PhD began', date: '2026-05', category: 'event' },
  { src: '/images/gallery/events/yana-farewell-bbq-2026.jpg', alt: "BBQ party in Dr. Gao's backyard before Yana's departure, May 2026", caption: "BBQ before Yana's departure", date: '2026-05', category: 'event' },

  // U of Utah campus (source files are IMG-XXXX without descriptions)
  { src: '/images/gallery/campus/u-of-utah.jpg', alt: 'University of Utah', caption: 'University of Utah', category: 'campus' },
  { src: '/images/gallery/campus/web.jpg', alt: 'University of Utah campus', caption: 'Campus', category: 'campus' },
  { src: '/images/gallery/campus/campus-1.jpg', alt: 'University of Utah campus', caption: 'Campus', category: 'campus' },
  { src: '/images/gallery/campus/campus-2.jpg', alt: 'University of Utah campus', caption: 'Campus', category: 'campus' },
  { src: '/images/gallery/campus/campus-3.jpg', alt: 'University of Utah campus', caption: 'Campus', category: 'campus' },
  { src: '/images/gallery/campus/campus-4.jpg', alt: 'University of Utah campus', caption: 'Campus', category: 'campus' },
  { src: '/images/gallery/campus/campus-5.jpg', alt: 'University of Utah campus', caption: 'Campus', category: 'campus' },
  { src: '/images/gallery/campus/campus-6.jpg', alt: 'University of Utah campus', caption: 'Campus', category: 'campus' },
  { src: '/images/gallery/campus/deer-2020.jpg', alt: 'A deer on the University of Utah campus, Winter 2020', caption: 'A deer on campus', date: '2020-12', category: 'campus' },

  // Utah & Salt Lake City (filenames are the descriptions)
  { src: '/images/gallery/utah/slc.jpg', alt: 'Salt Lake City', caption: 'Salt Lake City', category: 'utah' },
  { src: '/images/gallery/utah/slc-sunset.jpg', alt: 'Sunset of Salt Lake City', caption: 'Sunset of Salt Lake City', category: 'utah' },
  { src: '/images/gallery/utah/snowbird.jpg', alt: 'Snowbird', caption: 'Snowbird', category: 'utah' },
  { src: '/images/gallery/utah/bear-lake.jpg', alt: 'Bear Lake', caption: 'Bear Lake', category: 'utah' },
  { src: '/images/gallery/utah/bryce-canyon.jpg', alt: 'Bryce Canyon', caption: 'Bryce Canyon', category: 'utah' },
  { src: '/images/gallery/utah/liberty-park.jpg', alt: 'Liberty Park', caption: 'Liberty Park', category: 'utah' },
  { src: '/images/gallery/utah/little-dell.jpg', alt: 'Little Dell Reservoir', caption: 'Little Dell Reservoir', category: 'utah' },
  { src: '/images/gallery/utah/briton.jpg', alt: 'Briton', caption: 'Briton', category: 'utah' },
  { src: '/images/gallery/utah/snowbird.jpg', alt: 'Dr. Gao at Snowbird ski resort', caption: 'Dr. Gao at Snowbird', category: 'utah', youtubeId: 'wT-0NldJEjY' },

  // Lab & equipment (filenames are the descriptions)
  { src: '/images/gallery/equipment/glovebox.jpg', alt: 'Glovebox', caption: 'Glovebox', category: 'equipment' },
  { src: '/images/gallery/equipment/gamry-potentiostat.jpg', alt: 'Gamry potentiostat', caption: 'Gamry potentiostat', category: 'equipment' },
  { src: '/images/gallery/equipment/landt-battery-tester.jpg', alt: 'Landt battery tester', caption: 'Landt battery tester', category: 'equipment' },
  { src: '/images/gallery/equipment/neware-battery-tester.jpg', alt: 'Neware battery tester', caption: 'Neware battery tester', category: 'equipment' },
  { src: '/images/gallery/equipment/coin-cell-crimper.jpg', alt: 'Coin cell crimper', caption: 'Coin cell crimper', category: 'equipment' },
  { src: '/images/gallery/equipment/flow-battery-stack.jpg', alt: 'Flow battery stack', caption: 'Flow battery stack', category: 'equipment' },
  { src: '/images/gallery/equipment/rotating-disk-electrode.jpg', alt: 'Rotating disk electrode', caption: 'Rotating disk electrode', category: 'equipment' },
  { src: '/images/gallery/equipment/ft-ir.jpg', alt: 'FT-IR', caption: 'FT-IR', category: 'equipment' },
  { src: '/images/gallery/equipment/gc.jpg', alt: 'Gas chromatograph (GC)', caption: 'GC (gas chromatograph)', category: 'equipment' },
  { src: '/images/gallery/equipment/kf-moisture-titrator.jpg', alt: 'KF moisture titrator', caption: 'KF moisture titrator', category: 'equipment' },
  { src: '/images/gallery/equipment/ph-meter.jpg', alt: 'pH meter', caption: 'pH meter', category: 'equipment' },
  { src: '/images/gallery/equipment/viscometer.jpg', alt: 'Viscometer', caption: 'Viscometer', category: 'equipment' },
  { src: '/images/gallery/equipment/tube-furnace.jpg', alt: 'Tube furnace', caption: 'Tube furnace', category: 'equipment' },
  { src: '/images/gallery/equipment/vacuum-oven.jpg', alt: 'Vacuum oven', caption: 'Vacuum oven', category: 'equipment' },
  { src: '/images/gallery/equipment/oven.jpg', alt: 'Oven', caption: 'Oven', category: 'equipment' },
  { src: '/images/gallery/equipment/temperature-bath.jpg', alt: 'Temperature bath', caption: 'Temperature bath', category: 'equipment' },
  { src: '/images/gallery/equipment/fridge.jpg', alt: 'Fridge', caption: 'Fridge', category: 'equipment' },
  { src: '/images/gallery/equipment/pump.jpg', alt: 'Pump', caption: 'Pump', category: 'equipment' },
  { src: '/images/gallery/equipment/pump-2.jpg', alt: 'Pump', caption: 'Pump', category: 'equipment' },
  { src: '/images/gallery/equipment/equipment-1.jpg', alt: 'Lab equipment', caption: 'Lab equipment', category: 'equipment' },
  { src: '/images/gallery/equipment/equipment-2.jpg', alt: 'Lab equipment', caption: 'Lab equipment', category: 'equipment' },
  { src: '/images/gallery/equipment/equipment-3.jpg', alt: 'Lab equipment', caption: 'Lab equipment', category: 'equipment' },
  { src: '/images/gallery/equipment/equipment-4.jpg', alt: 'Lab equipment', caption: 'Lab equipment', category: 'equipment' },
  { src: '/images/gallery/equipment/equipment-5.jpg', alt: 'Lab equipment', caption: 'Lab equipment', category: 'equipment' },
];

export const categoryLabels: Record<GalleryItem['category'], string> = {
  highlights: 'Highlights',
  group: 'Group',
  event: 'Events',
  pioneers: 'With the pioneers in my field',
  campus: 'U of Utah campus',
  utah: 'Utah & Salt Lake City',
  equipment: 'Lab & equipment',
};
