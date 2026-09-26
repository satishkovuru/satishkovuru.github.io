// GitHub Pages has no server-side routing, so a direct request to a route
// like /projects returns a real HTTP 404 (served via public/404.html's JS
// redirect trick) before React Router ever runs. That 404 status blocks
// search engines from indexing the page, even though the JS redirect works
// fine for a browser.
//
// This copies the built index.html into a real index.html at each route's
// own path, so GitHub Pages serves a genuine 200 for every route and
// crawlers can index them directly, while React Router still mounts
// client-side as normal.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const routes = ['/about', '/resume', '/projects', '/contact', '/articles/detecting-anomalies-cicd'];

const distDir = join(import.meta.dirname, '..', 'dist');
const indexHtml = readFileSync(join(distDir, 'index.html'), 'utf-8');

for (const route of routes) {
  const dir = join(distDir, route);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), indexHtml);
  console.log(`prerendered ${route}/index.html`);
}
