"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { Card } from "@/components/ui";
import { contactConfig } from "@/config";

interface ContactItemProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}

function ContactItem({ icon, label, children }: ContactItemProps) {
  return (
    <div className="flex items-start">
      <div className="bg-white/10 p-2 rounded-sm mr-4">{icon}</div>
      <div>
        <div className="text-sm uppercase tracking-widest text-white/70 mb-2">
          {label}
        </div>
        {children}
      </div>
    </div>
  );
}

export function ContactInfo() {
  const { info } = contactConfig;

  return (
    <Card className="h-full">
      <h3 className="text-2xl font-bold mb-6 text-white">
        Contact Information
      </h3>
      <div className="space-y-8">
        <ContactItem
          icon={<Mail className="w-5 h-5 text-white" />}
          label="Email"
        >
          <a
            href={`mailto:${info.email}`}
            className="text-white hover:text-white/70 transition-colors"
          >
            {info.email}
          </a>
        </ContactItem>

        <ContactItem
          icon={<Phone className="w-5 h-5 text-white" />}
          label="Phone"
        >
          <a
            href={`tel:${info.phone.replace(/\s/g, "")}`}
            className="text-white hover:text-white/70 transition-colors"
          >
            {info.phone}
          </a>
        </ContactItem>

        <ContactItem
          icon={<MapPin className="w-5 h-5 text-white" />}
          label="Address"
        >
          <address className="not-italic text-white/80">
            {info.address.street}
            <br />
            {info.address.city}
            <br />
            {info.address.country}
          </address>
        </ContactItem>

      </div>
    </Card>
  );
}
