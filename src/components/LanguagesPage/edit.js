import React, {useCallback, useEffect} from 'react';
import {Form, Input, Button, Row, Col, Switch, Divider} from 'antd';
import {useTranslation} from "react-i18next";
import {useRestApi} from "../../hooks/useRestApi";


function EditLanguageForm({id, editMode}) {

  const {t} = useTranslation();

  const [form] = Form.useForm();

  const [editLanguageState, editLanguageApi] = useRestApi(`/languages${editMode ? '/' + id : ''}`);
  const [getLanguageState, getLanguageApi] = useRestApi(`/languages/${id}`);

  const onFinish = useCallback((values) => {
    editLanguageApi.sendRequest({
      method: editMode ? 'PATCH' : 'POST',
      data: {
        ...values
      }
    });

    if(!editMode && !editLanguageState.error) {
      form.resetFields();
    }
  }, [editMode, editLanguageApi, editLanguageState, form]);

  useEffect(() => {
    if(editMode && id) {
      getLanguageApi.sendRequest({
        method: 'GET'
      });
    }
  }, [getLanguageApi, editMode, id]);

  useEffect(() => {
    if(getLanguageState.data) {
      const { locale, isActive, name } = getLanguageState.data;

      form.setFieldsValue({
        locale,
        isActive,
        name
      });
    }
  }, [getLanguageState, form]);

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
            <Form.Item initialValue={false} name="isActive" label={t('Active')} labelCol={{span: 7}} labelAlign="left" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item initialValue={false} name="default" label={t('Default')} labelCol={{span: 7}} labelAlign="left" valuePropName="checked">
              <Switch disabled={true}/>
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <Row justify="start">
          <Button type="primary" htmlType="submit" size="large" style={{minWidth: 150}} disabled={editLanguageState.loading}>
            {t(editMode ? 'Save' : 'Create')}
          </Button>
        </Row>
      </Form>
    </div>
  );
}

export default EditLanguageForm;
