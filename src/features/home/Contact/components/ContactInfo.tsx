"use client";

import { MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui";

interface ContactItemProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}

function ContactItem({ icon, label, children }: ContactItemProps) {
  return (
    <div className="flex items-start">
      <div className="mr-4 bg-foreground/10 p-2">{icon}</div>
      <div>
        <div className="mb-2 text-sm uppercase tracking-widest text-muted-foreground">
          {label}
        </div>
        {children}
      </div>
    </div>
  );
}

export function ContactInfo() {
  const t = useTranslations("ContactPage");
  const tFooter = useTranslations("Footer");

  return (
    <Card className="h-full">
      <h3 className="mb-6 text-2xl font-bold text-foreground">{t("infoHeading")}</h3>
      <div className="space-y-8">
        <ContactItem icon={<MapPin className="h-5 w-5 text-foreground" />} label="Zagreb">
          <address className="not-italic text-foreground/80">{tFooter("location")}</address>
        </ContactItem>
      </div>
    </Card>
  );
}
