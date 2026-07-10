import type { Product } from "@/lib/products";

/*
 * Technische Zeichnungen. Koordinatensystem = Millimeter.
 * (0,0) ist die linke obere Ecke des Möbels, y = h ist die Standlinie.
 * Der Maßstab kommt von außen: width = (mm) * var(--mm).
 */

const PAD = 190; // Rand im viewBox für Bemaßung, in mm

const STROKE = {
  stroke: "var(--ink)",
  strokeWidth: 1.1,
  vectorEffect: "non-scaling-stroke",
  fill: "none",
} as const;

const FILL_TINT = { fill: "var(--tint, var(--tint-eiche))" } as const;
const FILL_STAHL = { fill: "var(--stahl)" } as const;

/* ---------- Bemaßung ---------- */

const MASS_LINE = {
  stroke: "var(--enzian)",
  strokeWidth: 1,
  vectorEffect: "non-scaling-stroke",
  fill: "none",
  pathLength: 1,
} as const;

function Tick({ x, y }: { x: number; y: number }) {
  // Schrägstrich 45° wie im Bauzeichnen
  return <path d={`M ${x - 22} ${y + 22} L ${x + 22} ${y - 22}`} {...MASS_LINE} className="m-line" />;
}

/** Horizontales Maß: Maßlinie bei y, von x1 bis x2, Hilfslinien zur Kante bei edgeY */
export function MassH({
  y,
  x1,
  x2,
  edgeY,
  text,
}: {
  y: number;
  x1: number;
  x2: number;
  edgeY: number;
  text: string;
}) {
  return (
    <g className="mass" aria-hidden="true">
      <path d={`M ${x1} ${edgeY} L ${x1} ${y + 26}`} {...MASS_LINE} className="m-line m-hilf" />
      <path d={`M ${x2} ${edgeY} L ${x2} ${y + 26}`} {...MASS_LINE} className="m-line m-hilf" />
      <path d={`M ${x1} ${y} L ${x2} ${y}`} {...MASS_LINE} className="m-line" />
      <Tick x={x1} y={y} />
      <Tick x={x2} y={y} />
      <text x={(x1 + x2) / 2} y={y - 26} textAnchor="middle" className="m-text">
        {text}
      </text>
    </g>
  );
}

/** Vertikales Maß: Maßlinie bei x, von y1 bis y2, Hilfslinien zur Kante bei edgeX */
export function MassV({
  x,
  y1,
  y2,
  edgeX,
  text,
}: {
  x: number;
  y1: number;
  y2: number;
  edgeX: number;
  text: string;
}) {
  return (
    <g className="mass" aria-hidden="true">
      <path d={`M ${edgeX} ${y1} L ${x - 26} ${y1}`} {...MASS_LINE} className="m-line m-hilf" />
      <path d={`M ${edgeX} ${y2} L ${x - 26} ${y2}`} {...MASS_LINE} className="m-line m-hilf" />
      <path d={`M ${x} ${y1} L ${x} ${y2}`} {...MASS_LINE} className="m-line" />
      <Tick x={x} y={y1} />
      <Tick x={x} y={y2} />
      <text
        x={x - 26}
        y={(y1 + y2) / 2}
        textAnchor="middle"
        transform={`rotate(-90 ${x - 26} ${(y1 + y2) / 2})`}
        className="m-text"
      >
        {text}
      </text>
    </g>
  );
}

/* ---------- Schraffur für Schnittflächen ---------- */

export function SchraffurDefs() {
  return (
    <defs>
      <pattern id="schraffur" width="26" height="26" patternUnits="userSpaceOnUse">
        <path d="M -6 32 L 32 -6" stroke="var(--ink)" strokeWidth="1.5" opacity="0.5" />
      </pattern>
    </defs>
  );
}

/* ---------- Die sechs Möbel, Vorderansicht ---------- */

function SofaDessauFront({ b, h }: { b: number; h: number }) {
  // 3 Rückenkissen, 3 Sitzkissen, umlaufende Zarge, 6 Beine
  const kb = (b - 120 - 40) / 3; // Kissenbreite
  const kx = (i: number) => 60 + i * (kb + 20);
  return (
    <g>
      {/* Beine */}
      {[90, b / 2 - 20, b - 130].map((x) => (
        <rect key={x} x={x} y={555} width={40} height={h - 555} {...FILL_TINT} {...STROKE} />
      ))}
      {/* Zarge */}
      <rect x={20} y={495} width={b - 40} height={60} {...FILL_TINT} {...STROKE} />
      {/* Rückenkissen */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={kx(i)} y={30} width={kb} height={400} rx={30} className="polster" {...STROKE} />
          <path d={`M ${kx(i) + 34} ${230} L ${kx(i) + kb - 34} ${230}`} {...STROKE} opacity={0.45} />
        </g>
      ))}
      {/* Sitzkissen, vorn */}
      {[0, 1, 2].map((i) => (
        <rect key={i} x={kx(i) - 6} y={390} width={kb + 12} height={115} rx={26} className="polster" {...STROKE} />
      ))}
    </g>
  );
}

function SofaDessauSeite({ t, h }: { t: number; h: number }) {
  return (
    <g>
      <rect x={t / 2 - 20} y={555} width={40} height={h - 555} {...FILL_TINT} {...STROKE} />
      <rect x={20} y={495} width={t - 40} height={60} {...FILL_TINT} {...STROKE} />
      {/* Rückenkissen im Schnitt */}
      <rect x={t - 230} y={30} width={200} height={400} rx={30} className="polster" {...STROKE} />
      {/* Sitzkissen */}
      <rect x={24} y={390} width={t - 250} height={115} rx={26} className="polster" {...STROKE} />
    </g>
  );
}

function SesselKrefeldFront({ b, h }: { b: number; h: number }) {
  return (
    <g>
      {/* Wangen */}
      <rect x={0} y={50} width={28} height={h - 50} {...FILL_TINT} {...STROKE} />
      <rect x={b - 28} y={50} width={28} height={h - 50} {...FILL_TINT} {...STROKE} />
      {/* Rückenkissen */}
      <rect x={40} y={70} width={b - 80} height={320} rx={26} className="polster" {...STROKE} />
      {/* Sitzkissen */}
      <rect x={34} y={370} width={b - 68} height={110} rx={24} className="polster" {...STROKE} />
      {/* Traverse unter dem Sitz */}
      <path d={`M 28 ${520} L ${b - 28} ${520}`} {...STROKE} opacity={0.45} />
    </g>
  );
}

function SesselKrefeldSeite({ t, h }: { t: number; h: number }) {
  // Die Wange als Fläche, hintere Kante um 24° geneigt
  const top = 50;
  const lean = Math.tan((24 * Math.PI) / 180) * (h - top); // ≈ 290
  return (
    <g>
      <path
        d={`M 0 ${h} L 0 ${h - 240} L ${t - lean - 140} ${top} L ${t - 140} ${top} L ${t} ${h} Z`}
        {...FILL_TINT}
        {...STROKE}
      />
      {/* Sitzkissen eingeschoben */}
      <rect x={40} y={370} width={t - 260} height={110} rx={24} className="polster" {...STROKE} />
      {/* Neigungswinkel */}
      <path d={`M ${t - 150} ${top + 40} L ${t - 90} ${top + 190}`} {...MASS_LINE} className="m-line" />
    </g>
  );
}

function HockerUlmFront({ b, h }: { b: number; h: number }) {
  return (
    <g>
      {/* Seiten */}
      <rect x={0} y={19} width={19} height={h - 19} {...FILL_TINT} {...STROKE} />
      <rect x={b - 19} y={19} width={19} height={h - 19} {...FILL_TINT} {...STROKE} />
      {/* Platte */}
      <rect x={0} y={0} width={b} height={19} {...FILL_TINT} {...STROKE} />
      {/* Querstrebe, hochkant */}
      <rect x={19} y={330} width={b - 38} height={44} {...FILL_TINT} {...STROKE} />
      {/* Nut-und-Feder-Linien an der Platte */}
      <path d={`M 19 6 L 19 13 M ${b - 19} 6 L ${b - 19} 13`} {...STROKE} opacity={0.45} />
    </g>
  );
}

function HockerUlmSeite({ t, h }: { t: number; h: number }) {
  return (
    <g>
      {/* Seitenbrett als Fläche */}
      <rect x={0} y={19} width={t} height={h - 19} {...FILL_TINT} {...STROKE} />
      {/* Platte im Schnitt: schraffiert */}
      <rect x={0} y={0} width={t} height={19} {...STROKE} fill="url(#schraffur)" />
      {/* Querstrebe im Schnitt */}
      <rect x={t / 2 - 10} y={330} width={19} height={44} {...STROKE} fill="url(#schraffur)" />
    </g>
  );
}

function TischWeissenhofFront({ b, h }: { b: number; h: number }) {
  return (
    <g>
      {/* Beine */}
      <rect x={150} y={40} width={70} height={h - 40} {...FILL_TINT} {...STROKE} />
      <rect x={b - 220} y={40} width={70} height={h - 40} {...FILL_TINT} {...STROKE} />
      {/* Zarge */}
      <rect x={120} y={40} width={b - 240} height={80} {...FILL_TINT} {...STROKE} />
      {/* Platte */}
      <rect x={0} y={0} width={b} height={40} {...FILL_TINT} {...STROKE} />
      {/* Fase an der Plattenkante */}
      <path d={`M 0 32 L ${b} 32`} {...STROKE} opacity={0.35} />
    </g>
  );
}

function TischWeissenhofSeite({ t, h }: { t: number; h: number }) {
  return (
    <g>
      <rect x={110} y={40} width={70} height={h - 40} {...FILL_TINT} {...STROKE} />
      {/* Platte im Schnitt */}
      <rect x={0} y={0} width={t} height={40} {...STROKE} fill="url(#schraffur)" />
      <rect x={90} y={40} width={110} height={80} {...FILL_TINT} {...STROKE} />
    </g>
  );
}

function SideboardHalleFront({ b, h }: { b: number; h: number }) {
  const korpusH = h - 120;
  return (
    <g>
      {/* Sockel Stahl, zurückgesetzt */}
      <rect x={120} y={korpusH} width={b - 240} height={h - korpusH} {...FILL_STAHL} {...STROKE} />
      {/* Korpus */}
      <rect x={0} y={0} width={b} height={korpusH} {...FILL_TINT} {...STROKE} />
      {/* Schiebetüren: rechte läuft in vorderer Nut */}
      <rect x={16} y={16} width={b / 2 - 12} height={korpusH - 32} {...STROKE} />
      <rect x={b / 2 - 22} y={10} width={b / 2 + 6} height={korpusH - 20} className="tuer-vorn" {...STROKE} />
      {/* Grifffräsungen */}
      <rect x={b / 2 - 66} y={korpusH / 2 - 60} width={14} height={120} rx={7} {...STROKE} opacity={0.6} />
      <rect x={b / 2 + 8} y={korpusH / 2 - 60} width={14} height={120} rx={7} {...STROKE} opacity={0.6} />
    </g>
  );
}

function SideboardHalleSeite({ t, h }: { t: number; h: number }) {
  const korpusH = h - 120;
  return (
    <g>
      <rect x={60} y={korpusH} width={t - 120} height={h - korpusH} {...FILL_STAHL} {...STROKE} />
      <rect x={0} y={0} width={t} height={korpusH} {...FILL_TINT} {...STROKE} />
      {/* Türebenen von der Seite */}
      <path d={`M 20 16 L 20 ${korpusH - 16} M 34 10 L 34 ${korpusH - 10}`} {...STROKE} opacity={0.5} />
    </g>
  );
}

function RegalFagusFront({ b, h }: { b: number; h: number }) {
  const boeden = [0, 1, 2, 3, 4].map((i) => (i * (h - 25)) / 4);
  return (
    <g>
      {/* Stahlleitern */}
      <rect x={0} y={0} width={24} height={h} {...FILL_STAHL} {...STROKE} />
      <rect x={b - 24} y={0} width={24} height={h} {...FILL_STAHL} {...STROKE} />
      {/* Böden */}
      {boeden.map((y) => (
        <rect key={y} x={24} y={y} width={b - 48} height={25} {...FILL_TINT} {...STROKE} />
      ))}
      {/* Auflagen */}
      {boeden.map((y) => (
        <path key={y} d={`M 24 ${y + 25} l 40 0 M ${b - 24} ${y + 25} l -40 0`} {...STROKE} opacity={0.5} />
      ))}
    </g>
  );
}

function RegalFagusSeite({ t, h }: { t: number; h: number }) {
  const boeden = [0, 1, 2, 3, 4].map((i) => (i * (h - 25)) / 4);
  return (
    <g>
      {/* Leiter: zwei Streben */}
      <rect x={20} y={0} width={24} height={h} {...FILL_STAHL} {...STROKE} />
      <rect x={t - 44} y={0} width={24} height={h} {...FILL_STAHL} {...STROKE} />
      {/* Böden im Schnitt */}
      {boeden.map((y) => (
        <rect key={y} x={44} y={y} width={t - 88} height={25} {...STROKE} fill="url(#schraffur)" />
      ))}
    </g>
  );
}

/* ---------- Öffentliche Komponente ---------- */

type Motiv = (p: { b: number; h: number; t: number }) => React.ReactNode;

const FRONT: Record<string, Motiv> = {
  "sofa-dessau": SofaDessauFront,
  "sessel-krefeld": SesselKrefeldFront,
  "hocker-ulm": HockerUlmFront,
  "tisch-weissenhof": TischWeissenhofFront,
  "sideboard-halle": SideboardHalleFront,
  "regal-fagus": RegalFagusFront,
};

const SEITE: Record<string, Motiv> = {
  "sofa-dessau": SofaDessauSeite,
  "sessel-krefeld": SesselKrefeldSeite,
  "hocker-ulm": HockerUlmSeite,
  "tisch-weissenhof": TischWeissenhofSeite,
  "sideboard-halle": SideboardHalleSeite,
  "regal-fagus": RegalFagusSeite,
};

export function Zeichnung({
  product,
  ansicht = "front",
  bemasst = false,
  className,
}: {
  product: Product;
  ansicht?: "front" | "seite";
  /** true = Maße immer sichtbar (per CSS animiert), false = nur bei :hover der .produkt-Karte */
  bemasst?: boolean;
  className?: string;
}) {
  const { b, h, t } = product.masse;
  const w = ansicht === "front" ? b : t;
  const Motiv = ansicht === "front" ? FRONT[product.slug] : SEITE[product.slug];
  return (
    <svg
      viewBox={`${-PAD} ${-PAD} ${w + 2 * PAD} ${h + 2 * PAD}`}
      style={{ width: `calc(${w + 2 * PAD} * var(--mm))` }}
      className={`zeichnung ${bemasst ? "bemasst" : ""} ${className ?? ""}`}
      role="img"
      aria-label={`${product.typ} ${product.name}, technische Zeichnung, ${
        ansicht === "front" ? "Vorderansicht" : "Seitenansicht"
      }`}
    >
      <SchraffurDefs />
      <Motiv b={b} h={h} t={t} />
      <MassH y={h + 110} x1={0} x2={w} edgeY={h} text={`${w}`} />
      <MassV x={-90} y1={0} y2={h} edgeX={0} text={`${h}`} />
    </svg>
  );
}
