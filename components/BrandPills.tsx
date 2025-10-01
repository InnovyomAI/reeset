import Link from "next/link";
import { BRANDS } from "@/lib/data";

type BrandPillsProps = {
  className?: string;
};

export default function BrandPills({ className }: BrandPillsProps) {
  return (
    <aside
      className={`rounded border border-gray bg-white p-4 shadow-sm${className ? ` ${className}` : ""}`}
    >
      <h4 className="mb-3 font-semibold text-blue">Vehicles We Service</h4>
      <div className="flex flex-wrap gap-2">
        {BRANDS.map((brand) => (
          <Link
            key={brand.slug}
            href={`/brands/${brand.slug}`}
            className="rounded border border-gray px-3 py-1 text-sm text-blue hover:bg-gray"
          >
            {brand.name}
          </Link>
        ))}
      </div>
    </aside>
  );
}
