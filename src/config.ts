/**
 * >>> SONRADAN DEĞİŞTİRMENİZ GEREKEN YER <<<
 *
 * Google Apps Script Web App "Dağıtım URL'si" (https://script.google.com/macros/s/.../exec)
 *
 * İki yoldan biriyle ayarlayabilirsiniz:
 *  1) Proje kökündeki .env dosyasına:  VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/XXXX/exec
 *  2) Ya da aşağıdaki GOOGLE_SCRIPT_URL_FALLBACK değerine doğrudan yapıştırın.
 *
 * Ayrıntılar: GOOGLE_SHEETS_SETUP.md
 */
const GOOGLE_SCRIPT_URL_FALLBACK = '';

export const GOOGLE_SCRIPT_URL: string = (
  import.meta.env.VITE_GOOGLE_SCRIPT_URL ||
  GOOGLE_SCRIPT_URL_FALLBACK
).trim();
