import React from 'react';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import {Breadcrumb} from "antd";
import {Trans} from "react-i18next";
import {useNavigate} from "react-router";

function Breadcrumbs() {
  const navigate = useNavigate();

  const breadcrumbs = useBreadcrumbs([], { excludePaths: ['/'] });

  console.log(breadcrumbs)
  return (
    <Breadcrumb style={{ margin: '0 0 16px', fontSize: '13px', fontWeight: 600 }}>
      {breadcrumbs.map(({breadcrumb, key, match}) => (
        <Breadcrumb.Item key={key} onClick={() => navigate(match.pathname)} style={{cursor: 'pointer'}}>
          <Trans>
            {breadcrumb.props.children}
          </Trans>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}

export default Breadcrumbs;
