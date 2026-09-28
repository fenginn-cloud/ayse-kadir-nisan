/**
 * Ayşe & Kadir — Nişan Daveti · RSVP toplama servisi
 *
 * Bu kod, Google Sheet'e bağlı (container-bound) bir Apps Script projesine yapıştırılır
 * ve "Web uygulaması" olarak dağıtılır. Adım adım kurulum: GOOGLE_SHEETS_SETUP.md
 *
 * Sheet kolonları (1. satır):
 *   Tarih | Ad Soyad | Katılım | Kişi Sayısı | Not
 */

// Kayıtların yazılacağı sayfa (sekme) adı. Boş bırakılırsa ilk sekme kullanılır.
var SHEET_NAME = '';

// Yalnızca bağımsız (standalone) bir script kullanıyorsanız Sheet ID'sini yazın.
// Sheet'in içinden açtıysanız (Uzantılar > Apps Script) boş bırakın.
var SPREADSHEET_ID = '';

var TIMEZONE = 'Europe/Istanbul';
var HEADERS = ['Tarih', 'Ad Soyad', 'Katılım', 'Kişi Sayısı', 'Not'];
var MAX_NAME = 80;
var MAX_NOTE = 500;
var ALLOWED_ATTENDANCE = ['Katılacağım', 'Katılamayacağım'];
var ALLOWED_GUESTS = ['1', '2', '3', '4', '5', '6+'];

/** Web sitesinden gelen POST isteği */
function doPost(e) {
  var lock = LockService.getScriptLock();
  var locked = false;

  try {
    lock.waitLock(20000);
    locked = true;

    var data = parseBody_(e);

    // Aynı gönderim (çift tıklama / tekrar deneme) ikinci kez yazılmasın
    var cache = CacheService.getScriptCache();
    var cacheKey = data.submissionId ? 'rsvp_' + String(data.submissionId).slice(0, 80) : '';
    if (cacheKey && cache.get(cacheKey)) {
      return json_({ ok: true, duplicate: true });
    }

    var fullName = clean_(data.fullName, MAX_NAME);
    var attendance = String(data.attendance || '').trim();
    var note = clean_(data.note, MAX_NOTE);
    var guestCount = String(data.guestCount || '').trim();

    if (fullName.length < 2) throw new Error('Ad Soyad eksik');
    if (ALLOWED_ATTENDANCE.indexOf(attendance) === -1) throw new Error('Katılım değeri geçersiz');

    if (attendance === 'Katılacağım') {
      if (ALLOWED_GUESTS.indexOf(guestCount) === -1) throw new Error('Kişi sayısı geçersiz');
    } else {
      guestCount = '';
    }

    var sheet = getSheet_();
    ensureHeaders_(sheet);

    var row = sheet.getLastRow() + 1;
    // Tarih: Europe/Istanbul saatiyle, metin olarak (Sheet'in saat diliminden bağımsız)
    sheet.getRange(row, 1).setNumberFormat('@').setValue(formatDate_(data.submittedAt));
    sheet.getRange(row, 2, 1, 4).setNumberFormat('@').setValues([[fullName, attendance, guestCount, note]]);

    if (cacheKey) cache.put(cacheKey, '1', 21600); // 6 saat

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err && err.message ? err.message : err) });
  } finally {
    if (locked) lock.releaseLock();
  }
}

/** Tarayıcıdan adresi açınca servisin ayakta olduğunu görmek için */
function doGet() {
  return json_({ ok: true, service: 'nisan-rsvp', time: formatDate_() });
}

/** Editörden çalıştırıp Sheet'e örnek bir satır eklemek için (isteğe bağlı test) */
function testPost() {
  var res = doPost({
    postData: {
      contents: JSON.stringify({
        submissionId: 'test-' + new Date().getTime(),
        submittedAt: new Date().toISOString(),
        fullName: 'Test Kişi',
        attendance: 'Katılacağım',
        guestCount: '2',
        note: 'Bu bir test kaydıdır.'
      })
    }
  });
  Logger.log(res.getContent());
}

/* ───────────────────────── yardımcılar ───────────────────────── */

function parseBody_(e) {
  if (!e || !e.postData || !e.postData.contents) throw new Error('Boş istek');
  var parsed = JSON.parse(e.postData.contents);
  if (!parsed || typeof parsed !== 'object') throw new Error('Geçersiz veri');
  return parsed;
}

function getSheet_() {
  var ss = SPREADSHEET_ID ? SpreadsheetApp.openById(SPREADSHEET_ID) : SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error('Sheet bulunamadı');
  var sheet = SHEET_NAME ? ss.getSheetByName(SHEET_NAME) : ss.getSheets()[0];
  if (!sheet) throw new Error('Sekme bulunamadı: ' + SHEET_NAME);
  return sheet;
}

function ensureHeaders_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
}

/** Europe/Istanbul: 27.10.2026 16:00:00 */
function formatDate_(iso) {
  var d = iso ? new Date(iso) : new Date();
  if (isNaN(d.getTime())) d = new Date();
  return Utilities.formatDate(d, TIMEZONE, 'dd.MM.yyyy HH:mm:ss');
}

/** Kontrol karakterlerini temizler, kırpar, uzunluğu sınırlar.
 *  (Hücreler "düz metin" biçiminde yazıldığı için =, +, - ile başlayan değerler formül olarak çalışmaz.) */
function clean_(value, max) {
  var s = String(value == null ? '' : value).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim();
  if (s.length > max) s = s.slice(0, max);
  return s;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
