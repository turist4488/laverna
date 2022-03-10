import React from 'react';
import {useTranslation} from "react-i18next";
import {EditRoleForm} from "../../components/RolesPage";


function RoleCreatePage() {

  const { t } = useTranslation();

  return (
    <div className="route-content">
      <div className="route-header route-header--separate">
        <h3>{t('Create role')}</h3>
      </div>
      <EditRoleForm />
    </div>
  );
}

export default RoleCreatePage;
