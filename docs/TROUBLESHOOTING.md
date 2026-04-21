# Troubleshooting

Common problems when editing, building, or deploying the portfolio, and how to
fix them.

## Table of contents

- [Local dev / build issues](#local-dev--build-issues)
- [Content schema errors](#content-schema-errors)
- [Deploy issues (GitHub Pages)](#deploy-issues-github-pages)
- [Runtime / browser issues](#runtime--browser-issues)

---

## Local dev / build issues

### `npm install` fails with EACCES or permission errors

Cause: npm trying to write to a system-owned directory, usually because
`/usr/local` ownership is wrong.

Fix:
```bash
sudo chown -R $(whoami) /usr/local/lib/node_modules
# or use nvm so node/npm live in your home dir:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install 20
```

### `Cannot find package 'lightningcss'` during build

Cause: old Astro config referenced `cssMinify: 'lightningcss'` without the package
installed.

Fix: either install it (`npm install -D lightningcss`) or remove the option from
`astro.config.mjs` (the default esbuild minifier is fine).

### Dev server returns a blank page with `<title>Error</title>`

Cause: a schema change in `src/content.config.ts` wasn't picked up — Astro caches
content types aggressively.

Fix: stop the dev server (Ctrl-C) and run `npm run dev` again. If the error
persists, also delete the `.astro/` cache directory:
```bash
rm -rf .astro && npm run dev
```

### Port 4321 already in use

Cause: a previous dev server didn't shut down cleanly.

Fix:
```bash
# macOS / Linux
lsof -ti :4321 | xargs kill
# or use a different port:
npx astro dev --port 4322
```

---

## Content schema errors

Schema errors are your friend — they prevent broken content from shipping. The
message points at the exact file and field.

### `Invalid content in "experience". "role": Required`

You forgot the `role` field (or any other required field) in an experience MD
file's frontmatter. Open the file, add the field. See
[`CONTENT.md`](CONTENT.md#experience--professional-roles) for the full list.

### `Expected number, received string` on `order` or `year`

YAML quirk: `order: "1"` is a string; `order: 1` is a number. Remove the quotes.
Same for `year`.

### `Invalid url` on `github`, `linkedin`, or training `url`

The value must start with `http://` or `https://` and be a parseable URL. Fix by
including the full scheme.

### `Invalid email`

The `email` field in `site.md` must look like `name@domain.tld`. No mailto: prefix.

### `Array must contain at least 1 element(s)` on skills `items`

A skill group was declared with an empty list. Either add at least one item or
delete the file.

### The `site` collection is empty

`src/content/site/site.md` was deleted or renamed. Restore it — there must be
exactly one file in that folder.

### Markdown bold / italic doesn't render in experience bullets

The bullet body is pure Markdown. Make sure you're using the inline list body,
not the frontmatter:

```markdown
---
role: "…"
---

- Did **something** important.    # ← this renders <strong>
```

Do NOT put bullets inside frontmatter — they won't render as HTML.

---

## Deploy issues (GitHub Pages)

### GitHub Actions build fails on `npm ci`

Cause: `package-lock.json` out of sync with `package.json`.

Fix: run `npm install` locally, commit the updated `package-lock.json`, push.

### GitHub Actions succeeds but the site shows the old content

Usually DNS or CDN caching. Options:
1. Wait 2–5 minutes; GitHub Pages CDN invalidates asynchronously.
2. Force-refresh in your browser (Cmd-Shift-R on Mac, Ctrl-Shift-R elsewhere).
3. Visit a unique URL like `https://srjefers.github.io/?cb=TIMESTAMP` to bypass.

### GitHub Pages shows 404

Check: Settings → Pages → Source must be **GitHub Actions** (not "Deploy from a
branch"). If it's set to a branch, the Actions-built artifact is ignored.

### Workflow runs but `Deploy to GitHub Pages` job is skipped

Cause: the `pages` environment doesn't exist or isn't configured.

Fix: Settings → Environments → create `github-pages` environment (GitHub usually
provisions it automatically on first deploy). If already created, Settings →
Pages → Source: GitHub Actions.

### Site loads but 404s on favicon / og-image / resume.pdf

Assets in `/public/` are copied verbatim to the site root. Check:
- File exists at `public/<filename>`
- Reference in HTML/MD uses `/filename` (leading slash, no `/public` prefix)

---

## Runtime / browser issues

### Theme flashes from light to dark on page load

The FOUC-prevention script in `BaseLayout.astro` sets `data-theme` before paint.
If you're seeing a flash, it means the script was modified or deleted. Check
`src/layouts/BaseLayout.astro` — the `<script is:inline>` near the top of `<head>`
is what prevents the flash.

### Font switcher changes the preview button but not the page

Cause: cached old JS bundle. Astro CI hashes filenames so this usually resolves
on next deploy. Locally: restart `npm run dev`.

### Keyboard shortcut `?` does not open the dialog

Cause: `<dialog>.showModal()` requires a real user gesture. Synthetic events in
automation tools don't count. In a real browser, the shortcut works.

### `GitHub API rate limit exceeded` in the "From GitHub" section

The unauthenticated GitHub API allows 60 requests/hour per IP. If you hit the
limit, the repo list shows "Could not load repositories right now." Wait one
hour, or accept the fallback (the error message is user-friendly).

### Stats / numbers look misaligned on some fonts

Each font mode (Roboto / Mono / Times) has its own scale tokens in
`src/styles/global.css` (`--fs-base`, `--lh-base`, `--h1-scale`). If a new font
is added, copy the `[data-font="…"]` block and tune those values.

### Site looks broken on an ultra-wide monitor (2560+)

This is intentional — content is centered at max 680px to keep lines readable.
If you want to add a sidebar / decorative gutter, extend `main` in `global.css`.

---

## Still stuck?

1. Run `npm run build` locally — most issues surface with a clear message there.
2. Check the GitHub Actions run log: repo → Actions tab → click the failing run.
3. Check the browser devtools Console for runtime errors.
