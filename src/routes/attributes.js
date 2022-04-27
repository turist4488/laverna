import React from 'react';
import ProtectedRoute from "../components/PrivateRoute";
import { Routes } from "react-router";
import { useLocation } from "react-router-dom";
import AttributesPage from "../views/AttributesPage";
import AddAttributePage from "../views/AttributesPage/add-attribute";
import AddAttributeValuePage from "../views/AttributesPage/add-value";
import AttributeValuesPage from "../views/AttributesPage/values";


const AttributesRoutes = () => {
  const { pathname } = useLocation();

  return (
    <Routes>
      <ProtectedRoute exact path={pathname} component={AttributesPage}/>
      <ProtectedRoute path={`${pathname}/create`} component={AddAttributePage}/>
      <ProtectedRoute exact path={`${pathname}/:id/values`} component={AttributeValuesPage}/>
      <ProtectedRoute path={`${pathname}/:id/values/create`} component={AddAttributeValuePage}/>
      <ProtectedRoute path={`${pathname}/:id/values/:value_id/edit`} component={AddAttributeValuePage}/>
    </Routes>
  );
};

export default AttributesRoutes;
