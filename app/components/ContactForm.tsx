'use client';

import { Mail02Icon } from "hugeicons-react";

export default function ContactForm() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert("Form submitted! (Demo only)");
      }}
      className="space-y-4"
    >
      <div>
        <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          required
          placeholder="you@example.com"
          className="w-full rounded border border-alabaster-grey bg-white px-4 py-2.5 text-sm text-black placeholder:text-muted/60 focus:border-bright-marine focus:outline-none focus:ring-1 focus:ring-bright-marine"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={4}
          placeholder="Tell me about your project..."
          className="w-full rounded border border-alabaster-grey bg-white px-4 py-2.5 text-sm text-black placeholder:text-muted/60 focus:border-bright-marine focus:outline-none focus:ring-1 focus:ring-bright-marine"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded bg-bright-marine px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-black"
      >
        <span>Send Message</span>
        <Mail02Icon size={16} />
      </button>
    </form>
  );
}
