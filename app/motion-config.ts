export const invitationMotion = {
  desktopQuery: "(min-width: 768px)",
  reducedQuery: "(prefers-reduced-motion: reduce)",
  duration: 650,
  lift: 14,
  stagger: 90,
  maxDelay: 270,
  easing: "cubic-bezier(.16, 1, .3, 1)",
  entryInset: 0.1,
  travel: {
    botanical: { desktop: 24, mobile: 10 },
    photo: { desktop: 12, mobile: 6 },
  },
} as const;
