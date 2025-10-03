import BrandPills from "@/components/BrandPills";
import { CTAContactBand } from "@/components/CTAContactBand";
import { FadeIn } from "@/components/Effects";
import { ServiceHero } from "@/components/ServiceHero";
import { ServiceSection } from "@/components/ServiceSection";
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
  if (!service) return null;

  return (
    <main>
      <ServiceHero
        title={service.title}
        excerpt={service.excerpt}
        heroImage={service.heroImage}
        heroEyebrow={service.heroEyebrow}
        cta={service.cta}
      />

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-12 lg:col-span-2">
            {service.bullets.length > 0 ? (
              <FadeIn>
                <section className="rounded-lg border border-gray bg-white px-6 py-8 shadow-sm">
                  <h2 className="text-3xl font-semibold text-red">What We Handle</h2>
                  <ul className="mt-6 list-disc space-y-2 pl-6 text-blue/80">
                    {service.bullets.map((bullet, index) => (
                      <li key={index}>{bullet}</li>
                    ))}
                  </ul>
                </section>
              </FadeIn>
            ) : null}

            {service.sections?.map((section, index) => (
              <ServiceSection
                key={`${section.heading}-${index}`}
                heading={section.heading}
                body={section.body}
              />
            ))}

            {service.faqs?.length ? (
              <FadeIn>
                <section className="rounded-lg border border-gray bg-white px-6 py-8 shadow-sm">
                  <h2 className="text-3xl font-semibold text-red">Frequently Asked Questions</h2>
                  <dl className="mt-6 space-y-6">
                    {service.faqs.map((faq, index) => (
                      <div key={`${faq.q}-${index}`}>
                        <dt className="font-semibold text-blue">{faq.q}</dt>
                        <dd className="mt-2 text-blue/80">{faq.a}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              </FadeIn>
            ) : null}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BrandPills className="top-24" />
            </div>
          </div>
        </div>
      </section>

      <CTAContactBand
        headline={`Ready to book ${service.title}?`}
        description="Tell us about your fleet and schedule a visit—our team will follow up within one business day."
      />
    </main>
  );
}
