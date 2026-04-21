import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://elnodo.studio',
  integrations: [sitemap()],
  vite: {
    optimizeDeps: {
      exclude: ['astro:content'],
    },
  },
});
