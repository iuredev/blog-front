"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";
import en from "../../messages/en.json";
import ptBr from "../../messages/pt-br.json";

export type Locale = "en" | "pt-br";
type Messages = typeof en;

const messages: Record<Locale, Messages> = { en, "pt-br": ptBr };

export function useLocale() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const lang = searchParams.get("lang");
  const locale: Locale = lang === "pt-br" ? "pt-br" : "en";

  const t = useCallback(
    (key: keyof Messages): string => messages[locale][key] ?? key,
    [locale]
  );

  const setLocale = useCallback(
    (newLocale: Locale) => {
      const params = new URLSearchParams(searchParams.toString());
      if (newLocale === "en") {
        params.delete("lang");
      } else {
        params.set("lang", newLocale);
      }
      const qs = params.toString();
      router.push(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  const localizeHref = useCallback(
    (href: string): string => {
      if (locale === "en") return href;
      return `${href}?lang=pt-br`;
    },
    [locale]
  );

  // Maps to Strapi locale format (pt-BR). Returns undefined for EN (Strapi default).
  const strapiLocale = locale === "pt-br" ? "pt-BR" : undefined;

  return { locale, t, setLocale, localizeHref, strapiLocale };
}
