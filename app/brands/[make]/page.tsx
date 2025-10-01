import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/Effects";
import { BRANDS, SERVICES } from "@/lib/data";

export async function generateStaticParams() {
  return BRANDS.map((brand) => ({ make: brand.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ make: string }> }) {
  const { make } = await params;
  const brand = BRANDS.find((entry) => entry.slug === make);
  if (!brand) return {};
  return { title: `${brand.name} Truck Service | REESET`, description: brand.blurb };
}

export default async function Page({ params }: { params: Promise<{ make: string }> }) {
  const { make } = await params;
  const brand = BRANDS.find((entry) => entry.slug === make);
  if (!brand) return notFound();

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <section className="grid items-center gap-8 md:grid-cols-2">
        <FadeIn>
          <div>
            <h1 className="text-3xl font-bold text-red">{brand.name} Service</h1>
            <p className="mt-4 text-lg text-blue">{brand.blurb}</p>
          </div>
        </FadeIn>
        <FadeIn>
          <Image
            src={brand.heroImage}
            alt={`${brand.name} truck`}
            width={720}
            height={480}
            className="rounded shadow-md"
          />
        </FadeIn>
      </section>

      <section className="mt-12">
        <h2 className="mb-4 text-2xl font-semibold text-blue">Services We Offer</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="rounded border border-gray bg-white p-4 text-blue hover:bg-gray"
            >
              {service.title}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
