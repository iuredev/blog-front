'use client'
import Link from "next/link";
import { useGetPage } from "@/api/hooks";
import { Error, Loading, Markdown } from "@/components";
import { FaArrowRight } from "react-icons/fa";
import { useLocale } from "@/hooks/useLocale";

export default function ClientAbout() {
  const { t, strapiLocale, localizeHref } = useLocale();
  const { data, isLoading, isError } = useGetPage("about", strapiLocale);

  const render = () => {
    if (isLoading) {
      return <Loading />;
    }

    if (isError) {
      return <Error />;
    }

    if (data) {
      return (
        <div className="flex flex-col gap-8">
          <h1 className="text-4xl font-bold">{data?.title}</h1>
          <div className="content grid grid-cols-1">
            <Markdown content={data.content} />
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col">
      {render()}

      <div className="flex flex-col mt-12">
        <h4 className="uppercase font-bold">{t("about.userManual")}</h4>

        <div className="">
          {t("about.workWithMeText")}{" "}
          <Link href={localizeHref("/manual")} className="text-blue-600">
            <strong>{t("about.workWithMeLink")}</strong>
          </Link>
          {t("about.workWithMeSuffix")}
        </div>

        <div className="flex gap-2 items-center text-blue-600 hover:text-blue-600 mt-2">
          <Link href={localizeHref("/manual")} className="">
            <strong>{t("about.moreAboutMe")}</strong>
          </Link>
          <FaArrowRight />
        </div>
      </div>
    </div>
  );
} 