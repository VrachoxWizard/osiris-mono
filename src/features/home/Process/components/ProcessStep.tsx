"use client";

interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
  isEven: boolean;
}

export function ProcessStep({
  number,
  title,
  description,
  isEven,
}: ProcessStepProps) {
  return (
    <div
      className={`mb-16 flex flex-col items-start gap-8 md:items-center ${
        isEven ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      <div className={`flex-1 pl-24 md:pl-0 ${isEven ? "" : "md:text-right"}`}>
        <div
          className={`mb-4 text-5xl font-display font-bold text-muted-foreground/50 md:text-7xl ${
            isEven ? "" : "md:text-right"
          }`}
        >
          {number}
        </div>
        <h3
          className={`mb-2 text-2xl font-bold text-foreground ${
            isEven ? "" : "md:text-right"
          }`}
        >
          {title}
        </h3>
        <p
          className={`text-foreground/80 ${
            isEven ? "max-w-sm" : "md:ml-auto md:inline-block md:max-w-sm md:text-right"
          }`}
        >
          {description}
        </p>
      </div>

      <div className="absolute left-0 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center md:static md:translate-y-0">
        <div className="flex h-20 w-20 items-center justify-center border-2 border-border bg-background transition-all duration-300">
          <div className="text-xl font-bold text-foreground">{number}</div>
        </div>
      </div>

      <div className="hidden flex-1 md:block">
        <div className="h-0.5 w-full bg-border"></div>
      </div>
    </div>
  );
}
