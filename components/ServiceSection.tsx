import { FadeIn } from "@/components/Effects";

export type ServiceSectionProps = {
  heading: string;
  body: string[];
  image?: string;
  imageAlt?: string;
  imageRight?: boolean;
};

export function ServiceSection({ heading, body, image, imageAlt, imageRight }: ServiceSectionProps) {
  const hasImage = Boolean(image);
  const layoutDirection = hasImage ? (imageRight ? "md:flex-row-reverse" : "md:flex-row") : "";

  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <FadeIn>
          <div className={`flex flex-col items-stretch gap-10 ${layoutDirection}`}>
            <div className="flex-1">
              <h2 className="text-3xl font-semibold text-red">{heading}</h2>
              <div className="mt-6 space-y-5 text-base text-blue/80">
                {body.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
            {hasImage ? (
              <div className="flex-1">
                <div className="overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={image}
                    alt={imageAlt ?? ""}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            ) : null}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
