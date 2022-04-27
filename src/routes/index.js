import React from "react";
import { Route, Routes } from "react-router";

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
import PrivateRoute from "../components/PrivateRoute";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path={ROUTES.media.path} element={<PrivateRoute />}>
        <Route path={ROUTES.media.path} element={() => 'Media'} />
      </Route>
      <Route path={ROUTES.catalog.routes.products.routePath} element={<ProductsRoutes />}/>
      <Route path={ROUTES.catalog.routes.cards.routePath} element={<CardsPage />} />
      <Route path={ROUTES.catalog.routes.categories.routePath} element={<CategoriesRoutes />} />
      <Route path={ROUTES.catalog.routes.brands.routePath} element={<BrandsRoutes />} />
      <Route path={ROUTES.catalog.routes.attributes.path} element={<AttributesRoutes />} />
      <Route path={ROUTES.customers.routes.roles.routePath} element={<RolesRoutes />} />
      <Route path={ROUTES.customers.routes.tariffs.routePath} element={<TariffsRoutes />} />
      <Route path={ROUTES.customers.routes.clients.routePath} element={<CustomerRoutes />} />
      <Route path={ROUTES.customers.routes.addresses.routePath} element={() => 'Addresses'} />
      <Route path={`${ROUTES.languages.routePath}`} element={<LanguagesRoutes />} />
      <Route path="/login" exact component={Login}/>
      <Route path="/register" exact component={Register}/>
      <Route component={() => "404"}/>
    </Routes>
  );
};

export default AppRoutes;
