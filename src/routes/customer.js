import React from 'react';
import ProtectedRoute from "../components/PrivateRoute";
import CustomerDetailsPage from "../views/CustomersPage/details";
import CustomerEditPage from "../views/CustomersPage/edit";
import CustomersPage from "../views/CustomersPage";
import CustomerCreatePage from "../views/CustomersPage/create";
import { Routes } from "react-router";
import { useLocation } from "react-router-dom";

const CustomerRoutes = () => {
  const { pathname } = useLocation();

  return (
    <Routes>
      <ProtectedRoute exact path={pathname} component={CustomersPage}/>
      <ProtectedRoute exact path={`${pathname}/create`} component={CustomerCreatePage}/>
      <ProtectedRoute exact path={`${pathname}/:id`} component={CustomerDetailsPage}/>
      <ProtectedRoute exact path={`${pathname}/edit/:id`} component={CustomerEditPage}/>
    </Routes>
  );
};

export default CustomerRoutes;
