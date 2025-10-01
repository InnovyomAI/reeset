"use client";

import { useState } from "react";
import { FadeIn } from "@/components/Effects";
import Lightbox from "@/components/Lightbox";
import Image from "next/image";

const images = [
  "/gallery/placeholder-1.jpg",
  "/gallery/placeholder-2.jpg",
  "/gallery/placeholder-3.jpg",
  "/gallery/placeholder-4.jpg",
  "/gallery/placeholder-5.jpg",
  "/gallery/placeholder-6.jpg",
];

export default function GalleryGrid() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h2 className="mb-8 text-center text-3xl font-bold text-red">Gallery</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {images.map((src, idx) => (
          <FadeIn key={idx}>
            <button onClick={() => setSelected(src)} className="block w-full">
              <Image
                src={src}
                alt={`Gallery image ${idx + 1}`}
                width={400}
                height={300}
                className="rounded shadow-md hover:opacity-90"
              />
            </button>
          </FadeIn>
        ))}
      </div>
      {selected && <Lightbox src={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
