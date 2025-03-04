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
        <div className="flex flex-col gap-8">
          <h1 className="text-4xl font-bold" >{data?.title} </h1> 
          <div className="content grid grid-cols-1">
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
