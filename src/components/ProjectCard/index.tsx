import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types";
import { getStrapiMediaUrl } from "@/api/queries/global";

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const coverUrl = getStrapiMediaUrl(project.cover?.url);
    return (
        <Link
            href={project.slug ? `/projects/${project.slug}` : project.link ?? "/projects"}
            target={!project.slug && project.link ? "_blank" : undefined}
            rel={!project.slug && project.link ? "noopener noreferrer" : undefined}
            className="block group"
        >
            {project.cover && coverUrl && (
                <div className="mb-4 overflow-hidden rounded-md h-44 border border-gray-200 dark:border-gray-800">
                    <Image
                        src={coverUrl}
                        alt={project.cover.alternativeText ?? project.title}
                        width={project.cover.width}
                        height={project.cover.height}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                </div>
            )}
            <div className="text-xl font-semibold group-hover:text-blue-500">
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
