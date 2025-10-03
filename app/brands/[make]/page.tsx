import BrandPills from "@/components/BrandPills";
import { CTAContactBand } from "@/components/CTAContactBand";
import { ServiceHero } from "@/components/ServiceHero";
import { ServiceSection } from "@/components/ServiceSection";
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
  if (!brand) return <div>Brand not found</div>;

  const servicesForBrand = SERVICES.map(
    (service) => `${service.title} - ${service.excerpt}`
  );

  return (
    <main>
      <section className="bg-white py-8">
        <div className="mx-auto max-w-6xl px-4">
          <BrandPills />
        </div>
      </section>

      <ServiceHero title={brand.name} excerpt={brand.blurb} heroImage={brand.heroImage} />

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-12 lg:col-span-2">
            <ServiceSection heading={`Services for ${brand.name}`} body={servicesForBrand} />
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BrandPills className="top-24" />
            </div>
          </div>
        </div>
      </section>

      <CTAContactBand
        headline={`Need ${brand.name} expertise?`}
        description="Tell us about your fleet and we'll follow up with a tailored service plan."
      />
    </main>
  );
}
