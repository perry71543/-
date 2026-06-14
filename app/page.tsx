import Link from "next/link";
import { CategoryTile } from "@/components/category-tile";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { categories, getFeaturedCategories } from "@/data/categories";
import { getFeaturedProducts, products } from "@/data/products";

export default function HomePage() {
  const featuredCategories = getFeaturedCategories();
  const featuredProducts = getFeaturedProducts();
  const curatedCategories = categories.filter((category) => category.slug !== "others");
  const seriesCount = categories.reduce((total, category) => total + category.subcategories.length, 0);
  const heroStats = [
    { label: "主分類", value: String(curatedCategories.length) },
    { label: "商品品項", value: String(products.length) },
    { label: "細分類", value: String(seriesCount) }
  ];
  const trustItems = [
    { label: "分類來源", value: "Rules" },
    { label: "上架品項", value: String(products.length) },
    { label: "購買諮詢", value: "Direct" }
  ];

  return (
    <>
      <section className="relative min-h-[calc(88svh-5rem)] overflow-hidden border-b border-white/10">
        <div
          className="absolute inset-0 bg-cover bg-[position:62%_center] md:bg-center"
          style={{ backgroundImage: "url('/products/hero-detailing.png')" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,0.98),rgba(5,5,5,0.86)_34%,rgba(5,5,5,0.42)_66%,rgba(5,5,5,0.18))]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(0deg,#050505,rgba(5,5,5,0))]" />
        <div className="relative mx-auto flex min-h-[calc(88svh-5rem)] w-full max-w-7xl items-center px-5 py-14">
          <div className="max-w-[680px]">
            <div className="mb-6 flex flex-wrap items-center gap-3 text-xs font-black uppercase tracking-[0.24em] text-mist/58">
              <span>Premium car care supplies</span>
              <span className="h-px w-10 bg-mist/45" />
              <span>Since Studio Selection</span>
            </div>
            <h1 className="text-4xl font-black leading-[1.1] text-white sm:text-5xl lg:text-7xl">
              霧銀質感洗車用品，讓每道工序更俐落。
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-mist/76 sm:text-lg sm:leading-9">
              從去污、洗車、護理到拋光工具，依照既有商品分類整理，快速找到適合漆面、內裝與施工流程的用品。
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="rounded-md bg-white px-5 py-3 text-sm font-black text-carbon shadow-[0_18px_48px_rgba(255,255,255,0.14)] transition hover:bg-mist"
              >
                瀏覽全部商品
              </Link>
              <Link
                href="/categories"
                className="rounded-md border border-white/20 px-5 py-3 text-sm font-black text-white transition hover:border-white/45 hover:bg-white/10"
              >
                查看分類
              </Link>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 border-y border-white/12">
              {heroStats.map((item) => (
                <div key={item.label} className="py-4 pr-3">
                  <p className="text-2xl font-black text-white">{item.value}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-mist/45">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-16 md:py-20">
        <SectionHeading
          eyebrow="Categories"
          title="五大商品分類"
          description="分類名稱與子分類皆來自 config/category_rules.yaml，不額外新增未確認分類。"
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {featuredCategories.map((category, index) => (
            <CategoryTile key={category.slug} category={category} index={index} />
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))]">
        <div className="mx-auto w-full max-w-7xl px-5 py-20">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Products"
              title="已上架商品"
              description={`目前已依既有分類整理 ${products.length} 件商品，商品頁可查看照片、分類與購買諮詢入口。`}
            />
            <Link
              href="/products"
              className="w-fit rounded-md border border-white/18 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              全部商品
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-20">
        <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-center">
          <SectionHeading
            eyebrow="Trust"
            title="依流程挑品，買前先確認需求。"
            description="商品頁保留特色、使用方式與適用情境，導購按鈕直接連到蝦皮搜尋與LINE詢問，不加入購物車與金流。"
          />
          <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1">
            {trustItems.map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-white/10 bg-white/[0.045] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
              >
                <p className="text-sm font-semibold text-mist/58">{item.label}</p>
                <p className="mt-2 text-2xl font-black text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
