# Prakhar Mehta — study & research mentoring website

A static site, ready to host on GitHub Pages. No build step — it's plain
HTML, CSS, and JavaScript.

```
index.html
css/style.css
js/script.js
assets/prakhar-photo.jpg
assets/favicon.svg
```

## 1. Put it on GitHub Pages

1. Create a new repository on GitHub (e.g. `prakhar-mehta.github.io` if you
   want it at the root of your GitHub username, or any name if you're happy
   with a `/repo-name/` path).
2. Add these files to the repo and push:
   ```
   git init
   git add .
   git commit -m "First version of the site"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
3. In the repo, go to **Settings → Pages**, set **Source** to the `main`
   branch and `/ (root)` folder, and save.
4. Your site will be live at `https://YOUR_USERNAME.github.io/YOUR_REPO/`
   (or `https://YOUR_USERNAME.github.io/` if you used the special repo name)
   within a few minutes.
5. Optional: add a custom domain under **Settings → Pages → Custom domain**.

## 2. Things you should edit before sharing this publicly

**Everything below lives in `js/script.js`, in one block near the top
marked `EDIT ME` — you don't need to touch the HTML or CSS for any of it.**

- **`SITE_CONFIG`** — your email is already filled in. Add your LinkedIn,
  Google Scholar, ResearchGate, GitHub, and a Calendly (or similar) link if
  you'd like a "book a call" link — any field left as `""` just stays
  hidden, nothing breaks.
- **`THESES`** — the five entries here are placeholders in the right shape
  and general subject area (based on your CV), **not your students' real
  titles**. Replace `title`, `degree`, and `area` with the real thing. Only
  fill in a student's `linkedin` field if that specific student has agreed
  to be linked publicly — leave it as `""` otherwise and their title will
  just show as plain text, not a link.
- **`TESTIMONIALS`** — currently placeholders (shown with a dashed border
  on the live site as a visual reminder). Replace `quote`, `name`, and
  `context`, and set `filled: true` once you do, to switch to a solid
  border. Only use a real quote with the person's permission.

**One more spot, in `index.html`:** the contact form's `action` attribute
currently points to `https://formspree.io/f/YOUR_FORM_ID`. Until you change
it, submitting the form just opens the visitor's email app with a
pre-filled message to you — functional, but easy to miss. To collect
messages directly:

1. Create a free account at [formspree.io](https://formspree.io) and make
   a new form.
2. Copy the endpoint it gives you (looks like
   `https://formspree.io/f/abcd1234`).
3. Paste it into the `action="..."` attribute on the `<form id="contactForm">`
   line in `index.html`.

## 3. Other easy edits

- **Photo**: replace `assets/prakhar-photo.jpg` with a higher-resolution
  headshot if you have one — the one here was pulled from your CV and is
  fairly small.
- **Colors and fonts**: the top of `css/style.css` has a `:root` block with
  every color as a named variable, and the two font families used across
  the whole site. Change values there rather than hunting through the file.
- **Copy**: section text lives directly in `index.html` — search for the
  heading you want to change (e.g. "How I can help") and edit the
  paragraph or list items underneath it.

## Notes on what was deliberately left out

Your CV includes your home address and your references' personal contact
details. Neither is on the site — a business site doesn't need your street
address, and reference contact information is only appropriate to share
privately, on request, with someone who is actually checking a reference.
