import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS, formatMasse, getProduct } from "@/lib/products";
import { ProduktDetail } from "@/components/produkt-detail";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: `${p.name} — ${p.typ} | Nut & Feder`,
    description: `${p.kurz} ${formatMasse(p.masse)}, ab ${p.grundpreis} €.`,
  };
}

export default async function ProduktSeite({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <>
      <ProduktDetail product={product} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: `${product.name} — ${product.typ}`,
            sku: product.ref,
            description: product.kurz,
            brand: { "@type": "Brand", name: "Nut & Feder" },
            offers: {
              "@type": "Offer",
              price: product.grundpreis,
              priceCurrency: "EUR",
              availability: "https://schema.org/MadeToOrder",
            },
          }),
        }}
      />
    </>
  );
}
