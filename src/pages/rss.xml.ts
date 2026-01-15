import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
    const blog = await getCollection('blog', ({ data }) => data.published);

    return rss({
        title: 'Ben, the Lawyer | Blog',
        description: 'Insights on legal technology, AI ethics, and the future of law practice.',
        site: context.site ?? 'https://benthelawyer.com',
        items: blog.map((post) => ({
            title: post.data.title,
            pubDate: post.data.pubDate,
            description: post.data.description,
            link: `/blog/${post.id}/`,
        })),
        customData: `<language>en-us</language>`,
    });
}
