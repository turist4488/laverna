import React from 'react';
import {useTranslation} from "react-i18next";
import {EditProductForm} from "../../components/ProductsPage";


function ProductEditPage({match}) {

  const id = match.params.id;

  const { t } = useTranslation();

  return (
    <div className="route-content">
      <div className="route-header route-header--separate">
        <h3>{t('Product editing')}</h3>
      </div>
      <EditProductForm id={id} editMode={true}/>
    </div>
  );
}

export default ProductEditPage;
