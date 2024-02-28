/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";
import { Form, Input, Button } from "antd";
import { useRouter } from "next/navigation";
import { authServiceHandler } from "@/src/services/auth/auth.service";
import Link from "next/link";
import { notification } from "antd";

import {
  MyFormItemGroup,
  MyFormItem,
} from "@/src/components/molecules/shared-features/form_builder_component";
import { AUTH_URL_LOGIN } from "@/src/constants/environment";
import { AuthServiceProvider } from "@/src/services/auth/authserviceProvider";



const LoginForm = () => {
  const router = useRouter();
  const { storeToken } = AuthServiceProvider();
  const { loginService, requestOtpService } = authServiceHandler();

  type LoginProps = {
    login: {
      username: string;
      password: string;
      confirm?: boolean;
    };
  };

  const onSubmit = async (values: LoginProps) => {
      const response = await loginService(AUTH_URL_LOGIN, values)
      .then((response)=>{
        const tokenData = {
          accessToken: response.data?.access_token,
          refreshToken: response.data?.refresh_token,
          tokenType: response.data?.token_type,
          expiresIn: response.data?.expires_in,
        };
        //saving token token
        storeToken(tokenData);
        console.log("saving");
        return tokenData;
      }).then(tokenData=>{
       return requestOtpService(tokenData.accessToken)
  
      }).then(data=>{
        notification.info({
          message: "OTP Generated",
          description: "A new OTP has been generated. Please check your email.",
        });
        router.push("/statement/authentication/otp-verification");
      }).catch(error=>{
        console.error("Login failed:", error);
        notification.error({
          message: "Login Failed",
          description: "Invalid email or password. Please try again.",
        });
      });
  };

  return (
    <Form
      onFinish={onSubmit}
      style={{ width: "100%" }}
      name="sign"
      layout="vertical"
    >
      <h1 className="text-3xl sign-in-text-title text-left">Sign in</h1>
      <p className="text-lg my-8 text-left sign-in-text-discription">
        Please sign in to your account to access the partner portal
      </p>
      <MyFormItemGroup prefix={["login"]}>
        <MyFormItem
          rules={[
            { required: true, message: "Please enter your Email address" },
            { type: "email", message: "Please enter a valid Email address" },
          ]}
          name="username"
        >
          <Input
            style={{ padding: "8px" }}
            className="black-placeholder"
            placeholder="Email"
          />
        </MyFormItem>

        <MyFormItem
          rules={[{ required: true, message: "Please enter your Password" }]}
          name="password"
        >
          <Input
            style={{ padding: "8px" }}
            className="black-placeholder"
            type="password"
            placeholder="Password"
          />
        </MyFormItem>

        <div className="flex text-center">
          <div className="flex kcb-remember-me gap-3">
            <MyFormItem name="confirm">
              <Input type="checkbox" />
            </MyFormItem>
            <label className="pt-1 kcb-remember-me" htmlFor="agreeCheckbox">
              Remember me
            </label>
          </div>

          <div className="ml-auto  text-right ">
            <Link
              href="/authentication/resetPassword"
              className="password-link"
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        <>
          <Button
            htmlType="submit"
            style={{
              backgroundColor: "var(--brand-brand-primary)",
              color: "#FFF",
            }}
            className="bg-primary text-white w-full mt-4 p-5  rounded cursor-pointer"
          >
            Sign In
          </Button>
        </>

        <div className="ml-auto mt-8 have-account-link text-right">
          <Link href="/authentication/signUp" className="have-account-link">
            Don't have an account?
            <span className="sign-up-link">Create Account.</span>
          </Link>
        </div>
      </MyFormItemGroup>
    </Form>
  );
};

const inputStyles = {
  borderRadius: "3px",
  borderColor: `0.5px solid var(--border-border-secondary)`,
};

export { LoginForm as LoginForm };
