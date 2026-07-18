import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/api/queries";
import ClientProject from "./ClientProject";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
};

const getStrapiLocale = (lang?: string) => lang === "pt-br" ? "pt-BR" : undefined;

export async function generateMetadata({ params, searchParams }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { lang } = await searchParams;
  const project = await getProjectBySlug(slug, getStrapiLocale(lang));
  if (!project) return { title: "Project not found | Iure" };

  return {
    title: `${project.title} | Iure`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      url: `https://iure.dev/projects/${project.slug}`,
    },
  };
}

export default async function ProjectPage({ params, searchParams }: ProjectPageProps) {
  const { slug } = await params;
  const { lang } = await searchParams;
  const project = await getProjectBySlug(slug, getStrapiLocale(lang));
  if (!project) notFound();
  return <ClientProject slug={slug} initialData={project} />;
}
