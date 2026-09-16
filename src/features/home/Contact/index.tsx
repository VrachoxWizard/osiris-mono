"use client";

import { ContactForm, ContactInfo } from "./components";

export function Contact() {
  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
      <ContactForm />
      <ContactInfo />
    </div>
  );
}
