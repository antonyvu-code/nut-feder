"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  FREI_AB,
  MATERIALS,
  type MaterialId,
  SPEDITION_KOSTEN,
  getProduct,
} from "@/lib/products";

export interface CartLine {
  slug: string;
  material: MaterialId;
  menge: number;
}

interface CartApi {
  lines: CartLine[];
  offen: boolean;
  setOffen: (v: boolean) => void;
  add: (slug: string, material: MaterialId) => void;
  setMenge: (slug: string, material: MaterialId, menge: number) => void;
  remove: (slug: string, material: MaterialId) => void;
  zwischensumme: number;
  spedition: number;
  summe: number;
  anzahl: number;
}

const CartContext = createContext<CartApi | null>(null);

const STORAGE_KEY = "nut-feder-warenkorb";

export function linePreis(line: CartLine): number {
  const p = getProduct(line.slug);
  if (!p) return 0;
  return (p.grundpreis + MATERIALS[line.material].aufpreis) * line.menge;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [offen, setOffen] = useState(false);
  const [geladen, setGeladen] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: CartLine[] = JSON.parse(raw);
        setLines(parsed.filter((l) => getProduct(l.slug) && MATERIALS[l.material]));
      }
    } catch {
      /* defekter Storage: leer starten */
    }
    setGeladen(true);
  }, []);

  useEffect(() => {
    if (!geladen) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, geladen]);

  const add = useCallback((slug: string, material: MaterialId) => {
    setLines((prev) => {
      const i = prev.findIndex((l) => l.slug === slug && l.material === material);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], menge: next[i].menge + 1 };
        return next;
      }
      return [...prev, { slug, material, menge: 1 }];
    });
    setOffen(true);
  }, []);

  const setMenge = useCallback((slug: string, material: MaterialId, menge: number) => {
    setLines((prev) =>
      menge <= 0
        ? prev.filter((l) => !(l.slug === slug && l.material === material))
        : prev.map((l) =>
            l.slug === slug && l.material === material ? { ...l, menge } : l,
          ),
    );
  }, []);

  const remove = useCallback((slug: string, material: MaterialId) => {
    setLines((prev) => prev.filter((l) => !(l.slug === slug && l.material === material)));
  }, []);

  const api = useMemo<CartApi>(() => {
    const zwischensumme = lines.reduce((s, l) => s + linePreis(l), 0);
    const spedition = zwischensumme === 0 || zwischensumme >= FREI_AB ? 0 : SPEDITION_KOSTEN;
    return {
      lines,
      offen,
      setOffen,
      add,
      setMenge,
      remove,
      zwischensumme,
      spedition,
      summe: zwischensumme + spedition,
      anzahl: lines.reduce((s, l) => s + l.menge, 0),
    };
  }, [lines, offen, add, setMenge, remove]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart(): CartApi {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart außerhalb des CartProviders");
  return ctx;
}
