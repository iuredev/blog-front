import React from "react";
import { Routes, Route } from "react-router";
import { Home, Blog } from "../pages/index";

const RoutesComponent: React.FC = () => {
  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/blog" Component={Blog} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
};

export default RoutesComponent;
