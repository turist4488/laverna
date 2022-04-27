import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router";

import Axios from "axios";
import {authHeader} from "../utils";

export const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    token: null,
    user: null,
  });

  const [notification, setNotification] = useState();

  const [authenticating, setAuthenticating] = useState(true);

  /**
   * Check to see if user is logged in on initial render.
   */

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        setAuthenticating(true);

        const token = localStorage["authentication-token"] || "test";

        setUser({
          token,
          user: null,
        });

        setAuthenticating(false);
      } catch (error) {
        setUser({
          token: null,
          user: null,
        });

        localStorage["authentication-token"] = "";

        setAuthenticating(false);
      }
    };

    checkUserLoggedIn();
  }, []);

  const login = (credentials) => {
    (async () => {
      try {
        const { email, password } = credentials;

        const loginUser = { email, password };

        const response = await Axios.post(`${process.env.REACT_APP_API_BASE_URL}/login`, loginUser);

        setUser({
          token: response?.data?.access_token,
          user: response?.data?.user,
        });

        localStorage["authentication-token"] = response?.data?.access_token;

        navigate("/");
      } catch (error) {
        console.log(error)
        const { message } = error.response.data;

        if (message) setNotification(message);
      }
    })();
  };

  const logout = () => {
    setUser({
      token: null,
      user: null,
    });

    localStorage["authentication-token"] = "";

    navigate("/");
  };

  const register = (credentials) => {
    (async () => {
      try {
        const { name, email, password, password_confirmation } = credentials;

        const newUser = { name, email, password, password_confirmation };

        const response = await Axios.post(`${process.env.REACT_APP_API_BASE_URL}/register`, newUser);

        setUser({
          token: response?.data?.access_token,
          user: response?.data?.user,
        });

        localStorage["authentication-token"] = response?.data?.access_token;

        navigate("/");
      } catch (error) {
        const { message } = error.response.data;

        if (message) setNotification(message);
      }
    })();
  };

  // Named `_delete` due to the `delete` keyword.
  const _delete = () => {
    (async () => {
      try {

        const response = await Axios.delete(`${process.env.REACT_APP_API_BASE_URL}/users`, {
          headers: {
            ...authHeader()
          },
        });

        if (!response.data) return;

        logout();
      } catch (error) {
        console.error(error.message);
      }
    })();
  };

  const update = (fields) => {
    (async () => {
      try {

        const response = await Axios.patch(
          `${process.env.REACT_APP_API_BASE_URL}/users`,
          { fields: fields },
          {
            headers: {
              ...authHeader()
            },
          }
        );

        if (!response.data) throw Error;

        setUser({
          ...user,
          user: response.data.user,
        });

        setNotification(response.data.message);
      } catch (error) {
        const { message } = error.response.data;

        if (message) setNotification(message);
      }
    })();
  };

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        setUser,
        notification,
        setNotification,
        login,
        logout,
        register,
        _delete,
        update,
        authenticating,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
