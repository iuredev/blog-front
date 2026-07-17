"use client";

import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useGetPosts, useGetProjects } from "@/api/hooks";
import { useGetGlobal } from "@/api/hooks/global";
import { Loading, PostLink } from "@/components";
import { useLocale } from "@/hooks/useLocale";
import { Post, Project } from "@/types";

export default function ClientHome() {
  const { t, locale, strapiLocale, localizeHref } = useLocale();
  const { posts, isLoading: postsLoading } = useGetPosts(3, undefined, strapiLocale);
  const { projects, isLoading: projectsLoading } = useGetProjects();
  const { data: global } = useGetGlobal();

  return (
    <div className="relative left-1/2 flex w-[min(64rem,calc(100vw-2rem))] -translate-x-1/2 flex-col gap-20 md:gap-24">
      <section className="max-w-4xl py-10 md:py-16">
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">{t("home.role")}</p>
        <h1 className="text-3xl font-semibold leading-[1.2] tracking-tight text-gray-800 dark:text-gray-200 sm:text-4xl md:text-5xl">
          <Link href={localizeHref("/about")} className="text-gray-900 hover:text-blue-500 dark:text-white dark:hover:text-blue-400">
            {t("profile.greeting")}
          </Link>
          <span className="text-gray-500 dark:text-gray-400">{t("profile.bio")}</span>
        </h1>

        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
          <Link href={localizeHref("/projects")} className="text-blue-500">{t("home.viewAllProjects")} →</Link>
          <a href="mailto:iuresg.dev@gmail.com" className="text-gray-600 hover:text-blue-500 dark:text-gray-400">iuresg.dev@gmail.com</a>
          <div className="flex items-center gap-4 text-gray-500">
            <a href="https://github.com/iuredev" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub className="h-4 w-4" /></a>
            <a href="https://linkedin.com/in/iure-silva" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin className="h-4 w-4" /></a>
            <a href="https://instagram.com/iure.dev" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram className="h-4 w-4" /></a>
          </div>
        </div>
      </section>

      {global?.currentFocus && (
        <section className="grid gap-3 border-y border-gray-200 py-7 dark:border-gray-800 sm:grid-cols-[10rem_1fr] sm:gap-8">
          <div>
            <h2 className="text-sm font-semibold">{t("home.now")}</h2>
            {global.currentFocusUpdatedAt && (
              <p className="mt-1 text-xs tracking-normal text-gray-500">
                {t("home.nowUpdated")} {new Intl.DateTimeFormat(locale === "pt-br" ? "pt-BR" : "en", { month: "short", year: "numeric" }).format(new Date(global.currentFocusUpdatedAt))}
              </p>
            )}
          </div>
          <p className="text-sm leading-6 tracking-normal text-gray-600 dark:text-gray-400">{global.currentFocus}</p>
        </section>
      )}

      <section aria-labelledby="projects-title">
        <div className="mb-6 flex items-end justify-between gap-6 border-b border-gray-200 pb-4 dark:border-gray-800">
          <h2 id="projects-title" className="text-2xl font-semibold">{t("home.projects")}</h2>
          <Link href={localizeHref("/projects")} className="hidden text-sm text-blue-500 sm:block">{t("home.viewAllProjects")}</Link>
        </div>

        {projectsLoading ? <Loading /> : projects.length === 0 ? (
          <div className="rounded-md border border-dashed border-gray-300 px-6 py-10 text-center dark:border-gray-700">
            <p className="text-sm tracking-normal text-gray-500 dark:text-gray-400">{t("projects.none")}</p>
          </div>
        ) : (
          <div>
            {projects.slice(0, 5).map((project: Project) => (
              <Link key={project.id} href={project.slug ? localizeHref(`/projects/${project.slug}`) : project.link ?? localizeHref("/projects")} target={!project.slug && project.link ? "_blank" : undefined} rel={!project.slug && project.link ? "noopener noreferrer" : undefined} className="group grid gap-2 border-b border-gray-200 py-6 dark:border-gray-800 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)_auto] sm:items-start sm:gap-8">
                <div>
                  <h3 className="text-lg font-semibold group-hover:text-blue-500">{project.title}</h3>
                  {(project.role || project.year) && <p className="mt-1 font-mono text-xs tracking-normal text-gray-400">{[project.role, project.year].filter(Boolean).join(" · ")}</p>}
                </div>
                <p className="text-sm leading-6 tracking-normal text-gray-500 dark:text-gray-400">{project.description}</p>
                <span className="hidden text-blue-500 sm:block">{project.slug || !project.link ? "→" : "↗"}</span>
              </Link>
            ))}
          </div>
        )}
        <Link href={localizeHref("/projects")} className="mt-5 inline-block text-sm text-blue-500 sm:hidden">{t("home.viewAllProjects")} →</Link>
      </section>

      <section className="grid gap-8 border-y border-gray-200 py-10 dark:border-gray-800 md:grid-cols-2 md:gap-16">
        <div>
          <h2 className="text-xl font-semibold">{t("nav.about")}</h2>
          <Link href={localizeHref("/about")} className="mt-3 inline-block text-sm text-blue-500">{t("about.moreAboutMe")} →</Link>
        </div>
        <div>
          <h2 className="text-xl font-semibold">{t("about.userManual")}</h2>
          <p className="mt-3 text-sm leading-6 tracking-normal text-gray-500 dark:text-gray-400">
            {t("about.workWithMeText")} {t("about.workWithMeLink")}{t("about.workWithMeSuffix")}
          </p>
          <Link href={localizeHref("/manual")} className="mt-3 inline-block text-sm text-blue-500">{t("nav.manual")} →</Link>
        </div>
      </section>

      <section aria-labelledby="notes-title">
        <div className="mb-6 flex items-end justify-between gap-6 border-b border-gray-200 pb-4 dark:border-gray-800">
          <div>
            <h2 id="notes-title" className="text-2xl font-semibold">{t("home.recentNotes")}</h2>
            <p className="mt-1 text-sm tracking-normal text-gray-500 dark:text-gray-400">{t("notes.description")}</p>
          </div>
          <Link href={localizeHref("/notes")} className="hidden text-sm text-blue-500 sm:block">{t("home.viewAllNotes")}</Link>
        </div>

        {postsLoading ? <Loading /> : !posts || posts.length === 0 ? (
          <div className="rounded-md border border-dashed border-gray-300 px-6 py-10 text-center dark:border-gray-700">
            <p className="text-sm tracking-normal text-gray-500 dark:text-gray-400">{t("home.noPostsFound")}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            {posts.map((post: Post) => <PostLink key={post.id} post={post} preview={false} />)}
          </div>
        )}
        <Link href={localizeHref("/notes")} className="mt-5 inline-block text-sm text-blue-500 sm:hidden">{t("home.viewAllNotes")} →</Link>
      </section>

      <section className="border-t border-gray-200 py-10 dark:border-gray-800">
        <p className="text-sm text-gray-500 dark:text-gray-400">{t("home.contactSimple")}</p>
        <a href="mailto:iuresg.dev@gmail.com" className="mt-2 inline-block text-lg text-blue-500">iuresg.dev@gmail.com</a>
      </section>
    </div>
  );
}
