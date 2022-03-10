import React, {useCallback, useEffect, useState} from 'react';
import {Form, Row, Col, TreeSelect, Tabs, Select, Input, Upload} from "antd";
import { FileImageOutlined, PlusOutlined } from '@ant-design/icons';
import {useTranslation} from "react-i18next";
import {useRestApi} from "../../../hooks/useRestApi";
import renderCategoriesSelectNodes from "../../CategoriesPage/categories-select-nodes";
import Loader from "../../Loader";
import {localizeInputName} from "../../../utils/localizeInputName";


function BasicSettingsTab({locales}) {

  const { t } = useTranslation();

  const [uploadedImages, setUploadedImages] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);

  const [getCategoriesState, getCategoriesApi] = useRestApi('/categories?active=1');
  const [getBrandsState, getBrandsApi] = useRestApi('/brands?active=1');

  const fetchCategories = useCallback(() => {
    getCategoriesApi.sendRequest({
      method: 'GET'
    });
  }, [getCategoriesApi]);

  const fetchBrands = useCallback(() => {
    const { data } = getBrandsState;

    if(data) return;

    getBrandsApi.sendRequest({
      method: 'GET'
    });
  }, [getBrandsApi, getBrandsState]);

  useEffect(() => {
    if(!getCategoriesState.data) {
      fetchCategories();
    }
  }, [getCategoriesState.data, fetchCategories]);

  return (
    <Row style={{padding: '30px 0'}}>
      <Col span={16}>
        <Row style={{marginBottom: '30px'}}>
          <Col span={24}>
            <h5>{t('Gallery')}</h5>
            {uploadedImages.length ? (
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                onPreview={() => {}}
                onChange={() => {}}
                fileList={uploadedImages}
                listType="picture-card"
              >
                <div>
                  <PlusOutlined style={{display: 'block'}} />
                  {t('Upload')}
                </div>
              </Upload>
            ) : (
              <button className="ant-btn-dashed ant-upload-btn" style={{cursor: 'pointer', padding: 20}}>
                {t('Click to upload images')}
                <FileImageOutlined style={{fontSize: 40, marginTop: 20, display: 'block'}}/>
              </button>
            )}
          </Col>
        </Row>
        <Tabs tabPosition="right" size="small">
          {locales.map(locale => (
            <Tabs.TabPane tab={locale.name} key={locale.locale}>
              <Tabs type="card">
                <Tabs.TabPane tab={t('Summary')} key={'summary'}>
                  <Form.Item
                    name={localizeInputName('summary', '')}
                  >
                    <Input.TextArea />
                  </Form.Item>
                </Tabs.TabPane>
                <Tabs.TabPane tab={t('Description')} key={'description'}>
                  <Form.Item
                    name={localizeInputName('description', '')}
                  >
                    <Input.TextArea />
                  </Form.Item>
                </Tabs.TabPane>
              </Tabs>
            </Tabs.TabPane>
          ))}
        </Tabs>
        <Row>
          <Col span={8}>
            <h5>{t('Brand')}</h5>
            <Form.Item
              name="brand"
            >
              <Select
                size="default"
                showSearch
                placeholder={t('Select brand')}
                allowClear
                labelInValue={true}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                loading={getBrandsState.loading}
                onFocus={fetchBrands}
              >
                {getBrandsState.data?.map(brand => (
                  <Select.Option value={brand.id} title={brand.caption}>
                    {brand.caption}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Col>
      <Col span={7} offset={1}>
        <h5>{t('Categories')}</h5>
        <Form.Item name="categories" rules={[{required: true}]}>
          {(!getCategoriesState.data || getCategoriesState.loading) ? <Loader position="absolute" size="small"/> : (
            <TreeSelect
              showSearch
              multiple={true}
              placeholder={t('Select categories')}
              allowClear
              labelInValue={true}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeDefaultExpandAll
              children={renderCategoriesSelectNodes(getCategoriesState.data, 'children')}
            />
          )}
        </Form.Item>
      </Col>
    </Row>
  );
}

export default BasicSettingsTab;
