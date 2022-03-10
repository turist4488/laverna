import React from 'react';
import ProtectedRoute from "../components/PrivateRoute";
import {Switch, useRouteMatch} from "react-router";
import AttributesPage from "../views/AttributesPage";
import AddAttributePage from "../views/AttributesPage/add-attribute";
import AddAttributeValuePage from "../views/AttributesPage/add-value";
import AttributeValuesPage from "../views/AttributesPage/values";


const AttributesRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <ProtectedRoute exact path={path} component={AttributesPage}/>
      <ProtectedRoute path={`${path}/create`} component={AddAttributePage}/>
      <ProtectedRoute exact path={`${path}/:id/values`} component={AttributeValuesPage}/>
      <ProtectedRoute path={`${path}/:id/values/create`} component={AddAttributeValuePage}/>
      <ProtectedRoute path={`${path}/:id/values/:value_id/edit`} component={AddAttributeValuePage}/>
    </Switch>
  );
};

export default AttributesRoutes;
