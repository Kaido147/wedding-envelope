export const invitationMotion = {
  desktopQuery: "(min-width: 768px)",
  reducedQuery: "(prefers-reduced-motion: reduce)",
  duration: 950,
  lift: { desktop: 56, mobile: 36 },
  photoSettle: { desktop: 2, mobile: 1 },
  stagger: 130,
  maxDelay: 390,
  easing: "cubic-bezier(.22, .61, .36, 1)",
  entryInset: 0.32,
  travel: {
    botanical: { desktop: 120, mobile: 64 },
    photo: { desktop: 64, mobile: 34 },
  },
} as const;
