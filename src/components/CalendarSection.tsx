import { useState } from 'react';
import { GOOGLE_CALENDAR_URL, downloadICS } from '../lib/calendar';
import { EVENT } from '../lib/event';
import { Section } from './Section';

export function CalendarSection() {
  const [failed, setFailed] = useState(false);

  const onAdd = () => {
    const ok = downloadICS();
    setFailed(!ok);
    if (!ok) window.open(GOOGLE_CALENDAR_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <Section id="takvim" tone="ivory" prev="sand" wave={2} className="cal" labelledBy="cal-title">
      <p className="eyebrow" data-reveal>
        Unutmayın
      </p>
      <h2 id="cal-title" className="h2 h2--small" data-reveal style={{ '--d': '0.08s' } as React.CSSProperties}>
        Takvime Ekle
      </h2>

      <div className="ticket" data-reveal style={{ '--d': '0.12s' } as React.CSSProperties}>
        <div className="ticket-stub" aria-hidden="true">
          <span className="ticket-day">27</span>
          <span className="ticket-month">Ekim</span>
        </div>
        <div className="ticket-body">
          <p className="ticket-title">{EVENT.title}</p>
          <p className="ticket-line">27 Ekim 2026</p>
          <p className="ticket-line">16:00 – 22:00</p>
          <p className="ticket-place">{EVENT.venue}</p>
        </div>
      </div>

      <div className="actions" data-reveal style={{ '--d': '0.1s' } as React.CSSProperties}>
        <button type="button" className="btn btn--outline btn--block" onClick={onAdd}>
          <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
            <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
            <path d="M3.5 10h17M8 3v4M16 3v4M12 13.2v4.6M9.7 15.5h4.6" />
          </svg>
          <span>Takvime Ekle</span>
        </button>
        <a className="btn btn--text" href={GOOGLE_CALENDAR_URL} target="_blank" rel="noopener noreferrer">
          Google Takvim ile aç
        </a>
        {failed && (
          <p className="form-error" role="status">
            Dosya indirilemedi; Google Takvim sayfası açıldı.
          </p>
        )}
      </div>
    </Section>
  );
}
