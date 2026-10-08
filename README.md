# Kian & Trisha — wedding invitation

A responsive static invitation built with Next.js, React, TypeScript, and Tailwind CSS.

## Local preview

```sh
npm install
npm run dev
```

Open http://localhost:3000. Check the project with `npm run lint` and `npm run build`.

## Change the photographs and wedding details

All wedding text, dates, entourage names, contacts, and photograph references are in `app/wedding-content.ts`.

1. Place your photographs in `public/photos/` (create this folder if needed).
2. Change `photos.portrait.src` from `null` to `/photos/couple.jpg`.
3. Change `photos.story.src` from `null` to `/photos/story.jpg`.
4. Update the alt text to describe each photograph. Adjust `position` (for example, `center 30%`) if the crop needs repositioning.

Both photographs use a fixed 4:5 container. Real photographs replace the neutral placeholders without changing the layout. Use local image paths from the public directory.

Palette, typography, spacing, and responsive styles are in `app/globals.css`.

## Current phase

Navigation, story expansion, entourage disclosures, FAQs, and companion controls work. RSVP submission is intentionally disabled; nothing is saved or emailed. The confirmed guest list is an empty layout, with no fabricated guests. The envelope entrance and live RSVP integration are reserved for a later phase.

## Botanical stationery design

The invitation uses calligraphy names, original rose engraving, textured paper edges, ivory photograph mats, and a burgundy K&T seal. Photograph and decoration references remain together in `app/wedding-content.ts`.

Staged CSS entrances and one-time section reveals respect reduced-motion preferences. Motion for React adds gentle, section-relative botanical and photograph depth. Content is visible without JavaScript, and native story, FAQ, entourage, and mobile navigation disclosures remain usable. Companion add/remove controls require JavaScript.

Artwork prompts, saved paths, design timing, and verification notes are in [docs/design-assets.md](docs/design-assets.md).

Shared motion settings and browser verification are documented in [docs/scroll-motion.md](docs/scroll-motion.md).
