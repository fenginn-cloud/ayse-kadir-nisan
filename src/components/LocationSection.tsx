import { EVENT, MAP_DIRECTIONS_URL, MAP_EMBED_URL, MAP_OPEN_URL } from '../lib/event';
import { Sprig } from './Deco';
import { Section } from './Section';

export function LocationSection() {
  return (
    <Section
      id="konum"
      tone="sand"
      prev="ivory"
      wave={1}
      className="location"
      labelledBy="location-title"
      decor={<Sprig className="location-sprig" />}
    >
      <p className="eyebrow" data-reveal>
        Buluşma noktası
      </p>
      <h2 id="location-title" className="h2" data-reveal style={{ '--d': '0.08s' } as React.CSSProperties}>
        Konum
      </h2>

      <address className="venue" data-reveal style={{ '--d': '0.14s' } as React.CSSProperties}>
        <span className="venue-name">{EVENT.venue}</span>
        <span className="venue-rule" aria-hidden="true" />
        <span className="venue-address">
          {EVENT.addressLine1}
          <br />
          {EVENT.addressLine2}
        </span>
      </address>

      <div className="map" data-reveal style={{ '--d': '0.1s' } as React.CSSProperties}>
        <div className="map-frame">
          <iframe
            title={`${EVENT.venue} harita konumu`}
            src={MAP_EMBED_URL}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>

      <div className="actions" data-reveal style={{ '--d': '0.1s' } as React.CSSProperties}>
        <a className="btn btn--primary btn--block" href={MAP_DIRECTIONS_URL} target="_blank" rel="noopener noreferrer">
          <span>Yol Tarifi Al</span>
          <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
        <a className="btn btn--text" href={MAP_OPEN_URL} target="_blank" rel="noopener noreferrer">
          Haritada Aç
        </a>
      </div>
    </Section>
  );
}
