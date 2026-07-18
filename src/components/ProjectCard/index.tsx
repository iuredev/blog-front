import Image from "next/image";
import { Project } from "@/types";
import { getStrapiMediaUrl } from "@/api/queries/global";

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const coverUrl = getStrapiMediaUrl(project.cover?.url);
    return (
        <article className="group">
            {project.cover && coverUrl && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="mb-4 block h-44 overflow-hidden rounded-md border border-gray-200 dark:border-gray-800">
                    <Image
                        src={coverUrl}
                        alt={project.cover.alternativeText ?? project.title}
                        width={project.cover.width}
                        height={project.cover.height}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                </a>
            )}
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="block text-xl font-semibold group-hover:text-blue-500">
                {project.title}
            </a>
            <p className="text-gray-400 text-sm mt-1">{project.description}</p>
            <div className="mt-2 flex flex-wrap items-baseline justify-between gap-3">
                {project.technologies?.length ? (
                    <p className="font-mono text-xs text-gray-500">{project.technologies.join(" · ")}</p>
                ) : <span />}
                {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500">GitHub ↗</a>
                )}
            </div>
        </article>
    );
}
