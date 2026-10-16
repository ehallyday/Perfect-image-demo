# Perfect Image Photography — Demo Website Brief

<!--
Filled from the Google Maps listing on 16 Oct 2026: https://maps.app.goo.gl/2ZTGjPK1UAhJDNjm6
Business facts below come from the listing. Everything marked TODO: was NOT on the listing
(or is a design decision) — fill it after the cold call.
Pick ONE option wherever you see "OPTION A / OPTION B" and delete the rest.
-->

## Source of truth for wording
**All visible text comes from `content.md`, used word for word.** This file (CLAUDE.md) covers design, layout and behaviour only.
- Where the two files ever differ on wording, content.md wins.
- Never invent copy. If something is missing, insert a clearly marked placeholder (e.g. `[TODO: copy]`).
- Keep `₦[ ]`, `TODO:` and `TODO-CONFIRM` items from content.md visible as placeholders; don't fill them with made-up numbers or names.
- Never invent business facts (phone, address, hours, services, prices). Only use what's in content.md's Site details.

## What this is
A one-page demo website for **Perfect Image Photography**, a photography service (Google category: "Photography service") in Rumuola, Port Harcourt, Nigeria. A customer review notes they shoot in and outside Port Harcourt.
Demo assumption (TODO-CONFIRM on the call): portraits, weddings, birthdays and events, in a studio and on location.

It's a lead-generation page with these jobs, in this order of priority:
<!-- TODO: reorder after the call. They have a street address, so this assumes a studio. -->
1. **Bookings**: the visitor picks a session and requests a date
2. **Calls and WhatsApp**: one tap to reach Perfect Image Photography from any screen

3. **Enquiries**: custom requests (weddings, events, shoots outside Port Harcourt, quotes)

The portfolio exists to build trust and push visitors toward these actions. Every section ends with an action.

All code in this project must be written from scratch for this brief. Do not reproduce or imitate the layout,
markup, class names, animations or copy of any existing theme, template or previous demo.

## Look and feel
- **Light, editorial.** Concept: "The Proof Sheet" — a photographer's printed proof sheet. Warm paper background, ink-dark text, small mono labels that read like frame numbers (e.g. `01 / Packages`), thin crop-mark corners on photos.
- Accent is a single vermilion, like a red grease-pencil mark. For actions and key highlights only (buttons, links, small marks). Never use it for large fills. White text on accent buttons.
- Style words: editorial, warm, precise, confident, grounded.
- Always write the area as **"Rumuola"**.

### Design tokens (chosen, not sampled: no logo, signage or Instagram on the listing. Re-check against the real logo after the call)
```
--base:         #F4EFE6   /* paper, main background */
--base-alt:     #E9E1D2   /* alternate sections, cards */
--accent:       #B8401F   /* primary buttons, links, highlights, icons */
--accent-hover: #96310F   /* button hover */
--text-strong:  #14201B   /* headings (deep green-black ink), Call floating button */
--text-body:    #3A433F   /* body text */
--soft:         #FBF8F2   /* lightest sections */
```

### Fonts (Google Fonts, free)
- Headings: **Fraunces** (variable serif), oversized with tight leading; "Image" in the logo in italic
- Body: **Hanken Grotesk** (400/500)
- Labels (replaces the script accent): **DM Mono**, small uppercase, for section numbers, tags, captions and frame counters. No script font: render content.md's "(script)" labels in DM Mono.

### Logo
- Inline SVG lockup: "Perfect Image" in Fraunces ("Perfect" roman, "Image" italic), "PHOTOGRAPHY" beneath in small, letter-spaced DM Mono. Four L-shaped crop-mark corners frame a small "PI" monogram beside it. Replace with the real logo file when available.
- Favicon: the crop-mark square with a vermilion dot at the centre.

### Signature choices for this demo
- **Hero:** split screen. Text on paper at the left; one tall photo with crop-mark corners and a mono caption at the right. Stacks (text first, photo below) on mobile.
- **Gallery:** horizontal scroll strip with scroll-snap and numbered frames; filters and lightbox still work.
- **Package cards:** stacked rows with image, like an index list: thumbnail left, details middle, button right.
- **Headline style:** oversized serif, left-aligned, with a mono section number above it.
- **Section dividers:** thin ink rules carrying the frame number. No angled edges.

## Page structure and behaviour (in this order)
Copy for every section is in content.md under the matching heading.
**Menu:** Home · Packages · Work · About · Reviews · Book

1. **Sticky header**: logo on the left, the menu links, an accent header button on the right, and a phone icon (`tel:` link) on mobile. Transparent over the hero, solid on scroll. Full-screen menu on mobile. Menu links scroll to their sections.
2. **Hero**: split screen per the signature choice above. Label, headline, subheadline and buttons from content.md. The primary button scrolls to the booking section; the secondary opens WhatsApp with the general message; the mobile-only call link is a `tel:` link.
3. **Trust strip**: the items from content.md (incl. 4.3★ on Google) in a single row on desktop, wrapping to a grid on mobile.
4. **Packages**: one card per package in content.md.
   - **Bookable** packages (Portrait Session, Couple Session, Birthday & Family Session) have a **Book this** button: it scrolls to the booking form and pre-selects that package.
   - **Quote** packages (Wedding Coverage, Event Coverage) have a **Get a quote** button: it opens WhatsApp with the package message, filled with that package's name.
   - Portrait Session is highlighted and carries the tag "Best place to start".
   - The line below the cards links to WhatsApp with the general message.
5. **Work**: 9–12 photos, filterable by the categories in content.md, opening in a lightbox. End with the Instagram link and button from content.md (TODO: handle).
6. **How it works**: three numbered steps, then a button that scrolls to the booking section.
7. **About**:
   - Solo photographer: "Meet [Name]", portrait, short story. No team cards. Name, years and story remain content.md TODOs; switch to a studio-with-team layout (text, studio photo, years counter, team cards) only if the call shows a team.
   The button scrolls to the booking section.
8. **Reviews**: the 3 Google review cards from content.md in a grid or slider, "Rated 4.3★ on Google" in the heading, and a link to the Google listing. Show the "From Google reviews" label.
9. **[OPTIONAL, TODO-CONFIRM keep or delete]** Offers & recent shoots / Recent events: wrap in one container with `data-section="offers"` so it's easy to remove.
10. **Book & Visit**:
    - Left: the booking form, visible on the page (not a pop-up), with the fields, options and required markers from content.md. Validate required fields. On submit, build the form WhatsApp message from content.md, open `https://wa.me/2347065428557?text=...` in a new tab (TODO-CONFIRM this number is on WhatsApp), and show the success message inline.
    - Right: address, hours, visit note, Get Directions / Call / WhatsApp buttons and an embedded Google Map of 1 Timothy Lane, Aba Rd, Rumuola.
11. **FAQ**: an accordion of the questions in content.md, one open at a time, keyboard accessible.
12. **Footer**: logo, short line, address, phone, WhatsApp, hours, Instagram and copyright from content.md.

**Mobile:** floating **WhatsApp** (green `#128C4A`) and **Call** (ink `#14201B`) buttons, always visible from the end of the hero onward.

## Links and numbers
- Phone: `tel:+2347065428557`
- WhatsApp base: `https://wa.me/2347065428557?text=` + URL-encoded message from content.md (TODO-CONFIRM WhatsApp number)
- Directions / Google reviews: https://maps.app.goo.gl/2ZTGjPK1UAhJDNjm6
- Instagram: handle not on listing (TODO-CONFIRM); links point to instagram.com until known
- Website: none listed

## Technical rules
- Plain HTML, CSS and vanilla JS. No frameworks and no jQuery. Files: `index.html`, `css/style.css`, `js/main.js`, `img/`.
- Free, MIT-licensed libraries only, and only where they save real work:
  - Lightbox: **GLightbox** or **PhotoSwipe** via CDN
  - Everything else (hero, filters, accordion, sticky header, counter, form → WhatsApp) is written by hand
- Mobile-first, tested at 360px and on slow 3G/4G. Respect `prefers-reduced-motion` by turning off hero motion, fades and counter animation.
- Performance: under 3 seconds to load on mobile; lazy-load images below the fold; WebP under 300KB each.
- Accessibility: semantic sections, alt text on every image, visible focus states, labelled form fields, WCAG AA contrast.
- SEO: title "Perfect Image Photography | Photographer in Rumuola, Port Harcourt", the meta description from content.md, and LocalBusiness JSON-LD schema using the site details in content.md (address, phone, geo 4.8333297, 7.0048054, aggregateRating 4.3 / 6).
- Tracking: give the Call, WhatsApp, Book, Get a quote and Get Directions buttons `data-track` attributes, with a GA4-ready event hook in `main.js` (no GA ID needed for the demo).
- Keep the structure simple and section-based so it can later be rebuilt in **WordPress + Elementor**. Avoid layouts that only work through heavy custom JS.

## Photos
For the demo, use clearly-licensed stock (Pexels, Nappy, Unsplash) and mark each one in an HTML comment for replacement with the client's own work (they have 51 photos on Google — ask permission to use them). Files are named by section (e.g. `hero-1.jpg`, `work-[category]-1.jpg`, `pkg-[name].jpg`), and sources are listed in `img/sources.txt`.

## Build order
Do one phase per request, then stop, tell me what to check in the browser, and commit to Git.
1. Scaffold the files, design tokens, fonts and base typography; empty, labelled sections for the full page
2. Header and hero
3. Trust strip, packages and how it works
4. Work grid, filters and lightbox
5. About, reviews and optional section
6. Booking section (form → WhatsApp, map, hours), FAQ, footer and floating mobile buttons
7. Responsive pass, reduced-motion handling, image optimisation, accessibility, SEO and tracking check
