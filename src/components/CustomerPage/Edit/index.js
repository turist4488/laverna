import React, {useCallback, useEffect} from 'react';
import {Form, Input, Button, Row, Col, Radio, DatePicker, Switch, Divider, Select} from 'antd';
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {useTranslation} from "react-i18next";
import {useRestApi} from "../../../hooks/useRestApi";


function EditCustomerForm({id, editMode = false}) {

  const {t} = useTranslation();

  const [gendersState, gendersApi] = useRestApi('/genders');
  const [tariffsState, tariffsApi] = useRestApi('/tariffs?active=1');
  const [rolesState, rolesApi] = useRestApi('/roles?active=1');
  const [getCustomerState, getCustomerApi] = useRestApi(`/users/${id}`);
  const [editCustomerState, editCustomerApi] = useRestApi(`/users${editMode ? '/' + id : ''}`);

  const [form] = Form.useForm();

  const onFinish = useCallback((values) => {
    const { gender, role, tariff, birthday, ...rest } = values;

    console.log({
      ...rest,
      gender_id: gender,
      birthday: birthday.format(),
      role_id: role,
      tariff_id: tariff
    })
    editCustomerApi.sendRequest({
      method: editMode ? 'PUT' : 'POST',
      data: {
        ...rest,
        gender_id: gender,
        role_id: role,
        tariff_id: tariff
      }
    });

    if(!editMode && !editCustomerState.error) {
      form.resetFields();
    }

  }, [editCustomerState.error, editMode]);

  const fetchGenders = useCallback(() => {
    gendersApi.sendRequest({
      method: 'GET'
    });
  }, [gendersApi.sendRequest]);

  const fetchTariffs = useCallback(() => {
    tariffsApi.sendRequest({
      method: 'GET'
    });
  }, [tariffsApi.sendRequest]);

  const fetchRoles = useCallback(() => {
    rolesApi.sendRequest({
      method: 'GET'
    });
  }, [rolesApi.sendRequest]);

  useEffect(() => {
    fetchGenders();
  }, [fetchGenders]);

  useEffect(() => {
    if(editMode && id) {
      getCustomerApi.sendRequest({
        method: 'GET'
      });

      fetchTariffs();
      fetchRoles();
    }
  }, [getCustomerApi, editMode, id, fetchTariffs, fetchRoles]);

  useEffect(() => {
    if(getCustomerState.data) {
      const {
        first_name,
        last_name,
        email,
        birthday,
        gender_id,
        tariff_id,
        active
      } = getCustomerState.data;

      form.setFieldsValue({
        first_name,
        last_name,
        email,
        tariff: tariff_id,
        gender: gender_id,
        birthday,
        active,
      });
    }
  }, [getCustomerState.data, form]);

  return (
    <div className="">
      <Form
        labelCol={{span: 24}}
        size="large"
        form={form}
        name="editCustomer"
        onFinish={onFinish}
      >
        <Row className="form-group">
          <Col span={7}>
            <Form.Item name="first_name" label={t('First name')} rules={[{required: true}]}>
              <Input/>
            </Form.Item>
            <Form.Item name="last_name" label={t('Last name')} rules={[{required: true}]}>
              <Input/>
            </Form.Item>
            <Form.Item
              name="gender"
              label={t('Gender')}
              labelCol={{span: 6, flex: 'none'}}
              initialValue={gendersState.data && gendersState.data[0]?.id}
            >
              <Radio.Group>
                {gendersState.data && (
                  gendersState.data?.map(gen => (
                    <Radio key={gen.id} value={gen.id}>{gen.caption}</Radio>
                  ))
                )}
              </Radio.Group>
            </Form.Item>
            <Form.Item name="birthday" label={t('Birthday')} labelCol={{span: 6, flex: 'none'}}>
              <DatePicker autoComplete="off" />
            </Form.Item>
            <Divider/>
            <Form.Item name="active" label={t('Active')} labelCol={{span: 6, flex: 'none'}} valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
          <Col span={7} offset={1}>
            <Form.Item name="email" label={t('Email')} rules={[{required: true}]}>
              <Input type="email" disabled={editMode}/>
            </Form.Item>
            <Divider/>
            {editMode && (
              <Form.Item name="oldPassword" label={t('Old password')}>
                <Input type="password"/>
              </Form.Item>
            )}
            <Form.Item name="password" label={t(editMode ? 'New password' : 'Password')}>
              <Input type="password" autoComplete="false"/>
            </Form.Item>
            <Form.Item name="passwordConfirmation" label={t('Confirm password')}>
              <Input type="password"/>
            </Form.Item>
          </Col>
        </Row>
        <Row className="form-group">
          <Col span={7}>
            <Form.List name="addresses" initialValue={['']}>
              {(fields, {add, remove}, {errors}) => (
                <>
                  {fields.map((field, index) => {
                    return (
                      <Form.Item
                        label={index === 0 ? t('Address') : null}
                        required={false}
                        key={field.key}
                      >
                        <Form.Item
                          {...field}
                          noStyle
                        >
                          <Input type="tel" style={{ width: '80%' }}/>
                        </Form.Item>
                        {fields.length > 1 && (
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            onClick={() => remove(field.name)}
                            style={{fontSize: 20, marginLeft: 8}}
                          />
                        )}
                      </Form.Item>
                    );
                  })}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined/>}
                    >
                      {t('Add address')}
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Col>
        </Row>
        <Row className="form-group">
          <Col span={7}>
            <Form.List name="phones" initialValue={['']}>
              {(fields, {add, remove}, {errors}) => (
                <>
                  {fields.map((field, index) => {
                    return (
                      <Form.Item
                        label={index === 0 ? t('Phone') : null}
                        required={false}
                        key={field.key}
                      >
                        <Form.Item
                          {...field}
                          noStyle
                        >
                          <Input type="tel" style={{ width: '80%' }}/>
                        </Form.Item>
                        {fields.length > 1 && (
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            onClick={() => remove(field.name)}
                            style={{fontSize: 20, marginLeft: 8}}
                          />
                        )}
                      </Form.Item>
                    );
                  })}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined/>}
                    >
                      {t('Add phone')}
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Col>
        </Row>
        <Row className="form-group" gutter={20} style={{marginLeft: 0, marginRight: 0}}>
          <Col span={7}>
            <Form.Item name="tariff" label={t('Tariff')}>
              <Select size="large" onFocus={!editMode && fetchTariffs}>
                {tariffsState.data && (
                  tariffsState.data?.map(trf => (
                    <Select.Option key={trf.id} value={trf.id} title={trf.caption}>
                      {trf.caption}
                    </Select.Option>
                  ))
                )}
              </Select>
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item name="role" label={t('Role')}>
              <Select size="large" onFocus={!editMode && fetchRoles}>
                {rolesState.data && (
                  rolesState.data?.map(role => (
                    <Select.Option key={role.id} value={role.id} title={role.caption}>
                      {role.caption}
                    </Select.Option>
                  ))
                )}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Divider dashed={true}/>
        <Row justify="end">
          <Button type="primary" htmlType="submit" size="large" style={{minWidth: 150}}>
            {t(editMode ? 'Save' : 'Create')}
          </Button>
        </Row>
      </Form>
    </div>
  );
}

export default EditCustomerForm;
