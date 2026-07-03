# Elena & Marcus — Online Wedding Invitation

A premium, single-page wedding invitation built with plain **HTML5, CSS3, and
vanilla JavaScript**. No build tools, no frameworks, no installation — just
open `index.html` in a browser.

---

## ✨ Features

- Fullscreen animated hero with zoom/fade entrance
- Sticky, transparent-to-solid navigation with animated mobile menu
- "About the Event" section with decorative divider
- Featured venue image with hover zoom
- Eight event-detail cards (date, time, venue, dress code, event type,
  contact, email, website)
- Live countdown timer (days / hours / minutes / seconds)
- Vertical animated event schedule / timeline
- Responsive photo gallery with lightbox (LightGallery) and zoom
- Embedded Google Map + address, parking, and transportation notes
- QR code linking straight to the venue on Google Maps
- Validated RSVP form with elegant success/error messaging
- Footer with social links and a back-to-top button
- Scroll-reveal animations throughout (AOS)
- Fully responsive: desktop, laptop, tablet, mobile, and landscape mobile
- Accessible: semantic HTML, ARIA labels, alt text, visible focus states,
  keyboard-navigable menu
- SEO-ready: meta tags, Open Graph, Twitter Cards, canonical URL,
  JSON-LD `Event` structured data

---

## 📁 Folder Structure

```text
Invitation/
│
├── index.html
├── README.md
│
├── css/
│   ├── style.css
│   └── responsive.css
│
├── js/
│   └── main.js
│
└── images/
    ├── hero.jpg
    ├── venue.jpg
    ├── gallery1.jpg
    ├── gallery2.jpg
    ├── gallery3.jpg
    ├── gallery4.jpg
    ├── gallery5.jpg
    └── gallery6.jpg
```

---

## 🚀 Getting Started

1. Download or copy the `Invitation/` folder to your computer.
2. Double-click `index.html` (or open it via `File → Open` in your browser).
3. That's it — no server, no npm install, no build step required.

For live-reload while editing, you can optionally serve the folder with any
static server, e.g. `python3 -m http.server` from inside `Invitation/`.

---

## 🖼️ About the Images

The `images/` folder ships with elegant, on-brand **placeholder artwork**
(procedurally generated gradients in the site's navy/gold/ivory palette) so
the project works immediately, fully offline, with no external downloads.

To use real photography, replace each file (keeping the same filename and a
similar aspect ratio) with royalty-free images from **Unsplash** or
**Pexels**. Good search terms:

| File            | Suggested search                          | Suggested size |
|-----------------|--------------------------------------------|-----------------|
| `hero.jpg`      | "vineyard sunset", "wedding venue golden hour" | 1920×1080 |
| `venue.jpg`     | "wedding ceremony arch flowers"            | 1600×1000 |
| `gallery1.jpg`  | "couple engagement portrait"               | 900×1200 (portrait) |
| `gallery2.jpg`  | "wedding rings macro"                      | 900×900 |
| `gallery3.jpg`  | "vineyard rows napa valley"                | 900×900 |
| `gallery4.jpg`  | "elegant table setting gold"               | 900×900 |
| `gallery5.jpg`  | "wedding bouquet white roses"               | 900×1200 (portrait) |
| `gallery6.jpg`  | "string lights reception evening"          | 900×900 |

All `<img>` tags already include descriptive `alt` text — update it if you
swap in different imagery.

---

## 🎨 Customizing Content

All copy lives directly in `index.html` — search for these anchors and edit:

- **Names & date** — `.hero-title`, `.hero-date`, and the JSON-LD block
- **Countdown target** — `data-target` attribute on `#countdown`
  (ISO 8601 format, e.g. `2026-09-12T16:00:00-07:00`)
- **Event details** — the eight `.detail-card` blocks in `#details`
- **Schedule** — the `<li class="timeline-item">` entries in `#schedule`
- **Map & address** — the `iframe src` and `.location-info` text in
  `#location` (replace the query string with your venue's address)
- **QR code** — the `src` on the QR `<img>` already points to
  `api.qrserver.com` and encodes the same Google Maps link as the buttons
  above it; update the `data=` query parameter if you change the venue
- **RSVP deadline & fields** — `.rsvp-lead` and `#rsvpForm`

---

## 🎨 Design Tokens

Defined at the top of `css/style.css` under `:root`:

| Token | Value | Use |
|---|---|---|
| `--color-ivory` | `#FAF6F0` | Page background |
| `--color-navy` | `#1B2A4A` | Headings, dark sections |
| `--color-gold` | `#C9A227` | Accents, buttons, icons |
| `--color-champagne` | `#F0E4D0` | Alternating section backgrounds |
| `--color-gray` | `#E8E4DD` | Borders, muted text |
| `--font-heading` | Playfair Display | Headings & signature |
| `--font-body` | Poppins | Body copy, UI |

---

## 🔌 Third-Party Libraries (CDN only, no install)

- [Google Fonts](https://fonts.google.com) — Playfair Display, Poppins
- [Font Awesome 6](https://fontawesome.com) — icons
- [AOS](https://michalsnik.github.io/aos/) — scroll animations
- [Swiper](https://swiperjs.com) — bundled for optional slider use
- [LightGallery](https://www.lightgallery.com) — gallery lightbox + zoom

All are loaded from `cdnjs.cloudflare.com`, so an internet connection is
needed for fonts/icons/animation libraries to load — the page itself still
works locally with no build step.

---

## ♿ Accessibility Notes

- Skip-to-content link for keyboard users
- All interactive elements have visible `:focus-visible` states
- Form fields are labeled and announce errors via `role="alert"`
- The RSVP success/error banner uses `aria-live="polite"`
- Respects `prefers-reduced-motion` (disables animation where requested)

---

## 📄 License

This template is provided for personal use in creating your own invitation.
Replace all placeholder names, dates, and imagery before sharing publicly.
