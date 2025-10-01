import Hero from "@/components/Hero";
import CircularGallery from "@/components/CircularGallery";
import { CardHover, FadeIn } from "@/components/Effects";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="-mt-20">
        <Hero />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 grid gap-8 md:grid-cols-2 items-center">
        <FadeIn>
          <div>
            <h2 className="text-3xl font-bold text-red">About REESET Truck & Trailer Ltd.</h2>
            <p className="mt-4 text-lg text-blue">
              Based in Manitoba, we specialize in keeping semi trucks and trailers on the road with
              fast, professional, and reliable repairs. Our team of certified technicians ensures
              your fleet stays strong, safe, and compliant.
            </p>
          </div>
        </FadeIn>
        <FadeIn>
          <Image
            src="/gallery/placeholder-1.jpg"
            alt="Garage"
            width={600}
            height={400}
            className="rounded shadow-md"
          />
        </FadeIn>
      </section>

      <section className="bg-gray py-12">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-8 items-center">
          <FadeIn>
            <Image
              src="/gallery/placeholder-2.jpg"
              alt="Technician working"
              width={600}
              height={400}
              className="rounded shadow-md"
            />
          </FadeIn>

          <FadeIn>
            <div>
              <h2 className="text-3xl font-bold text-red mb-6">Our Core Values</h2>
              <ul className="space-y-4 text-blue text-lg">
                <li className="flex items-start">
                  <span className="text-red font-bold mr-2">✓</span>
                  Reliability — We get you back on the road with minimal downtime.
                </li>
                <li className="flex items-start">
                  <span className="text-red font-bold mr-2">✓</span>
                  Fast Service — Quick turnaround and 24/7 emergency support.
                </li>
                <li className="flex items-start">
                  <span className="text-red font-bold mr-2">✓</span>
                  Certified Technicians — Experienced in all major truck & trailer systems.
                </li>
                <li className="flex items-start">
                  <span className="text-red font-bold mr-2">✓</span>
                  Customer Focus — Honest, transparent, and service-driven.
                </li>
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-3xl font-bold text-red text-center mb-8">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            "Engine Repair & Overhaul",
            "Aftertreatment Systems",
            "Transmission Services",
            "Brake Systems",
          ].map((service, idx) => (
            <CardHover key={idx}>
              <div className="bg-white rounded p-6 shadow-sm border border-gray">
                <p className="text-blue">{service}</p>
              </div>
            </CardHover>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link href="/services" className="text-red font-semibold hover:text-green">
            View All Services →
          </Link>
        </div>
      </section>

      <section className="bg-blue text-white py-12">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-8 items-center">
          <FadeIn>
            <h2 className="text-3xl font-bold text-red">Trusted by Truckers Across Manitoba</h2>
            <ul className="mt-4 space-y-2 text-lg">
              <li>✓ Experienced Mechanics</li>
              <li>✓ 24/7 Roadside Assistance</li>
              <li>✓ Secure, Camera-Monitored Parking Lot</li>
            </ul>
          </FadeIn>
          <FadeIn>
            <Image
              src="/gallery/placeholder-2.jpg"
              alt="Truck Repair"
              width={600}
              height={400}
              className="rounded shadow-md"
            />
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="mb-8 text-center text-3xl font-bold text-red">In Action</h2>
        <div style={{ height: "600px", position: "relative" }}>
          <CircularGallery
            bend={3}
            textColor="#ffffff"
            borderRadius={0.05}
            scrollEase={0.02}
            items={[
              { image: "/gallery/placeholder-1.jpg", text: "Engine Repair" },
              { image: "/gallery/placeholder-2.jpg", text: "Diagnostics" },
              { image: "/gallery/placeholder-3.jpg", text: "Fleet Service" },
              { image: "/gallery/placeholder-4.jpg", text: "Mobile Assist" },
              { image: "/gallery/placeholder-5.jpg", text: "Brake Systems" },
              { image: "/gallery/placeholder-6.jpg", text: "Aftertreatment" },
            ]}
          />
        </div>
        <div className="mt-6 text-center">
          <a href="/gallery" className="text-red hover:underline">
            View Full Gallery →
          </a>
        </div>
      </section>

      <section className="bg-gradient-to-r from-red to-green py-12 text-center text-white">
        <FadeIn>
          <h2 className="text-3xl font-bold">We Keep Your Trucks Moving</h2>
          <p className="mt-4 text-lg">Safe. Fast. Reliable. Every Mile.</p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded bg-blue px-6 py-2 font-semibold text-white hover:bg-white hover:text-blue"
          >
            Contact Us Today
          </Link>
        </FadeIn>
      </section>
    </main>
  );
}
