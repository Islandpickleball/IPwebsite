# islandpickleball.org

Static site. Edit `index.html` (content), `style.css` (styling), `images/` (photos).

Photo captions: every photo sits in a `<figure>` with a `<figcaption>`. Look for the
`<!-- CAPTION — edit the text between the tags below -->` comment and change the words
inside `<figcaption>...</figcaption>`. Nothing else needs touching.
No build step — open index.html locally to preview.

## Hosting via GitHub Pages
1. Create a public GitHub repo (e.g. `island-pickleball`) and push these files to `main`.
2. Repo → Settings → Pages → Source: "Deploy from a branch", Branch: `main` / `/ (root)`. Save.
3. Add a file named `CNAME` in the repo root containing exactly: `islandpickleball.org`
   (already included).
4. In Pages → Custom domain, enter `islandpickleball.org`, save, then check "Enforce HTTPS"
   once the certificate is issued (can take up to an hour).

## Squarespace DNS (domain stays at Squarespace, site served by GitHub)
Squarespace → Domains → islandpickleball.org → DNS / DNS Settings → Custom Records.
Delete existing A / CNAME records that point to Squarespace site hosting, then add:

| Host | Type  | Data |
|------|-------|------|
| @    | A     | 185.199.108.153 |
| @    | A     | 185.199.109.153 |
| @    | A     | 185.199.110.153 |
| @    | A     | 185.199.111.153 |
| www  | CNAME | <your-github-username>.github.io |

Keep any MX / email records untouched. DNS can take 15 minutes to a few hours.

## Contact form
The form posts to formsubmit.co, which emails submissions to info@islandpickleball.org.
Activate it once: submit the form yourself after the site is live and click the
confirmation link in the email formsubmit.co sends. To change the destination address,
edit the `action` URL in index.html.

## Alternative: Netlify (what you used before)
If you'd rather keep the previous Netlify + Decap CMS setup:
1. Push this repo to GitHub, then in Netlify: Add new site → Import from Git → pick the repo.
   Build command: none. Publish directory: `/` (root).
2. Netlify → Domain management → Add custom domain → `islandpickleball.org`.
3. In Squarespace DNS, replace the A/CNAME records with what Netlify shows you
   (typically four A records to `75.2.60.5` or an ALIAS/CNAME to `<site>.netlify.app`,
   plus `www` CNAME to `<site>.netlify.app`). Then enable HTTPS in Netlify.
4. Netlify Forms will capture the contact form automatically if you add
   `netlify` and `name="contact"` attributes to the `<form>` tag and remove the
   formsubmit.co action.
