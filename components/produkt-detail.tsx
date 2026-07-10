"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import {
  MATERIALS,
  type MaterialId,
  type Product,
  formatEuro,
} from "@/lib/products";
import { Zeichnung } from "@/components/zeichnung";

export function ProduktDetail({ product }: { product: Product }) {
  const [material, setMaterial] = useState<MaterialId>(product.materialOptionen[0]);
  const { add } = useCart();
  const preis = product.grundpreis + MATERIALS[material].aufpreis;
  const { b, h, t } = product.masse;

  // Zeichnung soll die Spalte füllen, aber nie größer als 0.3 px/mm werden
  const mmFront = `min(0.3px, calc((100vw - 3rem) / ${b + 380}), calc(56rem / ${b + 380}))`;

  return (
    <div data-material={material}>
      <div className="mx-auto max-w-450 px-6 pt-10 pb-24 md:px-12">
        <nav aria-label="Pfad" className="t-mass text-(--graphit)">
          <Link href="/#kollektion" className="hover:text-(--enzian)">
            Kollektion
          </Link>
          {" / "}
          {product.ref} {product.name}
        </nav>

        <div className="mt-10 grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          {/* Zeichnungen */}
          <div className="min-w-0">
            <figure
              className="flex flex-col items-center"
              style={{ "--mm": mmFront } as React.CSSProperties}
            >
              <Zeichnung product={product} ansicht="front" bemasst />
              <figcaption className="t-mass mt-3 text-(--graphit)">
                Vorderansicht · {b} × {h} mm
              </figcaption>
            </figure>
            <figure
              className="mt-16 flex flex-col items-center"
              style={{ "--mm": mmFront } as React.CSSProperties}
            >
              <Zeichnung product={product} ansicht="seite" bemasst />
              <figcaption className="t-mass mt-3 text-(--graphit)">
                Seitenansicht · {t} × {h} mm · Schnittflächen schraffiert
              </figcaption>
            </figure>
          </div>

          {/* Kaufen */}
          <div>
            <div className="lg:sticky lg:top-24">
              <p className="t-mass text-(--graphit)">{product.ref}</p>
              <h1 className="t-display mt-2 text-[clamp(2.2rem,4vw,3.4rem)]">
                {product.name}
              </h1>
              <p className="t-label mt-2">{product.typ}</p>
              <p className="mt-5 text-(--graphit)">{product.beschreibung}</p>

              <fieldset className="mt-8">
                <legend className="t-label">Ausführung</legend>
                <div className="mt-3 flex flex-wrap gap-3">
                  {product.materialOptionen.map((id) => {
                    const m = MATERIALS[id];
                    return (
                      <label key={id} className="flex cursor-pointer flex-col items-center gap-1.5">
                        <input
                          type="radio"
                          name="material"
                          value={id}
                          checked={material === id}
                          onChange={() => setMaterial(id)}
                          className="swatch-radio"
                          style={{ background: m.swatch }}
                          aria-label={m.name}
                        />
                        <span
                          className={`t-mass text-xs ${
                            material === id ? "text-(--ink)" : "text-(--graphit)"
                          }`}
                        >
                          {m.name.split(",")[0]}
                        </span>
                      </label>
                    );
                  })}
                </div>
                <p className="mt-2 text-xs text-(--graphit)">
                  {MATERIALS[material].detail}
                  {MATERIALS[material].aufpreis > 0 &&
                    ` · + ${formatEuro(MATERIALS[material].aufpreis)}`}
                </p>
              </fieldset>

              <div className="mt-8 flex items-end justify-between border-t border-(--linie-stark) pt-5">
                <div>
                  <p className="t-label">Preis inkl. MwSt.</p>
                  <p className="t-preis mt-1" aria-live="polite">
                    {formatEuro(preis)}
                  </p>
                </div>
                <p className="t-mass text-(--graphit)">
                  Lieferzeit {product.lieferwochen} Wochen
                </p>
              </div>

              <button
                type="button"
                className="knopf mt-5 w-full"
                onClick={() => add(product.slug, material)}
              >
                In den Warenkorb — {formatEuro(preis)}
              </button>
              <p className="t-mass mt-3 text-xs text-(--graphit)">
                Speditionslieferung frei Haus ab 2.500 € · 40 Jahre Ersatzteilzusage
              </p>

              <h2 className="t-label mt-10">Konstruktion</h2>
              <ul className="mt-3">
                {product.konstruktion.map((k) => (
                  <li
                    key={k}
                    className="hairline-b flex gap-3 py-2.5 text-sm first:border-t first:border-t-(--linie)"
                  >
                    <span aria-hidden="true" className="t-mass text-(--enzian)">
                      —
                    </span>
                    {k}
                  </li>
                ))}
              </ul>

              <h2 className="t-label mt-10">Datenblatt</h2>
              <dl className="t-mass mt-3">
                {(
                  [
                    ["Breite", `${b} mm`],
                    ["Höhe", `${h} mm`],
                    ["Tiefe", `${t} mm`],
                    ["Gewicht", `${product.gewichtKg} kg`.replace(".", ",")],
                    ["Herkunft", product.herkunft],
                  ] as const
                ).map(([k, v]) => (
                  <div
                    key={k}
                    className="hairline-b flex justify-between gap-4 py-2.5 first:border-t first:border-t-(--linie)"
                  >
                    <dt className="text-(--graphit)">{k}</dt>
                    <dd className="text-right">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
