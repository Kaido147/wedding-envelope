export type WeddingPhoto = {
  id: string;
  src: string | null;
  alt: string;
  position: string;
  label: string;
};

export type GalleryPhoto = WeddingPhoto & {
  role: "feature" | "supportPortrait" | "supportLandscape";
};

export type GalleryFolio = {
  id: string;
  photos: [GalleryPhoto, GalleryPhoto, GalleryPhoto];
};

const photoCatalog = {
  dsc2841: { id: "dsc-2841", src: "/photos/web/dsc-2841.jpg", alt: "Portrait of Kian and Trisha together", position: "center", label: "Couple portrait" },
  dsc2845: { id: "dsc-2845", src: "/photos/web/dsc-2845.jpg", alt: "Kian and Trisha sharing a moment together", position: "center", label: "Our story photograph" },
  dsc2847: { id: "dsc-2847", src: "/photos/web/dsc-2847.jpg", alt: "Kian and Trisha together during their prenup session", position: "center", label: "Folio one feature" },
  dsc2851: { id: "dsc-2851", src: "/photos/web/dsc-2851.jpg", alt: "Kian and Trisha sharing a quiet moment outdoors", position: "center", label: "Folio one supporting photograph" },
  dsc2855: { id: "dsc-2855", src: "/photos/web/dsc-2855.jpg", alt: "Kian and Trisha walking together", position: "center", label: "Folio one supporting photograph" },
  dsc2857: { id: "dsc-2857", src: "/photos/web/dsc-2857.jpg", alt: "Kian and Trisha in an elegant outdoor portrait", position: "center", label: "Folio two feature" },
  dsc2863: { id: "dsc-2863", src: "/photos/web/dsc-2863.jpg", alt: "Trisha and Kian smiling together", position: "center", label: "Folio two supporting photograph" },
  dsc2869: { id: "dsc-2869", src: "/photos/web/dsc-2869.jpg", alt: "A close prenup portrait of Kian and Trisha", position: "center", label: "Folio two supporting photograph" },
  dsc2871: { id: "dsc-2871", src: "/photos/web/dsc-2871.jpg", alt: "Kian and Trisha sharing a joyful prenup moment", position: "center", label: "Folio three feature" },
  dsc2876: { id: "dsc-2876", src: "/photos/web/dsc-2876.jpg", alt: "Kian and Trisha in a romantic portrait", position: "center", label: "Folio three supporting photograph" },
  dsc2879: { id: "dsc-2879", src: "/photos/web/dsc-2879.jpg", alt: "Kian and Trisha enjoying time together", position: "center", label: "Folio three supporting photograph" },
  dsc2886: { id: "dsc-2886", src: "/photos/web/dsc-2886.jpg", alt: "Kian and Trisha in a timeless portrait", position: "center", label: "Folio four feature" },
  dsc2888: { id: "dsc-2888", src: "/photos/web/dsc-2888.jpg", alt: "Kian and Trisha framed by their prenup setting", position: "center", label: "Folio four supporting photograph" },
  dsc2892: { id: "dsc-2892", src: "/photos/web/dsc-2892.jpg", alt: "Kian and Trisha close together", position: "center", label: "Folio four supporting photograph" },
  dsc2916: { id: "dsc-2916", src: "/photos/web/dsc-2916.jpg", alt: "Kian and Trisha in a cinematic outdoor scene", position: "center", label: "Folio five feature" },
  dsc2925: { id: "dsc-2925", src: "/photos/web/dsc-2925.jpg", alt: "Kian and Trisha together in a wide prenup portrait", position: "center", label: "Hero photograph" },
  dsc2930: { id: "dsc-2930", src: "/photos/web/dsc-2930.jpg", alt: "Kian and Trisha sharing a loving portrait", position: "center", label: "Folio five supporting photograph" },
  dsc2934: { id: "dsc-2934", src: "/photos/web/dsc-2934.jpg", alt: "Kian and Trisha in their closing prenup portrait", position: "center", label: "Folio six feature" },
  dsc2937: { id: "dsc-2937", src: "/photos/web/dsc-2937.jpg", alt: "Kian and Trisha walking through their prenup setting", position: "center", label: "Folio six supporting photograph" },
  dsc2961: { id: "dsc-2961", src: "/photos/web/dsc-2961.jpg", alt: "Kian and Trisha celebrating their love together", position: "center", label: "Folio six supporting photograph" },
} satisfies Record<string, WeddingPhoto>;

const allPhotos = [
  photoCatalog.dsc2841, photoCatalog.dsc2845, photoCatalog.dsc2847, photoCatalog.dsc2851, photoCatalog.dsc2855,
  photoCatalog.dsc2857, photoCatalog.dsc2863, photoCatalog.dsc2869, photoCatalog.dsc2871, photoCatalog.dsc2876,
  photoCatalog.dsc2879, photoCatalog.dsc2886, photoCatalog.dsc2888, photoCatalog.dsc2892, photoCatalog.dsc2916,
  photoCatalog.dsc2925, photoCatalog.dsc2930, photoCatalog.dsc2934, photoCatalog.dsc2937, photoCatalog.dsc2961,
] satisfies WeddingPhoto[];

// Put replacement images in public/photos and set src to "/photos/your-file.jpg".
// Photo containers keep their proportions regardless of the replacement image.
export const wedding = {
  couple: {
    first: "Kian",
    second: "Trisha",
    fullNames: ["Kian Arbolado", "Trisha Amor Geli"],
    monogram: "K&T",
  },
  date: {
    iso: "2026-11-20",
    display: "November 20, 2026",
    day: "20",
    month: "November",
    year: "2026",
    weekday: "Friday",
  },
  venue: {
    name: "The Home of Authentic Laing 2",
    location: "Brick Road",
    ceremony: "An intimate civil ceremony with our closest family and friends.",
    reception: "Dinner and a celebration together at the same venue.",
  },
  attire: "All Black Semi Formal",
  rsvpResponseMessage: "Please respond by on or before November 8, 2026 Sunday",
  hashtag: "#TRISHAfoundhermagpaKIANlanman",
  decorations: {
    botanical: "/decor/botanical-roses.png",
    seal: "/decor/wax-seal.png",
    grain: "/decor/paper-grain.svg",
    edge: "/decor/paper-edge.svg",
  },
  music: {
    src: "/audio/erik-santos-i-never-go.mp3",
    title: "I Never Go — Erik Santos",
    volume: 0.35,
  },
  photos: {
    portrait: photoCatalog.dsc2925,
    story: photoCatalog.dsc2845,
  } satisfies Record<string, WeddingPhoto>,
  galleryPhotos: allPhotos,
  galleryFolios: [
    {
      id: "01",
      photos: [
        { ...photoCatalog.dsc2847, role: "feature" },
        { ...photoCatalog.dsc2851, role: "supportLandscape" },
        { ...photoCatalog.dsc2855, role: "supportLandscape" },
      ],
    },
    {
      id: "02",
      photos: [
        { ...photoCatalog.dsc2857, role: "feature" },
        { ...photoCatalog.dsc2863, role: "supportPortrait" },
        { ...photoCatalog.dsc2869, role: "supportPortrait" },
      ],
    },
    {
      id: "03",
      photos: [
        { ...photoCatalog.dsc2871, role: "feature" },
        { ...photoCatalog.dsc2876, role: "supportPortrait" },
        { ...photoCatalog.dsc2879, role: "supportPortrait" },
      ],
    },
    {
      id: "04",
      photos: [
        { ...photoCatalog.dsc2886, role: "feature" },
        { ...photoCatalog.dsc2888, role: "supportLandscape" },
        { ...photoCatalog.dsc2892, role: "supportPortrait" },
      ],
    },
    {
      id: "05",
      photos: [
        { ...photoCatalog.dsc2916, role: "feature" },
        { ...photoCatalog.dsc2925, role: "supportLandscape" },
        { ...photoCatalog.dsc2930, role: "supportPortrait" },
      ],
    },
    {
      id: "06",
      photos: [
        { ...photoCatalog.dsc2934, role: "feature" },
        { ...photoCatalog.dsc2937, role: "supportLandscape" },
        { ...photoCatalog.dsc2961, role: "supportPortrait" },
      ],
    },
  ] satisfies GalleryFolio[],
  story: [
    "It all began with a strict officer and a playful staff member, brought together by simple errands, countless reports, and letters that unknowingly drew two hearts closer.",
    "From coffee prepared with love to long rides from Katipunan to Montalban and Novaliches, every little effort became a beautiful reminder that love is about choosing each other, every single day.",
    "We faced challenges, but we never gave up. We held on to each other and to the dream of building a life together.",
    "Today, blessed with our two little ones, we look back and realize that what began as an unexpected love became the greatest journey of our lives.",
  ],
  schedule: [
    { time: "4:00", period: "PM", name: "Arrival & welcome", note: "A little time to settle in and say hello." },
    { time: "5:00", period: "PM", name: "Civil ceremony", note: "The beginning of our forever." },
    { time: "6:00", period: "PM", name: "Photo session", note: "Memories with our favorite people." },
    { time: "7:00", period: "PM", name: "Celebration dinner", note: "The Home of Authentic Laing 2." },
  ],
  entourage: [
    { role: "Parents of the groom", names: ["Cary Arbolado", "Maria Ann Arbolado"] },
    { role: "Parents of the bride", names: ["Wilfredo Geli", "Chona Geli"] },
    { role: "Principal sponsors", columns: {
      left: ["Mrs. Jo Baarde", "Mrs. Rea Villaruel", "Mrs. Evangeline Ferrer", "Mrs. Annisa Vergonia", "Mrs. Dulce Llagas", "Mrs. Jovelyn Dimatulac", "Mrs. Mary Ann Arbolado"],
      right: ["Mr. Amor Ferrer", "Mr. Rico Oregano", "Mr. Emiliano Gonzales", "Mr. Rogelio Uy", "Mr. Allan Llagas", "Mr. Danilo Geli", "Mr. Jay Cris Pertez"],
    } },
    { role: "Secondary sponsors", columns: {
      left: ["Kristina Casandra Manuel", "Ruzell Mae Geli", "Sheryl Jane Baclay", "Bernadeth Cruz", "Riobeth Ortiz"],
      right: ["John Patrick Geli", "Ian Requerque", "Jonel De Leon", "Jaymark Gepollo", "Jm Prande"],
    } },
    { role: "Best man", names: ["Carl Arbolado", "Ronn Arbolado"] },
    { role: "Maid of honor", names: ["Princes Mae Geli"] },
    { role: "Ring bearer", names: ["Drake Marcus G. Sabado"] },
    { role: "Bible bearer", names: ["Zac Xavier Manuel"] },
    { role: "Coin bearer", names: ["Zion Jae Geli"] },
    { role: "Little bride / flower girl", names: ["Alisha G. Sabado"] },
  ],
  giftMessage: "Your presence is truly the best gift we could ask for. If you wish to give something more, a monetary gift towards our home would mean so much to us. Above all, we look forward to celebrating our union with you.",
  faqs: [
    { question: "What time should I arrive?", answer: "Please arrive by 4:00 PM to settle in before our civil ceremony begins at 5:00 PM." },
    { question: "What should I wear?", answer: "We invite you to wear all-black semi-formal attire for our special day." },
    { question: "Can I bring someone not named in the invitation?", answer: "Our celebration is an intimate gathering for the guests named in their invitations. We kindly ask everyone to register their own name. The event is adults-only, apart from children taking part in the wedding entourage." },
    { question: "Where should I park?", answer: "Paid parking is available near the venue, along with a few free street parking spaces. We will share the exact location and parking details by SMS closer to the wedding. PWD-friendly parking is available; please contact us if you need assistance." },
    { question: "Will there be assigned seating?", answer: "Yes. We have arranged seating so everyone can enjoy the evening comfortably. Our coordinator will help you find your designated seat." },
    { question: "When should I RSVP?", answer: "Please respond by on or before November 8, 2026 Sunday" },
  ],
  contacts: [
    { name: "Kian Arbolado", email: "kian.arbolado22@gmail.com", phoneDisplay: "+63 963 642 1523" },
    { name: "Trisha Amor Geli", email: "tgeliemail@gmail.com", phoneDisplay: "+63 976 011 6055" },
  ],
} as const;
