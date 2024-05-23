'use client';

import { resetPasswordHandler } from '@/src/services/auth/reset-password';
import {
  MyFormItemGroup,
  MyFormItem,
} from '@/src/components/molecules/shared-features/form_builder_component';
import { Button, Checkbox, Form, Input, notification } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Link from 'next/link';
import { useTokens } from '@/src/app/(context)/ColorContext';

const NewPasswordHelper = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const { setNewPasswordService } = resetPasswordHandler();
  const router = useRouter();
  const tokenColor = useTokens();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Check if passwords match
    setPasswordsMatch(newPassword === confirmPassword || !confirmPassword);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    // Check if passwords match
    setPasswordsMatch(password === newConfirmPassword || !password);
  };

  const onFinish = async (values: any) => {
    const userId = sessionStorage.getItem('userId');

    if (userId) {
      try {
        const response = await setNewPasswordService(password, userId);
        console.log('response', response);
        router.push('/statement/sign-in');
      } catch (error) {
        notification.error({
          message:"Failed!",
          description:"An error occurred when setting new password."
        })
        console.error('Error setting new password:', error);
        // Add user-friendly error handling here
      }
    } else {
      console.error('userId is null.');
      // Add user-friendly error handling here
    }
  };

  return (
    <Form
      style={{ width: '100%' }}
      name="sign"
      layout="vertical"
      onFinish={onFinish}
    >
      <h1 className="create-new-password-text text-left">
        Create new password
      </h1>
      <p className="create-new-password-description  my-8 text-left">
        Enter a new password which will be used to authorize your account from
        now on
      </p>
      <MyFormItemGroup prefix={['create_password']}>
        <div className="space-y-5">
          <MyFormItem name="newPass" label="Create New Password">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="********"
              onChange={handleConfirmPasswordChange}
              className="custom-input"
            />
          </MyFormItem>

          <MyFormItem name="confirmNewPass" label="Confirm Password">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="********"
              onChange={handleConfirmPasswordChange}
              className="custom-input"
            />
          </MyFormItem>

          {!passwordsMatch && (
            <p
              style={{
                color: tokenColor.default.black,
                fontSize: '14px',
              }}
            >
              Passwords do not match
            </p>
          )}

          <Checkbox onChange={togglePasswordVisibility}>
            <p>Show Password</p>
          </Checkbox>

          <Button
            htmlType="submit"
            style={{
              width: '100%',
              color: '#FFF',
              padding: '8px',
              marginTop: '1rem',
              backgroundColor: 'var(--brand-brand-primary)',
              height: '42px',
              cursor: 'pointer',
            }}
            disabled={!passwordsMatch}
          >
            Save New Password
          </Button>
        </div>
      </MyFormItemGroup>
      <div className="ml-auto mt-48 text-left">
        <Link href="/authentication/signUp" className="have-account-link">
          Don't have an account?
          <span className="sign-up-blue-link p-1">Sign up here.</span>
        </Link>
      </div>
    </Form>
  );
};

export default NewPasswordHelper;
