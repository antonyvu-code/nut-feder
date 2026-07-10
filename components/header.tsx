"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";

export function Header() {
  const { anzahl, setOffen } = useCart();
  return (
    <header className="sticky top-0 z-40 border-b border-(--linie-stark) bg-(--halle)/92 backdrop-blur-sm">
      <div className="mx-auto flex max-w-450 items-center justify-between gap-6 px-6 py-4 md:px-12">
        <Link href="/" className="t-display text-lg tracking-tight no-underline">
          Nut&nbsp;&amp;&nbsp;Feder
        </Link>
        <nav aria-label="Hauptnavigation" className="hidden items-center gap-8 md:flex">
          <Link href="/#kollektion" className="t-label transition-colors hover:text-(--enzian)">
            Kollektion
          </Link>
          <Link href="/#manufaktur" className="t-label transition-colors hover:text-(--enzian)">
            Manufaktur
          </Link>
          <Link href="/#werkstoffe" className="t-label transition-colors hover:text-(--enzian)">
            Werkstoffe
          </Link>
        </nav>
        <button
          type="button"
          onClick={() => setOffen(true)}
          className="t-mass cursor-pointer border border-(--linie-stark) px-4 py-2 transition-colors hover:border-(--enzian) hover:text-(--enzian)"
        >
          Warenkorb [{anzahl}]
        </button>
      </div>
    </header>
  );
}
