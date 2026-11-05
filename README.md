# islandpickleball.org

Static multi-page site for Island Pickleball. No build step — open any page locally to preview.

## Site structure

| Page | Purpose |
|---|---|
| `index.html` | Home — five doors into the business |
| `courts.html` | Court construction, resurfacing, striping |
| `academy.html` | Youth Academy (ages 10+) — pricing, wristband ladder, registration |
| `coaching.html` | Adult lessons & clinics — rates and booking |
| `tournaments.html` | Island events calendar |
| `escapes.html` | Hosted getaways — interest list |
| `about.html` | David Kane, credentials, community |
| `contact.html` | Contact routes, QR code |

Shared files: `base.css` + `style.css` (styling), `app.js` (mobile menu + form behavior), `favicon.svg`, `images/`.

## Editing

- **Content:** edit the HTML files directly — each section is commented.
- **Photos:** drop files into `images/` and reference as `./images/filename.jpg`. Every photo sits in a `<figure>` with a `<figcaption>` for the caption.
- **Phone number:** search-and-replace `605-0634` across all HTML files if it changes.

## Forms

Forms are prototypes. Connect them to a booking/registration/email tool when ready —
each form has a `data-proto` attribute in `app.js` where the real submission handler goes.

## Hosting via GitHub Pages

Served from `main` via GitHub Pages with custom domain `islandpickleball.org`
(CNAME file in the repo root — do not delete). Merging a PR to `main` auto-deploys,
usually within a couple of minutes.
