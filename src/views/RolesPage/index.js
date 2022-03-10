import React, {useCallback, useEffect} from 'react';
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import { PlusCircleOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import {Table, Space, Divider} from 'antd';
import {useRestApi} from "../../hooks/useRestApi";
import {ROUTES} from "../../constants/routes";

const { Column } = Table;

function RolesPage() {

  const { t } = useTranslation();

  const [{ loading, data }, { sendRequest }] = useRestApi('/roles');

  const fetchRoles = useCallback(() => {
    sendRequest({
      method: 'GET'
    });
  }, [sendRequest]);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  return (
    <div className="route-content route-content--white">
      <div className="route-header">
        <h3>{t('Roles')}</h3>
        <div className="route-header__actions">
          <Link to={`${ROUTES.customers.routes.roles.path}/create`} className="ant-btn ant-btn-secondary ant-btn-lg">
            <PlusCircleOutlined style={{marginRight: 8}} />
            {t('Create role')}
          </Link>
        </div>
      </div>
      <Divider />
      <div>
        <Table
          dataSource={data}
          rowKey={record => record.slug}
          loading={loading}
        >
          <Column title={t('ID')} dataIndex="id" key="id"/>
          <Column title={t('Slug')} dataIndex="slug" key="slug"/>
          <Column title={t('Caption')} dataIndex="caption" key="caption"/>
          <Column
            title={t('Active')}
            dataIndex="active"
            key="active"
            render={(active, record) => (
              active ? <CheckOutlined style={{color: 'green'}}/> : <CloseOutlined style={{color: 'red'}} />
            )}
          />
          <Column
            title={t('Created at')}
            dataIndex="created_at"
            key="created_at"
            render={date => (
              `${new Date(date).toLocaleDateString("uk-UK")} ${new Date(date).toLocaleTimeString()}`
            )}
          />
          <Column
            title={t('Updated at')}
            dataIndex="updated_at"
            key="updated_at"
            render={date => (
              `${new Date(date).toLocaleDateString("uk-UK")} ${new Date(date).toLocaleTimeString()}`
            )}
          />
          <Column
            title={t('Action')}
            key="action"
            align="right"
            render={(text, record) => (
              <Space size="middle">
                <Link to={`${ROUTES.customers.routes.roles.path}/edit/${record.id}`} type="text">
                  {t('Edit')}
                </Link>
              </Space>
            )}
          />
        </Table>
      </div>
    </div>
  );
}

export default RolesPage;
