"use client";

import { useState } from "react";
import { FadeInStagger } from "@/components/Effects";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });

  return (
    <FadeInStagger>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full rounded border border-gray px-4 py-2 text-blue focus:outline-none focus:ring-2 focus:ring-red"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full rounded border border-gray px-4 py-2 text-blue focus:outline-none focus:ring-2 focus:ring-red"
        />
        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full rounded border border-gray px-4 py-2 text-blue focus:outline-none focus:ring-2 focus:ring-red"
        />
        <textarea
          placeholder="Message"
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full rounded border border-gray px-4 py-2 text-blue focus:outline-none focus:ring-2 focus:ring-red"
        />
        <button
          type="submit"
          className="rounded bg-red px-6 py-2 font-semibold text-white hover:bg-green"
        >
          Send Message
        </button>
      </form>
    </FadeInStagger>
  );
}
