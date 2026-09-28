import { EVENT, EVENT_END, EVENT_START } from './event';

const pad = (n: number) => String(n).padStart(2, '0');

/** ms -> 20261027T130000Z */
const toICSUtc = (ms: number) => {
  const d = new Date(ms);
  return (
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}` +
    `T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`
  );
};

const escapeText = (s: string) =>
  s
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');

/** RFC 5545: satırlar 75 oktetten uzun olmamalı (UTF-8 karakter sınırlarına saygılı) */
const fold = (line: string) => {
  const enc = new TextEncoder();
  if (enc.encode(line).length <= 75) return line;
  const parts: string[] = [];
  let current = '';
  let size = 0;
  for (const ch of line) {
    const bytes = enc.encode(ch).length;
    const limit = parts.length === 0 ? 75 : 74;
    if (size + bytes > limit) {
      parts.push(current);
      current = ch;
      size = bytes;
    } else {
      current += ch;
      size += bytes;
    }
  }
  parts.push(current);
  return parts.join('\r\n ');
};

const LOCATION = `${EVENT.venue}, ${EVENT.addressLine1}, ${EVENT.addressLine2}`;
const DESCRIPTION = 'Sizi aramızda görmek dileğiyle.';

export function buildICS(): string {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Ayse & Kadir//Nisan Daveti//TR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'UID:nisan-20261027-ayse-kadir@nisan-daveti',
    `DTSTAMP:${toICSUtc(Date.now())}`,
    `DTSTART:${toICSUtc(EVENT_START)}`,
    `DTEND:${toICSUtc(EVENT_END)}`,
    `SUMMARY:${escapeText(EVENT.title)}`,
    `LOCATION:${escapeText(LOCATION)}`,
    `DESCRIPTION:${escapeText(DESCRIPTION)}`,
    'STATUS:CONFIRMED',
    'TRANSP:OPAQUE',
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    `DESCRIPTION:${escapeText(EVENT.title)}`,
    'TRIGGER:-PT3H',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  return lines.map(fold).join('\r\n') + '\r\n';
}

export const GOOGLE_CALENDAR_URL = `https://calendar.google.com/calendar/render?${new URLSearchParams({
  action: 'TEMPLATE',
  text: EVENT.title,
  dates: `${toICSUtc(EVENT_START)}/${toICSUtc(EVENT_END)}`,
  ctz: 'Europe/Istanbul',
  location: LOCATION,
  details: DESCRIPTION,
}).toString()}`;

/** .ics dosyasını indirir / cihazın takvim uygulamasında açtırır. Başarısızsa false döner. */
export function downloadICS(): boolean {
  try {
    const blob = new Blob([buildICS()], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ayse-kadir-nisan.ics';
    a.rel = 'noopener';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
    return true;
  } catch {
    return false;
  }
}
