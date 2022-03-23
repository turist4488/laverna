import React, {useCallback, useEffect, useState} from 'react';
import {Form, Tabs, Input, Button, Row, Col, Switch, Divider, TreeSelect, Upload} from 'antd';
import {
  LoadingOutlined,
    PlusOutlined
} from '@ant-design/icons';
import {useTranslation} from "react-i18next";
import {useRestApi} from "../../hooks/useRestApi";
import useLocalizedForm from "../../hooks/useLocalizedForm";
import {localizeInputName, parseTranslationsToInputs} from "../../utils/localizeInputName";
import Loader from "../Loader";
import renderCategoriesSelectNodes from "./categories-select-nodes";


const TRANSLATING_FIELDS = ['name', 'description'];

function EditCategoryForm({id, editMode = false}) {

  const {t} = useTranslation();

  const [iconUrl, setIconUrl] = useState(null)
  const [thumbnailUrl, setThumbnailUrl] = useState(null)

  const [{ form, locales, localesLoading }, { getTranslations }] = useLocalizedForm(TRANSLATING_FIELDS);

  const [getCategoriesState, getCategoriesApi] = useRestApi('/categories/active');
  const [editCategoryState, editCategoryApi] = useRestApi('/categories');
  const [getCategoryState, getCategoryApi] = useRestApi(`/categories/${id}`);

  const onFinish = useCallback((values) => {
    const { slug, parentCategoryId, isActive } = values;

    editCategoryApi.sendRequest({
      method: editMode ? 'PATCH' : 'POST',
      data: {
        slug,
        parentCategoryId: parentCategoryId?.value || null,
        isActive,
        translations: getTranslations()
      }
    });
  }, [editCategoryState.error, editCategoryApi, form, editMode, getTranslations]);

  const fetchCategories = useCallback(() => {
    getCategoriesApi.sendRequest({
      method: 'GET'
    });
  }, [getCategoriesApi]);

  const handleIconUpload = useCallback(() => {

  }, [])

  useEffect(() => {
    if(!editMode && !editCategoryState.loading && !editCategoryState.error) {
      form.resetFields();
    }
  }, [editMode, editCategoryState])

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
      const { slug, isActive, translations, thumbnail, icon, parentCategoryId } = getCategoryState.data;

      form.setFieldsValue({
        slug,
        isActive,
        parentCategoryId,
        ...parseTranslationsToInputs(translations, locales, TRANSLATING_FIELDS)
      });
      setIconUrl(icon)
      setThumbnailUrl(thumbnail)
    }
  }, [getCategoryState.data, form, locales]);

  const uploadIconButton = (
      <div>
        {false ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
  )

  const uploadThumbnailButton = (
      <div>
        {false ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
  )

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
              <Form.Item name="parentCategoryId" label={t('Parent category')} rules={[{required: false}]}>
                <TreeSelect
                  showSearch
                  placeholder={t('Select parent category')}
                  allowClear
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
              <Form.Item name="isActive" label={t('Active')} labelCol={{span: 6, flex: 'none'}} valuePropName="checked">
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
                        name={localizeInputName('name', locale.locale)}
                        label={t('Name')}
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
          <Row className="form-group">
            <Col span={3}>
              <Form.Item
                  name='icon'
                  label={t('Icon')}
              >
                <Upload
                    name="icon"
                    listType="picture-card"
                    className="icon-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    onChange={handleIconUpload}
                >
                  {iconUrl ? <img src={iconUrl} alt="icon" style={{ width: '100%' }} /> : uploadIconButton}
                </Upload>
              </Form.Item>
            </Col>
            <Col span={4} offset={1}>
              <Form.Item
                  name='thumbnail'
                  label={t('Thumbnail')}
              >
                <Upload
                    name="thumbnail"
                    listType="picture-card"
                    className="thumbnail-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    onChange={handleIconUpload}
                >
                  {thumbnailUrl ? <img src={thumbnailUrl} alt="icon" style={{ width: '100%' }} /> : uploadThumbnailButton}
                </Upload>
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
