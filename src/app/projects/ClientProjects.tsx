'use client'

import { useGetProjects } from "@/api/hooks";
import { ProjectCard, Error, Loading } from "@/components";
import { Project } from "@/types";
import { useLocale } from "@/hooks/useLocale";

export default function ClientProjects() {
  const { projects, isLoading, isError } = useGetProjects();
  const { t } = useLocale();

  const render = () => {
    if (isLoading) return <Loading />;
    if (isError) return <Error />;
    if (projects.length === 0) return <div>{t("projects.none")}</div>;

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {projects.map((project: Project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <div>
        <h1 className="text-4xl font-bold">{t("projects.title")}</h1>
        <p className="text-gray-400">{t("projects.description")}</p>
      </div>
      <div className="mt-8">{render()}</div>
    </div>
  );
}
