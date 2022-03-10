import React, {useState} from 'react';
import { Form, Input, Button, Select, Row, Col, Upload, message } from 'antd';
import {useTranslation} from "react-i18next";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

const { Option } = Select;


function EditCustomerGeneral() {

  const [avatarLoading, setAvatarLoading] = useState(false);
  const [avatar, setAvatar] = useState(false);

  const { t } = useTranslation();

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
  };

  const handleAvatarChange = info => {
    if (info.file.status === 'uploading') {
      setAvatarLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        setAvatar(imageUrl);
        setAvatarLoading(false);
      });
    }
  };

  const uploadButton = (
    <div>
      {avatarLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>{t('Upload')}</div>
    </div>
  );

  return (
    <div className="">
      <Form labelCol={{span: 24}} size="large" form={form} name="generalInfoChange" onFinish={onFinish}>
        <Row gutter={60}>
          <Col span={6}>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleAvatarChange}
            >
              {avatar ? <img src={avatar} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
          </Col>
          <Col span={18}>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item name="name" label={t('Name')} rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="email" label={t('Email')} rules={[{ required: true }]}>
                  <Input type="email" disabled={true}/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="phone" label={t('Phone number')} rules={[]}>
                  <Input type="tel" />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row justify="end">
          <Button type="primary" htmlType="submit" size="large" style={{minWidth: 150}}>
            {t('Submit')}
          </Button>
        </Row>
      </Form>
    </div>
  );
}

export default EditCustomerGeneral;
