import React from 'react';
import {TreeSelect} from "antd";

const renderCategoriesSelectNodes = (categories, childrenKey = 'children') => {

  return (
    categories?.map(function mapRecursive(category) {
      return (
        <TreeSelect.TreeNode
          value={category.id}
          key={category.id}
          title={category.caption || 'undefined'}
          children={category[childrenKey]?.map(mapRecursive)}
        />
      );
    })
  );
};

export default renderCategoriesSelectNodes;
