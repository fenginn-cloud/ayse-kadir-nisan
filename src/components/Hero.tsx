import { Berries, Blob, Flow, Sprig } from './Deco';
import { Monogram } from './Monogram';

export function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero-deco" aria-hidden="true">
        <Blob className="hero-blob hero-blob--a" variant={0} />
        <Blob className="hero-blob hero-blob--b" variant={2} />
        <Flow className="hero-flow" />
        <Sprig className="hero-sprig hero-sprig--l" />
        <Sprig className="hero-sprig hero-sprig--r" />
        <Berries className="hero-berries" />
      </div>

      <div className="hero-inner">
        <p className="hero-kicker anim" style={{ '--d': '0.15s' } as React.CSSProperties}>
          <span className="hero-kicker-line" />
          <span>Nişan Daveti</span>
          <span className="hero-kicker-line" />
        </p>

        <div className="hero-arch">
          <svg
            className="hero-arch-frame"
            viewBox="0 0 200 260"
            fill="none"
            aria-hidden="true"
            focusable="false"
          >
            <path
              className="arch-fill"
              d="M8 252V100A92 92 0 0 1 192 100V252Z"
            />
            <path
              className="arch-line arch-line--outer"
              pathLength={1}
              d="M8 252V100A92 92 0 0 1 192 100V252"
            />
            <path
              className="arch-line arch-line--inner"
              pathLength={1}
              d="M17 252V100A83 83 0 0 1 183 100V252"
            />
          </svg>
          <Monogram className="hero-mono" />
        </div>

        <h1 className="hero-names anim" style={{ '--d': '1.2s' } as React.CSSProperties}>
          <span className="sr-only">Ayşe Engin ve Kadir Akgün — </span>
          <span aria-hidden="true">
            Ayşe <em>&amp;</em> Kadir
          </span>
        </h1>

        <p className="hero-text anim" style={{ '--d': '1.6s' } as React.CSSProperties}>
          Birlikteliğimizi nişanımızla taçlandırırken,
          <br />
          bu özel günümüzde sizleri de aramızda
          <br />
          görmekten mutluluk duyarız.
        </p>

        <p className="hero-date anim" style={{ '--d': '2s' } as React.CSSProperties}>
          <span className="hero-date-line" aria-hidden="true" />
          <time dateTime="2026-10-27" aria-label="27 Ekim 2026">
            27 <b aria-hidden="true">•</b> 10 <b aria-hidden="true">•</b> 2026
          </time>
          <span className="hero-date-line" aria-hidden="true" />
        </p>
      </div>

      <a className="scroll-cue anim" style={{ '--d': '2.6s' } as React.CSSProperties} href="#tarih" aria-label="Aşağı kaydır">
        <span className="scroll-cue-track">
          <span className="scroll-cue-dot" />
        </span>
      </a>
    </header>
  );
}
