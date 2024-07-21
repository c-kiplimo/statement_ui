"use client"

import React, { useState } from 'react';
import { Modal, Button, Form, Input, Select } from 'antd';

type FormData= {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    userGroup: string;
  }

const RegistrationForm = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);

  const onFinish = (values:any) => {
    setFormData(values);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    // Call your API here with formData
    registerUser(formData);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const registerUser = async (data:any) => {
    try {
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Handle successful registration
        console.log('User registered successfully');
      } else {
        // Handle errors
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="firstName" label="First Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="phoneNumber" label="Phone Number" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="userGroup" label="User Group" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="Account Managers">Account Managers</Select.Option>
            <Select.Option value="IT Support">IT Support</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Create User</Button>
        </Form.Item>
      </Form>

      <Modal title="Confirm New User Creation" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Name: {formData?.firstName} {formData?.lastName}</p>
        <p>Email: {formData?.email}</p>
        <p>Phone Number: {formData?.phoneNumber}</p>
        <p>User Group: {formData?.userGroup}</p>
      </Modal>
    </>
  );
};

export default RegistrationForm;
