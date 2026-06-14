type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-mist/48">{eyebrow}</p>
      ) : null}
      <h2 className="text-3xl font-black leading-tight text-white md:text-5xl">{title}</h2>
      {description ? <p className="mt-4 max-w-2xl text-base leading-8 text-mist/66">{description}</p> : null}
    </div>
  );
}
