export const EVENT = {
  brideName: 'Ayşe Engin',
  groomName: 'Kadir Akgün',
  title: 'Ayşe & Kadir Nişan',
  venue: 'Ümraniye Belediyesi Tantavi Sosyal Tesisi',
  addressLine1: 'Tantavi, Karavusuf Sk. No:10',
  addressLine2: 'Ümraniye / İstanbul',
  /** Google Maps aramalarında kullanılan tam adres */
  mapQuery:
    'Ümraniye Belediyesi Tantavi Sosyal Tesisi, Tantavi, Karavusuf Sk. No:10, Ümraniye, İstanbul',
  /** 27 Ekim 2026, 16:00 — Europe/Istanbul (UTC+3, yıl boyunca sabit) */
  startISO: '2026-10-27T16:00:00+03:00',
  endISO: '2026-10-27T22:00:00+03:00',
} as const;

export const EVENT_START = new Date(EVENT.startISO).getTime();
export const EVENT_END = new Date(EVENT.endISO).getTime();

const q = encodeURIComponent(EVENT.mapQuery);

export const MAP_EMBED_URL = `https://maps.google.com/maps?q=${q}&hl=tr&z=16&output=embed`;
export const MAP_OPEN_URL = `https://www.google.com/maps/search/?api=1&query=${q}`;
export const MAP_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${q}&travelmode=driving`;
