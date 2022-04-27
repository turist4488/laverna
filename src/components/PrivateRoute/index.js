import React, { useContext } from "react";
import { Navigate, Outlet } from 'react-router'
import { AuthenticationContext } from "../../context/AuthenticationContext";
import MainLayout from "../../layouts/MainLayout";
import Loader from "../Loader";
import { SideBarProvider } from "../../context/SideBarContext";

const ProtectedRoute = () => {
  const { user, authenticating } = useContext(AuthenticationContext);

  if(authenticating) {
    return (<Loader />);
  }

  return user.token ? (
    <SideBarProvider>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </SideBarProvider>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
