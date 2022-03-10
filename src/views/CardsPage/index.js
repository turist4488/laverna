import React from 'react';
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import { PlusCircleOutlined } from '@ant-design/icons';

function CardsPage() {

  const { t } = useTranslation();

  return (
    <div className="route-header">
      <h3>{t('Cards')}</h3>
      <div className="route-header__actions">
        <Link to="/cards/create" className="ant-btn ant-btn-secondary ant-btn-lg">
          <PlusCircleOutlined style={{marginRight: 8}} />
          {t('Add new card')}
        </Link>
      </div>
    </div>
  );
}

export default CardsPage;
