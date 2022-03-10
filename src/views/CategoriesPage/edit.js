import React from 'react';
import {useTranslation} from "react-i18next";
import { EditCategoryForm } from "../../components/CategoriesPage";
import {useParams} from "react-router";


function CategoryEditPage() {

  const { id } = useParams();

  const { t } = useTranslation();

  return (
    <div className="route-content">
      <div className="route-header route-header--separate">
        <h3>{t('Category editing')}</h3>
      </div>
      <EditCategoryForm id={id} editMode={true}/>
    </div>
  );
}

export default CategoryEditPage;
