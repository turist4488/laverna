import React, {useCallback, useEffect} from 'react';
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import { PlusCircleOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import {Table, Space, Divider} from 'antd';
import {useRestApi} from "../../hooks/useRestApi";
import Loader from "../../components/Loader";

const { Column } = Table;

function CategoriesPage() {

  const { t } = useTranslation();

  const [{ loading, data }, { sendRequest }] = useRestApi('/categories');

  const fetchCategories = useCallback(() => {
    sendRequest({
      method: 'GET'
    });
  }, [sendRequest]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div className="route-content route-content--white">
      <div className="route-header">
        <h3>{t('Categories')}</h3>
        <div className="route-header__actions">
          <Link to="/categories/create" className="ant-btn ant-btn-secondary ant-btn-lg">
            <PlusCircleOutlined style={{marginRight: 8}} />
            {t('Create category')}
          </Link>
        </div>
      </div>
      <Divider />
      <div>
        {loading ? <Loader /> : (
          <Table
            dataSource={data}
            loading={loading}
            rowKey={record => record.slug}
            expandable={{
              childrenColumnName: 'children',
              defaultExpandAllRows: true,
              indentSize: 15
            }}
            size="small"
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
                  <Link to={`/categories/edit/${record.id}`} type="text">
                    {t('Edit')}
                  </Link>
                </Space>
              )}
            />
          </Table>
        )}
      </div>
    </div>
  );
}

export default CategoriesPage;
