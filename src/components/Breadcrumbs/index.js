import React from 'react';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import {Breadcrumb} from "antd";
import {Trans} from "react-i18next";
import {useHistoryGo} from "../../hooks/useHistoryGo";

function Breadcrumbs() {
  const { go } = useHistoryGo();

  const breadcrumbs = useBreadcrumbs([], { excludePaths: ['/'] });

  return (
    <Breadcrumb style={{ margin: '0 0 16px', fontSize: '13px', fontWeight: 600 }}>
      {breadcrumbs.map(({breadcrumb, match}) => (
        <Breadcrumb.Item key={match.url} onClick={() => go.push(match.url)} style={{cursor: 'pointer'}}>
          <Trans>
            {breadcrumb.props.children}
          </Trans>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}

export default Breadcrumbs;
