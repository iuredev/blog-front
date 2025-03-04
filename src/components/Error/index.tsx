import { Link } from "react-router";

export default function Error() {
  return (
    <div className="flex flex-col items-center ">
      <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">
        Ops... something went wrong.
      </h1>

      <p className="text-gray-500 mt-2">
        We are sorry, but the page you are looking for does not exist.
      </p>

      <Link
        to="/"
        className="mt-6 inline-block px-6 py-3 text-white font-semibold rounded-md"
      >
        Go Home
      </Link>
    </div>
  );
}
