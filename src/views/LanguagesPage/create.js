import React from 'react';
import {useTranslation} from "react-i18next";
import { EditLanguageForm } from "../../components/LanguagesPage";


function LanguageCreatePage() {

  const { t } = useTranslation();

  return (
    <div className="route-content route-content--white">
      <div className="route-header">
        <h3>{t('Language creating')}</h3>
      </div>
      <EditLanguageForm />
    </div>
  );
}

export default LanguageCreatePage;
