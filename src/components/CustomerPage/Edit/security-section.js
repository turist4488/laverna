import React from 'react';
import {Button, Col, Form, Input, Row} from "antd";
import {useTranslation} from "react-i18next";


function EditCustomerSecurity() {

  const { t } = useTranslation();

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div className="">
      <Form labelCol={{span: 24}} size="large" form={form} name="passwordChangeForm" onFinish={onFinish}>
        <Row gutter={20}>
          <Col span={6}>
            <Form.Item name="oldPassword" label={t('Old password')} rules={[{ required: true }]}>
              <Input type="password"/>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="newPassword" label={t('New password')} rules={[{ required: true }]}>
              <Input type="password" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="newPasswordRepeat" label={t('New password repeat')} rules={[{required: true}]}>
              <Input type="password" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Button type="primary" htmlType="submit" size="large" style={{minWidth: 150}}>
            {t('Submit')}
          </Button>
        </Row>
      </Form>
    </div>
  );
}

export default EditCustomerSecurity;
