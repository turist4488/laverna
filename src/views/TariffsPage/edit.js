import React from 'react';
import {useTranslation} from "react-i18next";
import {EditTariffForm} from "../../components/TariffsPage";


function TariffEditPage({match}) {

  const id = match.params.id;

  const { t } = useTranslation();

  return (
    <div className="route-content">
      <div className="route-header route-header--separate">
        <h3>{t('Tariff editing')}</h3>
      </div>
      <EditTariffForm id={id} editMode={true}/>
    </div>
  );
}

export default TariffEditPage;
