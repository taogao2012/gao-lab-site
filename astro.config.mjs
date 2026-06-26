import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://www.taogao-echem.net',
  // /highlights/ was promoted to the home page; keep old links working.
  redirects: { '/highlights': '/' },
  integrations: [mdx(), sitemap(), tailwind({ applyBaseStyles: false })],
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
  build: {
    format: 'directory',
  },
});
