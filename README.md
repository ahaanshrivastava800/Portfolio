# Ahaan Shrivastava — Deepwoken Portfolio

A personal portfolio site themed after the layered world of Deepwoken. As you scroll deeper, you descend through six atmospheric layers — from the bright Surface down to the dark Abyss — each showcasing a different facet of my background: community work, dealmaking, projects, quantitative skills, and more. Features include an interactive particle canvas, a Talent Orb mechanic for revealing skills, dynamic fog and light-ray effects, and a depth gauge that tracks your descent.

---

## How to Run Locally

No build step is required. Simply open `index.html` in a modern browser:

```bash
# Option 1 — just double-click index.html

# Option 2 — Python dev server
python3 -m http.server 8000

# Option 3 — npx serve
npx serve
```

Then navigate to `http://localhost:8000` (or whichever port is shown).

---

## Deploy to GitHub Pages

1. Initialise a repository and push:

```bash
git init
git add .
git commit -m "Initial commit — Deepwoken portfolio"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

2. In your GitHub repository, go to **Settings → Pages**.
3. Under **Source**, select **Deploy from branch**.
4. Choose **main** branch and **/ (root)** folder, then click **Save**.
5. After a minute or two your site will be live at:

```
https://YOUR_USERNAME.github.io/YOUR_REPO/
```

---

## Customisation

All portfolio text, stats, role descriptions, project entries, and talent data live in a single file:

```
js/content.js
```

Edit the exported `CONTENT` object to update any section without touching the HTML or CSS. Each layer's content is keyed by section (e.g. `surface`, `gale`, `brokerage`, `forge`, `quant`, `abyss`, `talents`). Swap titles, descriptions, card entries, and contact links there.

---

## Credits

- **Fonts**: [Cinzel](https://fonts.google.com/specimen/Cinzel) and [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) via Google Fonts (SIL Open Font License).
- **Theme inspiration**: The layer / depth motif is inspired by community descriptions of the Deepwoken game world. No copyrighted Deepwoken assets, sprites, audio, or trademarks are used in this project.
- **Effects**: All particles, fog, grain, and light-ray effects are created with vanilla CSS and Canvas API — no third-party libraries.
