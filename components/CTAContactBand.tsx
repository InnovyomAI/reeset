import Link from "next/link";
import { FadeIn } from "@/components/Effects";

export type CTAContactBandProps = {
  headline: string;
  description: string;
  buttonLabel?: string;
  href?: string;
};

export function CTAContactBand({ headline, description, buttonLabel = "Contact Us", href = "/contact" }: CTAContactBandProps) {
  return (
    <section className="bg-blue py-12 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <FadeIn>
          <div className="flex flex-col items-start gap-6 rounded-lg bg-blue/60 p-8 shadow-lg sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-3xl font-semibold">{headline}</h2>
              <p className="mt-4 max-w-2xl text-base text-white/90">{description}</p>
            </div>
            <Link
              href={href}
              className="inline-flex items-center justify-center rounded bg-red px-6 py-3 font-semibold text-white transition hover:bg-green"
            >
              {buttonLabel}
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
