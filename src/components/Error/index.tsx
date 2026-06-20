"use client";

import Link from "next/link";
import { useLocale } from "@/hooks/useLocale";

export default function Error() {
  const { t } = useLocale();

  return (
    <div className="flex flex-col items-center ">
      <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">
        {t("error.title")}
      </h1>

      <p className="text-gray-500 mt-2">
        {t("error.description")}
      </p>

      <Link
        href="/"
        className="mt-6 inline-block px-6 py-3 text-white font-semibold rounded-md"
      >
        {t("error.goHome")}
      </Link>
    </div>
  );
}
