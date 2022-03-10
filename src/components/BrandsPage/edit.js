import React, {useCallback, useEffect} from 'react';
import {Form, Tabs, Input, Button, Row, Col, Switch, Divider} from 'antd';
import {useTranslation} from "react-i18next";
import {useRestApi} from "../../hooks/useRestApi";
import useLocalizedForm from "../../hooks/useLocalizedForm";
import {localizeInputName, parseTranslationsToInputs} from "../../utils/localizeInputName";
import Loader from "../Loader";


const TRANSLATING_FIELDS = ['caption', 'description'];

function EditBrandForm({id = null, editMode = false}) {

  const {t} = useTranslation();

  const [{ form, locales, localesLoading }, { getTranslations }] = useLocalizedForm(TRANSLATING_FIELDS);

  const [editBrandState, editBrandApi] = useRestApi(`/brands${editMode ? '/' + id : ''}`);
  const [getBrandState, getBrandApi] = useRestApi(`/brands/${id}`);

  const onFinish = useCallback((values) => {
    const { slug, active } = values;

    editBrandApi.sendRequest({
      method: editMode ? 'PUT' : 'POST',
      data: {
        slug,
        active,
        translations: getTranslations()
      }
    });

    if(!editMode && !editBrandState.error) {
      form.resetFields();
    }

  }, [editBrandState, editBrandApi, form, getTranslations, editMode]);

  useEffect(() => {
    if(editMode && id) {
      getBrandApi.sendRequest({
        method: 'GET'
      });
    }
  }, [getBrandApi, editMode, id]);

  useEffect(() => {
    if(getBrandState.data) {
      const { slug, active, translations } = getBrandState.data;

      form.setFieldsValue({
        slug,
        active,
        ...parseTranslationsToInputs(translations, locales, TRANSLATING_FIELDS)
      });
    }
  }, [getBrandState, form, locales]);

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
              disabled={editBrandState.loading}
            >
              {t(editMode ? 'Save' : 'Create')}
            </Button>
          </Row>
        </Form>
      </div>
    </React.Fragment>
  );
}

export default EditBrandForm;
