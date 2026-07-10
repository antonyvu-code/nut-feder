import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { CartProvider } from "@/lib/cart";
import { Header } from "@/components/header";
import { Warenkorb } from "@/components/warenkorb";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--archivo",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nut & Feder — Deutsche Möbelmanufaktur",
  description:
    "Sechs Möbel aus Remscheid. Massivholz, Stahl, Wolle — gezeichnet, gebaut und maßstabsgetreu gezeigt. Konzeptstudie.",
  openGraph: {
    title: "Nut & Feder — Deutsche Möbelmanufaktur",
    description:
      "Sechs Möbel aus Remscheid, untereinander maßstabsgetreu gezeichnet.",
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${archivo.variable} ${plexMono.variable}`}>
      <body>
        <CartProvider>
          <a href="#inhalt" className="skip t-mass">
            Zum Inhalt springen
          </a>
          <Header />
          <main id="inhalt">{children}</main>
          <Warenkorb />
        </CartProvider>
      </body>
    </html>
  );
}
