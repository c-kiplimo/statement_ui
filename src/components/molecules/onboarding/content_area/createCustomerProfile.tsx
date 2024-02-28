"use client";

import React from "react";
import { Form, Input, Select } from "antd";
import {
  MyFormItemGroup,
  MyFormItem,
} from "@/src/components/molecules/shared-features/form_builder_component";
import { Text } from "@/src/components/atoms/typography/primary_text";

const CreateCustomerProfile = (props: any) => {
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
        <Text className="mb-11" title="Physical Address" />
        <MyFormItemGroup prefix={["city_gender"]}>
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

          <MyFormItem name="city" label="City/Town">
            <Input placeholder="city" />
          </MyFormItem>

          <MyFormItem name="location" label="Location ">
            <Input placeholder="location" />
          </MyFormItem>
          <MyFormItem name="strret_address" label="Stress Adress">
            <Input placeholder="street address" />
          </MyFormItem>
          <MyFormItem name="postal_code" label="Postal Code">
            <Input placeholder="postal code" />
          </MyFormItem>
        </MyFormItemGroup>
        <button
          style={{ backgroundColor: "var(--brand-brand-primary)" }}
          className="bg-primary mt-3 text-white w-full py-2 rounded cursor-pointer"
        >
          Continue
        </button>
      </div>
    </Form>
  );
};

export default CreateCustomerProfile;
