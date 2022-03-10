import React from 'react';
import ProtectedRoute from "../components/PrivateRoute";
import CategoriesPage from "../views/CategoriesPage";
import CategoryCreatePage from "../views/CategoriesPage/create";
import CategoryEditPage from "../views/CategoriesPage/edit";
import {Switch, useRouteMatch} from "react-router";


const CategoriesRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <ProtectedRoute path={path} exact component={CategoriesPage}/>
      <ProtectedRoute path={`${path}/create`} component={CategoryCreatePage}/>
      <ProtectedRoute path={`${path}/edit/:id`} component={CategoryEditPage}/>
    </Switch>
  );
};

export default CategoriesRoutes;
