# nischalp.com.np

Portfolio of Nischal Pandey — frontend & full-stack developer, Kathmandu.

React 19 + Vite, plain CSS with design tokens, [Lenis](https://github.com/darkroomengineering/lenis) for smooth scrolling. Deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run lint
```

## Editing content

All copy comes from two data files — no need to touch components for routine updates.

| What | Where |
| --- | --- |
| Name, role, email, social links, experience, "learning now" | `src/data/profile.js` |
| Projects (title, year, role, summary, stack, preview image) | `src/data/projects.js` |

- **Add a live site or repo link** to a project with `live: "https://…"` or `repo: "https://…"`; buttons appear in its detail panel automatically.
- **Project previews** live in `public/work/` as `<image>-720.webp` and `<image>-1376.webp` (1376 × 768 source). `tone` is the backdrop colour behind the hover preview.
- **"What I work with"** is computed from each project's `stack`, so it stays honest: a tool only shows a dot for projects that list it.

## Structure

```
src/
  components/       page sections (Hero, Work, Capabilities, About, Playground, Contact)
    tv/             the interactive television (showreel, games)
    XPWindow.jsx    Windows XP-style modal used by Paint, Gallery and the games
  data/             profile + project content
  lib/              hooks, motion (smooth scroll, reveals, magnetic buttons), storage
  styles/           tv.css, xp.css (imported by index.css)
  index.css         design tokens and site styles
```

Motion respects `prefers-reduced-motion`: smooth scrolling, reveals and the marquee are switched off.
