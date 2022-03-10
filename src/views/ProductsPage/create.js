import React from 'react';
import {useTranslation} from "react-i18next";
import {EditProductForm} from "../../components/ProductsPage";


function ProductCreatePage() {

  const { t } = useTranslation();

  return (
    <div className="route-content">
      <div className="route-header">
        <h3>{t('Product creating')}</h3>
      </div>
      <EditProductForm />
    </div>
  );
}

export default ProductCreatePage;
