import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://srjefers.github.io',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
});
