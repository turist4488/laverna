import React from 'react';
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import { PlusCircleOutlined } from '@ant-design/icons';

function ProductsPage() {

  const { t } = useTranslation();

  return (
    <div className="route-header">
      <h3>{t('Products')}</h3>
      <div className="route-header__actions">
        <Link to="/products/create" className="ant-btn ant-btn-secondary ant-btn-lg">
          <PlusCircleOutlined style={{marginRight: 8}} />
          {t('Create product')}
        </Link>
      </div>
    </div>
  );
}

export default ProductsPage;
