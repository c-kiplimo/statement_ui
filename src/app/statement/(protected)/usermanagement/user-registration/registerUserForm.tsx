import React, { useState } from "react";
import styles from "./registerUserForm.module.css";
import { Checkbox, Form, Input, Select } from "antd";
import { useTokens } from "@/src/app/(context)/ColorContext";
import PrimaryButton from "@/src/components/atoms/button/primary-button/primary-button";
import Texter from "@/src/components/atoms/text/texter";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authServiceHandler } from "@/src/services/auth/auth.service";

const RegisterUserForm = () => {
  const router = useRouter();
  const { registerUserService } = authServiceHandler();
  const [submitted, setSubmitted] = useState(false);
  const token = useTokens();

  const countryOptions = [
    { value: "+254", label: "+254" },
    { value: "+256", label: "+256" },
    { value: "+255", label: "+255" },
    { value: "+250", label: "+250" },
  ];

  const [user, setUser] = useState({
    countryCode: countryOptions[0].value,
  });

  const options = [
    { label: 'Team Administrator', value: 'Team Administrator' },
    { label: 'Engineers', value: 'Engineers' },
    { label: 'Select Roles', value: 'Select Roles' },
  ];

  for (let i = 10; i < 36; i++) {
    options.push({
      label: i.toString(36) + i,
      value: i.toString(36) + i,
    });
  }

  const handleCountry = (field: string, value: string) => {
    setUser({ ...user, [field]: value });
  };

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className={styles.container}>
      <Form
        style={{ width: "100%" }}
        layout={"vertical"}
        onFinish={(values) => console.log("Form values:", values)}
      >
        <div className={styles.wrapper}>
          <div className={styles.form}>
            <div className={styles.header}>
              <Texter text="Register User" className="h6m" />
            </div>
            <div className={styles.formDetails}>
              <div className={styles.doubleRow}>
                <div style={{ flex: 1 }}>
                  <Form.Item
                    name="firstName"
                    label={
                      <span className={`${styles.inputLabel} bodyr`}>
                        First Name
                      </span>
                    }
                    rules={[
                      {
                        required: false,
                        message: "Please enter your first name",
                      },
                    ]}
                  >
                    <Input className={`${styles.input} bodyr`} />
                  </Form.Item>
                </div>
                <div style={{ flex: 1 }}>
                  <Form.Item
                    name="lastName"
                    label={
                      <span className={`${styles.inputLabel} bodyr`}>
                        Last Name
                      </span>
                    }
                    rules={[
                      { required: false, message: "Please enter Last Name" },
                    ]}
                  >
                    <Input className={`${styles.input} bodyr`} />
                  </Form.Item>
                </div>
              </div>
              <div className={styles.vertical}>
                <Form.Item
                  name="email"
                  label={
                    <span className={`${styles.inputLabel} bodyr`}>
                      Email address
                    </span>
                  }
                  rules={[
                    {
                      required: false,
                      type: "email",
                      message: "Please enter a valid email address",
                    },
                  ]}
                >
                  <Input className={`${styles.rowInput} bodyr`} />
                </Form.Item>
              </div>
              <div className={styles.selector}>
                <Form.Item
                  label={
                    <span className={`${styles.inputLabel} bodyr`}>
                      Phone Number
                    </span>
                  }
                  rules={[
                    {
                      required: false,
                      message: "Please enter your phone number",
                    },
                  ]}
                >
                  <Input.Group className={styles.inputGroup}>
                    <Form.Item name="prefix" noStyle>
                      <select
                        className={`${styles.customSelect} bodyr`}
                        value={user.countryCode}
                        onChange={(e) =>
                          handleCountry("countryCode", e.target.value)
                        }
                        name="countryCode"
                      >
                        {countryOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </Form.Item>

                    <Form.Item
                      name="phoneNumber"
                      noStyle
                      rules={[
                        {
                          required: false,
                          message: "Please enter Phone Number",
                        },
                      ]}
                    >
                      <Input
                        className={styles.selectInput}
                        placeholder="Phone Number"
                      />
                    </Form.Item>
                  </Input.Group>
                </Form.Item>
              </div>
              <div className={styles.vertical}>
                <Form.Item
                  name="password"
                  label={
                    <span className={`${styles.inputLabel} bodyr`}>
                      Password
                    </span>
                  }
                  rules={[
                    {
                      required: false,
                      message: "Please enter a valid password address",
                    },
                  ]}
                >
                  <Input className={`${styles.rowInput} bodyr`} />
                </Form.Item>
              </div>
              <div className={styles.multiSelect}>
                <Form.Item
                  style={{ width: "100%" }}
                  label={
                    <span className={`${styles.inputLabel} bodyr`}>
                      Add group
                    </span>
                  }
                  name="usergroup"
                  rules={[
                    {
                      required: false,
                      message: "Please select a user group and role",
                    },
                  ]}
                >
                  <Select
                    mode="multiple"
                    allowClear
                    className={styles.roleSelect}
                    placeholder="Please select"
                    defaultValue={[
                      "Team Administrator ",
                      "Engineers",
                      "Select Roles",
                    ]}
                    onChange={handleChange}
                    options={options}
                  />
                </Form.Item>
              </div>
            </div>
          </div>
          <div className={styles.consent}>
            <Form.Item
              name="confirm"
              valuePropName="checked"
              rules={[
                {
                  required: true,
                  message: "Please fill the checkbox",
                },
              ]}
            >
              <Checkbox id="agreeCheckbox" className={styles.checkBox}>
                <span className={` bodyr`}>
                  I consent to the collection and processing of my personal data
                  in line with data regulations as described in{" "}
                  <Link
                    href="/authentication/signUp"
                    className="sign-up-check-box-nhif-link"
                  >
                    KCB privacy policy.
                  </Link>
                </span>
              </Checkbox>
            </Form.Item>
          </div>
        </div>
        <Form.Item wrapperCol={{ span: 24 }}>
          <PrimaryButton
            htmlType="submit"
            buttonType="default"
            iconPosition="right"
            shape="default"
            size="large"
            customStyles={{
              background: token.brand.primary,
              marginTop: "56px",
              width: "100%",
              color: token.default.white,
              border: `1px solid ${token.brand.primary}`,
            }}
            onClick={() => console.log("clicked")}
          >
            Create User
          </PrimaryButton>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterUserForm;
