"use client";

import React from "react";
import { Form, Input, Select } from "antd";

import {
  MyFormItemGroup,
  MyFormItem,
} from "@/src/components/molecules/shared-features/form_builder_component";

import TextDescription, {
  Text,
} from "@/src/components/atoms/typography/primary_text";

const PersonalCustomerProfile = (props: any) => {
  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <Form
      style={{ maxWidth: 300 }}
      name="city_gender_form"
      layout="vertical"
      onFinish={onFinish}
    >
      <div>
        <Text className="mb-11" title="Customer Profile" />
        <MyFormItemGroup prefix={["city_gender"]}>
          <div style={{ display: "flex", gap: "20px" }}>
            <div style={{ flex: 1 }}>
              <MyFormItem name="firstName" label="First Name">
                <Input placeholder="first name" />
              </MyFormItem>
            </div>
            <div style={{ flex: 1 }}>
              <MyFormItem name="lastName" label="Last Name">
                <Input placeholder="last name" />
              </MyFormItem>
            </div>
          </div>

          <MyFormItem name="others" label="others">
            <Input placeholder="others" />
          </MyFormItem>

          <MyFormItem name="country" label="Country">
            <Select
              showSearch
              style={{
                width: "100%",
                textAlign: "left",
              }}
              placeholder="Select country"
              optionFilterProp="children"
              filterOption={(input: any, option: any) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={props.options}
            />
          </MyFormItem>

          <MyFormItem name="sector" label="Sector">
            <Select
              showSearch
              style={{
                width: "100%",
                textAlign: "left",
              }}
              placeholder="Select sector"
              optionFilterProp="children"
              filterOption={(input: any, option: any) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={props.options}
            />
          </MyFormItem>

          <TextDescription
            font="12px"
            className="customer-profile-text-description"
            title="Upload valid business registration document and get access to full features"
          />
        </MyFormItemGroup>
        <button
          style={{ backgroundColor: "var(--brand-brand-primary)" }}
          className="bg-primary mt-6 text-white w-full py-2 rounded cursor-pointer"
        >
          Continue
        </button>
      </div>
    </Form>
  );
};

export default PersonalCustomerProfile;
