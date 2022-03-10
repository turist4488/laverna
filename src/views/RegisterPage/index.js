import React, { useContext } from "react";
import { Form, Input, Button, Checkbox } from 'antd';
import { AuthenticationContext } from "../../context/AuthenticationContext";

import styles from "./register-page.module.scss";

const RegisterPage = () => {
  const { register } = useContext(AuthenticationContext);

  const layout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };

  const tailLayout = {
    wrapperCol: {
      span: 24,
    },
  };

  const onFinish = (values) => {
    register(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <section className={styles.root}>
      <Form
        {...layout}
        name="register"
        initialValues={{
          remember: true,
        }}
        size="large"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirm password"
          name="password_confirmation"
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" size="large" htmlType="submit" style={{minWidth: 150}}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
};

export default RegisterPage;
