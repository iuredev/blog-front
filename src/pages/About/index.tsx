import { Link } from "react-router";
import { useGetPage } from "../../api/hooks";
import { Error, Loading, Markdown } from "../../components";
import useHelmet from "../../hooks";

export default function About() {

   const { data, isLoading, isError} = useGetPage("about");

   useHelmet("About", "About - Iure.dev");


   const render = () => {
     if (isLoading) {
       return <Loading />;
     }

     if (isError) {
       return <Error />
     }

     if (data) {
       return (
         <div className="flex flex-col gap-8">
           <h1 className="text-4xl font-bold">{data?.title} </h1> 
           <div className="content grid grid-cols-1">
             <Markdown content={data.content} />
           </div>
         </div>
       );
     }
   }
  return (
    <div className="flex flex-col">

      {render()}

      <div className="flex flex-col mt-12">
          <h4 className="uppercase font-bold"> User Manual</h4>

          <div className="">
              I created a playbook on how to <Link to={"/manual"} className="text-blue-600">work with me</Link>. It captures some of my strengths, weaknesses, and principles that I aim to follow.
          </div>
      </div>
    </div>


  );
}
