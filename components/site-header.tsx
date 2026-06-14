import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";

const navItems = [
  { href: "/", label: "首頁" },
  { href: "/products", label: "商品" },
  { href: "/categories", label: "分類" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-carbon/82 backdrop-blur-2xl">
      <div className="surface-line h-px opacity-70" />
      <div className="mx-auto flex min-h-20 w-full max-w-7xl items-center justify-between gap-3 px-3 py-3 sm:gap-4 sm:px-5">
        <Link href="/" className="min-w-0">
          <BrandMark />
        </Link>
        <nav className="flex shrink-0 items-center gap-1 rounded-md border border-white/10 bg-white/[0.045] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-[5px] px-2 py-2 text-xs font-bold text-mist/68 transition hover:bg-white hover:text-carbon sm:px-3.5 sm:text-sm"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
