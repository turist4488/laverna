import React from 'react';
import {Link, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {PlusCircleOutlined, LeftOutlined} from '@ant-design/icons';
import {Space, Table} from "antd";
import {useRestApi} from "../../hooks/useRestApi";

const { Column } = Table;

const dataSource = [
  {
    id: '1',
    value: 'Blue',
    attribute_id: 1,
    translations: {
      'ru': {
        value: 'Синий'
      }
    },
    created_at: '2021-04-03T12:14:38.000000Z',
    updated_at: '2021-04-03T12:14:38.000000Z'
  },
  {
    id: '2',
    value: 'Red',
    attribute_id: 1,
    translations: {
      'ru': {
        value: 'Красный'
      }
    },
    created_at: '2021-04-03T12:14:38.000000Z',
    updated_at: '2021-04-03T12:14:38.000000Z'
  },
];

function AttributeValuesPage() {

  const { t, i18n } = useTranslation();

  const { id } = useParams();

  const [{ data, loading }, { sendRequest }] = useRestApi(`/attributes/${id}/values`);

  return (
    <div className="route-content">
      <div className="route-header" style={{marginBottom: 30}}>
        <h6>
          <Link to="/attributes" className="ant-btn ant-btn-lg ant-btn-link">
            <LeftOutlined style={{marginRight: 8}}/>
            {t('Back to attributes')}
          </Link>
        </h6>
        <div className="route-header__actions">
          <Link to={`/attributes/${id}/values/create`} className="ant-btn ant-btn-secondary ant-btn-lg">
            <PlusCircleOutlined style={{marginRight: 8}} />
            {t('Add new value')}
          </Link>
        </div>
      </div>
      <div>
        <Table
          dataSource={dataSource}
          rowKey={record => record.slug}
          loading={loading}
        >
          <Column title={t('ID')} dataIndex="id" key="id"/>
          <Column
            title={t('Value')}
            dataIndex="value"
            key="value"
            render={(name, record) => record.translations[i18n.language]?.value}
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
                <Link to={`/attributes/${record.id}/values/${record.id}/edit`} type="text" className="ant-btn ant-btn-ghost">
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

export default AttributeValuesPage;
