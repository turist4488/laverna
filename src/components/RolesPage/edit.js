import React, {useCallback, useEffect} from 'react';
import {Form, Tabs, Input, Button, Row, Col, Switch, Divider} from 'antd';
import {useTranslation} from "react-i18next";
import {useRestApi} from "../../hooks/useRestApi";
import useLocalizedForm from "../../hooks/useLocalizedForm";
import {localizeInputName, parseTranslationsToInputs} from "../../utils/localizeInputName";
import Loader from "../Loader";


const TRANSLATING_FIELDS = ['caption', 'description'];

function EditRoleForm({id = null, editMode = false}) {

  const {t} = useTranslation();

  const [{ form, locales, localesLoading }, { getTranslations }] = useLocalizedForm(TRANSLATING_FIELDS);

  const [editRoleState, editRoleApi] = useRestApi(`/roles${editMode ? '/' + id : ''}`);
  const [getRoleState, getRoleApi] = useRestApi(`/roles/${id}`);

  const onFinish = useCallback((values) => {
    const { slug, active } = values;

    editRoleApi.sendRequest({
      method: editMode ? 'PUT' : 'POST',
      data: {
        slug,
        active,
        translations: getTranslations()
      }
    });

    if(!editMode && !editRoleState.error) {
      form.resetFields();
    }

  }, [editRoleState, getTranslations, editMode, editRoleApi, form]);

  useEffect(() => {
    if(editMode && id) {
      getRoleApi.sendRequest({
        method: 'GET'
      });
    }
  }, [getRoleApi, editMode, id]);

  useEffect(() => {
    if(getRoleState.data) {
      const { slug, active, translations } = getRoleState.data;

      form.setFieldsValue({
        slug,
        active,
        ...parseTranslationsToInputs(translations, locales, TRANSLATING_FIELDS)
      });
    }
  }, [getRoleState, form, locales]);

  return (
    <React.Fragment>
      <div className="">
        <Form
          labelCol={{span: 24}}
          size="large"
          form={form}
          name="editRole"
          onFinish={onFinish}
        >
          <Row className="form-group">
            <Col span={7}>
              <Form.Item name="slug" label={t('Slug')} rules={[{required: true}]}>
                <Input/>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Divider/>
              <Form.Item name="active" initialValue={false} label={t('Active')} labelCol={{span: 6, flex: 'none'}} valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
          </Row>
          <div className="form-group">
            {localesLoading && (
              <Loader position="absolute" size="small"/>
            )}
            <Tabs size="small" tabPosition="right">
              {locales.map(locale => (
                <Tabs.TabPane tab={locale.name} key={locale.locale}>
                  <Row>
                    <Col span={9}>
                      <Form.Item
                        name={localizeInputName('caption', locale.locale)}
                        label={t('Caption')}
                        rules={[{required: locale.default}]}
                      >
                        <Input/>
                      </Form.Item>
                    </Col>
                    <Col span={16}>
                      <Form.Item
                        name={localizeInputName('description', locale.locale)}
                        label={t('Description')}
                      >
                        <Input.TextArea />
                      </Form.Item>
                    </Col>
                  </Row>
                </Tabs.TabPane>
              ))}
            </Tabs>
          </div>
          <Divider />
          <Row justify="end">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{minWidth: 150}}
              disabled={editRoleState.loading}
            >
              {t(editMode ? 'Save' : 'Create')}
            </Button>
          </Row>
        </Form>
      </div>
    </React.Fragment>
  );
}

export default EditRoleForm;
