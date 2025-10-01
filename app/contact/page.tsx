import ContactForm from "@/components/ContactForm";
import { FadeIn } from "@/components/Effects";

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 grid gap-12 md:grid-cols-2">
      <div>
        <h2 className="mb-6 text-3xl font-bold text-red">Get in Touch</h2>
        <ContactForm />
      </div>
      <FadeIn>
        <div className="space-y-4 text-blue">
          <p><strong>Address:</strong> 123 Truck Lane, Winnipeg, MB</p>
          <p>
            <strong>Phone:</strong>{" "}
            <a href="tel:+12045551234" className="text-red hover:text-green">
              +1 (204) 555-1234
            </a>
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:info@reeset.com" className="text-red hover:text-green">
              info@reeset.com
            </a>
          </p>
          <iframe
            src="https://maps.google.com/maps?q=winnipeg%20truck%20repair&t=&z=13&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="250"
            className="rounded border border-gray"
          ></iframe>
        </div>
      </FadeIn>
    </main>
  );
}
