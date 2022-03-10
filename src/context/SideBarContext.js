import React from "react";
import {createContext, useState} from "react";

export const SideBarContext = createContext();

export const SideBarProvider = ({ children }) => {

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <SideBarContext.Provider value={{
      sidebarCollapsed,
      toggle
    }}>
      { children }
    </SideBarContext.Provider>
  );
};
