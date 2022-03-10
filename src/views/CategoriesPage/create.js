import React from 'react';
import {useTranslation} from "react-i18next";
import { EditCategoryForm } from "../../components/CategoriesPage";


function CategoryCreatePage() {

  const { t } = useTranslation();

  return (
    <div className="route-content">
      <div className="route-header route-header--separate">
        <h3>{t('Create category')}</h3>
      </div>
      <EditCategoryForm />
    </div>
  );
}

export default CategoryCreatePage;
