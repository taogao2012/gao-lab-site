import { defineCollection, z } from 'astro:content';

const people = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    photo: z.string().optional(),
    email: z.string().optional(),
    scholar: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    github: z.string().url().optional(),
    orcid: z.string().optional(),
    twitter: z.string().optional(),
    joined: z.string().optional(),
    status: z.enum(['pi', 'postdoc', 'phd', 'masters', 'undergrad', 'visiting', 'staff', 'alumnus']),
    interests: z.array(z.string()).default([]),
    order: z.number().default(99),
  }),
});

const research = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    image: z.string().optional(),
    kind: z.enum(['thrust', 'theme']).default('thrust'),
    order: z.number().default(99),
    keywords: z.array(z.string()).default([]),
  }),
});

export const collections = { people, research };
