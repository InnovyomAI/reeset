import { FadeIn } from "@/components/Effects";

export type ServiceSectionProps = {
  heading: string;
  body: string[];
};

export function ServiceSection({ heading, body }: ServiceSectionProps) {
  const paragraphs = Array.isArray(body) ? body : [];

  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <FadeIn>
          <div className="flex flex-col items-stretch">
            <h2 className="text-3xl font-semibold text-red">{heading}</h2>
            <div className="mt-6 space-y-5 text-base text-blue/80">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
