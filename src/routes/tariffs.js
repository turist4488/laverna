import React from 'react';
import ProtectedRoute from "../components/PrivateRoute";
import TariffsPage from "../views/TariffsPage";
import TariffCreatePage from "../views/TariffsPage/create";
import TariffEditPage from "../views/TariffsPage/edit";
import { useLocation } from "react-router-dom";
import { Routes } from "react-router";


const TariffsRoutes = () => {
  const { pathname } = useLocation();

  return (
    <Routes>
      <ProtectedRoute exact path={pathname} component={TariffsPage}/>
      <ProtectedRoute path={`${pathname}/create`} component={TariffCreatePage}/>
      <ProtectedRoute path={`${pathname}/edit/:id`} component={TariffEditPage}/>
    </Routes>
  );
};

export default TariffsRoutes;
