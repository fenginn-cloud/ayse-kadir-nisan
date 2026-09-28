interface MonogramProps {
  className?: string;
}

/** A & K monogramı — Bodoni + italik ampersand. Dekoratif olduğu için ekran okuyuculardan gizlenir. */
export function Monogram({ className }: MonogramProps) {
  return (
    <div className={`mono ${className ?? ''}`} aria-hidden="true">
      <span className="mono-l">A</span>
      <span className="mono-amp">&amp;</span>
      <span className="mono-l">K</span>
    </div>
  );
}
