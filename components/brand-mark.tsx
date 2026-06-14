type BrandMarkProps = {
  compact?: boolean;
};

export function BrandMark({ compact = false }: BrandMarkProps) {
  return (
    <span className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className="relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-md border border-white/22 bg-[linear-gradient(135deg,#f9fafb_0%,#aeb6c0_42%,#f5f7f9_58%,#25282c_100%)] text-sm font-black text-carbon shadow-[0_10px_32px_rgba(217,221,226,0.18)]"
      >
        <span className="absolute inset-px rounded-[5px] border border-black/20" />
        W
      </span>
      {!compact ? (
        <span className="min-w-0 leading-tight">
          <span className="block text-[15px] font-black text-white">霧銀工藝</span>
          <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-mist/55 max-[420px]:hidden">
            Detailing Atelier
          </span>
        </span>
      ) : null}
    </span>
  );
}
