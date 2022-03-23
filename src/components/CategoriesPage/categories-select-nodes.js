import React from 'react';
import {TreeSelect} from "antd";
import { getI18n } from "react-i18next";

const renderCategoriesSelectNodes = (categories, childrenKey = 'children') => {
  return (
    categories?.map(function mapRecursive(category) {
      return (
        <TreeSelect.TreeNode
          value={category._id}
          key={category._id}
          title={category.name[getI18n().language] || 'null'}
          children={category[childrenKey]?.map(mapRecursive)}
        />
      );
    })
  );
};

export default renderCategoriesSelectNodes;
