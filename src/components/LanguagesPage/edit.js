import React, {useCallback} from 'react';
import {Form, Input, Button, Row, Col, Switch, Divider} from 'antd';
import {useTranslation} from "react-i18next";
import {useRestApi} from "../../hooks/useRestApi";


function EditLanguageForm({editMode}) {

  const {t} = useTranslation();

  const [form] = Form.useForm();

  const [{ loading, data }, { sendRequest }] = useRestApi('/languages');

  const onFinish = useCallback((values) => {
    sendRequest({
      method: 'POST',
      data: {
        ...values,
        active: +values.active
      }
    });

    if(data) {
      form.resetFields();
    }
  }, [data, sendRequest, form]);

  return (
    <div className="">
      <Form
        labelCol={{span: 24}}
        size="large"
        form={form}
        name="createLanguage"
        onFinish={onFinish}
      >
        <Row>
          <Col span={7}>
            <Form.Item name="name" label={t('Name')} rules={[{required: true}]}>
              <Input/>
            </Form.Item>
            <Form.Item name="locale" label={t('Locale')} rules={[{required: true}]}>
              <Input placeholder="ru, en, uk, etc"/>
            </Form.Item>
            <Divider/>
            <Form.Item initialValue={false} name="active" label={t('Active')} labelCol={{span: 7}} labelAlign="left" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item initialValue={false} name="default" label={t('Default')} labelCol={{span: 7}} labelAlign="left" valuePropName="checked">
              <Switch disabled={true}/>
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <Row justify="start">
          <Button type="primary" htmlType="submit" size="large" style={{minWidth: 150}} disabled={loading}>
            {t(editMode ? 'Save' : 'Create')}
          </Button>
        </Row>
      </Form>
    </div>
  );
}

export default EditLanguageForm;
