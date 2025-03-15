import { useGetPage } from "../../api/hooks";
import { Error, Loading, Markdown } from "../../components";
import useHelmet from "../../hooks";

export default function Manual() {

  const { data, isLoading, isError} = useGetPage("manual");
  useHelmet("Manual");


  const render = () => {
    if (isLoading) {
      return <Loading />;
    }

    if (isError) {
      return  <Error />;
    }

    if (data) {
      return (
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold" >{data?.title} </h1> 
          {data.description && (<div className="text-xl text-gray-400">{data?.description} </div>)}          
          <div className="content grid grid-cols-1 mt-6">
            <Markdown content={data.content} />
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex flex-col">
      {render()}
    </div>
  );
}
