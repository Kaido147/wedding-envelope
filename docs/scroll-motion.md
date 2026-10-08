# Botanical depth motion

## Editing motion

Shared settings are in `app/motion-config.ts`. Below 768px, botanical travel is 10px and photo travel is 6px. Desktop botanical travel is 24px and photo travel is 12px. These are total travel distances, mapped from negative half to positive half and clamped to each section's progress.

Each reveal lasts 650ms and lifts 14px unless its variant is `fade`. Stagger steps are 90ms, capped at 270ms. A reveal starts above the viewport's bottom 10%, calculated from viewport height. Initial visible content remains visible, and entrances play once during the mounted page visit.

## Components

- `MotionScene` renders a semantic section or footer, shares its scroll progress, and tracks changes to page content size. Only the hero, story, schedule, and closing need continuous depth.
- `ParallaxLayer` supports botanical/photo presets and block/span wrappers. It owns only vertical translation. Transform compositing hints are enabled only for scenes within 120px of the viewport and removed in reduced-motion mode. The positioned layout slot, parallax layer, original rotation, and entrance effect use separate elements.
- `Reveal` supports div, span, article, list item, form, and aside tags, plus lift/fade variants and an order. Interactive panels use fade. Focus completes the focused composition and its nested reveals immediately, cancelling delays.
- Reduced-motion changes disable parallax and all decorative movement immediately. Content stays visible without JavaScript. Native disclosures remain usable; companion controls retain their existing JavaScript behavior.

The palette, typography, wedding data, image paths, crop settings, disabled RSVP, and empty guest list are preserved.

## Verification

Production-browser checks used installed Chrome and Playwright WebKit 26.5 on Windows, at 320px, 390px, 768px, and 1440px.

Passed checks: clamped section-relative travel; genuinely vertical botanical movement; photo tilt preserved at 1 degree on phones and 2 degrees on desktop (negative for the story photo); stable document height while scrolling; no horizontal overflow; photo replacement with a different aspect ratio preserves container dimensions; entrances do not replay; dynamic story and entourage expansion updates subsequent progress; keyboard FAQ/menu access; companion focus; focus immediately finishes RSVP reveals; reduced-motion changes during the visit; anchor refresh and scroll restoration; JavaScript-disabled reading; disabled submission; and empty guest-list state. No browser runtime errors, failed resources, or POST requests occurred.

A warmed phone-sized Chrome scroll sample produced 84 frames in approximately 1.4 seconds, with a largest frame interval of 16.8ms, no recorded long tasks, and no recorded layout shifts. Viewport-scoped compositing improved a phone-sized WebKit scroll sample to 86 frames in approximately 1.5 seconds (mean interval 17.55ms, largest interval 31ms). WebKit checks used frame timing and stable geometry because its Windows engine does not expose Chrome's long-task/layout-shift metrics. These checks are not measurements on a physical phone or a Safari device.

Lint, production build, and whitespace checks passed.
