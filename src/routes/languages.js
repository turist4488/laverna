import React from 'react';
import LanguagesPage from "../views/LanguagesPage";
import LanguageCreatePage from "../views/LanguagesPage/create";
import LanguageEditPage from "../views/LanguagesPage/edit";
import { Routes, Route } from "react-router";
import ProtectedRoute from "../components/PrivateRoute";


const LanguagesRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<LanguagesPage />}/>
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="create" element={<LanguageCreatePage />}/>
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path=":id" element={<LanguageEditPage />}/>
      </Route>
    </Routes>
  );
};

export default LanguagesRoutes;
