import React from 'react';
import ProtectedRoute from "../components/PrivateRoute";
import CategoriesPage from "../views/CategoriesPage";
import CategoryCreatePage from "../views/CategoriesPage/create";
import CategoryEditPage from "../views/CategoriesPage/edit";
import { Routes, Route } from "react-router";


const CategoriesRoutes = () => {

  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<CategoriesPage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="create" element={<CategoryCreatePage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path=":id" element={<CategoryEditPage />} />
      </Route>
    </Routes>
  );
};

export default CategoriesRoutes;
