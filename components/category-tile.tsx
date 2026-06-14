import Link from "next/link";
import type { Category } from "@/data/categories";

type CategoryTileProps = {
  category: Category;
  productCount?: number;
  index?: number;
};

export function CategoryTile({ category, productCount, index }: CategoryTileProps) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group relative flex min-h-64 overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.032))] p-5 transition duration-300 hover:-translate-y-1 hover:border-mist/45 hover:bg-white/[0.075] hover:shadow-[0_26px_72px_rgba(217,221,226,0.10)]"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(244,246,248,0.72),transparent)] opacity-0 transition group-hover:opacity-100" />
      <div className="flex w-full flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-4">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-mist/45">
              {String((index ?? 0) + 1).padStart(2, "0")}
            </p>
            <span className="rounded-md border border-white/10 px-2.5 py-1 text-xs font-bold text-mist/58">
              {category.subcategories.length} series
            </span>
          </div>
          <h3 className="mt-7 text-2xl font-black text-white">{category.name}</h3>
          <p className="mt-3 text-sm leading-7 text-mist/62">{category.description}</p>
          {typeof productCount === "number" ? (
            <p className="mt-5 text-sm font-bold text-white">{productCount} 件展示商品</p>
          ) : null}
        </div>
        <div className="mt-7 flex flex-wrap gap-2">
          {category.subcategories.slice(0, 4).map((subcategory) => (
            <span
              key={subcategory.slug}
              className="rounded-md border border-white/10 bg-black/16 px-2.5 py-1 text-xs font-semibold text-mist/65"
            >
              {subcategory.name}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
