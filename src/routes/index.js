import React from "react";
import {Route, Switch} from "react-router-dom";

import ProtectedRoute from "../components/PrivateRoute";

import Home from "../views/HomePage";
import Login from "../views/LoginPage";
import Register from "../views/RegisterPage";
import CardsPage from "../views/CardsPage";
import AttributesPage from "../views/AttributesPage";
import RolesRoutes from "./roles";
import BrandsRoutes from "./brands";
import LanguagesRoutes from "./languages";
import CustomerRoutes from "./customer";
import TariffsRoutes from "./tariffs";
import CategoriesRoutes from "./categories";
import ProductsRoutes from "./products";
import {ROUTES} from "../constants/routes";
import AttributesRoutes from "./attributes";


const Routes = () => {
  return (
    <Switch>
      <ProtectedRoute path="/" exact component={Home}/>
      <ProtectedRoute path={ROUTES.media.path} component={() => 'Media'}/>
      <Route path={ROUTES.catalog.routes.products.path} component={ProductsRoutes}/>
      <ProtectedRoute path={ROUTES.catalog.routes.cards.path} component={CardsPage}/>
      <Route path={ROUTES.catalog.routes.categories.path} component={CategoriesRoutes}/>
      <Route path={ROUTES.catalog.routes.brands.path} component={BrandsRoutes}/>
      <Route path={ROUTES.catalog.routes.attributes.path} component={AttributesRoutes}/>
      <Route path={ROUTES.customers.routes.roles.path} component={RolesRoutes}/>
      <Route path={ROUTES.customers.routes.tariffs.path} component={TariffsRoutes}/>
      <Route path={ROUTES.customers.routes.clients.path} component={CustomerRoutes}/>
      <ProtectedRoute path={ROUTES.customers.routes.addresses.path} component={() => 'Addresses'}/>
      <Route path={ROUTES.languages.path} component={LanguagesRoutes}/>
      <Route path="/login" exact component={Login}/>
      <Route path="/register" exact component={Register}/>
      <Route component={() => "404"}/>
    </Switch>
  );
};

export default Routes;
