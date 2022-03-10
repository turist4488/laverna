import React from 'react';
import {useTranslation} from "react-i18next";
import {EditBrandForm} from "../../components/BrandsPage";


function BrandCreatePage() {

  const { t } = useTranslation();

  return (
    <div className="route-content">
      <div className="route-header route-header--separate">
        <h3>{t('Create brand')}</h3>
      </div>
      <EditBrandForm />
    </div>
  );
}

export default BrandCreatePage;
