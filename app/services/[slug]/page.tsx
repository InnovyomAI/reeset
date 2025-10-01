import Image from "next/image";
import { notFound } from "next/navigation";
import BrandPills from "@/components/BrandPills";
import { FadeIn } from "@/components/Effects";
import { SERVICES } from "@/lib/data";

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES.find((svc) => svc.slug === slug);
  if (!service) return {};
  return { title: `${service.title} | REESET`, description: service.excerpt };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES.find((svc) => svc.slug === slug);
  if (!service) return notFound();

  return (
    <main>
      <section className="relative">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2">
          <FadeIn>
            <div>
              <h1 className="text-3xl font-bold text-red">{service.title}</h1>
              <p className="mt-4 text-lg text-blue">{service.excerpt}</p>
            </div>
          </FadeIn>
          <FadeIn>
            <Image
              src={service.heroImage}
              alt={service.title}
              width={720}
              height={480}
              className="rounded shadow-md"
            />
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-6xl grid gap-12 px-4 pb-12 md:grid-cols-[2fr_1fr]">
        <FadeIn>
          <ul className="list-disc space-y-2 pl-5 text-blue">
            {service.bullets.map((bullet, index) => (
              <li key={index}>{bullet}</li>
            ))}
          </ul>
        </FadeIn>
        <BrandPills />
      </section>
    </main>
  );
}
