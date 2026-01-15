// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import pagefind from 'astro-pagefind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://benthelawyer.com',
  integrations: [pagefind(), sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});