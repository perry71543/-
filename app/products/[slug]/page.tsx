import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { products, getProductBySlug, getProductCategory } from "@/data/products";
import { formatPrice } from "@/lib/format";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {};
  }

  return {
    title: product.name,
    description: product.description
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const { category, subcategory } = getProductCategory(product);

  return (
    <>
      <section className="border-b border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018))]">
        <div className="mx-auto w-full max-w-7xl px-5 py-14 md:py-20">
          <Link href="/products" className="text-sm font-bold text-mist/60 transition hover:text-white">
            返回商品列表
          </Link>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <div className="overflow-hidden rounded-lg border border-white/10 bg-graphite shadow-silver-glow">
              <img src={product.image} alt={product.name} className="aspect-[4/3] w-full object-cover" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/categories/${category.slug}`}
                  className="rounded-md bg-white px-2.5 py-1 text-xs font-black text-carbon"
                >
                  {category.name}
                </Link>
                <span className="rounded-md border border-white/12 px-2.5 py-1 text-xs font-bold text-mist/62">
                  {subcategory.name}
                </span>
              </div>
              <h1 className="mt-5 break-words text-4xl font-black leading-tight text-white md:text-6xl">
                {product.name}
              </h1>
              <p className="mt-5 text-base leading-8 text-mist/72 sm:text-lg sm:leading-9">
                {product.description}
              </p>
              <div className="mt-6 border-y border-white/12 py-5">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-mist/45">售價</p>
                <p className="mt-1 text-3xl font-black text-white">{formatPrice(product.price)}</p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={product.shopeeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md bg-shopee px-5 py-3 text-sm font-black text-white shadow-[0_18px_44px_rgba(238,77,45,0.16)] transition hover:bg-[#ff6246]"
                >
                  前往蝦皮購買
                </a>
                <a
                  href={product.lineUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md bg-line px-5 py-3 text-sm font-black text-carbon shadow-[0_18px_44px_rgba(6,199,85,0.12)] transition hover:bg-[#21dd69]"
                >
                  LINE 詢問
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-14 md:py-20">
        <div className="grid gap-5 md:grid-cols-3">
          <DetailBlock title="商品特色" items={product.features} />
          <DetailBlock title="使用方式" items={product.usage} />
          <DetailBlock title="適用情境" items={product.scenarios} />
        </div>
      </section>
    </>
  );
}

function DetailBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.045] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
      <h2 className="text-xl font-black text-white">{title}</h2>
      <ul className="mt-5 grid gap-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-7 text-mist/68">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-mist/75" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
