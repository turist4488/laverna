import React from 'react';
import ProtectedRoute from "../components/PrivateRoute";
import CustomerDetailsPage from "../views/CustomersPage/details";
import CustomerEditPage from "../views/CustomersPage/edit";
import CustomersPage from "../views/CustomersPage";
import CustomerCreatePage from "../views/CustomersPage/create";
import {Switch, useRouteMatch} from "react-router";


const CustomerRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <ProtectedRoute exact path={path} component={CustomersPage}/>
      <ProtectedRoute exact path={`${path}/create`} component={CustomerCreatePage}/>
      <ProtectedRoute exact path={`${path}/:id`} component={CustomerDetailsPage}/>
      <ProtectedRoute exact path={`${path}/edit/:id`} component={CustomerEditPage}/>
    </Switch>
  );
};

export default CustomerRoutes;
