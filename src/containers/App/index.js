import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from "../../routes";
import { AuthenticationProvider } from "../../context/AuthenticationContext";
import APP_LANGUAGE from '../../utils/language';
import { DEFAULT_LANG } from '../../constants/languages';
import './App.less';
import '../../styles/main.scss';


function App() {

  return (
    <BrowserRouter basename={APP_LANGUAGE === DEFAULT_LANG ? '/' : `/${APP_LANGUAGE}/`}>
      <AuthenticationProvider>
        <Routes />
      </AuthenticationProvider>
    </BrowserRouter>
  );
}

export default App;
