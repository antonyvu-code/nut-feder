// Alle Maße in mm. Die Zeichnungen auf der Website teilen sich EINEN
// Maßstab — die Proportionen zwischen den Produkten sind real.

export type MaterialId =
  | "eiche"
  | "nussbaum"
  | "esche-schwarz"
  | "wolle-graphit"
  | "wolle-enzian"
  | "stahl-ral9005";

export interface Material {
  id: MaterialId;
  name: string;
  detail: string;
  /** CSS background — Farbfläche des Werkstoffs */
  swatch: string;
  /** Aufpreis in Euro gegenüber Grundpreis */
  aufpreis: number;
}

export const MATERIALS: Record<MaterialId, Material> = {
  eiche: {
    id: "eiche",
    name: "Eiche, geölt",
    detail: "Massivholz aus dem Sauerland, FSC",
    swatch: "linear-gradient(105deg,#c9b28c 0%,#bfa77e 38%,#cdb692 62%,#b89f74 100%)",
    aufpreis: 0,
  },
  nussbaum: {
    id: "nussbaum",
    name: "Nussbaum, geölt",
    detail: "Europäischer Nussbaum, massiv",
    swatch: "linear-gradient(105deg,#6d5138 0%,#5c4028 40%,#755a3e 65%,#54391f 100%)",
    aufpreis: 380,
  },
  "esche-schwarz": {
    id: "esche-schwarz",
    name: "Esche, schwarz gebeizt",
    detail: "Offenporig lackiert, Maserung sichtbar",
    swatch: "linear-gradient(105deg,#2b2925 0%,#1f1d1a 45%,#33302a 70%,#211f1b 100%)",
    aufpreis: 240,
  },
  "wolle-graphit": {
    id: "wolle-graphit",
    name: "Wolle Graphit",
    detail: "Bouclé, 96 % Schurwolle, 45.000 Scheuertouren",
    swatch: "radial-gradient(circle at 30% 30%,#77746c 0%,#5e5b54 60%,#514e48 100%)",
    aufpreis: 0,
  },
  "wolle-enzian": {
    id: "wolle-enzian",
    name: "Wolle Enzian",
    detail: "Flachgewebe, 92 % Schurwolle",
    swatch: "radial-gradient(circle at 30% 30%,#2f6da3 0%,#0e518d 60%,#0a3f70 100%)",
    aufpreis: 190,
  },
  "stahl-ral9005": {
    id: "stahl-ral9005",
    name: "Stahl RAL 9005",
    detail: "Pulverbeschichtet, tiefschwarz matt",
    swatch: "linear-gradient(160deg,#22211f 0%,#111110 55%,#292826 100%)",
    aufpreis: 0,
  },
};

export interface Product {
  slug: string;
  /** Ortsname aus der deutschen Designgeschichte */
  name: string;
  ref: string;
  typ: string;
  /** Breite × Höhe × Tiefe in mm */
  masse: { b: number; h: number; t: number };
  gewichtKg: number;
  grundpreis: number;
  lieferwochen: number;
  kurz: string;
  beschreibung: string;
  herkunft: string;
  materialOptionen: MaterialId[];
  konstruktion: string[];
}

export const PRODUCTS: Product[] = [
  {
    slug: "sofa-dessau",
    name: "DESSAU",
    ref: "NF 01",
    typ: "Sofa, dreisitzig",
    masse: { b: 2280, h: 720, t: 880 },
    gewichtKg: 68,
    grundpreis: 6400,
    lieferwochen: 12,
    kurz: "Drei Sitzplätze auf einem durchgehenden Rahmen aus Massivholz.",
    beschreibung:
      "Der Rahmen ist eine einzige umlaufende Zarge, offen verzinkt an allen vier Ecken. Die Polster liegen lose auf — sie lassen sich wenden, neu beziehen und in zwanzig Jahren ersetzen, ohne dass ein Werkzeug nötig ist.",
    herkunft: "Gestell und Polsterei aus Remscheid",
    materialOptionen: ["wolle-graphit", "wolle-enzian"],
    konstruktion: [
      "Zarge Eiche massiv, 32 mm, offen verzinkt",
      "Unterfederung Buchenschichtholz, geschraubt",
      "Polster wendbar, Bezug abnehmbar",
    ],
  },
  {
    slug: "sessel-krefeld",
    name: "KREFELD",
    ref: "NF 02",
    typ: "Sessel",
    masse: { b: 760, h: 700, t: 820 },
    gewichtKg: 24,
    grundpreis: 2900,
    lieferwochen: 10,
    kurz: "Ein tiefer Sitz zwischen zwei Wangen aus Massivholz.",
    beschreibung:
      "Zwei seitliche Wangen tragen Sitz und Rücken — keine sichtbaren Beschläge, keine Schrauben von außen. Die Neigung der Rückenlehne ist auf 24 Grad festgelegt: gemessen, nicht verstellbar.",
    herkunft: "Gefertigt in Remscheid",
    materialOptionen: ["wolle-graphit", "wolle-enzian"],
    konstruktion: [
      "Wangen Eiche massiv, 28 mm",
      "Rückenneigung 24°, fest",
      "Sitzpolster auf Gurtband, abnehmbar",
    ],
  },
  {
    slug: "hocker-ulm",
    name: "ULM",
    ref: "NF 03",
    typ: "Hocker",
    masse: { b: 440, h: 450, t: 290 },
    gewichtKg: 3.4,
    grundpreis: 420,
    lieferwochen: 4,
    kurz: "Sitz, Beistelltisch, Tritt und Regalmodul — ein Brett, drei Funktionen mehr.",
    beschreibung:
      "Drei Bretter, eine Querstrebe, Nut und Feder. Der Hocker steht, liegt und stapelt. Er ist das kleinste Möbel im Programm und das einzige, das ohne Leim auskommt.",
    herkunft: "Gefertigt in Remscheid",
    materialOptionen: ["eiche", "nussbaum", "esche-schwarz"],
    konstruktion: [
      "Seiten und Platte 19 mm, massiv",
      "Querstrebe eingenutet, ohne Leim",
      "Kanten gefast, 2 mm",
    ],
  },
  {
    slug: "tisch-weissenhof",
    name: "WEISSENHOF",
    ref: "NF 04",
    typ: "Esstisch",
    masse: { b: 2200, h: 740, t: 950 },
    gewichtKg: 74,
    grundpreis: 4800,
    lieferwochen: 10,
    kurz: "Acht Plätze auf einer durchgehenden Platte, 40 mm stark.",
    beschreibung:
      "Die Platte ist durchgehend verleimt, die Beine sind in die Zarge gezapft. Der Tisch kommt in zwei Teilen und wird vor Ort mit vier Handgriffen montiert — die Verbindung ist eine Schwalbenschwanzführung aus Stahl.",
    herkunft: "Platte und Gestell aus Remscheid",
    materialOptionen: ["eiche", "nussbaum", "esche-schwarz"],
    konstruktion: [
      "Platte 40 mm, durchgehend lamelliert",
      "Beine gezapft, Zarge umlaufend",
      "Schwalbenschwanzführung Stahl, werkzeuglos",
    ],
  },
  {
    slug: "sideboard-halle",
    name: "HALLE",
    ref: "NF 05",
    typ: "Sideboard",
    masse: { b: 1800, h: 620, t: 420 },
    gewichtKg: 52,
    grundpreis: 3600,
    lieferwochen: 8,
    kurz: "Zwei Schiebetüren, vier Fächer, ein Sockel aus Stahl.",
    beschreibung:
      "Die Schiebetüren laufen in gefrästen Nuten — keine Beschläge, kein Kunststoff, kein Geräusch. Der Korpus schwebt auf einem zurückgesetzten Stahlsockel, zwölf Zentimeter über dem Boden.",
    herkunft: "Korpus aus Remscheid, Sockel aus Solingen",
    materialOptionen: ["eiche", "nussbaum", "esche-schwarz"],
    konstruktion: [
      "Korpus 19 mm, Gehrung verleimt",
      "Schiebetüren in Nut geführt",
      "Sockel Stahl RAL 9005, zurückgesetzt",
    ],
  },
  {
    slug: "regal-fagus",
    name: "FAGUS",
    ref: "NF 06",
    typ: "Regalsystem",
    masse: { b: 1200, h: 1840, t: 350 },
    gewichtKg: 46,
    grundpreis: 2200,
    lieferwochen: 6,
    kurz: "Fünf Ebenen zwischen zwei Leitern — erweiterbar in jede Richtung.",
    beschreibung:
      "Zwei Stahlleitern, fünf Böden, kein Werkzeug. Die Böden hängen in gelaserten Aussparungen und tragen je vierzig Kilogramm. Jedes weitere Feld verlängert das System um 1200 Millimeter.",
    herkunft: "Böden aus Remscheid, Stahl aus Solingen",
    materialOptionen: ["eiche", "nussbaum"],
    konstruktion: [
      "Leitern Stahl RAL 9005, gelasert",
      "Böden 25 mm, je 40 kg Traglast",
      "Erweiterbar, Raster 1200 mm",
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function formatEuro(value: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatMasse(m: Product["masse"]): string {
  return `${m.b} × ${m.h} × ${m.t} mm`;
}

// Versand: Speditionslieferung, frei ab Schwellenwert
export const SPEDITION_KOSTEN = 120;
export const FREI_AB = 2500;
