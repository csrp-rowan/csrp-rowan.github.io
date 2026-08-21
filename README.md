# CSRP — Computer Science Research Presentation Series

One file, no build step: `index.html` (HTML5 + CSS, no JavaScript, no Jekyll).
Open it locally by double-clicking, or push this folder to the GitHub Pages repo.

`.nojekyll` tells GitHub Pages to serve the files as-is (no Jekyll processing). Keep it.

## Editing
Everything lives in `index.html`. Search for `EDIT:` comments:
- semester name / dates — hero, Time & Location, Schedule lede
- schedule — one `<li>` per Friday; use `class="tba"` until confirmed, `class="break"` for no-talk weeks
- ambassadors — add a new `<div class="card">` at the top of `.semesters`
- team photos — put a square-ish image in `photos/` and swap the `<div class="avatar placeholder">`
  for `<img class="avatar" src="photos/name.jpg" alt="">`

## Files
- `index.html` — the site
- `favicon.svg`, `logo.svg`, `logo.png` — CSRP logo (mark + wordmark); PNG is for slides/e-mail
- `qr.png` — attendance QR (go.rowan.edu/csrp-att)
- `howtopresent.pdf` — information for presenters
- `cslogoofficial.png`, `rowanacmlogo.png`, `ACM_ChapterEv_v1a.jpg` — footer logos
