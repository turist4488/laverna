import React, {useCallback, useEffect} from 'react';
import {Form, Tabs, Input, Button, Row, Col, Switch, Divider, TreeSelect} from 'antd';
import {useTranslation} from "react-i18next";
import {useRestApi} from "../../hooks/useRestApi";
import useLocalizedForm from "../../hooks/useLocalizedForm";
import {localizeInputName, parseTranslationsToInputs} from "../../utils/localizeInputName";
import Loader from "../Loader";
import renderCategoriesSelectNodes from "./categories-select-nodes";


const TRANSLATING_FIELDS = ['caption', 'description'];

function EditCategoryForm({id, editMode = false}) {

  const {t} = useTranslation();

  const [{ form, locales, localesLoading }, { getTranslations }] = useLocalizedForm(TRANSLATING_FIELDS);

  const [getCategoriesState, getCategoriesApi] = useRestApi('/categories');
  const [editCategoryState, editCategoryApi] = useRestApi('/categories');
  const [getCategoryState, getCategoryApi] = useRestApi(`/categories/${id}`);

  const onFinish = useCallback((values) => {
    const { slug, parent_id, active } = values;

    editCategoryApi.sendRequest({
      method: 'POST',
      data: {
        slug,
        parent_id: parent_id.value,
        active,
        translations: getTranslations()
      }
    });

    if(!editMode && !editCategoryState.error) {
      form.resetFields();
    }
  }, [editCategoryState, editCategoryApi, form, editMode, getTranslations]);

  const fetchCategories = useCallback(() => {
    getCategoriesApi.sendRequest({
      method: 'GET'
    });
  }, [getCategoriesApi]);

  useEffect(() => {
    if(editMode && id) {
      getCategoryApi.sendRequest({
        method: 'GET'
      });
    }
  }, [getCategoryApi, editMode, id, fetchCategories]);

  useEffect(() => {
    if(editMode && !getCategoriesState.data) {
      fetchCategories();
    }
  }, [fetchCategories, getCategoriesState.data, editMode]);

  useEffect(() => {
    if(getCategoryState.data) {
      const { slug, active, translations, parent_id } = getCategoryState.data;

      form.setFieldsValue({
        slug,
        active,
        parent_id,
        ...parseTranslationsToInputs(translations, locales, TRANSLATING_FIELDS)
      });
    }
  }, [getCategoryState.data, form, locales]);

  return (
    <React.Fragment>
      <div className="">
        <Form
          labelCol={{span: 24}}
          size="large"
          form={form}
          name="createCategory"
          onFinish={onFinish}
        >
          <Row className="form-group">
            <Col span={7}>
              <Form.Item name="slug" label={t('Slug')} rules={[{required: true}]}>
                <Input/>
              </Form.Item>
            </Col>
            <Col span={7} offset={1}>
              <Form.Item name="parent_id" label={t('Parent category')} rules={[{required: true}]}>
                <TreeSelect
                  showSearch
                  placeholder={t('Select parent category')}
                  allowClear
                  labelInValue={true}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  onFocus={!editMode && fetchCategories}
                  treeDefaultExpandAll
                  loading={getCategoriesState.loading}
                  children={renderCategoriesSelectNodes(getCategoriesState.data, 'children')}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Divider/>
              <Form.Item name="active" label={t('Active')} labelCol={{span: 6, flex: 'none'}} valuePropName="checked">
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
              disabled={editCategoryState.loading}
            >
              {t(editMode ? 'Save' : 'Create')}
            </Button>
          </Row>
        </Form>
      </div>
    </React.Fragment>
  );
}

export default EditCategoryForm;
