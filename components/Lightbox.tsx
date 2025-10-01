"use client";

import Image from "next/image";

export default function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <button onClick={onClose} className="absolute right-6 top-6 text-white text-2xl font-bold">
        ×
      </button>
      <Image
        src={src}
        alt="Expanded gallery image"
        width={800}
        height={600}
        className="rounded shadow-lg"
      />
    </div>
  );
}
