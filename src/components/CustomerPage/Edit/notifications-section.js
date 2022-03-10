import React from 'react';
import {Button, Col, Form, Row, Switch} from "antd";
import {useTranslation} from "react-i18next";


function EditCustomerNotifications() {

  const { t } = useTranslation();

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div className="">
      <Form labelCol={{span: 24}} size="large" form={form} name="notificationsForm" onFinish={onFinish}>
        <Col span={10}>
          <Form.Item name="phoneNotifications" label={t('Phone notifications')}>
            <Switch onChange={() => {}} />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item name="emailNotifications" label={t('Email notifications')}>
            <Switch defaultChecked onChange={() => {}} />
          </Form.Item>
        </Col>
        <Row>
          <Button type="primary" htmlType="submit" size="large" style={{minWidth: 150}}>
            {t('Submit')}
          </Button>
        </Row>
      </Form>
    </div>
  );
}

export default EditCustomerNotifications;
