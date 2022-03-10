import React from 'react';
import {useTranslation} from "react-i18next";
import EditAttributeForm from "../../components/AttributesPage/edit";


function AddAttributePage() {

  const { t } = useTranslation();

  return (
    <div className="route-content">
      <div className="route-header route-header--separate">
        <h3>{t('Attribute creating')}</h3>
      </div>
      <EditAttributeForm />
    </div>
  );
}

export default AddAttributePage;
