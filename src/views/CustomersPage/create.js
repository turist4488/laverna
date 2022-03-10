import React from 'react';
import {useTranslation} from "react-i18next";
import EditCustomerForm from "../../components/CustomerPage/Edit";


function CustomerCreatePage() {

  const { t } = useTranslation();

  return (
    <>
      <div className="route-header">
        <h3>{t('Create customer')}</h3>
      </div>
      <EditCustomerForm />
    </>
  );
}

export default CustomerCreatePage;
