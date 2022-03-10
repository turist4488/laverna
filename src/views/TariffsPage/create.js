import React from 'react';
import {useTranslation} from "react-i18next";
import {EditTariffForm} from "../../components/TariffsPage";


function TariffCreatePage() {

  const { t } = useTranslation();

  return (
    <div className="route-content">
      <div className="route-header route-header--separate">
        <h3>{t('Create tariff')}</h3>
      </div>
      <EditTariffForm />
    </div>
  );
}

export default TariffCreatePage;
