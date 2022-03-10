import React from 'react';
import {useTranslation} from "react-i18next";
import {Link, useParams} from "react-router-dom";
import {LeftOutlined} from '@ant-design/icons';
import EditAttributeValueForm from "../../components/AttributesPage/edit-value";


function AddAttributeValuePage() {

  const { id, value_id } = useParams();

  const { t } = useTranslation();

  return (
    <div className="route-content">
      <h6>
        <Link to={`/attributes/${id}/values`} className="ant-btn ant-btn-ghost ant-btn-lg">
          <LeftOutlined />
          {t('Back to values')}
        </Link>
      </h6>
      <div className="route-header">
        <h3>{t(value_id ? 'Attribute value editing' : 'Attribute value creating')}</h3>
      </div>
      <EditAttributeValueForm id={value_id} editMode={!!value_id}/>
    </div>
  );
}

export default AddAttributeValuePage;
