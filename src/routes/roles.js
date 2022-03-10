import React from 'react';
import ProtectedRoute from "../components/PrivateRoute";
import RolesPage from "../views/RolesPage";
import RoleCreatePage from "../views/RolesPage/create";
import RoleEditPage from "../views/RolesPage/edit";
import {Switch, useRouteMatch} from "react-router";


const RolesRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <ProtectedRoute exact path={path} component={RolesPage}/>
      <ProtectedRoute path={`${path}/create`} component={RoleCreatePage}/>
      <ProtectedRoute path={`${path}/edit/:id`} component={RoleEditPage}/>
    </Switch>
  );
};

export default RolesRoutes;
