# Cinematic depth parallax

## Editing motion

This invitation uses cinematic depth parallax: a scroll-linked motion system in which botanicals and photographs travel at distinct rates and, where appropriate, in opposing directions. Shared settings are in `app/motion-config.ts`. Below 768px, botanical travel is 64px and photo travel is 34px. Desktop botanical travel is 120px and photo travel is 64px. These are total travel distances, mapped from negative half to positive half and clamped to each section's progress. Positioning, parallax, entrance, scale, and photograph rotation retain separate layers.

Each reveal lasts 950ms. The `lift` variant travels 56px on desktop or 36px below 768px; the `bloom` variant travels 48px/30px and settles from 96% to full scale; `fade` retains no travel. Scroll easing is `cubic-bezier(.22, .61, .36, 1)`. Stagger steps are 130ms, capped at 390ms. A reveal starts when its top reaches the viewport's lower-middle 68% line, using a bottom inset calculated in pixels from viewport height and recalculated on resize while pending. Initial visible content remains visible, and entrances play once during the mounted page visit.

The hero uses an 800ms paper entrance, with a 950ms photograph entrance and a deliberately paced name/detail sequence. A photograph's outer layer owns the entrance lift and fade; the inner mat animates rotation only over 950ms, starting 2 degrees below its final desktop angle or 1 degree below on mobile. Feature photographs also settle from 94% to full scale, without overriding their folio rotation. The story photograph precedes its paper note; text inside the note fades without an additional lift.

## Components

- `MotionScene` renders a semantic section or footer, shares its scroll progress, and tracks changes to page content size. Only the hero, story, schedule, and closing need continuous depth.
- `ParallaxLayer` supports botanical/photo presets, explicit forward or reverse direction, and block/span wrappers. It owns only vertical translation. Transform compositing hints are enabled only for scenes within 120px of the viewport and removed in reduced-motion mode. The positioned layout slot, parallax layer, original rotation, scale settle, and entrance effect use separate elements.
- `Reveal` supports div, span, article, list item, form, and aside tags, plus `lift`, `fade`, and `bloom` variants and an order. Major invitation moments use the love-letter bloom: their paper sections rise and softly unfold, while contained ornaments and botanicals settle shortly afterward. Focus completes the focused composition and its nested reveals immediately, cancelling delays. Sections targeted by anchor links remain immediately visible on load and navigation. Reveals are excluded from browser scroll-anchor selection so entrances do not counteract scrolling or move restored positions.
- Reduced-motion changes disable parallax and all decorative movement immediately. Content stays visible without JavaScript. Native disclosures remain usable.

The palette, typography, wedding data, image paths, crop settings, disabled RSVP, and empty guest list are preserved.

## Verification

Production-browser checks used installed Chrome and Playwright WebKit 26.5 on Windows, at 320px, 390px, 768px, and 1440px.

The recorded browser checks below predate the cinematic-depth calibration. Re-run visual browser checks at 320px, 390px, 768px, and 1440px to confirm the stronger 56px/36px entrances, 120px/64px botanical travel, 64px/34px photo travel, opposing depth directions, and feature-photo scale settle remain smooth and free of overflow. The existing checks for keyboard FAQ/menu access, reduced motion, anchor navigation, JavaScript-disabled reading, disabled submission, and empty guest-list behavior remain relevant.

A warmed phone-sized Chrome scroll sample produced 91 frames in approximately 1.5 seconds, with a mean interval of 16.67ms, 95th percentile of 16.8ms, largest interval of 16.9ms, no recorded long tasks, and no recorded layout shifts. The isolated Windows WebKit sample was slower: 41 frames in approximately 1.5 seconds, mean interval 36.9ms, 95th percentile 48ms, largest interval 59ms. A further comparison also found slow scrolling with movement disabled (mean 53.7ms versus 43.3ms with motion), so the slower result was not isolated to the animation. WebKit used frame timing and stable geometry because its Windows engine does not expose Chrome's long-task/layout-shift metrics. Physical iPhone/Safari performance remains unverified; do not describe these results as a device performance guarantee.

The active production preview at `http://localhost:3002/` was rebuilt and restarted with the changes. Automated Chrome and WebKit default preferences reported reduced motion off; explicit reduced-motion contexts were also tested. The in-app browser's own preference could not be inspected because its automation kernel failed to start, so the separate browser checks should not be presented as an inspection of that tab.

## Recorded previews

- [Desktop scroll preview](C:/Users/Carl/.codex/visualizations/2026/10/08/01a1192b-11a3-76d3-a5a3-d8877273c2d7/wedding-scroll-desktop.webm)
- [Phone scroll preview](C:/Users/Carl/.codex/visualizations/2026/10/08/01a1192b-11a3-76d3-a5a3-d8877273c2d7/wedding-scroll-phone.webm)

Both show the story photograph and wedding cards entering. Recorded frames and corresponding screenshots were reviewed: after scrolling stopped, desktop cards continued rising approximately 25px while fading from approximately 21% to full opacity; phone cards continued rising approximately 18px while fading from approximately 26% to full opacity. The photograph also visibly settled into its final angle. These artifacts confirm noticeable movement rather than only checking configured numbers. The recordings are review artifacts outside the website and are not envelope/video assets shipped by the page.

Lint, production build, and whitespace checks passed.
