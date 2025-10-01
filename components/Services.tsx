"use client";

import { CardHover } from "@/components/Effects";
import { SERVICES } from "@/lib/data";

export default function Services() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h2 className="mb-8 text-center text-3xl font-bold bg-gradient-to-r from-red to-green bg-clip-text text-transparent">
        Our Services
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service) => (
          <CardHover key={service.slug}>
            <a
              href={`/services/${service.slug}`}
              className="block rounded border border-gray bg-white p-6 text-blue shadow-sm hover:bg-gray"
            >
              <h3 className="text-xl font-semibold text-blue">{service.title}</h3>
              <p className="mt-2 text-sm text-blue">{service.excerpt}</p>
            </a>
          </CardHover>
        ))}
      </div>
    </section>
  );
}
