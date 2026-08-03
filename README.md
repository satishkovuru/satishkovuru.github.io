# satishkumar9549.github.io

Personal portfolio website built with React + Vite, showcasing my background, résumé, skills, and projects. Deployed automatically to GitHub Pages.

## Tech stack

- [React 19](https://react.dev/) + [React Router](https://reactrouter.com/)
- [Vite](https://vite.dev/) for dev server and build
- Plain CSS with light/dark theme support (no UI framework)
- GitHub Actions → GitHub Pages for deployment

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL in your browser. The dev server supports hot module reload.

## Project structure

```
src/
  data/           # Edit these files to update site content
    profile.js    # Name, tagline, about text, contact links
    resume.js     # Experience, education, skills
    projects.js   # Project cards
  components/     # Navbar, Footer, ThemeToggle, SectionHeading
  pages/          # Home, About, Resume, Projects, Contact, NotFound
  App.jsx         # Route definitions
  index.css       # Global styles / theme variables
public/
  resume.pdf      # Downloadable résumé (regenerate with your own content)
  404.html        # GitHub Pages SPA routing fallback
```

To update the site's content, edit the files under `src/data/` — no other
code changes are needed for text/content updates.

## Available scripts

| Command           | Description                          |
| ------------------ | ------------------------------------- |
| `npm run dev`       | Start the local dev server            |
| `npm run build`     | Production build to `dist/`           |
| `npm run preview`   | Preview the production build locally  |
| `npm run lint`      | Lint the source with oxlint           |

## Deployment

Pushes to `master` automatically build and deploy to GitHub Pages via
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). In the
repository settings, set **Settings → Pages → Build and deployment → Source**
to **GitHub Actions** (one-time setup).

The site also includes the standard [SPA GitHub Pages
redirect](https://github.com/rafgraph/spa-github-pages) (`public/404.html` +
a small script in `index.html`) so that direct links like `/resume` work
correctly even though GitHub Pages has no server-side routing.

## Updating the résumé PDF

`public/resume.pdf` is a static file served as-is by the "Download PDF"
button on the Resume page. Regenerate it whenever you update
`src/data/resume.js`, either by exporting a PDF from your résumé document or
using the Resume page's **Print** button (browser print-to-PDF) and saving it
as `public/resume.pdf`.
