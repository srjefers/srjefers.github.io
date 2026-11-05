import type { APIRoute } from 'astro';
import { getCollection, getEntry } from 'astro:content';

// /llms.txt — the profile as plain Markdown for AI agents (https://llmstxt.org).
// Built from the same content collections as the page, so it never drifts.
export const GET: APIRoute = async () => {
  const site = await getEntry('site', 'site');
  if (!site) throw new Error('Missing site content at src/content/site/site.md');
  const { hero, contact, seo } = site.data;
  const abs = (path: string) => new URL(path, import.meta.env.SITE).href;
  const md = (s?: string) => (s ?? '').trim();
  const byOrder = (a: { data: { order: number } }, b: { data: { order: number } }) => a.data.order - b.data.order;

  const experience = (await getCollection('experience')).sort(byOrder);
  const projects = (await getCollection('projects')).sort(byOrder);
  const skills = (await getCollection('skills')).sort(byOrder);
  const training = (await getCollection('training')).sort((a, b) =>
    a.data.order != null && b.data.order != null ? a.data.order - b.data.order : b.data.year - a.data.year,
  );

  const sections = [
    `# ${hero.name}`,
    `> ${seo.description} Based in ${contact.location}.`,
    md(site.body),
    '## Contact',
    [
      `- Website: ${abs('/')}`,
      `- CV (PDF): ${abs('/resume.pdf')}`,
      `- Email: ${contact.email}`,
      `- Phone: ${contact.phone}`,
      `- GitHub: ${contact.github}`,
      `- LinkedIn: ${contact.linkedin}`,
    ].join('\n'),
    '## Experience',
    ...experience.map(({ data, body }) =>
      `### ${data.role} — ${data.company}\n${data.location} · ${data.start} – ${data.end}\n\n${md(body)}`),
    '## Selected Projects',
    ...projects.map(({ data, body }) => `### ${data.title}\n${md(body)}\n\nTags: ${data.tags.join(', ')}`),
    '## Technical Skills',
    skills.map(({ data }) => `- ${data.category}: ${data.items.join(', ')}`).join('\n'),
    '## Education & Certifications',
    training.map(({ data }) => `- ${data.title}${data.institution ? ` — ${data.institution}` : ''} (${data.year})`).join('\n'),
  ];

  return new Response(sections.join('\n\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
