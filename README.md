# De_Light Foundation — Website

A plain static site (HTML + CSS + JS, no build step, no framework). Six pages: `index.html` (Home), `about.html`, `programs.html`, `scholarship.html`, `give.html`, `contact.html`. Shared styling lives in `assets/css/style.css`, shared behaviour in `assets/js/main.js`.

## 1. Push it to GitHub from VS Code

1. Unzip this folder and open it in VS Code (`File → Open Folder`).
2. Open the built-in terminal (`` Ctrl+` ``) and run:
   ```
   git init
   git add .
   git commit -m "Initial site"
   ```
3. Create a new empty repository on GitHub (no README/license — this folder already has one), then:
   ```
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git branch -M main
   git push -u origin main
   ```
   (Or use VS Code's built-in "Publish to GitHub" button in the Source Control tab — same result, fewer commands.)

## 2. Deploy on Vercel

1. Go to vercel.com and sign in (GitHub login is easiest).
2. "Add New… → Project" → import the GitHub repo you just pushed.
3. Framework preset: leave as **Other** / no framework. Build command: none needed. Output directory: leave as root (`.`).
4. Click **Deploy**. You'll get a fresh `your-project.vercel.app` URL (confirmed this is fine for now — a custom domain can be added later in Vercel's Project → Settings → Domains, whenever you're ready).

From then on, every time you `git push`, Vercel redeploys automatically — no friend required.

## 3. Two things to paste in before launch

Open **`assets/js/main.js`** — the first two lines are:

```js
const GOOGLE_FORM_URL = "PASTE_YOUR_GOOGLE_FORM_LINK_HERE";
const PAYPAL_EMAIL = "udealorfestus@gmail.com";
```

- **`GOOGLE_FORM_URL`** — paste your scholarship application Google Form link here. Every "Apply Now" button across the site (hero, the Scholarship page's apply panel, and the Contact page) reads from this one line.
- **`PAYPAL_EMAIL`** — already set to `udealorfestus@gmail.com`. The Give page's buttons use this to build PayPal payment links (via PayPal's classic `_xclick` link, which sends money straight to that email with no PayPal business account needed). Change it only if you want donations to go to a different PayPal-linked email.

## 4. Things still marked "pending" on the live pages

- **About page → "What We've Done" video.** Open `about.html`, search for `video pending`. There's an HTML comment right above the video block showing exactly what to paste in once you have a public Facebook video link.
- **About page → Our Team.** Search for `OUR TEAM` in `about.html`. Each team member is one `<div class="people-card placeholder">…</div>` block — duplicate it per person, fill in name/role/bio, and remove `placeholder` from the class once it's real.
- **About page → Testimonials.** Same pattern, search for `TESTIMONIALS`.
- **About page → Founder photo.** Search for `Founder photo to be added` — swap that block for an `<img>` once you have a photo.

All of the above are plain HTML/CSS — safe to edit directly in VS Code, no build step to run afterwards. Just save and `git push`.

## File map

```
index.html          Home
about.html           About (story, mission, founder, team, video, testimonials)
programs.html        Our Programs
scholarship.html     Scholarship & Mentorship (eligibility + apply)
give.html            Give (PayPal)
contact.html         Contact
assets/css/style.css Shared styles
assets/js/main.js    Shared behaviour + the two config lines above
assets/img/          Your real logo (logo-icon.png, used in nav + footer), favicons, the 4 campus photos used in page headers, + anywhere you add team/founder photos
```

## About the Vercel "AI Gateway" screen

If Vercel showed you an "AI Gateway" / "Get an API key" onboarding screen after creating your account or project — that's a separate Vercel product for building AI apps. It has nothing to do with hosting this static site. You don't need it, don't need to export that key anywhere, and can ignore that screen entirely. Just go to your Vercel dashboard, "Add New… → Project", and import the GitHub repo as described in step 2 above.
```
