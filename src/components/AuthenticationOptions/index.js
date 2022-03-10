import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthenticationContext } from "../../context/AuthenticationContext";

import "./AuthenticationOptions.scss";

const AuthenticationOptions = () => {

  const { user, logout } = useContext(AuthenticationContext);

  return (
    user.token ? (
      <>
        <Link
          to="/user"
          className="ant-btn ant-btn-primary"
        >
          Profile
        </Link>
        <button onClick={logout} className="ant-btn ant-btn-secondary">
          Log Out
        </button>
      </>
    ) : (
      <>
        <Link
          to="/login"
          className="ant-btn ant-btn-primary"
        >
          Log In
        </Link>
        <Link
          to="/register"
          className="ant-btn ant-btn-secondary"
        >
          Sign Up
        </Link>
      </>
    )
  );
};

export default AuthenticationOptions;
