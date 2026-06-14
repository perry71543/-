import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { categories } from "@/data/categories";
import { products } from "@/data/products";

export const metadata = {
  title: "全部商品",
  description: "質感洗車用品商品列表。"
};

export default function ProductsPage() {
  return (
    <>
      <section className="border-b border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018))]">
        <div className="mx-auto w-full max-w-7xl px-5 py-16 md:py-24">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Products"
              title="全部商品"
              description="先以 mock data 建立商品展示，分類欄位會驗證是否存在於分類規則檔。"
            />
            <div className="flex flex-wrap gap-2">
              {categories
                .filter((category) => category.slug !== "others")
                .map((category) => (
                  <Link
                    key={category.slug}
                    href={`/categories/${category.slug}`}
                    className="rounded-md border border-white/12 bg-carbon/42 px-3 py-2 text-sm font-semibold text-mist/70 transition hover:border-white/35 hover:bg-white hover:text-carbon"
                  >
                    {category.name}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto w-full max-w-7xl px-5 py-14 md:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
