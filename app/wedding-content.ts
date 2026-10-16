export type WeddingPhoto = {
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
  rsvpDeadline: "October 20, 2026",
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
    portrait: {
      src: "/photos/web/hero.jpg",
      alt: "Portrait of Kian and Trisha together",
      position: "center",
      label: "Couple portrait",
    },
    story: {
      src: "/photos/web/story.jpg",
      alt: "Kian and Trisha sharing a moment together",
      position: "center",
      label: "Our story photograph",
    },
  } satisfies Record<string, WeddingPhoto>,
  galleryFolios: [
    {
      id: "01",
      photos: [
        { src: "/photos/web/folio-01-feature.jpg", alt: "Kian and Trisha together during their prenup session", position: "center", label: "Folio one feature", role: "feature" },
        { src: "/photos/web/folio-01-support-a.jpg", alt: "Kian and Trisha sharing a quiet moment outdoors", position: "center", label: "Folio one supporting photograph", role: "supportLandscape" },
        { src: "/photos/web/folio-01-support-b.jpg", alt: "Kian and Trisha walking together", position: "center", label: "Folio one supporting photograph", role: "supportLandscape" },
      ],
    },
    {
      id: "02",
      photos: [
        { src: "/photos/web/folio-02-feature.jpg", alt: "Kian and Trisha in an elegant outdoor portrait", position: "center", label: "Folio two feature", role: "feature" },
        { src: "/photos/web/folio-02-support-a.jpg", alt: "Trisha and Kian smiling together", position: "center", label: "Folio two supporting photograph", role: "supportPortrait" },
        { src: "/photos/web/folio-02-support-b.jpg", alt: "A close prenup portrait of Kian and Trisha", position: "center", label: "Folio two supporting photograph", role: "supportPortrait" },
      ],
    },
    {
      id: "03",
      photos: [
        { src: "/photos/web/folio-03-feature.jpg", alt: "Kian and Trisha sharing a joyful prenup moment", position: "center", label: "Folio three feature", role: "feature" },
        { src: "/photos/web/folio-03-support-a.jpg", alt: "Kian and Trisha in a romantic portrait", position: "center", label: "Folio three supporting photograph", role: "supportPortrait" },
        { src: "/photos/web/folio-03-support-b.jpg", alt: "Kian and Trisha enjoying time together", position: "center", label: "Folio three supporting photograph", role: "supportPortrait" },
      ],
    },
    {
      id: "04",
      photos: [
        { src: "/photos/web/folio-04-feature.jpg", alt: "Kian and Trisha in a timeless portrait", position: "center", label: "Folio four feature", role: "feature" },
        { src: "/photos/web/folio-04-support-a.jpg", alt: "Kian and Trisha framed by their prenup setting", position: "center", label: "Folio four supporting photograph", role: "supportLandscape" },
        { src: "/photos/web/folio-04-support-b.jpg", alt: "Kian and Trisha close together", position: "center", label: "Folio four supporting photograph", role: "supportPortrait" },
      ],
    },
    {
      id: "05",
      photos: [
        { src: "/photos/web/folio-05-feature.jpg", alt: "Kian and Trisha in a cinematic outdoor scene", position: "center", label: "Folio five feature", role: "feature" },
        { src: "/photos/web/folio-05-support-a.jpg", alt: "A wide prenup photograph of Kian and Trisha", position: "center", label: "Folio five supporting photograph", role: "supportLandscape" },
        { src: "/photos/web/folio-05-support-b.jpg", alt: "Kian and Trisha sharing a loving portrait", position: "center", label: "Folio five supporting photograph", role: "supportPortrait" },
      ],
    },
    {
      id: "06",
      photos: [
        { src: "/photos/web/folio-06-feature.jpg", alt: "Kian and Trisha in their closing prenup portrait", position: "center", label: "Folio six feature", role: "feature" },
        { src: "/photos/web/folio-06-support-a.jpg", alt: "Kian and Trisha walking through their prenup setting", position: "center", label: "Folio six supporting photograph", role: "supportLandscape" },
        { src: "/photos/web/folio-06-support-b.jpg", alt: "Kian and Trisha celebrating their love together", position: "center", label: "Folio six supporting photograph", role: "supportPortrait" },
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
    { role: "Parents of the groom", names: ["Cary Arbolado", "Mary Ann Arbolado"] },
    { role: "Parents of the bride", names: ["Wilfredo Geli", "Chona Geli"] },
    { role: "Principal sponsors", names: [
      "Mrs. Jo Baarde", "Mrs. Rea Villaruel", "Mrs. Evangeline Ferrer",
      "Mrs. Annisa Vergonia", "Mrs. Dulce Ilagas", "Mrs. Jovelyn Dimatulac",
      "Mr. Amor Ferrer", "Mr. Rico Oregano", "Mr. Emiliano Gonzales",
      "Mr. Rogelio Uy", "Mr. Allan Ilagas", "Mr. Danilo Geli",
    ] },
    { role: "Secondary sponsors", names: [
      "Kristina Casandra Manuel", "Ruzell Mae Geli", "Sheryl Jane Baclay",
      "Bernadeth Cruz", "Riobeth Ortiz", "John Patrick Geli", "Ian Requerque",
      "Jonel De Leon", "Jaymark Gepollio", "Jm Prande",
    ] },
    { role: "Best man", names: ["Ron Arbolado"] },
    { role: "Maid of honor", names: ["Princes Mae Geli"] },
    { role: "Ring bearer", names: ["Drake Marcus G. Sabado"] },
    { role: "Bible bearer", names: ["Zac Xavier Manuel"] },
    { role: "Coin bearer", names: ["Zion Jay Geli"] },
    { role: "Little bride / flower girl", names: ["Alisha G. Sabado"] },
  ],
  giftMessage: "Your presence is truly the best gift we could ask for. If you wish to give something more, a monetary gift towards our home would mean so much to us. Above all, we look forward to celebrating our union with you.",
  faqs: [
    { question: "What time should I arrive?", answer: "Please arrive by 4:00 PM to settle in before our civil ceremony begins at 5:00 PM." },
    { question: "What should I wear?", answer: "We invite you to wear all-black semi-formal attire for our special day." },
    { question: "Can I bring my kids or a plus one?", answer: "Our celebration is an intimate gathering for those named in your invitation. We kindly ask that you include only invited companions. The event is adults-only, apart from children taking part in the wedding entourage." },
    { question: "Where should I park?", answer: "Paid parking is available near the venue, along with a few free street parking spaces. We will share the exact location and parking details by SMS closer to the wedding. PWD-friendly parking is available; please contact us if you need assistance." },
    { question: "Will there be assigned seating?", answer: "Yes. We have arranged seating so everyone can enjoy the evening comfortably. Our coordinator will help you find your designated seat." },
    { question: "When should I RSVP?", answer: "Please let us know by October 20, 2026 to help us prepare for the celebration. If you need to respond after that date, please get in touch with us." },
  ],
  contacts: [
    { name: "Kian Arbolado", email: "kian.arbolado22@gmail.com", phoneDisplay: "+639 - 63 - 642 - 1523" },
    { name: "Trisha Amor Geli", email: "tgeliemail@gmail.com", phoneDisplay: "+639 - 76 - 011 - 6055" },
  ],
} as const;
