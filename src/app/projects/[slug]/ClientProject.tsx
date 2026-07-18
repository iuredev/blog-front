"use client";

import Image from "next/image";
import Link from "next/link";
import { useGetProjectBySlug } from "@/api/hooks";
import { getStrapiMediaUrl } from "@/api/queries/global";
import { Error, Loading, Markdown } from "@/components";
import { useLocale } from "@/hooks/useLocale";
import { Project } from "@/types";

type Props = { slug: string; initialData: Project };

export default function ClientProject({ slug, initialData }: Props) {
  const { t, localizeHref, strapiLocale } = useLocale();
  const { data, isLoading, isError } = useGetProjectBySlug(slug, initialData, strapiLocale);

  if (isLoading) return <Loading />;
  if (isError || !data) return <Error />;

  const coverUrl = getStrapiMediaUrl(data.cover?.url);
  const facts = [
    data.role && [t("projects.role"), data.role],
    data.year && [t("projects.year"), String(data.year)],
    data.status && [t("projects.status"), t(`projects.status.${data.status}`)],
  ].filter(Boolean) as string[][];

  return (
    <article>
      <Link href={localizeHref("/projects")} className="text-sm text-blue-500">← {t("projects.back")}</Link>
      <header className="mt-8 border-b border-gray-200 pb-8 dark:border-gray-800">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{data.title}</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 tracking-normal text-gray-500 dark:text-gray-400">{data.description}</p>
        <div className="mt-7 flex flex-wrap gap-4 text-sm">
          {data.link && <a href={data.link} target="_blank" rel="noreferrer" className="text-blue-500">{t("projects.visit")} ↗</a>}
          {data.repository && <a href={data.repository} target="_blank" rel="noreferrer" className="text-blue-500">{t("projects.repository")} ↗</a>}
        </div>
      </header>

      {coverUrl && data.cover && (
        <div className="my-10 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
          <Image src={coverUrl} alt={data.cover.alternativeText ?? data.title} width={data.cover.width} height={data.cover.height} className="h-auto w-full object-cover" priority />
        </div>
      )}

      {(facts.length > 0 || (data.technologies?.length ?? 0) > 0) && (
        <dl className="my-10 grid gap-6 border-y border-gray-200 py-7 dark:border-gray-800 sm:grid-cols-2 md:grid-cols-4">
          {facts.map(([label, value]) => <div key={label}><dt className="text-xs uppercase tracking-wide text-gray-500">{label}</dt><dd className="mt-1 text-sm">{value}</dd></div>)}
          {data.technologies && data.technologies.length > 0 && <div><dt className="text-xs uppercase tracking-wide text-gray-500">{t("projects.stack")}</dt><dd className="mt-1 text-sm">{data.technologies.join(", ")}</dd></div>}
        </dl>
      )}

      {data.content && <div className="content mt-10 text-base"><Markdown content={data.content} /></div>}
    </article>
  );
}
