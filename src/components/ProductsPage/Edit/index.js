import React, {useCallback, useEffect} from 'react';
import {Form, Tabs, Input, Button, Row, Col, Switch, Divider} from 'antd';
import {useTranslation} from "react-i18next";
import {useRestApi} from "../../../hooks/useRestApi";
import useLocalizedForm from "../../../hooks/useLocalizedForm";
import {localizeInputName, parseTranslationsToInputs} from "../../../utils/localizeInputName";
import Loader from "../../Loader";
import BasicSettingsTab from "./basic-settings";
import PricesTab from "./prices";
import SEOTab from "./seo";
import OptionsTab from "./options";


const TRANSLATING_FIELDS = ['caption', 'description'];

function EditProductForm({id = null, editMode = false}) {

  const {t} = useTranslation();

  const [{ form, locales, localesLoading }, { getTranslations }] = useLocalizedForm(TRANSLATING_FIELDS);

  const [editProductState, editProductApi] = useRestApi(`/products${editMode ? '/' + id : ''}`);
  const [getProductState, getProductApi] = useRestApi(`/products/${id}`);

  const onFinish = useCallback((values) => {
    const { slug, active } = values;

    editProductApi.sendRequest({
      method: editMode ? 'PUT' : 'POST',
      data: {
        slug,
        active,
        translations: getTranslations()
      }
    });

    if(!editMode && !editProductState.error) {
      form.resetFields();
    }

  }, [editProductState, editProductApi, form, getTranslations, editMode]);

  useEffect(() => {
    if(editMode && id) {
      getProductApi.sendRequest({
        method: 'GET'
      });
    }
  }, [getProductApi, editMode, id]);

  useEffect(() => {
    if(getProductState.data) {
      const { slug, active, translations } = getProductState.data;

      form.setFieldsValue({
        slug,
        active,
        ...parseTranslationsToInputs(translations, locales, TRANSLATING_FIELDS)
      });
    }
  }, [getProductState, locales, form]);

  return (
    <React.Fragment>
      <div className="">
        <Form
          labelCol={{span: 24}}
          size="large"
          form={form}
          name="editProduct"
          onFinish={onFinish}
        >
          <div className="form-group form-group--small form-group--with-tabs">
            <Tabs type="line" size="small" tabBarStyle={{alignSelf: 'flex-end'}}>
              {locales.map(locale => (
                <Tabs.TabPane tab={locale.name} key={locale.locale}>
                  <Row>
                    <Col span={12}>
                      <Form.Item name="name" rules={[{required: locale.default}]} noStyle={true}>
                        <Input placeholder={t('Enter product name')}/>
                      </Form.Item>
                    </Col>
                  </Row>
                </Tabs.TabPane>
              ))}
            </Tabs>
          </div>

          <div className="form-group form-group--small form-group--p0">
            <Tabs type="card" size="large" style={{padding: '0 20px'}} tabBarStyle={{margin: '-1px -21px'}}>
              <Tabs.TabPane tab={t('Basic settings')} key={'basic-settings'}>
                <BasicSettingsTab locales={locales} />
              </Tabs.TabPane>
              <Tabs.TabPane tab={t('Prices')} key={'prices'}>
                <PricesTab locales={locales} />
              </Tabs.TabPane>
              <Tabs.TabPane tab={t('SEO')} key={'seo'}>
                <SEOTab locales={locales} />
              </Tabs.TabPane>
              <Tabs.TabPane tab={t('Options')} key={'options'}>
                <OptionsTab locales={locales} />
              </Tabs.TabPane>
            </Tabs>
          </div>

          <Divider />
          <Row justify="end">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{minWidth: 150}}
              disabled={editProductState.loading}
            >
              {t(editMode ? 'Save' : 'Create')}
            </Button>
          </Row>
        </Form>
      </div>
    </React.Fragment>
  );
}

export default EditProductForm;
