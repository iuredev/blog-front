"use client";

import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useGetPosts, useGetProjects } from "@/api/hooks";
import { useGetGlobal } from "@/api/hooks/global";
import { Loading, PostLink, SystemInMotion } from "@/components";
import { useLocale } from "@/hooks/useLocale";
import { Post, Project } from "@/types";

export default function ClientHome() {
  const { t, locale, strapiLocale, localizeHref } = useLocale();
  const { posts, isLoading: postsLoading } = useGetPosts(3, undefined, strapiLocale);
  const { projects, isLoading: projectsLoading } = useGetProjects();
  const { data: global } = useGetGlobal();
  const skills = global?.skills?.length
    ? global.skills
    : ["TypeScript", "React", "Next.js", "Node.js", "Strapi", "PostgreSQL", "Rust", "WebAssembly"];

  return (
    <div className="w-full min-w-0 overflow-x-clip">
      <section className="w-full py-5 sm:py-6 md:py-8">
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">{t("home.role")}</p>
        <h1 className="text-[1.75rem] font-semibold leading-[1.22] tracking-tight text-gray-800 dark:text-gray-200 min-[360px]:text-3xl sm:text-[2.25rem] md:text-[2.4rem]">
          <Link href={localizeHref("/about")} className="text-gray-900 hover:text-blue-500 dark:text-white dark:hover:text-blue-400">
            {t("profile.greeting")}
          </Link>
          <span className="text-gray-500 dark:text-gray-400">{t("profile.bio")}</span>
        </h1>

        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm sm:mt-8">
          <Link href={localizeHref("/projects")} className="text-blue-500">{t("home.viewAllProjects")} →</Link>
          <a href="mailto:iuresg.dev@gmail.com" className="break-all text-gray-600 hover:text-blue-500 dark:text-gray-400">iuresg.dev@gmail.com</a>
          <div className="flex items-center gap-4 text-gray-500">
            <a href="https://github.com/iuredev" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub className="h-4 w-4" /></a>
            <a href="https://linkedin.com/in/iure-silva" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin className="h-4 w-4" /></a>
            <a href="https://instagram.com/iure.dev" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram className="h-4 w-4" /></a>
          </div>
        </div>
      </section>

      <section className="w-full" aria-label={t("scene.sectionLabel")}>
        <SystemInMotion />
      </section>

      <div className="mt-12 w-full space-y-14 sm:mt-16 sm:space-y-16 md:mt-20 md:space-y-20">
        {global?.currentFocus && (
          <section className="border-t border-gray-200 pt-5 dark:border-gray-800">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-xl font-semibold tracking-tight">{t("home.now")}</h2>
              {global.currentFocusUpdatedAt && (
                <span className="text-xs tracking-normal text-gray-400">
                  {t("home.nowUpdated")} {new Intl.DateTimeFormat(locale === "pt-br" ? "pt-BR" : "en", { month: "short", year: "numeric" }).format(new Date(global.currentFocusUpdatedAt))}
                </span>
              )}
            </div>
            <p className="mt-3 text-sm leading-6 tracking-normal text-gray-600 dark:text-gray-400">{global.currentFocus}</p>
          </section>
        )}

        <section aria-labelledby="projects-title">
          <div className="mb-3 flex items-baseline justify-between gap-6">
            <h2 id="projects-title" className="text-xl font-semibold tracking-tight">{t("home.projects")}</h2>
            <Link href={localizeHref("/projects")} className="text-xs text-blue-500">{t("home.viewAllProjects")} →</Link>
          </div>

          {projectsLoading ? <Loading /> : projects.length === 0 ? (
            <p className="border-t border-gray-200 py-5 text-sm tracking-normal text-gray-500 dark:border-gray-800 dark:text-gray-400">{t("projects.none")}</p>
          ) : (
            <div className="grid gap-3 border-t border-gray-200 pt-4 dark:border-gray-800 sm:grid-cols-2 lg:grid-cols-3">
              {projects.slice(0, 5).map((project: Project) => (
                <Link key={project.id} href={project.slug ? localizeHref(`/projects/${project.slug}`) : project.link ?? localizeHref("/projects")} target={!project.slug && project.link ? "_blank" : undefined} rel={!project.slug && project.link ? "noopener noreferrer" : undefined} className="group flex min-h-36 flex-col rounded-lg border border-gray-200 p-4 transition-colors hover:border-blue-300 dark:border-gray-800 dark:hover:border-blue-800">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-sm font-semibold leading-5 tracking-normal group-hover:text-blue-500">{project.title}</h3>
                    <span className="shrink-0 text-sm leading-5 text-gray-400 group-hover:text-blue-500">{project.slug || !project.link ? "→" : "↗"}</span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-xs leading-5 tracking-normal text-gray-500 dark:text-gray-400">{project.description}</p>
                  {(project.role || project.year || project.technologies?.length) && (
                    <p className="mt-auto pt-3 font-mono text-[10px] leading-4 tracking-normal text-gray-400">
                      {[project.role, project.year, project.technologies?.slice(0, 3).join(", ")].filter(Boolean).join(" · ")}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </section>

        <section aria-labelledby="skills-title">
          <h2 id="skills-title" className="text-xl font-semibold tracking-tight">{t("home.skills")}</h2>
          <ul className="mt-3 flex flex-wrap gap-2 border-t border-gray-200 pt-4 dark:border-gray-800" role="list">
            {skills.map((skill, index) => (
              <li
                key={`${skill}-${index}`}
                className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 font-mono text-[11px] leading-5 tracking-normal text-gray-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400"
              >
                <span className="h-1 w-1 rounded-full bg-blue-500" aria-hidden="true" />
                {skill}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="notes-title">
          <div className="mb-3 flex items-baseline justify-between gap-6">
            <div>
              <h2 id="notes-title" className="text-xl font-semibold tracking-tight">{t("home.recentNotes")}</h2>
              <p className="mt-1 text-xs tracking-normal text-gray-500 dark:text-gray-400">{t("notes.description")}</p>
            </div>
            <Link href={localizeHref("/notes")} className="text-xs text-blue-500">{t("home.viewAllNotes")} →</Link>
          </div>

          {postsLoading ? <Loading /> : !posts || posts.length === 0 ? (
            <p className="border-t border-gray-200 py-5 text-sm tracking-normal text-gray-500 dark:border-gray-800 dark:text-gray-400">{t("home.noPostsFound")}</p>
          ) : (
            <div className="border-t border-gray-200 pt-2 dark:border-gray-800">
              {posts.map((post: Post) => <PostLink key={post.id} post={post} preview={false} compact />)}
            </div>
          )}
        </section>

        <section className="border-t border-gray-200 pb-8 pt-5 dark:border-gray-800">
          <h2 className="text-xl font-semibold tracking-tight">{t("nav.about")}</h2>
          <p className="mt-3 text-sm leading-6 tracking-normal text-gray-500 dark:text-gray-400">
            {t("about.workWithMeText")} <Link href={localizeHref("/manual")} className="text-blue-500">{t("about.workWithMeLink")}</Link>{t("about.workWithMeSuffix")} <Link href={localizeHref("/about")} className="text-blue-500">{t("about.moreAboutMe")} →</Link>
          </p>
        </section>
      </div>
    </div>
  );
}
