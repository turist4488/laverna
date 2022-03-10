import React, {useCallback, useEffect} from 'react';
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {
  PlusCircleOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  CheckOutlined,
  CloseOutlined
} from '@ant-design/icons';
import {Modal, Button, Table, Space, Divider} from 'antd';
import {useRestApi} from "../../hooks/useRestApi";

const { Column } = Table;
const { confirm } = Modal;

function LanguagesPage() {

  const { t } = useTranslation();

  const [{ loading, data }, { sendRequest }] = useRestApi('/languages');
  const [deleteLangState, deleteLangApi] = useRestApi('/languages');

  const fetchLanguages = useCallback(() => {
    sendRequest({
      method: 'GET'
    });
  }, [sendRequest]);

  const handleDelete = useCallback((id) => {
    deleteLangApi.sendRequest({
      method: 'DELETE',
      path: `/${id}`
    });
  }, [deleteLangApi]);

  const showDeleteConfirm = useCallback((id) => {
    confirm({
      title: t('Do you Want to delete this language?'),
      icon: <ExclamationCircleOutlined />,
      onOk() {
        handleDelete(id);
      }
    });
  }, [handleDelete, t]);

  useEffect(() => {
    fetchLanguages();
  }, [deleteLangState.data, fetchLanguages]);

  return (
    <div className="route-content route-content--white">
      <div className="route-header">
        <h3>{t('Languages')}</h3>
        <div className="route-header__actions">
          <Link to="/languages/create" className="ant-btn ant-btn-secondary ant-btn-lg">
            <PlusCircleOutlined style={{marginRight: 8}} />
            {t('Add language')}
          </Link>
        </div>
      </div>
      <Divider />
      <div>
        <Table dataSource={data} pagination={false} loading={loading} rowKey={record => record.locale}>
          <Column title={t('ID')} dataIndex="id" key="id"/>
          <Column title={t('Name')} dataIndex="name" key="name"/>
          <Column title={t('Locale')} dataIndex="locale" key="locale"/>
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
                <Button danger={true} type="text" onClick={() => showDeleteConfirm(record.id)} disabled={record.default}>
                  <DeleteOutlined />
                  {t('Delete')}
                </Button>
              </Space>
            )}
          />
        </Table>
      </div>
    </div>
  );
}

export default LanguagesPage;