export const invitationMotion = {
  desktopQuery: "(min-width: 768px)",
  reducedQuery: "(prefers-reduced-motion: reduce)",
  duration: 800,
  lift: { desktop: 32, mobile: 24 },
  photoSettle: { desktop: 2, mobile: 1 },
  stagger: 90,
  maxDelay: 270,
  easing: "cubic-bezier(.22, .61, .36, 1)",
  entryInset: 0.25,
  travel: {
    botanical: { desktop: 48, mobile: 20 },
    photo: { desktop: 20, mobile: 10 },
  },
} as const;
