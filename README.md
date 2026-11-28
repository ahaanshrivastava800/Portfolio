# Portfolio — Ahaan Shrivastava

Personal portfolio website built with plain HTML, CSS, and vanilla JavaScript (no frameworks, no build step) for GitHub Pages.

Live URL: https://ahaanshrivastava800.github.io/Portfolio/

## Files

- `index.html` — Semantic HTML structure with sticky navigation, six sections (`about`, `skills`, `contributions`, `projects`, `education`, `contact`), and `<noscript>` fallback links.
- `style.css` — Mobile-first single-column styles with system font stack, light mode, and automatic dark mode via `prefers-color-scheme`.
- `data.js` — All portfolio content, PR links, project details, education, achievements, proof URLs, and contact links.
- `script.js` — Renders `PORTFOLIO_DATA` into the DOM and hides/logs any empty fields.
- `check-links.js` — Node.js script that validates all URLs in `data.js` (flags empty, `"#"`, relative, or malformed URLs).
- `proof/` — Certificate files served at `https://ahaanshrivastava800.github.io/Portfolio/proof/`.

## Local Verification

1. Validate all URLs in `data.js`:
   ```sh
   node check-links.js
   ```
2. Preview locally with any static server (for example, `python3 -m http.server 8000`) and open `http://localhost:8000` in your browser.

## Deploying on GitHub Pages

1. Commit and push all files (`index.html`, `style.css`, `script.js`, `data.js`, `check-links.js`, `README.md`, and `proof/`) to the `main` branch of `ahaanshrivastava800/Portfolio`.
2. Open the repository on GitHub and go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Select branch **`main`** and folder **`/ (root)`**, then click **Save**.
5. Wait 1–2 minutes for the GitHub Pages deployment to complete, then open `https://ahaanshrivastava800.github.io/Portfolio/`.

## Pre-Submission Checklist

- [ ] Run `node check-links.js` and confirm 0 errors.
- [ ] Open `https://ahaanshrivastava800.github.io/Portfolio/` in an **incognito window** (no GitHub login session) to verify public visibility.
- [ ] In the incognito window, **click every single link** and confirm none return 404 or require authentication:
  - [ ] All 6 top navigation links (`#about`, `#skills`, `#contributions`, `#projects`, `#education`, `#contact`)
  - [ ] All 10 `S-AI-Projects/bash` PR links (`#61`, `#65`, `#66`, `#67`, `#68`, `#69`, `#71`, `#73`, `#75`, `#90`), upstream repo, and fork repo
  - [ ] All skill evidence links
  - [ ] `gst-flow-demo` repository and documentation links
  - [ ] `CloudCode` repository and documentation links
  - [ ] All 3 proof files in `proof/` (`brain-gold-certificate.pdf`, `hacktoberfest-certificate.pdf`, `omnikon-hackathon-certificate.png`)
  - [ ] Hacktoberfest PR #1 and PR #2 links
  - [ ] Email (`mailto:`), GitHub profile, and LinkedIn profile links
- [ ] Open browser DevTools Console and confirm there are no errors or missing-field warnings.
- [ ] Check mobile responsiveness and both light and dark color schemes.
- [ ] Briefly disable JavaScript in DevTools to verify the `<noscript>` fallback notice and links render cleanly.
