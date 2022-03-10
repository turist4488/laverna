import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthenticationContext } from "../../context/AuthenticationContext";
import MainLayout from "../MainLayout";
import Loader from "../Loader";
import {SideBarProvider} from "../../context/SideBarContext";

const ProtectedRoute = ({ view: Component, ...rest }) => {
  const { user, authenticating } = useContext(AuthenticationContext);

  if(authenticating) {
    return (<Loader />);
  }

  return user.token ? (
    <SideBarProvider>
      <MainLayout>
        <Route {...rest}/>
      </MainLayout>
    </SideBarProvider>
  ) : (
    <Redirect to="/login" />
  );
};

export default ProtectedRoute;
