import { Berries, Rule, Sprig } from './Deco';
import { Monogram } from './Monogram';
import { Section } from './Section';

export function Footer() {
  return (
    <Section
      tone="wine"
      prev="ivory"
      wave={0}
      className="footer"
      decor={
        <>
          <Sprig className="footer-sprig footer-sprig--l" />
          <Sprig className="footer-sprig footer-sprig--r" />
          <Berries className="footer-berries" />
        </>
      }
    >
      <footer className="footer-inner">
        <Monogram className="footer-mono" />
        <Rule className="footer-rule" />
        <p className="footer-names" data-reveal>
          Ayşe Engin <em>&amp;</em> Kadir Akgün
        </p>
        <p className="footer-date" data-reveal style={{ '--d': '0.1s' } as React.CSSProperties}>
          27 <b aria-hidden="true">•</b> 10 <b aria-hidden="true">•</b> 2026
        </p>
        <p className="footer-wish" data-reveal style={{ '--d': '0.2s' } as React.CSSProperties}>
          Sizi aramızda görmek dileğiyle
        </p>
      </footer>
    </Section>
  );
}
