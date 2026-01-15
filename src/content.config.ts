import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/blog" }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional().transform((d, ctx) => {
			if (d) return d;
			// @ts-ignore
			if (ctx?.data?.summary) return ctx.data.summary as string;
			return "No description provided.";
		}),
		pubDate: z.preprocess((val) => val || undefined, z.coerce.date()).optional().transform((d, ctx) => {
			if (d) return d;
			// @ts-ignore
			if (ctx?.data?.date) return new Date(ctx.data.date);
			return new Date();
		}),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		tags: z.array(z.string()).default([]),
		published: z.boolean().default(false),
		series: z.string().optional(),
		seriesOrder: z.number().optional(),
		canonicalUrl: z.string().url().optional(),
		substackUrl: z.string().url().optional(),
	}),
});

const pages = defineCollection({
	loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/pages" }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		experience: z.array(z.object({
			year: z.string(),
			role: z.string(),
			org: z.string(),
			desc: z.string()
		})).optional(),
		education: z.array(z.object({
			year: z.string(),
			degree: z.string(),
			org: z.string(),
		})).optional(),
		headerTitle: z.string().optional(),
		heroTitle: z.string().optional(),
		heroDescription: z.string().optional(),
		bioTitle: z.string().optional(),
		bioText: z.string().optional(),
		papers: z.array(z.object({
			title: z.string(),
			summary: z.string(),
			date: z.string(),
			type: z.string()
		})).optional(),
		contactInfo: z.object({
			firmName: z.string(),
			address: z.string(),
			email: z.union([z.string(), z.array(z.string())]),
			twitter: z.string().optional(),
			linkedin: z.string().optional(),
			github: z.string().optional()
		}).optional(),
	}),
});

const research = defineCollection({
	loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/research" }),
	schema: z.object({
		title: z.string(),
		summary: z.string(),
		date: z.string(), // Keeping as string to match current format "Dec 2025", or could coerce to date
		type: z.string(),
		url: z.string().optional(),
		published: z.boolean().default(true),
	}),
});

export const collections = { blog, pages, research };
