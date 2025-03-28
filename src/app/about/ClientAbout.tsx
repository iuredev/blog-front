'use client'
import Link from "next/link";
import { useGetPage } from "@/api/hooks";
import { Error, Loading, Markdown } from "@/components";
import { FaArrowRight } from "react-icons/fa";

export default function ClientAbout() {
  const { data, isLoading, isError } = useGetPage("about");

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
        <h4 className="uppercase font-bold">User Manual</h4>

        <div className="">
          I created a playbook on how to{" "}
          <Link href={"/manual"} className="text-blue-600">
            <strong>work with me</strong>
          </Link>
          . It captures some of my strengths, weaknesses, and principles that I aim
          to follow.
        </div>

        <div className="flex gap-2 items-center text-blue-600 hover:text-blue-600 mt-2">
          <Link href="/manual" className="">
            <strong>More about me</strong>
          </Link>
          <FaArrowRight />
        </div>
      </div>
    </div>
  );
} 