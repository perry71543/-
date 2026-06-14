import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[68vh] w-full max-w-6xl flex-col items-start justify-center px-5 py-24">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-mist/60">404</p>
      <h1 className="max-w-2xl text-4xl font-black leading-tight text-white md:text-6xl">
        找不到這個展示頁面
      </h1>
      <p className="mt-5 max-w-xl text-base leading-8 text-mist/72">
        這個商品或分類可能尚未建立，先回到全部商品查看目前可瀏覽的精選項目。
      </p>
      <Link
        href="/products"
        className="mt-8 rounded-md border border-white/18 bg-white px-5 py-3 text-sm font-bold text-carbon transition hover:bg-mist"
      >
        瀏覽全部商品
      </Link>
    </section>
  );
}
