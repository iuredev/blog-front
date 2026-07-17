import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types";

interface ProjectCardProps {
    project: Project;
}

const STRAPI_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ?? "";

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <Link
            href={project.slug ? `/projects/${project.slug}` : project.link ?? "/projects"}
            target={!project.slug && project.link ? "_blank" : undefined}
            rel={!project.slug && project.link ? "noopener noreferrer" : undefined}
            className="block group"
        >
            {project.cover && (
                <div className="mb-2 overflow-hidden rounded-md h-32">
                    <Image
                        src={`${STRAPI_BASE_URL}${project.cover.url}`}
                        alt={project.cover.alternativeText ?? project.title}
                        width={project.cover.width}
                        height={project.cover.height}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}
            <div className="text-xl font-semibold group-hover:underline">
                {project.title}
            </div>
            <p className="text-gray-400 text-sm mt-1">{project.description}</p>
            {(project.role || project.year || project.technologies?.length) && (
                <p className="mt-2 font-mono text-xs text-gray-500">
                    {[project.role, project.year, project.technologies?.slice(0, 3).join(", ")].filter(Boolean).join(" · ")}
                </p>
            )}
        </Link>
    );
}
