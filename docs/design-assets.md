# Botanical stationery assets

Generated using the built-in image generation tool in generation mode, with transparent backgrounds. Both selected PNGs have been copied into this project and preserve their alpha channel.

## Saved assets

- `D:/Personal/wedding-envelope/public/decor/botanical-roses.png`: original charcoal botanical engraving, 1312 by 1199 pixels.
- `D:/Personal/wedding-envelope/public/decor/wax-seal.png`: burgundy K&T wax seal, 1254 by 1254 pixels.
- `public/decor/paper-edge.svg` and `public/decor/paper-grain.svg`: reusable, code-created paper decorations.

The website references these through `wedding.decorations` in `app/wedding-content.ts`. The artwork is decorative and hidden from assistive technology. Decorative layers cannot intercept clicks or taps.

## Final botanical prompt

Use case: illustration-story. Asset type: ORIGINAL transparent botanical decoration for a romantic wedding invitation website. Create ONE isolated diagonal bouquet of garden roses in exquisite fine charcoal engraving / antique copperplate botanical linework, on a genuinely transparent background. Two open lush garden roses, one small rose and a few delicate buds, with elegant curving stems and pointed leaves. Bouquet composition runs diagonally from lower-left stems to upper-right roses, naturally tapered branches, airy silhouette, usable for decorating corners. All visible marks are warm charcoal #151412, thin precise engraved lines and delicate hatching. The spaces between petals, leaves and all surroundings remain transparent; no filled white paper or opaque white silhouette. No grayscale wash, no green, no color, no border, no paper card, no container, no words, no logo, no watermark, no shadow. The artwork should be detailed and genuinely botanical like a fine engraved wedding stationery rose, not a cartoon, flat icon, chunky outline, doodle, floral wallpaper, or photo. Preserve the complete illustration with 8 percent clear transparent padding around all edges. A single coherent bouquet, not a sheet of multiple separate assets. High resolution for clean web use at 250-380px wide. The design complements cream #EEEDE7 invitation paper and refined wedding calligraphy.

## Final seal prompt

Use case: product-mockup. Asset type: one small transparent wax seal decoration for a romantic wedding invitation website. Create a single photorealistic luxury wedding wax seal viewed directly from overhead, perfectly centered, isolated on a genuinely transparent background. Deep warm burgundy wax #7A2420, soft satin finish, hand-poured subtly irregular circular perimeter, finely raised concentric rim, realistic gentle highlights from upper left. The center carries the exact refined serif monogram "K&T" crisply embossed, with very restrained antique-gold #A58B55 highlights on the embossed letters and a tiny engraved botanical sprig underneath. Match a cream and charcoal botanical wedding stationery suite. Seal fills about 75 percent of a square canvas with ample transparent margin on all sides, no cropping. Small decorative object appropriate for rendering 65-90px wide. No paper, no envelope, no ribbon, no fingers, no surface, no extra text, no logo, no watermark, no large cast shadow outside the seal. Keep real transparency around the object and realistic burgundy material, not bright red plastic.

## Design and motion

Pinyon Script supplies the names, signatures, and captions. Cormorant Garamond supplies headings; Manrope supplies body text and controls. The original palette is unchanged.

The invitation enters with a 700ms fade and a 32px desktop / 24px mobile lift. Names and supporting details retain their existing sequence; the hero photograph finishes by 900ms. Individual offscreen items reveal once over 800ms when their top crosses the viewport's 75% line, using 90ms stagger steps capped at 270ms. Interactive stationery panels fade without lifting. Photographs use one outer lift/fade and an inner rotation-only settle over 800ms, starting 2 degrees below their final desktop angle or 1 degree below on mobile. Reveals use native CSS and Intersection Observer. Botanical and photograph depth uses Motion for React, with normal scrolling. See scroll-motion.md for the latest motion settings and verification.

HTML renders visibly by default. Only offscreen compositions become pending after JavaScript loads. Focusing a pending composition reveals it immediately. Reduced-motion preferences disable animation, transitions, and smooth scrolling. Native disclosures and the mobile navigation remain usable without JavaScript; dynamic companion controls require JavaScript.

## Verification

Checked the production preview in headless Chrome at 320px, 390px, 768px, and 1440px. No horizontal overflow was found. Expanded entourage groups and a long guest name fitted at phone width. Mobile menu Enter, Escape, outside dismissal, and section links worked. FAQ keyboard expansion, companion add/remove focus, and disabled submission worked. Visible controls met the 44px minimum height, with a visible 2px burgundy focus outline on the reply field.

Photo replacement with a different aspect ratio preserved both container dimensions. Reduced-motion mode showed no pending reveals or entrance animation. With scripts disabled, all reveal content remained visible and the FAQ, entourage, and menu disclosures still operated. No browser runtime errors, failed resources, or submission requests appeared during the checks. These are browser viewport checks, not measurements on a physical phone.

Lint and production build checks passed.
