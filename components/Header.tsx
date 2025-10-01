import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/lib/data";

export default function Header() {
  return (
    <header className="bg-white text-blue sticky top-0 z-50 h-20 shadow-md flex items-center relative">
      <div className="mx-auto flex max-w-7xl items-center justify-between w-full px-6">
        {/* Logo */}
        <Link href="/" aria-label="Home" className="flex items-center h-full">
          <Image
            src="/logo.jpg"
            alt="REESET Truck & Trailer Ltd."
            width={180}
            height={80}
            className="h-full w-auto"
          />
        </Link>

        {/* Navigation */}
        <nav>
          <ul className="flex items-center gap-6 font-medium">
            <li>
              <Link href="/" className="hover:text-green">
                Home
              </Link>
            </li>
            <li>
              <Link href="/our-specializations" className="hover:text-green">
                Specializations
              </Link>
            </li>
            <li className="relative group">
              <button
                type="button"
                className="hover:text-green focus:outline-none"
              >
                Services ▾
              </button>
              <ul className="absolute left-0 mt-0 hidden w-56 rounded-md bg-white text-blue shadow-lg z-50 group-hover:block group-focus-within:block">
                {SERVICES.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="block px-4 py-2 hover:bg-blue-100"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-green">
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-green">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Blurred bottom boundary */}
      <div
        aria-hidden="true"
        className="absolute bottom-[-8px] left-0 w-full h-6 bg-white blur-md pointer-events-none"
      />
    </header>
  );
}
