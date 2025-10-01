"use client";

import { FadeInStagger } from "@/components/Effects";

export default function Hero() {
  return (
    <section className="relative flex h-[80vh] items-center justify-center bg-gradient-to-r from-blue to-red text-white">
      <FadeInStagger>
        <div className="text-center">
          <h1 className="text-4xl font-bold md:text-6xl">Keeping Trucks Moving</h1>
          <p className="mt-4 text-lg md:text-2xl">Reliable. Fast. Professional.</p>
          <div className="mt-6 flex justify-center gap-4">
            <a
              href="tel:+12045551234"
              className="rounded bg-red px-6 py-2 font-semibold text-white hover:bg-green"
            >
              Call Now
            </a>
            <a
              href="/contact"
              className="rounded bg-green px-6 py-2 font-semibold text-white hover:bg-red"
            >
              Send a Message
            </a>
          </div>
        </div>
      </FadeInStagger>
    </section>
  );
}
