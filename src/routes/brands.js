import React from 'react';
import ProtectedRoute from "../components/PrivateRoute";
import BrandsPage from "../views/BrandsPage";
import BrandCreatePage from "../views/BrandsPage/create";
import BrandEditPage from "../views/BrandsPage/edit";
import {Switch, useRouteMatch} from "react-router";


const BrandsRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <ProtectedRoute exact path={path} component={BrandsPage}/>
      <ProtectedRoute path={`${path}/create`} component={BrandCreatePage}/>
      <ProtectedRoute path={`${path}/edit/:id`} component={BrandEditPage}/>
    </Switch>
  );
};

export default BrandsRoutes;
