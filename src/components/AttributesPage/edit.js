import React, {useCallback, useEffect} from 'react';
import {Form, Tabs, Input, Button, Row, Col, Switch, Divider, Select} from 'antd';
import {useTranslation} from "react-i18next";
import {useRestApi} from "../../hooks/useRestApi";
import useLocalizedForm from "../../hooks/useLocalizedForm";
import {localizeInputName, parseTranslationsToInputs} from "../../utils/localizeInputName";
import Loader from "../Loader";
import {ROUTES} from "../../constants/routes";
import {useNavigate} from "react-router";


const TRANSLATING_FIELDS = ['name'];

function EditAttributeForm({id = null, editMode = false}) {

  const {t} = useTranslation();

  const navigate = useNavigate();

  const [{ form, locales, localesLoading }, { getTranslations }] = useLocalizedForm(TRANSLATING_FIELDS);

  const [editAttributeState, editAttributeApi] = useRestApi(`/attributes${editMode ? '/' + id : ''}`);
  const [getAttributeState, getAttributeApi] = useRestApi(`/attributes/${id}`);

  const onFinish = useCallback((values) => {
    const { slug, active } = values;

    editAttributeApi.sendRequest({
      method: editMode ? 'PUT' : 'POST',
      data: {
        slug,
        active,
        translations: getTranslations()
      }
    });

    if(!editMode && !editAttributeState.error) {
      form.resetFields();
      navigate(ROUTES.catalog.routes.attributes.path);
    }

  }, [editAttributeState, navigate, editAttributeApi, form, getTranslations, editMode]);

  useEffect(() => {
    if(editMode && id) {
      getAttributeApi.sendRequest({
        method: 'GET'
      });
    }
  }, [getAttributeApi, editMode, id]);

  useEffect(() => {
    if(getAttributeState.data) {
      const { slug, active, translations } = getAttributeState.data;

      form.setFieldsValue({
        slug,
        active,
        ...parseTranslationsToInputs(translations, locales, TRANSLATING_FIELDS)
      });
    }
  }, [getAttributeState.data, form, locales]);

  return (
    <React.Fragment>
      <div className="">
        <Form
          labelCol={{span: 24}}
          size="large"
          form={form}
          name="editBrand"
          onFinish={onFinish}
        >
          <div className="form-group form-group--small">
            {localesLoading && (
              <Loader position="absolute" size="small"/>
            )}
            <Tabs size="small" tabPosition="right">
              {locales.map(locale => (
                <Tabs.TabPane tab={locale.name} key={locale.locale}>
                  <Row>
                    <Col span={9}>
                      <Form.Item
                        name={localizeInputName('name', locale.locale)}
                        label={t('Name')}
                        rules={[{required: locale.default}]}
                      >
                        <Input/>
                      </Form.Item>
                    </Col>
                  </Row>
                </Tabs.TabPane>
              ))}
            </Tabs>
          </div>
          <Row className="form-group form-group--small">
            <Col span={6}>
              <Form.Item
                name="type"
                label={t('Attribute type')}
                rules={[{required: true}]}
                initialValue="dropdown-list"
              >
                <Select>
                  <Select.Option value="dropdown-list" title={t('Drop-down list')}>
                    {t('Drop-down list')}
                  </Select.Option>
                  <Select.Option value="radio" title={t('Radio buttons')}>
                    {t('Radio buttons')}
                  </Select.Option>
                  <Select.Option value="color" title={t('Color')}>
                    {t('Color')}
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <Row justify="end">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{minWidth: 150}}
              disabled={editAttributeState.loading}
            >
              {t(editMode ? 'Save' : 'Create')}
            </Button>
          </Row>
        </Form>
      </div>
    </React.Fragment>
  );
}

export default EditAttributeForm;
