# Ibrahim K, personal portfolio

Single-page portfolio built with semantic HTML, Tailwind CSS v4 and a little vanilla JavaScript.

**Live site:** https://ibrahim-411.github.io/portfolio/

## Edit the content

| What | Where |
| --- | --- |
| Page copy, skills, experience, education, contact | `index.html` |
| Projects (problem / what I did / tools / result) | `assets/js/projects.js` — a plain array, edit and refresh |
| Colours, fonts, animations | `src/input.css` (`@theme` block) |
| Photo | `assets/img/ibrahim-cutout.webp` |

Replace each `[add result]` in `assets/js/projects.js` with real numbers.

## Rebuild the CSS

Tailwind is compiled to `assets/css/styles.css`, which is committed so GitHub Pages can serve it directly.

```bash
npm install
npm run build   # one-off minified build
npm run dev     # watch mode while editing
```

## Deploy

GitHub Pages serves the `main` branch from the repository root. Push to `main` and the site updates.
