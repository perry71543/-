import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { categories } from "@/data/categories";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[linear-gradient(180deg,#0b0c0d_0%,#050505_100%)]">
      <div className="surface-line h-px opacity-60" />
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.25fr_1fr_0.9fr]">
        <div className="max-w-lg">
          <BrandMark />
          <p className="mt-6 text-3xl font-black leading-tight text-white md:text-4xl">
            讓洗車用品像精品工具一樣，被清楚挑選。
          </p>
          <p className="mt-4 text-sm leading-7 text-mist/62">
            以清潔、保護、施工與工具四個角度，替車主挑選更穩定、更有質感的汽車美容用品。
          </p>
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-mist/45">Categories</p>
          <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3">
            {categories.slice(0, 5).map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="text-sm font-semibold text-mist/62 transition hover:text-white"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-mist/45">Concierge</p>
          <div className="mt-5 grid gap-3">
            <a
              href="https://shopee.tw/search?keyword=%E6%B4%97%E8%BB%8A%E7%94%A8%E5%93%81"
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-white/12 px-4 py-3 text-sm font-bold text-white transition hover:border-white/35 hover:bg-white/10"
            >
              前往蝦皮搜尋
            </a>
            <a
              href="https://line.me/R/ti/p/@carcare"
              target="_blank"
              rel="noreferrer"
              className="rounded-md bg-white px-4 py-3 text-sm font-black text-carbon transition hover:bg-mist"
            >
              LINE 詢問
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs font-semibold uppercase tracking-[0.18em] text-mist/38">
        Mist Silver Car Care Studio
      </div>
    </footer>
  );
}
