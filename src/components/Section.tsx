import type { CSSProperties, ReactNode } from 'react';
import { Wave } from './Deco';

export type Tone = 'ivory' | 'wine' | 'blush' | 'sand';

interface SectionProps {
  id?: string;
  tone: Tone;
  /** Önceki bölümün tonu (üstteki dalga bu renkle dolar) */
  prev?: Tone;
  wave?: number;
  className?: string;
  labelledBy?: string;
  decor?: ReactNode;
  children: ReactNode;
}

export function Section({ id, tone, prev, wave, className, labelledBy, decor, children }: SectionProps) {
  const style = {
    '--bg': `var(--tone-${tone})`,
    '--prev': prev ? `var(--tone-${prev})` : undefined,
  } as CSSProperties;

  return (
    <section
      id={id}
      className={`sec sec--${tone} ${wave !== undefined ? 'sec--wave' : ''} ${className ?? ''}`}
      style={style}
      aria-labelledby={labelledBy}
    >
      {wave !== undefined && <Wave variant={wave} />}
      {decor && <div className="deco">{decor}</div>}
      <div className="sec-inner">{children}</div>
    </section>
  );
}
