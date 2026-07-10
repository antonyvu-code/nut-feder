import Link from "next/link";
import { MATERIALS, PRODUCTS, formatEuro, formatMasse, getProduct } from "@/lib/products";
import { Zeichnung } from "@/components/zeichnung";

const SCHRITTE = [
  ["Zuschnitt", "Massivholz, luftgetrocknet und erst dann technisch getrocknet."],
  ["Verbindung", "Zinken, Zapfen, Nut und Feder — Beschläge nur, wo Stahl besser ist."],
  ["Verleimung", "Zwölf Stunden unter Druck. Leim braucht Zeit, wir geben sie ihm."],
  ["Oberfläche", "Zweimal geölt, von Hand zwischengeschliffen."],
  ["Prüfung", "Jedes Möbel wird vermessen. Toleranz: ein Millimeter."],
] as const;

export default function Home() {
  const dessau = getProduct("sofa-dessau")!;
  return (
    <>
      {/* ============ Hero ============ */}
      <section className="mx-auto max-w-450 px-6 pt-16 pb-10 md:px-12 md:pt-24">
        <p className="t-label">Möbelmanufaktur · Remscheid · seit 1962</p>
        <h1 className="t-display mt-5 max-w-5xl text-[clamp(1.9rem,8.5vw,6rem)]">
          Sechs Möbel.
          <br />
          Drei Werkstoffe.
          <br />
          <span className="text-(--enzian)">Ein Maßstab.</span>
        </h1>
        <div className="mt-8 flex max-w-xl flex-col gap-6">
          <p className="text-lg text-(--graphit)">
            Wir bauen Sofa, Sessel, Hocker, Tisch, Sideboard und Regal. Mehr
            nicht — dafür richtig. Und weil wir Zeichnungen ernster nehmen als
            Werbefotos: Alles auf dieser Seite ist untereinander
            maßstabsgetreu. Was klein aussieht, ist es auch.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/#kollektion" className="knopf">
              Zur Kollektion
            </Link>
            <Link href="/#preisliste" className="knopf knopf-leise">
              Preisliste
            </Link>
          </div>
        </div>

        <figure
          className="mt-14 flex flex-col items-center"
          style={{ "--mm": "min(0.3px, calc((100vw - 3rem) / 2660))" } as React.CSSProperties}
        >
          <Zeichnung product={dessau} ansicht="front" bemasst />
          <figcaption className="t-mass mt-4 text-(--graphit)">
            NF 01 DESSAU · Vorderansicht · Alle Maße in mm
          </figcaption>
        </figure>
      </section>

      {/* ============ Kollektion: Wandabwicklung ============ */}
      <section id="kollektion" aria-labelledby="kollektion-h" className="scroll-mt-24 pt-14">
        <div className="mx-auto flex max-w-450 flex-wrap items-end justify-between gap-4 px-6 md:px-12">
          <h2 id="kollektion-h" className="t-display text-[clamp(1.8rem,3.5vw,3rem)]">
            Die Kollektion
          </h2>
          <p className="t-mass text-(--graphit)">
            Untereinander maßstabsgetreu — der Hocker ist wirklich so klein.
          </p>
        </div>
        <div className="wand mt-4">
          <div className="wand-innen">
            {PRODUCTS.map((p) => (
              <Link key={p.slug} href={`/produkte/${p.slug}`} className="produkt">
                <Zeichnung product={p} ansicht="front" />
                <span className="p-label">
                  <span className="p-name">{p.name}</span>
                  <span className="text-xs text-(--graphit)">{p.typ}</span>
                  <span className="t-mass">ab {formatEuro(p.grundpreis)}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
        <div className="bandmass" aria-hidden="true" />
        <div className="mx-auto flex max-w-450 justify-between gap-4 px-6 pt-2 md:px-12">
          <p className="t-mass text-(--graphit)">Teilstrich = 500 mm</p>
          <p className="t-mass text-(--graphit)">6 Möbel auf 8.680 mm — schieben →</p>
        </div>
      </section>

      {/* ============ Preisliste ============ */}
      <section
        id="preisliste"
        aria-labelledby="preisliste-h"
        className="mx-auto max-w-450 scroll-mt-24 px-6 pt-20 md:px-12"
      >
        <h2 id="preisliste-h" className="t-label">
          Preisliste 01/2026
        </h2>
        <table className="mt-4 w-full border-t border-(--linie-stark) text-left">
          <thead>
            <tr className="t-label">
              <th className="hairline-b py-3 pr-4 font-medium">Ref.</th>
              <th className="hairline-b py-3 pr-4 font-medium">Produkt</th>
              <th className="hairline-b hidden py-3 pr-4 font-medium sm:table-cell">Typ</th>
              <th className="hairline-b hidden py-3 pr-4 font-medium md:table-cell">
                B × H × T
              </th>
              <th className="hairline-b hidden py-3 pr-4 font-medium md:table-cell">
                Lieferzeit
              </th>
              <th className="hairline-b py-3 text-right font-medium">Preis ab</th>
            </tr>
          </thead>
          <tbody>
            {PRODUCTS.map((p) => (
              <tr key={p.slug} className="group">
                <td className="t-mass hairline-b py-4 pr-4 text-(--graphit)">{p.ref}</td>
                <td className="hairline-b py-4 pr-4">
                  <Link
                    href={`/produkte/${p.slug}`}
                    className="p-name transition-colors group-hover:text-(--enzian)"
                  >
                    {p.name}
                  </Link>
                </td>
                <td className="hairline-b hidden py-4 pr-4 text-sm text-(--graphit) sm:table-cell">
                  {p.typ}
                </td>
                <td className="t-mass hairline-b hidden py-4 pr-4 md:table-cell">
                  {formatMasse(p.masse)}
                </td>
                <td className="t-mass hairline-b hidden py-4 pr-4 md:table-cell">
                  {p.lieferwochen} Wochen
                </td>
                <td className="t-mass hairline-b py-4 text-right">
                  {formatEuro(p.grundpreis)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="t-mass mt-3 text-(--graphit)">
          Alle Preise inkl. 19 % MwSt. Speditionslieferung 120 €, frei Haus ab 2.500 €.
        </p>
      </section>

      {/* ============ Manufaktur ============ */}
      <section
        id="manufaktur"
        aria-labelledby="manufaktur-h"
        className="mx-auto max-w-450 scroll-mt-24 px-6 pt-24 md:px-12"
      >
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr]">
          <div className="reveal">
            <h2 id="manufaktur-h" className="t-display text-[clamp(1.8rem,3.5vw,3rem)]">
              Die Manufaktur
            </h2>
            <p className="mt-6 max-w-md text-(--graphit)">
              Eine Halle in Remscheid, dreiundzwanzig Leute, ein Maschinenpark,
              der zur Hälfte älter ist als die Belegschaft. Wir entwerfen
              nicht jede Saison neu. Ein Möbel kommt ins Programm, wenn es
              zwanzig Jahre bleiben kann — und jedes Ersatzteil liefern wir
              vierzig Jahre lang nach.
            </p>
            <dl className="t-mass mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-(--linie-stark) pt-5">
              <div>
                <dt className="t-label">Gegründet</dt>
                <dd className="mt-1 text-xl">1962</dd>
              </div>
              <div>
                <dt className="t-label">Belegschaft</dt>
                <dd className="mt-1 text-xl">23</dd>
              </div>
              <div>
                <dt className="t-label">Fertigungstoleranz</dt>
                <dd className="mt-1 text-xl">± 1 mm</dd>
              </div>
              <div>
                <dt className="t-label">Ersatzteilzusage</dt>
                <dd className="mt-1 text-xl">40 Jahre</dd>
              </div>
            </dl>
          </div>
          <ol className="reveal">
            {SCHRITTE.map(([name, text], i) => (
              <li
                key={name}
                className="grid grid-cols-[3.5rem_1fr] gap-4 border-b border-(--linie) py-5 first:border-t first:border-t-(--linie-stark)"
              >
                <span className="t-mass text-(--enzian)">0{i + 1}</span>
                <div>
                  <h3 className="p-name text-sm">{name}</h3>
                  <p className="mt-1 text-sm text-(--graphit)">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ Werkstoffe ============ */}
      <section
        id="werkstoffe"
        aria-labelledby="werkstoffe-h"
        className="mx-auto max-w-450 scroll-mt-24 px-6 pt-24 pb-24 md:px-12"
      >
        <h2 id="werkstoffe-h" className="t-display text-[clamp(1.8rem,3.5vw,3rem)]">
          Drei Werkstoffe
        </h2>
        <p className="mt-4 max-w-xl text-(--graphit)">
          Holz, Wolle, Stahl — in sechs Ausführungen. Keine Furniere, keine
          Kunstfaser, kein Chrom.
        </p>
        <div className="raster reveal mt-10 grid-cols-2 md:grid-cols-3">
          {Object.values(MATERIALS).map((m) => (
            <div key={m.id} className="p-4 md:p-5">
              <div className="swatch" style={{ background: m.swatch }} />
              <h3 className="p-name mt-4 text-sm">{m.name}</h3>
              <p className="mt-1 text-xs text-(--graphit)">{m.detail}</p>
              <p className="t-mass mt-2 text-(--graphit)">
                {m.aufpreis === 0 ? "im Grundpreis" : `+ ${formatEuro(m.aufpreis)}`}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ Fußzeile als Schriftfeld ============ */}
      <footer className="border-t border-(--linie-stark)">
        <div className="mx-auto max-w-450 px-6 py-10 md:px-12">
          <div className="grid gap-px border border-(--linie-stark) bg-(--linie) sm:grid-cols-2 md:grid-cols-4">
            {[
              ["Projekt", "Kollektion 01"],
              ["Gezeichnet", "Nut & Feder, Remscheid"],
              ["Zeichnungsstand", "10.07.2026"],
              ["Blatt", "1 / 1 · Maße in mm"],
            ].map(([k, v]) => (
              <div key={k} className="bg-(--halle) px-4 py-3">
                <p className="t-label">{k}</p>
                <p className="t-mass mt-1">{v}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-(--graphit)">
              Nut &amp; Feder ist eine Konzeptstudie — Marke, Zahlen und
              Produkte sind fiktiv. Die Proportionen stimmen trotzdem.
            </p>
            <nav aria-label="Rechtliches" className="flex gap-6">
              <Link href="/impressum" className="t-label hover:text-(--enzian)">
                Impressum
              </Link>
              <a href="mailto:werkstatt@nutfeder.example" className="t-label hover:text-(--enzian)">
                Kontakt
              </a>
            </nav>
          </div>
        </div>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Nut & Feder Kollektion 01",
            itemListElement: PRODUCTS.map((p, i) => ({
              "@type": "Product",
              position: i + 1,
              name: `${p.name} — ${p.typ}`,
              sku: p.ref,
              offers: {
                "@type": "Offer",
                price: p.grundpreis,
                priceCurrency: "EUR",
              },
            })),
          }),
        }}
      />
    </>
  );
}
