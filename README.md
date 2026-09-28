# Ayşe & Kadir — Nişan Daveti

Mobil öncelikli, tek sayfalık dijital davetiye. React + Vite + TypeScript + Tailwind CSS v4.

## Komutlar

```bash
npm install        # bağımlılıklar
npm run dev        # geliştirme sunucusu  →  http://localhost:5173  (aynı ağdaki telefondan da açılır)
npm run build      # tip kontrolü + üretim derlemesi  →  dist/
npm run preview    # derlenmiş siteyi yerelde önizle
```

## Önemli ayarlar

| Ne | Nerede |
|---|---|
| **Google Apps Script URL'si** (RSVP → Google Sheets) | `.env` → `VITE_GOOGLE_SCRIPT_URL` (ya da `src/config.ts`) |
| Sitenin canlı adresi (WhatsApp önizleme görseli için) | `.env` → `VITE_SITE_URL` (ör. `https://ayse-kadir.com`) |
| Tarih, saat, mekan, adres, harita bağlantıları | `src/lib/event.ts` |
| Apps Script (sunucu tarafı) | `google-apps-script/Code.gs` |
| Kurulum rehberi | `GOOGLE_SHEETS_SETUP.md` |
| Renkler, fontlar, boşluklar | `src/styles/globals.css` (üstte `@theme` ve `:root`) |
| Başlık / açıklama / Open Graph meta | `index.html` |
| Favicon, paylaşım görseli | `public/favicon.svg`, `public/og-image.png`, `public/apple-touch-icon.png` |

## Yapı

```
src/
  components/  Hero, DateSection, CoupleSection, RSVPSection,
               LocationSection, CalendarSection, Footer (+ Monogram, Deco, Section)
  lib/         rsvp.ts (form gönderimi), calendar.ts (.ics), event.ts (etkinlik verisi), useReveal.ts
  styles/      globals.css
  config.ts    GOOGLE_SCRIPT_URL
google-apps-script/Code.gs
```

## Yayınlama

`npm run build` sonrası oluşan `dist/` klasörünü Netlify, Vercel, Cloudflare Pages veya herhangi bir statik
barındırmaya yükleyin. `VITE_GOOGLE_SCRIPT_URL` ve `VITE_SITE_URL` değişkenlerini barındırma panelinde de tanımlayın.
