import type { CSSProperties } from 'react';

/* ──────────────────────────────────────────────────────────────
   İnce çizgili dekoratif öğeler. Hepsi currentColor kullanır,
   rengi bulundukları bölümün CSS'i belirler.
   ────────────────────────────────────────────────────────────── */

/** [x, y, açı°, ölçek] — yaprakların gövde üzerindeki yerleşimi */
const LEAVES: ReadonlyArray<readonly [number, number, number, number]> = [
  [50, 176, -58, 1.05],
  [49, 154, 238, 1.05],
  [51, 130, -52, 1],
  [50, 108, 234, 0.95],
  [52, 86, -50, 0.85],
  [49, 64, 232, 0.78],
  [50, 42, -44, 0.66],
  [49, 22, -96, 0.6],
];

const LEAF = 'M0 0C7 -8 22 -9 33 0C22 9 7 8 0 0Z';
const VEIN = 'M3 0L28 0';

interface DecoProps {
  className?: string;
  style?: CSSProperties;
}

/** Yaprak dallı ince çizgi çizim */
export function Sprig({ className, style }: DecoProps) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 100 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M50 200C46 152 56 104 48 8" />
      {LEAVES.map(([x, y, a, s], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${a}) scale(${s})`}>
          <path d={LEAF} />
          <path d={VEIN} strokeWidth="0.6" opacity="0.7" />
        </g>
      ))}
    </svg>
  );
}

/** İnce dal + küçük tomurcuk noktaları */
export function Berries({ className, style }: DecoProps) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 100 140"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.9"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M56 140C54 108 50 84 34 44" />
      <path d="M52 100C60 88 68 80 78 72" />
      <path d="M47 76C38 68 30 64 20 62" />
      <path d="M40 58C46 48 52 40 54 28" />
      <circle cx="34" cy="42" r="2.6" />
      <circle cx="79" cy="70.5" r="2.4" />
      <circle cx="19" cy="61.5" r="2.4" />
      <circle cx="54.5" cy="26" r="2.4" />
      <circle cx="28" cy="52" r="1.6" />
      <circle cx="68" cy="80" r="1.6" />
      <circle cx="26" cy="66" r="1.6" />
    </svg>
  );
}

/** Akıcı ince çizgiler (referanstaki organik eğriler) */
export function Flow({ className, style }: DecoProps) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 400 300"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path vectorEffect="non-scaling-stroke" d="M-10 210C70 150 110 262 200 214S330 96 410 150" />
      <path vectorEffect="non-scaling-stroke" d="M-10 236C80 182 122 286 208 238S338 132 410 182" opacity="0.55" />
    </svg>
  );
}

/** Yumuşak organik leke (düz dolgu, gradient yok) */
export function Blob({ className, style, variant = 0 }: DecoProps & { variant?: 0 | 1 | 2 }) {
  const paths = [
    'M312 60C372 100 398 190 352 262C306 334 204 352 132 312C60 272 22 190 66 118C110 46 252 20 312 60Z',
    'M300 48C366 86 384 178 340 244C296 310 196 338 126 296C56 254 26 168 74 104C122 40 234 10 300 48Z',
    'M330 96C386 152 372 244 302 290C232 336 118 330 68 268C18 206 40 108 112 64C184 20 274 40 330 96Z',
  ];
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 400 380"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d={paths[variant]} />
    </svg>
  );
}

/** Bölümler arası organik geçiş. Dolgu rengi `--prev` (önceki bölümün zemini). */
const WAVES = [
  'M0 0H400V14C330 40 270 -4 200 16S70 40 0 12Z',
  'M0 0H400V22C310 -6 250 40 170 20S50 30 0 6Z',
  'M0 0H400V8C300 36 220 6 140 22S40 34 0 20Z',
];

export function Wave({ variant = 0 }: { variant?: number }) {
  return (
    <svg
      className="wave"
      viewBox="0 0 400 40"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d={WAVES[variant % WAVES.length]} />
    </svg>
  );
}

/** Ortasında küçük bir elmas bulunan ince ayraç */
export function Rule({ className }: { className?: string }) {
  return (
    <div className={`rule ${className ?? ''}`} aria-hidden="true">
      <span />
      <i />
      <span />
    </div>
  );
}
