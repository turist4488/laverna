import React from 'react';
import {useTranslation} from "react-i18next";
import {EditBrandForm} from "../../components/BrandsPage";


function BrandEditPage({match}) {

  const id = match.params.id;

  const { t } = useTranslation();

  return (
    <div className="route-content">
      <div className="route-header route-header--separate">
        <h3>{t('Brand editing')}</h3>
      </div>
      <EditBrandForm id={id} editMode={true}/>
    </div>
  );
}

export default BrandEditPage;
