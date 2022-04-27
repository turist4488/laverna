import React from 'react';
import ProtectedRoute from "../components/PrivateRoute";
import BrandsPage from "../views/BrandsPage";
import BrandCreatePage from "../views/BrandsPage/create";
import BrandEditPage from "../views/BrandsPage/edit";
import { Routes } from "react-router";
import { useLocation } from "react-router-dom";


const BrandsRoutes = () => {
  const { pathname } = useLocation();

  return (
    <Routes>
      <ProtectedRoute exact path={pathname} component={BrandsPage}/>
      <ProtectedRoute path={`${pathname}/create`} component={BrandCreatePage}/>
      <ProtectedRoute path={`${pathname}/edit/:id`} component={BrandEditPage}/>
    </Routes>
  );
};

export default BrandsRoutes;
