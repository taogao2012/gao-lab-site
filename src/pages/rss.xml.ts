import rss from '@astrojs/rss';
import newsData from '../data/news.json';
import { site } from '../config';

export async function GET(context: { site: URL }) {
  const items = [...newsData.items].sort(
    (a, b) => +new Date(b.date) - +new Date(a.date)
  );

  return rss({
    title: `${site.name} — News`,
    description: 'Latest news from the SuPER Lab at North Carolina State University',
    site: context.site ?? site.url,
    items: items.map((n: any) => ({
      title: n.title,
      pubDate: new Date(n.date),
      description: n.summary ?? n.title,
      link: n.link ?? '/news/',
      categories: n.tags ?? [],
    })),
  });
}
