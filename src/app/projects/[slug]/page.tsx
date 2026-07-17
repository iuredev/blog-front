import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/api/queries";
import ClientProject from "./ClientProject";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
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

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();
  return <ClientProject slug={slug} initialData={project} />;
}
