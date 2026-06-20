'use client'

import { useGetPosts, useGetProjects } from "@/api/hooks";
import { Loading, PostLink } from "@/components";
import { Profile } from "@/components";
import { Post, Project } from "@/types";
import Link from "next/link";
import { useLocale } from "@/hooks/useLocale";

export default function Home() {
  const { t, strapiLocale, localizeHref } = useLocale();
  const { posts, isLoading: postsLoading } = useGetPosts(3, undefined, strapiLocale);
  const { projects, isLoading: projectsLoading } = useGetProjects();

  return (
    <div className="flex flex-col gap-16">
      <Profile />

      <div>
        <h2 className="text-xl font-semibold uppercase mb-6">{t("home.recentNotes")}</h2>
        {postsLoading ? (
          <Loading />
        ) : !posts || posts.length === 0 ? null : (
          <div className="flex flex-col gap-1">
            {posts.map((post: Post) => (
              <PostLink key={post.id} post={post} preview={false} />
            ))}
          </div>
        )}
        <div className="mt-4">
          <Link href={localizeHref("/notes")} className="text-blue-500 text-sm">
            {t("home.viewAllNotes")}
          </Link>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold uppercase mb-6">{t("home.projects")}</h2>
        {projectsLoading ? (
          <Loading />
        ) : projects.length === 0 ? null : (
          <div className="flex flex-col divide-y divide-gray-800">
            {projects.slice(0, 3).map((project: Project) => (
              <a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between py-4 gap-4"
              >
                <div>
                  <span className="text-xl font-semibold group-hover:underline">{project.title}</span>
                  {project.description && (
                    <p className="text-sm text-gray-500 mt-0.5">{project.description}</p>
                  )}
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mt-0.5 shrink-0 text-gray-500 group-hover:text-gray-300 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ))}
          </div>
        )}
        {projects.length > 0 && (
          <div className="mt-4">
            <Link href={localizeHref("/projects")} className="text-blue-500 text-sm">
              {t("home.viewAllProjects")}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
