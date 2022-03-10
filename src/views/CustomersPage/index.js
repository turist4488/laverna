import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {PlusCircleOutlined, EditOutlined, CheckOutlined, CloseOutlined} from '@ant-design/icons';
import {Table, Space, Divider} from 'antd';
import {ROUTES} from "../../constants/routes";
import {useRestApi} from "../../hooks/useRestApi";

const { Column, ColumnGroup } = Table;

function CustomersPage() {

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { t } = useTranslation();

  const [{data, loading}, { sendRequest }] = useRestApi('/users');

  const handleSelect = selectedRowKeys => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: handleSelect,
  };

  useEffect(() => {
    sendRequest({
      method: 'GET'
    });
  }, [sendRequest]);

  return (
    <div className="route-content route-content--white">
      <div className="route-header">
        <h3>{t('Customers')}</h3>
        <div className="route-header__actions">
          <Link to="/customers/create" className="ant-btn ant-btn-secondary ant-btn-lg">
            <PlusCircleOutlined style={{marginRight: 8}} />
            {t('Add customer')}
          </Link>
        </div>
      </div>
      <Divider />
      <div>
        <Table rowSelection={rowSelection} dataSource={data} size="small" loading={loading}>
          <Column title={t('ID')} dataIndex="id" key="id"/>
          <ColumnGroup title={t('Full name')}>
            <Column dataIndex="first_name" key="first_name"/>
            <Column dataIndex="last_name" key="last_name"/>
          </ColumnGroup>
          <Column title={t('Email')} dataIndex="email" key="email"/>
          <Column
            title={t('Active')}
            dataIndex="active"
            key="active"
            render={active => (
              active ? <CheckOutlined style={{color: 'green'}}/> : <CloseOutlined style={{color: 'red'}} />
            )}
          />
          <Column
            title={t('Tariff')}
            dataIndex="tariff"
            key="tariff"
            render={tariff => (
              tariff && (tariff.caption)
            )}
          />
          <Column
            title={t('Action')}
            key="action"
            align="right"
            render={(text, record) => (
              <Space size="middle">
                <Link to={`${ROUTES.customers.routes.clients.path}/edit/${record.id}`} className="ant-btn ant-btn-ghost">
                  <EditOutlined style={{marginRight: 8}}/>
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

export default CustomersPage;
