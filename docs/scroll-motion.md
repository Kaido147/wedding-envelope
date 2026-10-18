# Botanical depth motion

## Editing motion

Shared settings are in `app/motion-config.ts`. Below 768px, botanical travel is 20px and photo travel is 10px. Desktop botanical travel is 48px and photo travel is 20px. These are total travel distances, mapped from negative half to positive half and clamped to each section's progress. Positioning, parallax, entrance, and photograph rotation retain separate layers.

Each reveal lasts 800ms and lifts 32px on desktop or 24px below 768px unless its variant is `fade`. Scroll easing is `cubic-bezier(.22, .61, .36, 1)`. Stagger steps are 90ms, capped at 270ms. A reveal starts when its top crosses the viewport's 75% line, using a bottom inset calculated in pixels from viewport height and recalculated on resize while pending. Initial visible content remains visible, and entrances play once during the mounted page visit.

The hero retains its 700ms paper entrance and existing name/detail sequence, using the responsive paper lift. Its photograph finishes by 900ms. A photograph's outer layer owns the entrance lift and fade; the inner mat animates rotation only over 800ms, starting 2 degrees below its final desktop angle or 1 degree below on mobile. The story photograph precedes its paper note; text inside the note fades without an additional lift.

## Components

- `MotionScene` renders a semantic section or footer, shares its scroll progress, and tracks changes to page content size. Only the hero, story, schedule, and closing need continuous depth.
- `ParallaxLayer` supports botanical/photo presets and block/span wrappers. It owns only vertical translation. Transform compositing hints are enabled only for scenes within 120px of the viewport and removed in reduced-motion mode. The positioned layout slot, parallax layer, original rotation, and entrance effect use separate elements.
- `Reveal` supports div, span, article, list item, form, and aside tags, plus lift/fade variants and an order; its public props are unchanged. Interactive panels and the RSVP heading use fade. Focus completes the focused composition and its nested reveals immediately, cancelling delays. Sections targeted by anchor links remain immediately visible on load and navigation. Reveals are excluded from browser scroll-anchor selection so entrances do not counteract scrolling or move restored positions.
- Reduced-motion changes disable parallax and all decorative movement immediately. Content stays visible without JavaScript. Native disclosures remain usable.

The palette, typography, wedding data, image paths, crop settings, disabled RSVP, and empty guest list are preserved.

## Verification

Production-browser checks used installed Chrome and Playwright WebKit 26.5 on Windows, at 320px, 390px, 768px, and 1440px.

Passed checks: clamped section-relative travel; genuinely vertical botanical movement; measured observer boundary at 75% of viewport height, including pending items after viewport resize; responsive 32px/24px entrance lifts; intermediate fade/lift states and rotation-only photograph settling; photo tilt preserved at 1 degree on phones and 2 degrees on desktop (negative for the story photo); stable document height while scrolling; no horizontal overflow; photo replacement with a different aspect ratio preserves container dimensions; entrances do not replay on reverse scrolling; fast scrolling; dynamic story and entourage expansion updates subsequent progress; keyboard FAQ/menu access; focus immediately finishes RSVP reveals; reduced-motion changes during the visit and on load; anchor navigation, RSVP anchor refresh, and native scroll restoration after the browser saves its position; JavaScript-disabled reading; disabled submission; and empty guest-list state. No browser runtime errors, failed resources, or POST requests occurred.

A warmed phone-sized Chrome scroll sample produced 91 frames in approximately 1.5 seconds, with a mean interval of 16.67ms, 95th percentile of 16.8ms, largest interval of 16.9ms, no recorded long tasks, and no recorded layout shifts. The isolated Windows WebKit sample was slower: 41 frames in approximately 1.5 seconds, mean interval 36.9ms, 95th percentile 48ms, largest interval 59ms. A further comparison also found slow scrolling with movement disabled (mean 53.7ms versus 43.3ms with motion), so the slower result was not isolated to the animation. WebKit used frame timing and stable geometry because its Windows engine does not expose Chrome's long-task/layout-shift metrics. Physical iPhone/Safari performance remains unverified; do not describe these results as a device performance guarantee.

The active production preview at `http://localhost:3002/` was rebuilt and restarted with the changes. Automated Chrome and WebKit default preferences reported reduced motion off; explicit reduced-motion contexts were also tested. The in-app browser's own preference could not be inspected because its automation kernel failed to start, so the separate browser checks should not be presented as an inspection of that tab.

## Recorded previews

- [Desktop scroll preview](C:/Users/Carl/.codex/visualizations/2026/10/08/01a1192b-11a3-76d3-a5a3-d8877273c2d7/wedding-scroll-desktop.webm)
- [Phone scroll preview](C:/Users/Carl/.codex/visualizations/2026/10/08/01a1192b-11a3-76d3-a5a3-d8877273c2d7/wedding-scroll-phone.webm)

Both show the story photograph and wedding cards entering. Recorded frames and corresponding screenshots were reviewed: after scrolling stopped, desktop cards continued rising approximately 25px while fading from approximately 21% to full opacity; phone cards continued rising approximately 18px while fading from approximately 26% to full opacity. The photograph also visibly settled into its final angle. These artifacts confirm noticeable movement rather than only checking configured numbers. The recordings are review artifacts outside the website and are not envelope/video assets shipped by the page.

Lint, production build, and whitespace checks passed.
