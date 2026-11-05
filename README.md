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

## Forms (Formspree)

All forms submit to [Formspree](https://formspree.io) — a form backend for static sites.
Submissions arrive in your inbox; no server needed. Until a form is connected, it shows a
friendly "not connected yet" message with your phone number — nothing ever fails silently.

### One-time setup (about 10 minutes)

1. Create a free account at formspree.io (free plan: 50 submissions/month — enough to launch).
2. Create six forms, one per service. Suggested names:
   `Contact` · `Court Quote` · `Coaching Request` · `Academy Registration` · `Tournament Notify` · `Escapes Interest`
3. Each form gets an endpoint like `https://formspree.io/f/xabcdwqk`.
   Open `app.js` and paste each form's ID into `FORM_ENDPOINTS` — that file is the only edit.
4. In each Formspree form's settings, confirm the notification email address (info@islandpickleball.org
   or wherever you want submissions delivered).
5. Commit and push — the forms are live. Submit a test on each one and check your inbox.

### Academy payments (optional)

After a successful registration, the page shows a payment step. To enable direct payment:

1. In Stripe (Dashboard → Payment Links), create two links: $179 Standard Entry and $269 Academy Pro Tier.
2. Paste them into `PAYMENT_LINKS` in `app.js`.

Leave them blank and the page instead shows "we'll email you a secure payment link within 24 hours."

### Spam protection

Every form includes a hidden honeypot field (`_gotcha`) — bots that fill it are silently dropped by Formspree.

### Booking service upgrade path

The coaching form sends a request that you confirm by text — matching how the business runs today.
If you later want self-service scheduling, embed Calendly or Square Appointments on `coaching.html`;
both work fine alongside this setup.

## Hosting via GitHub Pages

Served from `main` via GitHub Pages with custom domain `islandpickleball.org`
(CNAME file in the repo root — do not delete). Merging a PR to `main` auto-deploys,
usually within a couple of minutes.
