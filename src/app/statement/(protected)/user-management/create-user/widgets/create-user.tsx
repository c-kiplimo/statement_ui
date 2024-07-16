import React from "react";
import styles from "./create-user.module.css";
import { Form, Input, Select, SelectProps } from "antd";
import CustomButton from "@/src/components/atoms/button/customButton";
import Texter from "@/src/components/atoms/text/texter";

const countryOptions = [
  { value: "+254", label: "+254" },
  { value: "+256", label: "+256" },
  { value: "+255", label: "+255" },
  { value: "+250", label: "+250" },
];

const options: SelectProps["options"] = [
  { value: "admin", label: "Admin" },
  { value: "viewer", label: "Viewer" },
  { value: "editor", label: "Editor" },
];

const handleChange = (value: string[]) => {
  console.log(`selected ${value}`);
};

const CreateUser = () => {
  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <div className={styles.container}>
      <Form style={{ width: "100%" }} layout={"vertical"} onFinish={onFinish}>
        <div className={styles.form}>
          <div className={styles.header}>
            <Texter text="Register User" className="h5b" />
          </div>
          <div className={styles.formContent}>
            <div className={styles.horizontal}>
              <div className={styles.flexOne}>
                <label htmlFor="firstName" className="bodyr">
                  First Name
                </label>
                <Form.Item name="firstName">
                  <Input
                    type="text"
                    className={`${styles.horizontalInput} bodyr`}
                    placeholder="First Name"
                  />
                </Form.Item>
              </div>
              <div className={styles.flexOne}>
                <label htmlFor="lastName" className="bodyr">
                  Last Name
                </label>
                <Form.Item name="lastName">
                  <Input
                    type="text"
                    className={`${styles.horizontalInput} bodyr`}
                    placeholder="Last Name"
                  />
                </Form.Item>
              </div>
            </div>
          </div>
          <div className={styles.vertical}>
            <label htmlFor="email" className="bodyr">
              Email Address
            </label>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Email doesn't exist",
                },
                {
                  type: "email",
                  message: "Please enter a valid Email address",
                },
              ]}
              name="email"
            >
              <Input
                type="email"
                className={`${styles.emailInput} bodyr`}
                placeholder="janedoe@gmail.com"
              />
            </Form.Item>
          </div>
          <div className={styles.vertical}>
            <Form.Item
              name="mobileNumber"
              label="Phone Number"
              className="bodyr"
            >
              <div className={`${styles.selectorRow} bodyr`}>
                <select
                  className={`${styles.selectionStandard} bodyr`}
                  //   value={user.countryCode}
                  onChange={(e) => {}}
                  name="countryCode"
                >
                  {countryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <span className={`${styles.divider} h4r`}>/</span>
                <Input
                  name="mobileNumber"
                  className={`${styles.selectorInput} bodyr`}
                  type="text"
                  placeholder="780000000"
                />
              </div>
            </Form.Item>
          </div>
          <div className={styles.vertical}>
            <label htmlFor="email" className="bodyr">
              Which group does the user belong to?
            </label>
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              className={styles.dropDown}
              placeholder="Select User Group"
              defaultValue={[]}
              onChange={handleChange}
              options={options}
            />
          </div>
        </div>
        <CustomButton
          bgColor="var(--brand-brand-primary)"
          type="submit"
          className={styles.button}
          text="Create User"
        />
      </Form>
    </div>
  );
};

export default CreateUser;
