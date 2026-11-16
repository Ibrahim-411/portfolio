# Ibrahim K, personal portfolio

Single-page portfolio built with semantic HTML, Tailwind CSS v4 and a little vanilla JavaScript.

**Live site:** https://ibrahim-411.github.io/portfolio/

## Edit the content

| What | Where |
| --- | --- |
| Page copy, skills, experience, education, contact | `index.html` |
| Projects (7 cards: browser-frame preview, short about, tool chips, buttons) | `index.html`, section `#projects` |
| Colours, fonts, animations, preview-frame styles | `src/input.css` |
| Font (Inter variable, self-hosted) | `assets/fonts/` |
| Photo | `assets/img/ibrahim-cutout.webp` |

### How the project previews work

Each project card shows a browser-frame mockup (`.bframe`):

- **Live sites** use an `<iframe data-src="...">` rendered at 1280px wide and scaled down to fit (`initFrames()` in `assets/js/main.js`). The `src` is only set when the card is within 300px of the viewport, so iframes never slow the first load. Visitors can scroll inside, and switch Desktop / Mobile width.
- **Sites that block framing** (`X-Frame-Options` / CSP `frame-ancestors`) use `data-mode="shot"` and an auto-scrolling full-page screenshot from `assets/img/projects/`. To switch a card to live, change its `data-mode` to `live` and replace the `<img>` with the `<iframe>` markup from another card.

Currently blocked: studiominiminds.com and kkmkeychains.in (both send `X-Frame-Options: SAMEORIGIN`).

## Rebuild the CSS

Tailwind is compiled to `assets/css/styles.css`, which is committed so GitHub Pages can serve it directly.

```bash
npm install
npm run build   # one-off minified build
npm run dev     # watch mode while editing
```

## Deploy

GitHub Pages serves the `main` branch from the repository root. Push to `main` and the site updates.

## Licences

Inter is licensed under the SIL Open Font License 1.1 (`assets/fonts/OFL.txt`).
