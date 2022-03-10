import React from "react";
import {useTranslation} from "react-i18next";

const Home = () => {

  const { t } = useTranslation();

  return (
    <>
      <main className="page">
        <h3 className="page__title">{t('Dashboard')}</h3>
      </main>
    </>
  );
};

export default Home;
