import { Berries, Blob, Rule, Sprig } from './Deco';
import { Section } from './Section';

export function CoupleSection() {
  return (
    <Section
      id="cift"
      tone="blush"
      prev="wine"
      wave={1}
      className="couple"
      labelledBy="couple-title"
      decor={
        <>
          <Blob className="couple-blob" variant={1} />
          <Sprig className="couple-sprig couple-sprig--l" />
          <Berries className="couple-berries" />
        </>
      }
    >
      <p className="eyebrow" data-reveal>
        Davetlisiniz
      </p>

      <h2 id="couple-title" className="couple-names" aria-label="Ayşe Engin ve Kadir Akgün">
        <span className="couple-name" data-reveal aria-hidden="true">
          Ayşe Engin
        </span>
        <span className="couple-amp" data-reveal style={{ '--d': '0.12s' } as React.CSSProperties} aria-hidden="true">
          <span />
          <em>&amp;</em>
          <span />
        </span>
        <span className="couple-name" data-reveal style={{ '--d': '0.24s' } as React.CSSProperties} aria-hidden="true">
          Kadir Akgün
        </span>
      </h2>

      <Rule className="couple-rule" />

      <p className="lede" data-reveal>
        Aynı yolda yürümeye karar verdik. Bu güzel adımı, en çok sevdiklerimizin huzurunda, sizlerle
        paylaşmak istiyoruz.
      </p>
      <p className="lede lede--small" data-reveal style={{ '--d': '0.1s' } as React.CSSProperties}>
        Varlığınız, bu akşamı bizim için çok daha anlamlı kılacak.
      </p>
    </Section>
  );
}
