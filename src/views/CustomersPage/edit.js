import React from 'react';
import {useTranslation} from "react-i18next";
import EditCustomerForm from "../../components/CustomerPage/Edit";
import {useParams} from "react-router";


function CustomerEditPage() {

  const { t } = useTranslation();

  const { id } = useParams();

  return (
    <div className="route-content">
      <div className="route-header route-header--separate">
        <h3>{t('Customer Edit')}</h3>
      </div>

      <EditCustomerForm id={id} editMode={true} />

    </div>
  );
}

export default CustomerEditPage;
