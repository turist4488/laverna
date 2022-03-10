import React from 'react';
import {useTranslation} from "react-i18next";
import {EditRoleForm} from "../../components/RolesPage";


function RoleEditPage({match}) {

  const id = match.params.id;

  const { t } = useTranslation();

  return (
    <div className="route-content">
      <div className="route-header route-header--separate">
        <h3>{t('Role editing')}</h3>
      </div>
      <EditRoleForm id={id} editMode={true}/>
    </div>
  );
}

export default RoleEditPage;
