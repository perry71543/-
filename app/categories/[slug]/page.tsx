import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { categories, getCategoryBySlug } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {};
  }

  return {
    title: category.name,
    description: category.description
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(category.slug);

  return (
    <>
      <section className="border-b border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018))]">
        <div className="mx-auto w-full max-w-7xl px-5 py-14 md:py-20">
          <Link
            href="/categories"
            className="text-sm font-bold text-mist/60 transition hover:text-white"
          >
            返回分類
          </Link>
          <div className="mt-8 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-mist/48">
                Category
              </p>
              <h1 className="text-5xl font-black leading-tight text-white md:text-7xl">
                {category.name}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-mist/68">{category.description}</p>
              <div className="mt-8 grid max-w-lg grid-cols-2 border-y border-white/12">
                <div className="py-4 pr-4">
                  <p className="text-3xl font-black text-white">{category.subcategories.length}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-mist/45">
                    Series
                  </p>
                </div>
                <div className="border-l border-white/10 py-4 pl-4">
                  <p className="text-3xl font-black text-white">{products.length}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-mist/45">
                    Products
                  </p>
                </div>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {category.subcategories.map((subcategory) => (
                <div
                  key={subcategory.slug}
                  className="rounded-lg border border-white/10 bg-carbon/46 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                >
                  <p className="text-base font-black text-white">{subcategory.name}</p>
                  <p className="mt-2 text-xs leading-6 text-mist/52">
                    {subcategory.keywords.slice(0, 4).join(" / ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-14 md:py-20">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-mist/52">目前展示</p>
            <h2 className="mt-2 text-3xl font-black text-white">{products.length} 件商品</h2>
          </div>
          <Link
            href="/products"
            className="w-fit rounded-md border border-white/18 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/10"
          >
            全部商品
          </Link>
        </div>

        {products.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.045] p-8 text-mist/64">
            此分類目前尚未放入展示商品。
          </div>
        )}
      </section>
    </>
  );
}
