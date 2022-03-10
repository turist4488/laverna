import React from 'react';
import {Switch, useRouteMatch} from "react-router";
import ProtectedRoute from "../components/PrivateRoute";
import ProductsPage from "../views/ProductsPage";
import ProductCreatePage from "../views/ProductsPage/create";
import ProductEditPage from "../views/ProductsPage/edit";


const ProductsRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <ProtectedRoute exact path={path} component={ProductsPage}/>
      <ProtectedRoute path={`${path}/create`} component={ProductCreatePage}/>
      <ProtectedRoute path={`${path}/edit/:id`} component={ProductEditPage}/>
    </Switch>
  );
};

export default ProductsRoutes;
