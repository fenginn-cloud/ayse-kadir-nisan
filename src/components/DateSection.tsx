import { Section } from './Section';

export function DateSection() {
  return (
    <Section id="tarih" tone="wine" prev="ivory" wave={0} className="date" labelledBy="date-title">
      <h2 id="date-title" className="sr-only">
        Tarih ve saat: 27 Ekim 2026 Salı, 16:00 – 22:00
      </h2>

      <p className="eyebrow eyebrow--light" data-reveal>
        Takviminize not edin
      </p>

      <div className="date-stage" data-reveal style={{ '--d': '0.1s' } as React.CSSProperties}>
        <span className="date-side date-side--month" aria-hidden="true">
          Ekim
        </span>
        <span className="date-day" aria-hidden="true">
          27
        </span>
        <span className="date-side date-side--year" aria-hidden="true">
          2026
        </span>
      </div>

      <div className="date-meta" data-reveal style={{ '--d': '0.2s' } as React.CSSProperties}>
        <p className="date-weekday">Salı</p>
        <span className="date-meta-rule" aria-hidden="true" />
        <p className="date-time">
          <time dateTime="16:00">16:00</time> — <time dateTime="22:00">22:00</time>
        </p>
      </div>
    </Section>
  );
}
