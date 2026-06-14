import { CategoryTile } from "@/components/category-tile";
import { SectionHeading } from "@/components/section-heading";
import { categories } from "@/data/categories";
import { getProductsByCategory, products } from "@/data/products";

export const metadata = {
  title: "商品分類",
  description: "依照 config/category_rules.yaml 管理的洗車用品分類。"
};

export default function CategoriesPage() {
  return (
    <>
      <section className="border-b border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018))]">
        <div className="mx-auto w-full max-w-7xl px-5 py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <SectionHeading
              eyebrow="Categories"
              title="商品分類"
              description="所有主分類與子分類都依照分類規則檔呈現，避免在頁面中自行新增分類。"
            />
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-white/10 bg-carbon/42 p-5">
                <p className="text-3xl font-black text-white">{categories.length}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-mist/45">
                  Main groups
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-carbon/42 p-5">
                <p className="text-3xl font-black text-white">
                  {categories.reduce((total, category) => total + category.subcategories.length, 0)}
                </p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-mist/45">
                  Series
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-carbon/42 p-5">
                <p className="text-3xl font-black text-white">
                  {products.length}
                </p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-mist/45">
                  Products
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto w-full max-w-7xl px-5 py-14 md:py-20">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category, index) => (
            <CategoryTile
              key={category.slug}
              category={category}
              index={index}
              productCount={getProductsByCategory(category.slug).length}
            />
          ))}
        </div>
      </section>
    </>
  );
}
