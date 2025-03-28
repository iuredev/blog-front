import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Iure",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-800 dark:text-gray-200">
          404
        </h1>
        <p className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mt-4">
          Page Not Found
        </p>
        <p className="text-gray-500 mt-2">
          The page you are looking for does not exist. It might have been moved, deleted, or never existed.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block px-6 py-3 text-white font-semibold rounded-md"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
} 