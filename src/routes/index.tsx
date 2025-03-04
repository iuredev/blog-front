import { Routes, Route } from "react-router";
import { Home, Blog, NotFoundPage, About, Post, Manual } from "../pages";

export default function RoutesComponent() {
  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/blog" Component={Blog} />
      <Route path="/about" Component={About} />
      <Route path="/blog/:slug" Component={Post} />
      <Route path="/manual" Component={Manual} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
