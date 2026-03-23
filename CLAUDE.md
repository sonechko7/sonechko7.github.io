# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Sonechko** is a Jekyll static site/blog. Content is written in Markdown, and Jekyll generates HTML output.

**Goal**: Build a website for the children's garden governor's place, using Jekyll for free GitHub hosting. It should have a handy admin panel for easy content editing and the ability to add new news publications.

## Commands

```bash
bundle install              # Install Ruby gem dependencies
bundle exec jekyll serve    # Start local dev server (http://localhost:4000)
bundle exec jekyll build    # Build static site to _site/
```

## Architecture

- **`_config.yml`** — Site-wide configuration (title, theme, plugins, social links)
- **`_posts/`** — Blog posts in Markdown, filename format: `YYYY-MM-DD-title.markdown`
- **Root `.markdown` files** — Static pages (index, about, etc.)
- **Theme**: `minima` (~2.5) — minimal responsive theme
- **Plugins**: `jekyll-feed` — generates RSS/Atom feed at `/feed.xml`

New posts go in `_posts/` with YAML front matter:
```yaml
---
layout: post
title: "Post Title"
date: YYYY-MM-DD HH:MM:SS +TIMEZONE
categories: category1 category2
---
```

Build output goes to `_site/` (gitignored).
