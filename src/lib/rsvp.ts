import { GOOGLE_SCRIPT_URL } from '../config';

export type Attendance = 'Katılacağım' | 'Katılamayacağım';

export interface RSVPPayload {
  fullName: string;
  attendance: Attendance;
  /** "1"–"5" veya "6+"; katılamayacaksa boş */
  guestCount: string;
  note: string;
}

export const GUEST_OPTIONS = ['1', '2', '3', '4', '5', '6+'] as const;

/** Form oturumuna özel kimlik: aynı gönderim tekrarlanırsa sunucu yok sayar. */
export const createSubmissionId = () => {
  try {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  } catch {
    /* yoksay */
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
};

export class RSVPError extends Error {}

const wait = (ms: number) => new Promise((r) => window.setTimeout(r, ms));

/**
 * Google Apps Script Web App'e POST eder.
 * Apps Script yanıtları CORS başlığı döndürmediği için `no-cors` + `text/plain` kullanılır
 * (basit istek → preflight yok). Yanıt okunamaz; ağ hatası yoksa istek sunucuya ulaşmış sayılır.
 */
export async function submitRSVP(data: RSVPPayload, submissionId: string): Promise<void> {
  if (!GOOGLE_SCRIPT_URL) {
    // Geliştirme sırasında Sheets bağlanmadan da akışı görebilmek için simülasyon.
    if (import.meta.env.DEV) {
      console.info('[RSVP] GOOGLE_SCRIPT_URL tanımlı değil — gönderim simüle edildi.', data);
      await wait(1100);
      return;
    }
    throw new RSVPError('GOOGLE_SCRIPT_URL yapılandırılmamış');
  }

  const body = JSON.stringify({
    submissionId,
    submittedAt: new Date().toISOString(),
    fullName: data.fullName,
    attendance: data.attendance,
    guestCount: data.guestCount,
    note: data.note,
  });

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 20_000);

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body,
      signal: controller.signal,
      redirect: 'follow',
      credentials: 'omit',
    });
  } catch {
    throw new RSVPError('Gönderim başarısız');
  } finally {
    window.clearTimeout(timeout);
  }
}
