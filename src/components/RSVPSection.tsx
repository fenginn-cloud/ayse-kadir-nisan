import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import {
  GUEST_OPTIONS,
  RSVPError,
  createSubmissionId,
  submitRSVP,
  type Attendance,
} from '../lib/rsvp';
import { Rule } from './Deco';
import { Section } from './Section';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface Errors {
  fullName?: string;
  attendance?: string;
  guestCount?: string;
}

const STORAGE_KEY = 'nisan-rsvp-v1';

const readSent = (): Attendance | null => {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === 'Katılacağım' || v === 'Katılamayacağım' ? v : null;
  } catch {
    return null;
  }
};

const writeSent = (value: Attendance | null) => {
  try {
    if (value) window.localStorage.setItem(STORAGE_KEY, value);
    else window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* özel sekme vb. — sorun değil */
  }
};

export function RSVPSection() {
  const [fullName, setFullName] = useState('');
  const [attendance, setAttendance] = useState<Attendance | ''>('');
  const [guestCount, setGuestCount] = useState('');
  const [note, setNote] = useState('');
  const [honey, setHoney] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [sentAttendance, setSentAttendance] = useState<Attendance | null>(null);

  const submissionId = useRef(createSubmissionId());
  const inFlight = useRef(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const attendanceRef = useRef<HTMLFieldSetElement>(null);
  const guestsRef = useRef<HTMLFieldSetElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  // Daha önce yanıt verilmişse doğrudan teşekkür ekranı
  useEffect(() => {
    const prev = readSent();
    if (prev) {
      setSentAttendance(prev);
      setStatus('success');
    }
  }, []);

  const attending = attendance === 'Katılacağım';

  const validate = (): Errors => {
    const e: Errors = {};
    if (fullName.trim().length < 2) e.fullName = 'Lütfen adınızı ve soyadınızı yazın.';
    if (!attendance) e.attendance = 'Lütfen katılım durumunuzu seçin.';
    if (attending && !guestCount) e.guestCount = 'Lütfen kaç kişi katılacağınızı seçin.';
    return e;
  };

  const focusFirstError = (e: Errors) => {
    if (e.fullName) nameRef.current?.focus();
    else if (e.attendance) attendanceRef.current?.querySelector<HTMLInputElement>('input')?.focus();
    else if (e.guestCount) guestsRef.current?.querySelector<HTMLInputElement>('input')?.focus();
  };

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (inFlight.current || status === 'loading') return; // çift gönderimi engelle

    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) {
      focusFirstError(e);
      return;
    }

    // Bot tuzağı: dolu ise sessizce "başarılı" göster, hiçbir şey gönderme
    if (honey) {
      setSentAttendance(attendance as Attendance);
      setStatus('success');
      return;
    }

    inFlight.current = true;
    setStatus('loading');
    try {
      await submitRSVP(
        {
          fullName: fullName.trim(),
          attendance: attendance as Attendance,
          guestCount: attending ? guestCount : '',
          note: note.trim(),
        },
        submissionId.current,
      );
      setSentAttendance(attendance as Attendance);
      writeSent(attendance as Attendance);
      setStatus('success');
      window.setTimeout(() => successRef.current?.focus({ preventScroll: true }), 60);
    } catch (err) {
      if (!(err instanceof RSVPError)) console.warn('[RSVP]', err);
      setStatus('error');
    } finally {
      inFlight.current = false;
    }
  };

  const reset = () => {
    writeSent(null);
    submissionId.current = createSubmissionId();
    setFullName('');
    setAttendance('');
    setGuestCount('');
    setNote('');
    setErrors({});
    setSentAttendance(null);
    setStatus('idle');
  };

  const loading = status === 'loading';

  return (
    <Section
      id="katilim"
      tone="ivory"
      prev="blush"
      wave={2}
      className="rsvp"
      labelledBy="rsvp-title"
    >
      <div className="rsvp-head">
        <p className="eyebrow" data-reveal>
          Yanıtınız
        </p>
        <h2 id="rsvp-title" className="h2" data-reveal style={{ '--d': '0.08s' } as React.CSSProperties}>
          Katılımınızı
          <br />
          <em>Bildirin</em>
        </h2>
        <p className="lede" data-reveal style={{ '--d': '0.16s' } as React.CSSProperties}>
          Bu özel günümüzde bizimle olup olamayacağınızı bildirmeniz bizi mutlu eder.
        </p>
      </div>

      <div className="paper" data-reveal style={{ '--d': '0.1s' } as React.CSSProperties}>
        <span className="paper-seal" aria-hidden="true">
          A<em>&amp;</em>K
        </span>

        {status === 'success' ? (
          <div className="thanks" role="status" aria-live="polite">
            <svg className="thanks-mark" viewBox="0 0 64 64" fill="none" aria-hidden="true" focusable="false">
              <circle className="thanks-circle" cx="32" cy="32" r="29" pathLength={1} />
              <path className="thanks-tick" d="M20 33.5l8.5 8.5L44.5 24" pathLength={1} />
            </svg>
            <h3 className="thanks-title" tabIndex={-1} ref={successRef}>
              Teşekkür ederiz ♡
            </h3>
            <p className="thanks-text">Katılım bilginiz bize ulaştı.</p>
            <Rule className="thanks-rule" />
            <p className="thanks-sub">
              {sentAttendance === 'Katılacağım'
                ? 'Sizi aramızda görmek için sabırsızlanıyoruz.'
                : 'Düşüncenizi bizimle paylaştığınız için minnettarız.'}
            </p>
            <button type="button" className="link-btn" onClick={reset}>
              Başka bir yanıt gönder
            </button>
          </div>
        ) : (
          <form className="form" onSubmit={onSubmit} noValidate aria-busy={loading}>
            {/* Bot tuzağı — insanlara görünmez */}
            <div className="hp" aria-hidden="true">
              <label htmlFor="website">Web sitesi</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honey}
                onChange={(e) => setHoney(e.target.value)}
              />
            </div>

            <div className="field">
              <label className="label" htmlFor="fullName">
                Ad Soyad <span className="req" aria-hidden="true">*</span>
              </label>
              <input
                ref={nameRef}
                id="fullName"
                name="fullName"
                type="text"
                className="input"
                autoComplete="name"
                autoCapitalize="words"
                enterKeyHint="next"
                maxLength={80}
                required
                aria-required="true"
                aria-invalid={errors.fullName ? 'true' : undefined}
                aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                value={fullName}
                disabled={loading}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName) setErrors((p) => ({ ...p, fullName: undefined }));
                }}
                placeholder="Adınız ve soyadınız"
              />
              {errors.fullName && (
                <p id="fullName-error" className="error" role="alert">
                  {errors.fullName}
                </p>
              )}
            </div>

            <fieldset
              className="field"
              ref={attendanceRef}
              aria-required="true"
              aria-invalid={errors.attendance ? 'true' : undefined}
              aria-describedby={errors.attendance ? 'attendance-error' : undefined}
              disabled={loading}
            >
              <legend className="label">
                Katılım <span className="req" aria-hidden="true">*</span>
              </legend>
              <div className="choices choices--2">
                {(['Katılacağım', 'Katılamayacağım'] as const).map((opt) => (
                  <label className="choice" key={opt}>
                    <input
                      type="radio"
                      name="attendance"
                      value={opt}
                      checked={attendance === opt}
                      onChange={() => {
                        setAttendance(opt);
                        setErrors((p) => ({ ...p, attendance: undefined }));
                      }}
                    />
                    <span className="choice-body">
                      <span className="choice-mark" aria-hidden="true" />
                      <span className="choice-text">{opt}</span>
                    </span>
                  </label>
                ))}
              </div>
              {errors.attendance && (
                <p id="attendance-error" className="error" role="alert">
                  {errors.attendance}
                </p>
              )}
            </fieldset>

            <div className={`collapse ${attending ? 'is-open' : ''}`}>
              <div className="collapse-inner">
                <fieldset
                  className="field field--flush"
                  ref={guestsRef}
                  aria-invalid={errors.guestCount ? 'true' : undefined}
                  aria-describedby={errors.guestCount ? 'guests-error' : undefined}
                  disabled={loading || !attending}
                >
                  <legend className="label">Kaç kişi katılacaksınız?</legend>
                  <div className="choices choices--3">
                    {GUEST_OPTIONS.map((opt) => (
                      <label className="choice choice--pill" key={opt}>
                        <input
                          type="radio"
                          name="guestCount"
                          value={opt}
                          checked={guestCount === opt}
                          onChange={() => {
                            setGuestCount(opt);
                            setErrors((p) => ({ ...p, guestCount: undefined }));
                          }}
                        />
                        <span className="choice-body">
                          <span className="choice-text">{opt} kişi</span>
                        </span>
                      </label>
                    ))}
                  </div>
                  {errors.guestCount && (
                    <p id="guests-error" className="error" role="alert">
                      {errors.guestCount}
                    </p>
                  )}
                </fieldset>
              </div>
            </div>

            <div className="field">
              <label className="label" htmlFor="note">
                Bize bir not bırakmak ister misiniz?{' '}
                <span className="optional">(isteğe bağlı)</span>
              </label>
              <textarea
                id="note"
                name="note"
                className="input input--area"
                rows={3}
                maxLength={500}
                autoCapitalize="sentences"
                value={note}
                disabled={loading}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Dilerseniz birkaç söz yazabilirsiniz"
              />
            </div>

            {status === 'error' && (
              <p className="form-error" role="alert">
                Bilginiz şu anda gönderilemedi. Lütfen tekrar deneyin.
              </p>
            )}

            <button type="submit" className="btn btn--primary btn--block" disabled={loading} aria-disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner" aria-hidden="true" />
                  <span>Gönderiliyor…</span>
                </>
              ) : (
                <span>Katılımımı Bildir</span>
              )}
            </button>
          </form>
        )}
      </div>
    </Section>
  );
}
