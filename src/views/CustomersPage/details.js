import React from 'react';
import {useTranslation} from "react-i18next";
import {Divider} from 'antd';


function CustomerDetailsPage({match}) {

  const { t } = useTranslation();

  const { id } = match.params;

  return (
    <>
      <div className="route-header">
        <h3>{t(id)}</h3>
      </div>
      <Divider />
      <div>

      </div>
    </>
  );
}

export default CustomerDetailsPage;
