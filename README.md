# КЗДО №7 «Сонечко» — Офіційний сайт

Офіційний сайт комунального закладу дошкільної освіти №7 «Сонечко», м. Багачеве, Черкаська обл.

Побудовано на **Jekyll** із хостингом на **GitHub Pages** (безкоштовно). Контент редагується через веб-адмін-панель **Decap CMS** без написання коду.

---

## Локальна розробка

**Вимоги:** Ruby 3+, Bundler

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
bundle install
bundle exec jekyll serve
```

Сайт відкриється на [http://localhost:4000](http://localhost:4000).

---

## Публікація на GitHub Pages

1. Запушити код у репозиторій GitHub
2. **Settings → Pages → Source:** `Deploy from a branch` → `main` / `root`
3. Оновити `_config.yml`:
   ```yaml
   url: "https://YOUR_USERNAME.github.io"
   baseurl: "/YOUR_REPO"   # або "" якщо це user-page
   ```
4. Сайт з'явиться за адресою `https://YOUR_USERNAME.github.io/YOUR_REPO/`

---

## Адмін-панель (Decap CMS)

Після налаштування адмін-панель доступна за адресою `/admin/`.
Через неї можна додавати новини та редагувати сторінки прямо у браузері — без Git і коду.

### Одноразове налаштування

1. **Оновити `admin/config.yml`** — замінити `YOUR_USERNAME/YOUR_REPO`

2. **Створити GitHub OAuth App**
   → [github.com/settings/developers](https://github.com/settings/developers) → *New OAuth App*
   - Homepage URL: `https://YOUR_USERNAME.github.io/YOUR_REPO/`
   - Authorization callback URL: `https://YOUR_USERNAME.github.io/YOUR_REPO/admin/`
   → Скопіювати **Client ID**

3. **Підключити Netlify як OAuth-проксі** (безкоштовно, сайт залишається на GitHub Pages)
   → [app.netlify.com](https://app.netlify.com) → *New site from Git* → вибрати репозиторій
   → *Site settings → Identity → Enable Identity*
   → *Identity → Services → GitHub → Enable*
   → Скопіювати URL вашого Netlify-сайту (напр. `cool-name-123.netlify.app`)
   → Вставити у `admin/config.yml` поле `base_url`

### Локальне тестування CMS

```bash
# Термінал 1
bundle exec jekyll serve

# Термінал 2
npx decap-server
```

Відкрити [http://localhost:4000/admin/](http://localhost:4000/admin/) — без авторизації, всі зміни зберігаються локально.

> Перед локальним запуском додайте `local_backend: true` до `admin/config.yml`.

---

## Додавання новини (без CMS, вручну)

Створіть файл у `_posts/` з назвою `YYYY-MM-DD-nazva.markdown`:

```yaml
---
layout: post
title: "Назва новини"
date: 2026-04-01 10:00:00 +0200
categories: [оголошення]   # новини | оголошення | свята | заходи
icon: "🌸"
excerpt: "Короткий опис для картки на головній сторінці."
---

Текст новини у форматі Markdown...
```

---

## Структура проєкту

```
├── _config.yml              # Налаштування сайту та навігація
├── _layouts/                # Шаблони сторінок
│   ├── default.html         # Базовий HTML-шаблон
│   ├── home.html            # Головна сторінка
│   ├── page.html            # Внутрішні сторінки
│   ├── post.html            # Новини/публікації
│   └── news.html            # Архів новин
├── _includes/               # Компоненти
│   ├── header.html          # Шапка + навігація
│   └── footer.html          # Підвал
├── _posts/                  # Новини (Markdown)
├── _data/
│   └── months_uk.yml        # Українські назви місяців
├── assets/css/style.scss    # Всі стилі сайту
├── pages/                   # Основні сторінки сайту
├── admin/                   # Decap CMS адмін-панель
│   ├── index.html
│   └── config.yml           # Налаштування CMS (редагувати!)
└── index.html               # Головна сторінка
```

---

## Технології

- [Jekyll](https://jekyllrb.com/) — генератор статичних сайтів
- [GitHub Pages](https://pages.github.com/) — безкоштовний хостинг
- [Decap CMS](https://decapcms.org/) — адмін-панель для контенту
- Шрифти: [Comfortaa](https://fonts.google.com/specimen/Comfortaa) + [Nunito](https://fonts.google.com/specimen/Nunito) (Google Fonts)
