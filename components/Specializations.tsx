"use client";

import { FadeIn } from "@/components/Effects";

const items = [
  { title: "Engine Diagnostics", desc: "Complete diagnostic checks for semi truck engines." },
  { title: "Aftertreatment Systems", desc: "DPF, DEF, and emissions system maintenance and repair." },
  { title: "Transmission Repair", desc: "Manual and automatic transmission servicing." },
  { title: "Brake Systems", desc: "Air brakes and hydraulic systems inspection and repair." },
  { title: "Electrical Systems", desc: "Wiring, alternators, batteries, and lighting repair." },
  { title: "Suspension & Steering", desc: "Shock absorbers, axles, and alignment services." },
];

export default function Specializations() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h2 className="mb-8 text-center text-3xl font-bold text-red">Our Specializations</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, idx) => (
          <FadeIn key={idx}>
            <div className="rounded border border-gray bg-white p-6 shadow-sm hover:shadow-md">
              <h3 className="text-xl font-semibold text-blue">{item.title}</h3>
              <p className="mt-2 text-sm text-blue">{item.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
