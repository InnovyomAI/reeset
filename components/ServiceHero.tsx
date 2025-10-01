import Link from "next/link";
import { FadeIn } from "@/components/Effects";

export type ServiceHeroProps = {
  title: string;
  excerpt: string;
  heroImage: string;
  heroEyebrow?: string;
  cta?: string;
};

export function ServiceHero({ title, excerpt, heroImage, heroEyebrow, cta }: ServiceHeroProps) {
  return (
    <section className="relative isolate flex min-h-[420px] items-center overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div aria-hidden className="absolute inset-0 bg-blue/40" />
      <div className="relative w-full py-24">
        <div className="max-w-6xl mx-auto px-4">
          <FadeIn>
            <div className="max-w-2xl text-white">
              {heroEyebrow ? (
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gray">
                  {heroEyebrow}
                </p>
              ) : null}
              <h1 className="text-4xl font-bold sm:text-5xl">{title}</h1>
              <p className="mt-6 text-lg text-white/90">{excerpt}</p>
              {cta ? (
                <Link
                  href="/contact"
                  className="mt-10 inline-flex items-center justify-center rounded bg-red px-6 py-3 font-semibold text-white transition hover:bg-green"
                >
                  {cta}
                </Link>
              ) : null}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
