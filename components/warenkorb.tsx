"use client";

import { useEffect, useRef } from "react";
import { useCart, linePreis } from "@/lib/cart";
import { FREI_AB, MATERIALS, formatEuro, getProduct } from "@/lib/products";
import { Zeichnung } from "@/components/zeichnung";

export function Warenkorb() {
  const cart = useCart();
  const panelRef = useRef<HTMLDivElement>(null);

  // ESC schließt, Fokus wandert in die Lade
  useEffect(() => {
    if (!cart.offen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") cart.setOffen(false);
    };
    window.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLElement>("button")?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [cart, cart.offen]);

  return (
    <>
      <div
        className="lade-schleier"
        data-offen={cart.offen}
        onClick={() => cart.setOffen(false)}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        className="lade"
        data-offen={cart.offen}
        role="dialog"
        aria-modal="true"
        aria-label="Warenkorb"
        inert={!cart.offen}
      >
        <div className="flex items-center justify-between border-b border-(--linie-stark) px-6 py-4">
          <h2 className="t-display text-lg">Warenkorb</h2>
          <button
            type="button"
            onClick={() => cart.setOffen(false)}
            className="t-mass cursor-pointer px-2 py-1 transition-colors hover:text-(--enzian)"
          >
            Schließen [ESC]
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6">
          {cart.lines.length === 0 ? (
            <p className="py-10 text-sm text-(--graphit)">
              Noch nichts eingeplant. Die Kollektion hat sechs Möbel — eines
              davon passt in Ihren Grundriss.
            </p>
          ) : (
            <ul className="divide-y divide-(--linie)">
              {cart.lines.map((line) => {
                const p = getProduct(line.slug)!;
                const mat = MATERIALS[line.material];
                return (
                  <li
                    key={`${line.slug}-${line.material}`}
                    className="flex items-end gap-4 py-5"
                    data-material={line.material}
                  >
                    <div className="flex w-24 shrink-0 justify-center" style={{ "--mm": "0.028px" } as React.CSSProperties}>
                      <Zeichnung product={p} ansicht="front" className="lade-mini" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="p-name text-sm">{p.name}</p>
                      <p className="text-xs text-(--graphit)">
                        {p.typ} · {mat.name}
                      </p>
                      <div className="mt-2 flex items-center gap-3">
                        <div className="flex items-center border border-(--linie-stark)">
                          <button
                            type="button"
                            aria-label={`${p.name}: ein Stück weniger`}
                            className="t-mass cursor-pointer px-2.5 py-1 hover:text-(--enzian)"
                            onClick={() => cart.setMenge(line.slug, line.material, line.menge - 1)}
                          >
                            −
                          </button>
                          <span className="t-mass px-2" aria-live="polite">
                            {line.menge}
                          </span>
                          <button
                            type="button"
                            aria-label={`${p.name}: ein Stück mehr`}
                            className="t-mass cursor-pointer px-2.5 py-1 hover:text-(--enzian)"
                            onClick={() => cart.setMenge(line.slug, line.material, line.menge + 1)}
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          className="t-mass cursor-pointer text-xs text-(--graphit) underline-offset-2 hover:text-(--enzian) hover:underline"
                          onClick={() => cart.remove(line.slug, line.material)}
                        >
                          Entfernen
                        </button>
                      </div>
                    </div>
                    <p className="t-mass shrink-0">{formatEuro(linePreis(line))}</p>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="border-t border-(--linie-stark) px-6 py-5">
          <dl className="t-mass space-y-1.5">
            <div className="flex justify-between">
              <dt>Zwischensumme</dt>
              <dd>{formatEuro(cart.zwischensumme)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Speditionslieferung</dt>
              <dd>{cart.spedition === 0 ? "frei Haus" : formatEuro(cart.spedition)}</dd>
            </div>
            {cart.zwischensumme > 0 && cart.zwischensumme < FREI_AB && (
              <p className="pt-1 text-xs text-(--graphit)">
                Frei Haus ab {formatEuro(FREI_AB)} — es fehlen{" "}
                {formatEuro(FREI_AB - cart.zwischensumme)}.
              </p>
            )}
            <div className="flex justify-between border-t border-(--linie) pt-2 text-sm font-medium">
              <dt>Gesamt inkl. MwSt.</dt>
              <dd>{formatEuro(cart.summe)}</dd>
            </div>
          </dl>
          <button
            type="button"
            className="knopf mt-4 w-full disabled:cursor-not-allowed disabled:opacity-40"
            disabled={cart.lines.length === 0}
            onClick={() =>
              window.alert(
                "Konzeptstudie — hier würde die Kasse beginnen. Zahlarten: Rechnung, SEPA, Karte.",
              )
            }
          >
            Zur Kasse
          </button>
          <p className="t-mass mt-3 text-center text-xs text-(--graphit)">
            Lieferung durch zwei Personen bis zum Aufstellort.
          </p>
        </div>
      </div>
    </>
  );
}
