import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "REESET Truck & Trailer Ltd.",
  description: "Semi Truck Repair Garage",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <div className="pt-6 md:pt-16">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
