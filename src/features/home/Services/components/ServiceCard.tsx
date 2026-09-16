"use client";

interface ServiceCardProps {
  number: string;
  title: string;
  description: string;
}

export function ServiceCard({ number, title, description }: ServiceCardProps) {
  return (
    <div className="group relative border border-border p-8 transition-colors duration-300 hover:border-accent/60">
      <div className="mb-8 text-sm text-muted-foreground">{number}</div>
      <h3 className="mb-4 text-xl font-bold text-foreground">{title}</h3>
      <p className="text-muted-foreground transition-colors group-hover:text-foreground/80">
        {description}
      </p>
    </div>
  );
}
