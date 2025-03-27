import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router";
import { NotFoundPage } from "../pages";
import { Loading } from "../components";

const LazyHome = lazy(() => import("../pages/Home"));
const LazyPost = lazy(() => import("../pages/Post"));
const LazyManual = lazy(() => import("../pages/Manual"));
const LazyAbout = lazy(() => import("../pages/About"));
const LazyBlog = lazy(() => import("../pages/Blog"));

export default function RoutesComponent() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" Component={LazyHome} />
        <Route path="/blog" Component={LazyBlog} />
        <Route path="/about" Component={LazyAbout} />
        <Route path="/blog/:slug" Component={LazyPost} />
        <Route path="/manual" Component={LazyManual} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
