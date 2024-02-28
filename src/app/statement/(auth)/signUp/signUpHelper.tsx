"use client";

import React, { useState } from "react";
import { notification } from "antd";
import { Form, Input, Select, Button } from "antd";
import { authServiceHandler } from "@/src/services/auth/auth.service";
import { useRouter } from "next/navigation";

import {
  MyFormItemGroup,
  MyFormItem,
} from "@/src/components/molecules/shared-features/form_builder_component";
import Link from "next/link";
import { AUTH_URL_REGISTER } from "@/src/constants/environment";

type RegisterProps = {
  register: {
    password: string;
    firstName: string;
    lastName: string;
    mobileNumber: string;
    email: string;
  };
};

const SignUpHelper = () => {
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();

  const { registerUserService } = authServiceHandler();

  const onFinish = async (values: RegisterProps) => {
    console.log("Register>>", values);
    try {
      const response = await registerUserService(AUTH_URL_REGISTER, values);
      console.log("register-res>", response);

      if (response.status === 200) {
        notification.success({
          message: "Signup Successful",
          description: "Your account has been created successfully!",
        });

        router.push("/statement/authentication/signIn");
      } else {
        console.error("Register User failed:", response);
        notification.error({
          message: "Signup Failed",
          description:
            "There was an error while creating your account. Please try again later.",
        });
      }
    } catch (error) {
      console.error("Register User failed:", error);
    }
  };

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const options = [
    {
      value: "usa",
      label: "USA",
    },
    {
      value: "canada",
      label: "Canada",
    },
    {
      value: "uk",
      label: "UK",
    },
  ];

  const optionCode = [
    {
      value: "+1",
      label: "+33 (France)",
    },
    {
      value: "+44",
      label: "+44 (UK)",
    },
    {
      value: "+33",
      label: "+1 (USA)",
    },
  ];

  return (
    <>
      <Form style={{ width: "100%" }} layout="vertical" onFinish={onFinish}>
        <MyFormItemGroup prefix={["register"]}>
          <h1 className="text-bg text-left my-8">CREATE YOUR ACCOUNT</h1>

          <div style={{ display: "flex", gap: "20px" }}>
            <div style={{ flex: 1 }}>
              <MyFormItem
                rules={[
                  { required: true, message: "Please enter your First Name" },
                ]}
                name="firstName"
                label="First Name"
              >
                <Input />
              </MyFormItem>
            </div>
            <div style={{ flex: 1 }}>
              <MyFormItem name="lastName" label="Last Name">
                <Input />
              </MyFormItem>
            </div>
          </div>

          <MyFormItem
            rules={[
              { required: true, message: "Please enter your Email address" },
              { type: "email", message: "Please enter a valid Email address" },
            ]}
            name="email"
            label="Email address"
          >
            <Input />
          </MyFormItem>

          <div className="flex text  space-x-2">
            <div className="flex-1 pt-6">
              <MyFormItem name="phoneNumber" label="Phone Number">
                <Input id="phoneInput" />
              </MyFormItem>
            </div>
          </div>

          <MyFormItem name="password" label="Password">
            <Input type="password" />
          </MyFormItem>

          <div className="mt-4 gap-4 flex items-center">
            <MyFormItem
              valuePropName="checked"
              initialValue={false}
              name="confirm"
            >
              <Input type="checkbox" />
            </MyFormItem>
            <label
              htmlFor="agreeCheckbox"
              className="sign-up-check-box-description mt-6 text-left"
            >
              I consent to the collection and processing of my personal data in
              line with data regulations as described in
              <Link href="/authentication/signUp" className="text-gray-600">
                <span className="sign-up-check-box-nhif-link">
                  kcb privacy policy
                </span>
              </Link>
            </label>
          </div>
        </MyFormItemGroup>

        <Button
          style={{ backgroundColor: "var(--brand-brand-primary)" }}
          type="primary"
          htmlType="submit"
          className="bg-primary mt-5 text-white w-full py-2 rounded cursor-pointer"
        >
          Create Account
        </Button>
      </Form>
    </>
  );
};

export default SignUpHelper;

{
  /* <div className="w-1/3">
              <MyFormItem label="Phone Number">
                <Select
                  showSearch
                  style={{
                    width: "100%",
                  }}
                  placeholder="Search to Select"
                  optionFilterProp="children"
                  filterOption={(input: any, option: any) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA: any, optionB: any) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  options={optionCode}
                />
              </MyFormItem>
            </div> */
}
