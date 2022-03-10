import React from 'react';
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {PlusCircleOutlined, RightOutlined} from '@ant-design/icons';
import {Space, Table} from "antd";
import {useRestApi} from "../../hooks/useRestApi";

const { Column } = Table;

const dataSource = [
  {
    id: '1',
    name: 'Color',
    type: 'color',
    translations: {
      'ru': {
        name: 'Цвет'
      }
    },
    created_at: '2021-04-03T12:14:38.000000Z',
    updated_at: '2021-04-03T12:14:38.000000Z'
  },
  {
    id: '2',
    name: 'Size',
    type: 'select',
    translations: {
      'ru': {
        name: 'Размер'
      }
    },
    created_at: '2021-04-03T12:14:38.000000Z',
    updated_at: '2021-04-03T12:14:38.000000Z'
  },
];

function AttributesPage() {

  const { t, i18n } = useTranslation();

  const [{ data, loading }, { sendRequest }] = useRestApi('/attributes');

  return (
    <div className="route-content">
      <div className="route-header">
        <h3>{t('Attributes')}</h3>
        <div className="route-header__actions">
          <Link to="/attributes/create" className="ant-btn ant-btn-secondary ant-btn-lg">
            <PlusCircleOutlined style={{marginRight: 8}} />
            {t('Add new attribute')}
          </Link>
        </div>
      </div>
      <div>
        <Table
          dataSource={dataSource}
          rowKey={record => record.slug}
          loading={loading}
          rowClassName="ant-table-row-p0"
        >
          <Column title={t('ID')} dataIndex="id" key="id"/>
          <Column
            title={t('Name')}
            dataIndex="name"
            key="name"
            render={(name, record) => record.translations[i18n.language]?.name}
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
            className="actions-col"
            render={(text, record) => (
              <Space size="middle">
                <Link to={`/attributes/${record.id}/edit`} type="text" className="ant-btn ant-btn-ghost">
                  {t('Edit')}
                </Link>
                <Link
                  to={`/attributes/${record.id}/values`}
                  className="ant-btn table-view-details-btn"
                  title={t('Values')}>
                  <RightOutlined />
                </Link>
              </Space>
            )}
          />
        </Table>
      </div>
    </div>

  );
}

export default AttributesPage;
