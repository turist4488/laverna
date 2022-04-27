import React from 'react';
import { Routes, Route } from "react-router";
import ProtectedRoute from "../components/PrivateRoute";
import ProductsPage from "../views/ProductsPage";
import ProductCreatePage from "../views/ProductsPage/create";
import ProductEditPage from "../views/ProductsPage/edit";


const ProductsRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<ProductsPage />}/>
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="create" element={<ProductCreatePage />}/>
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path=":id" element={<ProductEditPage />}/>
      </Route>
    </Routes>
  );
};

export default ProductsRoutes;
