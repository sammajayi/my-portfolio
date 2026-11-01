'use client';

import { useState } from "react";
import { Mail02Icon } from "hugeicons-react";

const CONTACT_EMAIL = "samuelajayi554@gmail.com";

const fieldClass =
  "w-full rounded border border-alabaster-grey bg-white px-4 py-2.5 text-sm text-black placeholder:text-muted/60 transition-colors focus-visible:border-bright-marine focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-bright-marine";

// No backend is wired up yet, so submitting opens the visitor's mail client
// with the message pre-filled instead of pretending it was sent.
export default function ContactForm() {
  const [status, setStatus] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const body = `${data.get("message")}\n\nReply to: ${data.get("email")}`;
        window.location.assign(
          `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Hello from your portfolio")}&body=${encodeURIComponent(body)}`,
        );
        setStatus("Opening your email app…");
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
          name="email"
          autoComplete="email"
          spellCheck={false}
          required
          placeholder="you@example.com"
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          autoComplete="off"
          required
          rows={4}
          placeholder="Tell me about your project…"
          className={fieldClass}
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded bg-bright-marine px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-black"
      >
        <span>Send Message</span>
        <Mail02Icon size={16} aria-hidden="true" />
      </button>
      <p role="status" aria-live="polite" className="text-sm text-muted">
        {status}
      </p>
    </form>
  );
}
