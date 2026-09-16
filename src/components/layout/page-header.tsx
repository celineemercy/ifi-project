export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header>
      <p className="text-brand-green text-sm font-semibold tracking-[0.14em] uppercase">
        {eyebrow}
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h1>
      <p className="text-muted-foreground mt-3 max-w-3xl text-base leading-7">
        {description}
      </p>
    </header>
  );
}
