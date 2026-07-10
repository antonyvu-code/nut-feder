import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impressum | Nut & Feder",
  description: "Anbieterkennzeichnung der Konzeptstudie Nut & Feder.",
};

export default function Impressum() {
  return (
    <div className="mx-auto max-w-2xl px-6 pt-16 pb-24 md:px-0">
      <h1 className="t-display text-4xl">Impressum</h1>
      <p className="t-mass mt-3 text-(--graphit)">Angaben gemäß § 5 DDG</p>
      <div className="mt-8 space-y-4 text-(--graphit)">
        <p>
          Nut &amp; Feder Möbelwerkstätten GmbH (fiktiv)
          <br />
          An der Feldbank 12
          <br />
          42855 Remscheid
        </p>
        <p>
          Diese Website ist eine Design-Konzeptstudie. Das Unternehmen, die
          Produkte und alle Angaben sind erfunden; es besteht kein
          Warenangebot. Es werden keine personenbezogenen Daten erhoben,
          der Warenkorb wird ausschließlich lokal im Browser gespeichert.
        </p>
      </div>
      <Link href="/" className="knopf knopf-leise mt-10">
        Zurück zur Kollektion
      </Link>
    </div>
  );
}
