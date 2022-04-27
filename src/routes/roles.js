import React from 'react';
import ProtectedRoute from "../components/PrivateRoute";
import RolesPage from "../views/RolesPage";
import RoleCreatePage from "../views/RolesPage/create";
import RoleEditPage from "../views/RolesPage/edit";
import { useLocation } from "react-router-dom";
import { Routes } from "react-router";


const RolesRoutes = () => {
  const { pathname } = useLocation();

  return (
    <Routes>
      <ProtectedRoute exact path={pathname} component={RolesPage}/>
      <ProtectedRoute path={`${pathname}/create`} component={RoleCreatePage}/>
      <ProtectedRoute path={`${pathname}/edit/:id`} component={RoleEditPage}/>
    </Routes>
  );
};

export default RolesRoutes;
