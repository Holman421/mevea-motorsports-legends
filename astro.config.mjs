// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite"
import glsl from 'vite-plugin-glsl';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: 'https://your-domain.com', // Replace with your actual website URL
    integrations: [sitemap()],
    vite: {
        plugins: [tailwindcss(), glsl()],
    },
});
