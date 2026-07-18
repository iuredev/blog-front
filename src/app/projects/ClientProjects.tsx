'use client'

import { useGetProjects } from "@/api/hooks";
import { ProjectCard, Error, Loading } from "@/components";
import { Project } from "@/types";
import { useLocale } from "@/hooks/useLocale";

export default function ClientProjects() {
  const { t, strapiLocale } = useLocale();
  const { projects, isLoading, isError } = useGetProjects(strapiLocale);

  const render = () => {
    if (isLoading) return <Loading />;
    if (isError) return <Error />;
    if (projects.length === 0) return <div className="rounded-md border border-dashed border-gray-300 px-6 py-10 text-center text-sm text-gray-500 dark:border-gray-700">{t("projects.none")}</div>;

    return (
      <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2">
        {projects.map((project: Project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <div>
        <h1 className="text-4xl font-semibold tracking-tight">{t("projects.title")}</h1>
        <p className="mt-2 text-sm leading-6 tracking-normal text-gray-500 dark:text-gray-400">{t("projects.description")}</p>
      </div>
      <div className="mt-8">{render()}</div>
    </div>
  );
}
