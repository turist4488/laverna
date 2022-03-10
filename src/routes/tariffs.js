import React from 'react';
import ProtectedRoute from "../components/PrivateRoute";
import TariffsPage from "../views/TariffsPage";
import TariffCreatePage from "../views/TariffsPage/create";
import TariffEditPage from "../views/TariffsPage/edit";
import {Switch, useRouteMatch} from "react-router";


const TariffsRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <ProtectedRoute exact path={path} component={TariffsPage}/>
      <ProtectedRoute path={`${path}/create`} component={TariffCreatePage}/>
      <ProtectedRoute path={`${path}/edit/:id`} component={TariffEditPage}/>
    </Switch>
  );
};

export default TariffsRoutes;
