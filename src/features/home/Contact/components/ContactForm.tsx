"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Input, Textarea, Select, Button } from "@/components/ui";

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const t = useTranslations("ContactPage.form");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: real users never fill this hidden field.
    if (data.get("company-website")) return;

    if (!FORMSPREE_ENDPOINT) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return <p className="text-lg text-foreground">{t("success")}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input
        type="text"
        name="company-website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Input id="name" name="name" label={t("name")} type="text" required />
        <Input id="company" name="company" label={t("company")} type="text" />
      </div>

      <Input id="email" name="email" label={t("email")} type="email" required />

      <Select id="need" name="need" label={t("needLabel")} defaultValue="newWebsite">
        <option value="newWebsite">{t("needOptions.newWebsite")}</option>
        <option value="redesign">{t("needOptions.redesign")}</option>
        <option value="maintenance">{t("needOptions.maintenance")}</option>
        <option value="seo">{t("needOptions.seo")}</option>
        <option value="other">{t("needOptions.other")}</option>
      </Select>

      <Textarea
        id="message"
        name="message"
        label={t("message")}
        rows={5}
        placeholder={t("messagePlaceholder")}
        required
      />

      {status === "error" && (
        <p className="text-sm text-destructive">{t("error")}</p>
      )}

      <Button
        type="submit"
        variant="primary"
        disabled={status === "submitting"}
        className="group relative w-full overflow-hidden disabled:opacity-60"
      >
        {status === "submitting" ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}
