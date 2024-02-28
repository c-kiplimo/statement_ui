import { Button, Form, Input, Select, Space } from "antd";
import React from "react";

import { Text } from "@/src/components/atoms/typography/primary_text";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const DigitalContactIndividual = (props: any) => {
  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
  };
  return (
    <Form
      name="dynamic_form_nest_item"
      onFinish={onFinish}
      layout="vertical"
      style={{ maxWidth: 350 }}
      autoComplete="off"
    >
      <Text className="mb-11" title="Digital Contact" />
      <Form.List name="contact">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{ display: "flex", marginBottom: 8 }}
                align="baseline"
              >
                <Form.Item
                  label="Contact Type"
                  {...restField}
                  name={[name, "contactType"]} // Update the name to match your data structure
                  rules={[{ required: false, message: "Missing contact type" }]}
                >
                  <Select
                    showSearch
                    style={{
                      width: "100%",
                    }}
                    placeholder="Contact Type"
                    optionFilterProp="children"
                    filterOption={(input: any, option: any) =>
                      (option?.label ?? "").includes(input)
                    }
                    filterSort={(optionA: any, optionB: any) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={props?.options}
                  />
                </Form.Item>
                <Form.Item
                  label="Contact"
                  {...restField}
                  name={[name, "phoneNumber"]} // Update the name to match your data structure
                  rules={[{ required: false, message: "Missing contact" }]}
                >
                  <Input placeholder="Phone Number" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item style={{ maxWidth: 350 }}>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item style={{ marginTop: "-2rem" }}>
        <button
          type="submit"
          style={{ backgroundColor: "var(--brand-brand-primary)" }}
          className="bg-primary mt-11 text-white w-full py-2 rounded cursor-pointer"
        >
          Continue
        </button>
      </Form.Item>
    </Form>
  );
};

export default DigitalContactIndividual;
