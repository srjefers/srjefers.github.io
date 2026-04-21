# Content editing guide

The whole portfolio is driven by Markdown files under `src/content/`. Each file
has a **YAML frontmatter** block (between `---` fences) for structured data and
an optional **Markdown body** for prose.

> All frontmatter is validated at build time by a Zod schema defined in
> `src/content.config.ts`. If a required field is missing or the wrong type,
> `astro build` fails loudly with a pointer to the offending file — **the site
> will never deploy with broken data**.

## Collections

| Collection | Path | Pattern | Sorted by |
|------------|------|---------|-----------|
| `site` | `src/content/site/site.md` | Singleton (one file only) | — |
| `experience` | `src/content/experience/*.md` | One file per role | `order` ascending |
| `projects` | `src/content/projects/*.md` | One file per featured project | `order` ascending |
| `skills` | `src/content/skills/*.md` | One file per skill group | `order` ascending |
| `training` | `src/content/training/*.md` | One file per credential / degree | `order` then `year` descending |

---

## `site` — hero, about, contact, SEO

Path: `src/content/site/site.md`. There is exactly **one** file in this collection.

### Frontmatter

```yaml
---
hero:
  eyebrow: "Senior Data Engineer · Guatemala"   # small caps line above the name
  name: "Jeferson Stiv Argueta Hernández"        # main H1
  lead: "I design cloud data platforms…"         # hero paragraph (string)
contact:
  location: "Guatemala"
  phone: "+(502) 3312-6786"
  email: "ajefersonstiv@gmail.com"               # must be a valid email
  github: "https://github.com/srjefers"          # must be a valid URL
  linkedin: "https://www.linkedin.com/in/jefers-argueta"
seo:
  title: "Jeferson Argueta — Senior Data Engineer"
  description: "Senior Data Engineer building cloud data platforms…"
  ogImage: "/og-image.jpg"                       # optional; relative to /public/
footerNote: "Built with care."                   # optional trailing note in the footer
---
```

### Body

The body of `site.md` is the **About** section. Write it as normal Markdown —
paragraphs, `**bold**`, `*italics*`, lists — all rendered verbatim in the About
section of the page.

```markdown
Senior Data Engineer with experience across supply chain, marketing,
telecommunications, pharmaceutical, and healthcare…

I care about clean data models, observable pipelines, and small improvements
that compound.
```

---

## `experience` — professional roles

Path: `src/content/experience/<slug>.md`. Filenames are slugs; Astro ignores them
for display and sorts by `order`.

### Frontmatter

```yaml
---
role: "Senior Data Engineer"           # job title
company: "TeamInternational"           # employer
location: "Medellín, Colombia"
start: "Sep 2022"                       # human-readable start date
end: "Present"                          # "Present" or human-readable end date
order: 1                                # 1 = most recent, 2 = next, etc.
---
```

### Body

The body is the list of bullets shown under the role. Use a standard Markdown
unordered list. `**bold**` is rendered to `<strong>` — use it to highlight
metrics and key technologies.

```markdown
- Designed and maintained ELT pipelines using **dbt, Snowpark, and PySpark**.
- Tuned Snowflake warehouses to **reduce compute spend by 35%**.
- Partnered with Data Science / ML teams to productionize features.
```

---

## `projects` — selected projects

Path: `src/content/projects/<slug>.md`.

### Frontmatter

```yaml
---
title: "Cloud migration: AWS → GCP"
tags: ["GCP", "AWS", "Dagster", "Snowflake", "dbt", "PySpark"]  # small tag chips
order: 1                                                          # display order
---
```

### Body

A short project description. `**bold**` renders to `<strong>` — use for metrics
and outcomes.

```markdown
Re-platformed a serverless-first data platform from AWS to GCP…
**Reduced cloud spend by 45%** and **improved pipeline execution by 35%**.
```

---

## `skills` — skill groups

Path: `src/content/skills/<slug>.md`. The body is ignored; all data is in
frontmatter.

```yaml
---
category: "Cloud & Warehousing"              # the group heading
order: 1                                      # group display order
items:                                        # tag list (at least one required)
  - "AWS (S3, Lambda, Glue, ECS/Fargate)"
  - "GCP (Cloud Storage, Pub/Sub)"
  - "Snowflake"
  - "Redshift"
---
```

---

## `training` — credentials and degrees

Path: `src/content/training/<slug>.md`. Body is optional.

```yaml
---
title: "SnowPro Core Certification — Snowflake"   # shown as the main line
institution: "Snowflake"                           # optional; appended after a dash
year: 2025                                         # integer; shown in the right column
url: "https://snowflake.com/…"                     # optional; makes title a link
order: 1                                           # optional; otherwise sorted by year desc
---
```

---

## Adding a new entry

1. Copy an existing file in the matching collection folder as a template.
2. Rename it to a meaningful slug (e.g., `cogentek.md` for a new experience).
3. Edit the frontmatter — the schema will tell you if a required field is missing.
4. Write the body.
5. Run `npm run build` locally to catch any schema error before pushing.
6. Commit, push, and GitHub Actions will redeploy the site.

## Removing an entry

Delete the file. Run `npm run build` to confirm nothing references it. Commit.

## Reordering

Change the `order` field on the affected files. Lower numbers appear first.
