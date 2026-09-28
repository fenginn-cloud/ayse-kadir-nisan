# Google Sheets Bağlantısı — Kurulum Rehberi

Katılım formu, Google Form kullanmadan doğrudan **Google Apps Script Web App** üzerinden
sizin Google Sheet'inize yazar. Toplam süre: yaklaşık 5 dakika.

---

## 1. Google Sheet oluşturun

1. [sheets.google.com](https://sheets.google.com) adresine gidin ve **Boş** bir e-tablo açın.
2. Sol üstten dosyaya bir ad verin, örn. `Nişan Katılım Listesi`.

## 2. Başlık satırı (1. satır)

A1'den E1'e kadar hücrelere sırayla şunları yazın:

| A | B | C | D | E |
|---|---|---|---|---|
| Tarih | Ad Soyad | Katılım | Kişi Sayısı | Not |

> Başlıkları yazmayı unutsanız bile, sayfa boşsa script ilk kayıtta bu satırı kendisi ekler.

## 3. Apps Script'i açın

1. Sheet'in üst menüsünden **Uzantılar → Apps Script** seçin.
2. Açılan sekmede sol üstteki proje adına tıklayıp `Nişan RSVP` gibi bir ad verin (isteğe bağlı).

## 4. Code.gs dosyasını yapıştırın

1. Sol taraftaki dosya listesinde **Code.gs** dosyasını açın.
2. İçindeki her şeyi silin (`function myFunction() {…}`).
3. Bu projedeki [`google-apps-script/Code.gs`](./google-apps-script/Code.gs) dosyasının **tüm içeriğini** kopyalayıp yapıştırın.
4. Üstteki **Kaydet** (disket simgesi / `Ctrl+S`) tuşuna basın.

### (İsteğe bağlı) Hızlı test

Üstteki fonksiyon listesinden `testPost` seçip **Çalıştır**'a basın. İlk seferde Google
izin isteyecektir: **İzinleri incele → hesabınızı seçin → Gelişmiş → (proje adı)'na git (güvenli değil) → İzin ver**.
Bu, kendi script'iniz olduğu için normaldir. Çalışınca Sheet'te `Test Kişi` satırı görünür; testten sonra bu satırı silebilirsiniz.

## 5. Web Uygulaması olarak dağıtın

1. Sağ üstte **Dağıt → Yeni dağıtım** seçin.
2. "Tür seçin" yanındaki dişli simgesine tıklayıp **Web uygulaması**'nı seçin.
3. Ayarlar:
   - **Açıklama:** `RSVP v1`
   - **Şu kullanıcı olarak yürüt:** **Ben** (kendi e-posta adresiniz)
   - **Erişimi olan kullanıcılar:** **Herkes** ← *bu çok önemli; aksi halde davetliler formu gönderemez*
4. **Dağıt**'a basın (izin istenirse onaylayın).
5. Çıkan **Web uygulaması URL'sini** kopyalayın. Şuna benzer:

   ```
   https://script.google.com/macros/s/AKfycb.........../exec
   ```

> **Erişim ayarı hakkında:** "Herkes" seçeneği yalnızca bu küçük servisin adresini bilenlerin
> forma veri göndermesine izin verir. Sheet'inizin kendisi gizli kalır; sadece siz görürsünüz.

## 6. URL'yi siteye ekleyin

**Yöntem A (önerilen):** Proje kökündeki `.env` dosyasını açın ve URL'yi yazın:

```env
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycb.........../exec
```

**Yöntem B:** [`src/config.ts`](./src/config.ts) içindeki `GOOGLE_SCRIPT_URL_FALLBACK` değerine yapıştırın.

Sonra siteyi yeniden derleyin:

```bash
npm run build
```

> Vite ortam değişkenlerini **derleme sırasında** koda gömer. URL'yi değiştirdiğinizde
> `npm run build` komutunu tekrar çalıştırıp `dist` klasörünü yeniden yayınlamanız gerekir.
> Netlify / Vercel / Cloudflare Pages kullanıyorsanız aynı değişkeni panelden
> (`Environment variables` → `VITE_GOOGLE_SCRIPT_URL`) ekleyip yeniden dağıtın.

## 7. Test edin

1. Tarayıcıda Web uygulaması URL'sini açın. Şuna benzer bir yanıt görmelisiniz:
   `{"ok":true,"service":"nisan-rsvp","time":"28.09.2026 14:35:10"}`
2. Siteyi (canlı adres veya `npm run preview`) telefonunuzdan açın, formu doldurup **Katılımımı Bildir**'e basın.
3. "Teşekkür ederiz ♡" ekranını gördükten sonra Sheet'i kontrol edin; yeni satır eklenmiş olmalı:

   | Tarih | Ad Soyad | Katılım | Kişi Sayısı | Not |
   |---|---|---|---|---|
   | 28.09.2026 14:36:02 | Test Kişi | Katılacağım | 2 | … |

   Tarih sütunu **Europe/Istanbul** saatine göre kaydedilir.
4. Test kayıtlarını Sheet'ten silin.

---

## Sık karşılaşılan sorunlar

| Sorun | Çözüm |
|---|---|
| Form "gönderilemedi" diyor | `VITE_GOOGLE_SCRIPT_URL` boş olabilir ya da siteyi yeniden derlemediniz. |
| Sheet'e satır gelmiyor | Dağıtımda **Erişim: Herkes** ve **Yürüt: Ben** olduğundan emin olun. |
| `Code.gs`'i düzenledim ama değişmedi | **Dağıt → Dağıtımları yönet → ✏️ düzenle → Sürüm: Yeni sürüm → Dağıt**. URL aynı kalır. |
| Farklı bir sekmeye yazmak istiyorum | `Code.gs` başındaki `SHEET_NAME` değerine sekme adını yazın. |
| Aynı kişi iki kez basarsa? | Site butonu kilitler, ayrıca script aynı gönderim kimliğini ikinci kez yazmaz. |

## Notlar

- Site, yanıtı okumadan (`no-cors`) gönderir; bu, Apps Script ile tarayıcıdan formu göndermenin standart ve sorunsuz yoludur. Bağlantı yoksa kullanıcıya nazik bir hata gösterilir.
- Hücreler "düz metin" biçiminde yazılır; bu yüzden `=`, `+`, `-` ile başlayan notlar Sheet'te formül olarak çalışmaz.
