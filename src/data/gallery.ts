// Gallery items. Captions derived from the descriptive filenames in
// G:\My Drive\6-website\Gallery (the PI labels each file by hand).

export interface GalleryItem {
  src: string;
  alt: string;
  caption?: string;
  date?: string;
  category: 'highlights' | 'group' | 'event' | 'campus' | 'utah' | 'equipment';
}

export const galleryItems: GalleryItem[] = [
  // Highlights — awards, grants, paper publications, research milestones.
  // Images copied from G:\My Drive\6-website\home-gallery into public/images/slideshow/.
  { src: '/images/slideshow/nsf-career.png', alt: 'NSF CAREER Award 2025', caption: 'NSF CAREER Award', date: '2025-07', category: 'highlights' },
  { src: '/images/slideshow/doe-grant.jpg', alt: 'DOE grant on Li/K/Mg co-production from Great Salt Lake brine', caption: 'DOE grant on Li/K/Mg from Great Salt Lake brine', date: '2025-01', category: 'highlights' },
  { src: '/images/slideshow/fe-battery-coe.jpg', alt: 'Iron metal battery research', caption: 'Iron metal battery research', date: '2024-08', category: 'highlights' },
  { src: '/images/slideshow/fe-battery.png', alt: 'Aqueous Fe battery concept', caption: 'Aqueous Fe battery concept', category: 'highlights' },
  { src: '/images/slideshow/mg-flow.png', alt: 'Mg-organic redox flow battery concept', caption: 'Mg-organic redox flow battery', category: 'highlights' },
  { src: '/images/slideshow/yunan-mg-flow.jpg', alt: 'Yana Qin and Mg flow battery work', caption: 'Yana Qin · Mg flow battery (NSF)', date: '2023-06', category: 'highlights' },
  { src: '/images/slideshow/jing-liu.jpg', alt: "Jing Liu's electrolytic ironmaking paper", caption: "Jing Liu's electrolytic ironmaking paper", date: '2025-09', category: 'highlights' },
  { src: '/images/slideshow/rising-star-2022.jpg', alt: 'Rising Star of Science 2022 recognition', caption: 'Rising Star of Science 2022', date: '2022-11', category: 'highlights' },
  { src: '/images/slideshow/picture1.png', alt: 'Research highlight', caption: 'Research highlight', category: 'highlights' },
  { src: '/images/slideshow/capture-jpg.jpg', alt: 'Research highlight', caption: 'Research highlight', category: 'highlights' },
  { src: '/images/slideshow/capture-png.png', alt: 'Research highlight', caption: 'Research highlight', category: 'highlights' },

  // Group photos (from "group pictures/<season year>.jpg")
  { src: '/images/gallery/group/spring-2026.jpg', alt: 'Group photo, Spring 2026', caption: 'Spring 2026', date: '2026-04', category: 'group' },
  { src: '/images/gallery/group/summer-2025.png', alt: 'Group photo, Summer 2025', caption: 'Summer 2025', date: '2025-07', category: 'group' },
  { src: '/images/slideshow/group-2021-11.jpg', alt: 'Group photo, Fall 2021', caption: 'Fall 2021', date: '2021-11', category: 'group' },
  { src: '/images/gallery/group/winter-2021.jpg', alt: 'Group photo, Winter 2021', caption: 'Winter 2021', date: '2021-12', category: 'group' },

  // Events (filenames carry the description)
  { src: '/images/gallery/events/goodenough-97th.jpg', alt: "Celebrating Prof. John B. Goodenough's 97th birthday, Spring 2017", caption: "Celebrating Goodenough's 97th birthday", date: '2017-05', category: 'event' },
  { src: '/images/gallery/events/2022-graduation.jpg', alt: 'Graduation, May 2022', caption: 'Graduation', date: '2022-05', category: 'event' },
  { src: '/images/gallery/events/2022-camping.jpg', alt: 'Camping, June 2022', caption: 'Camping', date: '2022-06', category: 'event' },
  { src: '/images/gallery/events/2022-camping-strawberry.jpg', alt: 'Camping at Strawberry, June 2022', caption: 'Camping at Strawberry', date: '2022-06', category: 'event' },
  { src: '/images/gallery/events/group-dinner-2023.jpg', alt: 'Group dinner, Fall 2023', caption: 'Group dinner', date: '2023-11', category: 'event' },
  { src: '/images/gallery/events/first-phd-defense.png', alt: "First PhD defense, Summer 2025", caption: "First PhD defense", date: '2025-06', category: 'event' },
  { src: '/images/gallery/events/snack-before-seminar.jpg', alt: 'Snack before group seminar, Summer 2025', caption: 'Snack before group seminar', date: '2025-07', category: 'event' },

  // U of Utah campus (source files are IMG-XXXX without descriptions)
  { src: '/images/gallery/campus/u-of-utah.jpg', alt: 'University of Utah', caption: 'University of Utah', category: 'campus' },
  { src: '/images/gallery/campus/web.jpg', alt: 'University of Utah campus', caption: 'Campus', category: 'campus' },
  { src: '/images/gallery/campus/campus-1.jpg', alt: 'University of Utah campus', caption: 'Campus', category: 'campus' },
  { src: '/images/gallery/campus/campus-2.jpg', alt: 'University of Utah campus', caption: 'Campus', category: 'campus' },
  { src: '/images/gallery/campus/campus-3.jpg', alt: 'University of Utah campus', caption: 'Campus', category: 'campus' },
  { src: '/images/gallery/campus/campus-4.jpg', alt: 'University of Utah campus', caption: 'Campus', category: 'campus' },
  { src: '/images/gallery/campus/campus-5.jpg', alt: 'University of Utah campus', caption: 'Campus', category: 'campus' },
  { src: '/images/gallery/campus/campus-6.jpg', alt: 'University of Utah campus', caption: 'Campus', category: 'campus' },

  // Utah & Salt Lake City (filenames are the descriptions)
  { src: '/images/gallery/utah/slc.jpg', alt: 'Salt Lake City', caption: 'Salt Lake City', category: 'utah' },
  { src: '/images/gallery/utah/slc-sunset.jpg', alt: 'Sunset of Salt Lake City', caption: 'Sunset of Salt Lake City', category: 'utah' },
  { src: '/images/gallery/utah/snowbird.jpg', alt: 'Snowbird', caption: 'Snowbird', category: 'utah' },
  { src: '/images/gallery/utah/bear-lake.jpg', alt: 'Bear Lake', caption: 'Bear Lake', category: 'utah' },
  { src: '/images/gallery/utah/bryce-canyon.jpg', alt: 'Bryce Canyon', caption: 'Bryce Canyon', category: 'utah' },
  { src: '/images/gallery/utah/liberty-park.jpg', alt: 'Liberty Park', caption: 'Liberty Park', category: 'utah' },
  { src: '/images/gallery/utah/little-dell.jpg', alt: 'Little Dell Reservoir', caption: 'Little Dell Reservoir', category: 'utah' },
  { src: '/images/gallery/utah/briton.jpg', alt: 'Briton', caption: 'Briton', category: 'utah' },

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
  campus: 'U of Utah campus',
  utah: 'Utah & Salt Lake City',
  equipment: 'Lab & equipment',
};
