import React from 'react';
import ProtectedRoute from "../components/PrivateRoute";
import LanguagesPage from "../views/LanguagesPage";
import LanguageCreatePage from "../views/LanguagesPage/create";
import {Switch, useRouteMatch} from "react-router";


const LanguagesRoutes = () => {
  let { path } = useRouteMatch();

  return (
    <Switch>
      <ProtectedRoute exact path={path} component={LanguagesPage}/>
      <ProtectedRoute path={`${path}/create`} component={LanguageCreatePage}/>
    </Switch>
  );
};

export default LanguagesRoutes;
