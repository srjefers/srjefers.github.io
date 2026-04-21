import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const site = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/site' }),
  schema: z.object({
    hero: z.object({
      eyebrow: z.string(),
      name: z.string(),
      lead: z.string(),
    }),
    contact: z.object({
      location: z.string(),
      phone: z.string(),
      email: z.string().email(),
      github: z.string().url(),
      linkedin: z.string().url(),
    }),
    seo: z.object({
      title: z.string(),
      description: z.string(),
      ogImage: z.string().optional(),
    }),
    footerNote: z.string().optional(),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
  schema: z.object({
    role: z.string(),
    company: z.string(),
    location: z.string(),
    start: z.string(),
    end: z.string(),
    order: z.number(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()).default([]),
    order: z.number(),
  }),
});

const skills = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/skills' }),
  schema: z.object({
    category: z.string(),
    items: z.array(z.string()).min(1),
    order: z.number(),
  }),
});

const training = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/training' }),
  schema: z.object({
    title: z.string(),
    institution: z.string().optional(),
    year: z.number(),
    url: z.string().url().optional(),
    order: z.number().optional(),
  }),
});

export const collections = { site, experience, projects, skills, training };
