import { useParams } from "react-router";
import "tailwindcss/tailwind.css";
import { Markdown } from "../../components";
import { formatDate, minutesToRead } from "../../utils";
import { useGetPostBySlug } from "../../api/hooks";


export default function Post() {
  const { slug } = useParams<{ slug: string }>();

  const { data  , isLoading } = useGetPostBySlug(slug as string);


  console.log(data);

 
  

  return (
    <div className="container mx-auto">
      {isLoading ? (
        <div className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (<>
        <div className="mt-12 mb-4">
        <h1 className="text-4xl font-bold">{data?.title}</h1>
        <p className="mb-4 text-gray-400">{formatDate("2025-02-05T01:59:57Z")} • {data?.category && `${data.category.name} •`} {minutesToRead('')}</p>
      </div>
      <div className="content">
        <Markdown content={data?.body || ""} />
      </div></>
      )}
      
    </div>
  );
}
