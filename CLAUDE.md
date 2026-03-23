# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Ukrainian kindergarten website (КЗДО №7 «Сонечко»). Jekyll static site, GitHub Pages hosting, Decap CMS admin panel at `/admin/`. Custom theme — no minima. Design: sun/sky/grass aesthetic, Comfortaa (headings) + Nunito (body) from Google Fonts.

## Commands

```bash
bundle install
bundle exec jekyll serve       # dev server at localhost:4000
bundle exec jekyll build       # build to _site/
npx decap-server               # local CMS backend (run alongside jekyll serve)
```

## Layout system

| Layout | Used for |
|---|---|
| `default.html` | base HTML shell — all pages inherit this |
| `home.html` | homepage only (no banner) |
| `page.html` | all inner section pages — adds blue banner + breadcrumbs |
| `post.html` | news posts — banner with date/categories + prev/next nav |
| `news.html` | news archive at `/novyny/` — lists all posts |

## CSS

Single file: `assets/css/style.scss` (needs empty `---` front matter to be processed by Jekyll). All CSS variables in `:root` at top. Breakpoints at 900px and 600px. Key class groups: `.hero-*`, `.features-*`, `.news-card-*`, `.news-list-*`, `.page-banner`, `.post-nav`, `.site-header`, `.site-footer`.

## Navigation

Defined in `_config.yml` under `nav:` list. Both `header.html` and `footer.html` loop over `site.nav`. Active link detection in `header.html` uses `page.url contains item.url`.

## Posts

Stored in `_posts/`, URL pattern `/novyny/:title/` (set by `permalink` in `_config.yml`). Required front matter: `layout`, `title`, `date`, `categories`. Optional: `icon` (emoji), `image`, `excerpt`.

## Pages

All in `pages/` directory with explicit `permalink:` front matter. Each uses `layout: page`. The news archive page (`pages/novyny.md`) uses `layout: news`.

## Data files

`_data/months_uk.yml` — maps `"01"` → `"Січ"` etc., used by `_layouts/news.html` for date boxes.

## Admin panel

`admin/config.yml` — Decap CMS config. Collections: `posts` (news) and `pages` (all section pages as named files). Before deploying, user must replace `YOUR_USERNAME/YOUR_REPO` and `YOUR_NETLIFY_SITE` placeholders. For local testing: set `local_backend: true` and run `npx decap-server`.

## Site config variables

Defined in `_config.yml` and used in templates: `site.title`, `site.description`, `site.email`, `site.phone`, `site.address`, `site.groups`, `site.pupils`.
