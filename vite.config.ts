import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// index.html içindeki __SITE_URL__ ifadesini VITE_SITE_URL ile değiştirir.
// WhatsApp önizlemesi için canlı adresinizi (ör. https://ayse-kadir.com) .env dosyasına yazın.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const siteUrl = (env.VITE_SITE_URL ?? '').replace(/\/+$/, '');

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'inject-site-url',
        transformIndexHtml: (html: string) => html.replaceAll('__SITE_URL__', siteUrl),
      },
    ],
    build: { target: 'es2020', cssCodeSplit: false },
  };
});
