import React from 'react';
import {Row, Col, Input, Form, Switch} from "antd";
import {useTranslation} from "react-i18next";
import {localizeInputName} from "../../../utils/localizeInputName";


function OptionsTab({locales}) {

  const { t } = useTranslation();

  return (
    <Row className="form-group form-group--p0">
      <Col span={16}>
        <Row>
          <h5 className="ant-col">{t('Active')}</h5>
          <Form.Item
            name="active"
            valuePropName="checked"
            wrapperCol={{offset: 10}}
          >
            <Switch />
          </Form.Item>
        </Row>
      </Col>
    </Row>
  );
}

export default OptionsTab;
