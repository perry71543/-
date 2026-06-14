import Link from "next/link";
import type { Product } from "@/data/products";
import { getProductCategory } from "@/data/products";
import { formatPrice } from "@/lib/format";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const { category, subcategory } = getProductCategory(product);

  return (
    <article className="group overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.032))] shadow-[0_18px_52px_rgba(0,0,0,0.28)] transition duration-300 hover:-translate-y-1 hover:border-mist/50 hover:shadow-[0_28px_80px_rgba(217,221,226,0.12)] focus-within:-translate-y-1 focus-within:border-mist/50">
      <Link href={`/products/${product.slug}`} className="block outline-none">
        <div className="relative aspect-[4/3] overflow-hidden bg-graphite">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.18),transparent_38%,rgba(0,0,0,0.32)_100%)] opacity-70 transition group-hover:opacity-95" />
          {product.badge ? (
            <span className="absolute left-4 top-4 rounded-md border border-white/18 bg-carbon/72 px-3 py-1.5 text-xs font-black text-white backdrop-blur">
              {product.badge}
            </span>
          ) : null}
        </div>
        <div className="p-5">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-white px-2.5 py-1 text-xs font-black text-carbon shadow-[0_8px_20px_rgba(255,255,255,0.12)]">
              {category.name}
            </span>
            <span className="text-xs font-semibold text-mist/52">{subcategory.name}</span>
          </div>
          <h3 className="min-h-14 text-xl font-black leading-7 text-white">{product.name}</h3>
          <p className="mt-3 min-h-16 text-sm leading-7 text-mist/64">{product.description}</p>
          <div className="mt-5 h-px bg-white/10" />
          <div className="mt-5 flex items-center justify-between gap-4">
            <p className="text-lg font-black text-white">{formatPrice(product.price)}</p>
            <span className="rounded-md border border-white/12 px-3 py-2 text-sm font-bold text-mist transition group-hover:border-white/35 group-hover:bg-white group-hover:text-carbon">
              查看詳情 →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
