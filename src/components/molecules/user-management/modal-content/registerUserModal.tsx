import { Fragment } from "react";

import styles from "./modal-content.module.css";

import { CustomText } from "@/src/components/atoms/typography/primary_text";
import PrimaryButton from "@/src/components/atoms/button/primary-button/primary-button";
import { useFont, useTokens } from "@/src/app/(context)/ColorContext";
import { Form, Input, Select } from "antd";
import type { SelectProps } from "antd";
import { UserDetails } from "@/src/types/user.type";

interface RegisterUserProps {
  accountId: string;
  fetchData?: () => void;
  handleCreate: (data: UserDetails) => void;
  handleEdit: (data: UserDetails) => void;
  handleDelete: (data: UserDetails) => void;
  modalType: string;
  dynamicData: any;
  setIsModalOpen: (isOpen: boolean) => void;
  setModalType: (type: string) => void;
  isModalOpen: boolean;
}

const RegisterUserModalContent = ({
  handleCreate,
  handleEdit,
  handleDelete,
  modalType,
  setIsModalOpen,
  dynamicData,
}: RegisterUserProps) => {
  const options: SelectProps["options"] = [];

  for (let i = 10; i < 36; i++) {
    options.push({
      label: i.toString(36) + i,
      value: i.toString(36) + i,
    });
  }

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };
  const { Option } = Select;
  const token = useTokens();
  const font = useFont();
  switch (modalType) {
    case "add":
      return (
        <Fragment>
          <div
            style={{
              display: "flex",
              gap: "24px",
              padding: "40px",
              flexDirection: "column",
            }}
          >
            <CustomText
              title="Register User"
              fontSize={font.typography.h5.bold.fontSize}
              textColor={token.text.secondary}
              lineHeight={font.typography.h5.bold.lineHeight}
              fontWeight={font.typography.h5.bold.fontWeight}
              className="custom-text"
            />

            <Form
              style={{ width: "100%" }}
              initialValues={{ prefix: "+1" }}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              onFinish={(values) => console.log("Form values:", values)}
            >
              <Form.Item
                name="firstName"
                colon={false}
                label={<span className={styles.inputLabel}>First Name</span>}
                rules={[
                  { required: false, message: "Please enter First Name" },
                ]}
              >
                <Input placeholder="First Name" />
              </Form.Item>
              <Form.Item
                colon={false}
                name="lastName"
                label={<span className={styles.inputLabel}>Last Name</span>}
                rules={[{ required: false, message: "Please enter Last Name" }]}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
              <Form.Item
                name="email"
                label={<span className={styles.inputLabel}>Email address</span>}
                rules={[
                  {
                    required: false,
                    type: "email",
                    message: "Please enter a valid Email Address",
                  },
                ]}
              >
                <Input placeholder="Email Address" />
              </Form.Item>
              <Form.Item
                label={<span className={styles.inputLabel}>Phone Number</span>}
                colon={false}
                rules={[
                  { required: false, message: "Please enter Phone Number" },
                ]}
              >
                <Input.Group
                  style={{
                    display: "flex",
                    gap: "16px",
                  }}
                >
                  <Form.Item name="prefix" noStyle>
                    <Select
                      style={{
                        width: 80,
                      }}
                      dropdownStyle={{ border: "none" }}
                      className={styles.customSelect}
                    >
                      <Option value="+254">+1</Option>
                      <Option value="+44">+44</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="phoneNumber"
                    noStyle
                    rules={[
                      { required: false, message: "Please enter Phone Number" },
                    ]}
                  >
                    <Input
                      style={{ width: "calc(100% - 80px)" }}
                      placeholder="Phone Number"
                    />
                  </Form.Item>
                </Input.Group>
              </Form.Item>

              <Form.Item
                label={
                  <span className={styles.inputLabel}>
                    Which group does the user belong to?
                  </span>
                }
                name="usergroup"
                colon={false}
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
                  style={{ width: "100%" }}
                  placeholder="Please select"
                  defaultValue={["Team Administrator ", "User", "Select Roles"]}
                  onChange={handleChange}
                  options={options}
                />
              </Form.Item>

              <Form.Item wrapperCol={{ span: 24 }}>
                <PrimaryButton
                  htmlType="submit"
                  buttonType="default"
                  // iconPosition="right"
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
        </Fragment>
      );
    case "delete":
      return (
        <Fragment>
          <div
            style={{
              display: "flex",
              paddingBottom: "24px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "40px",
            }}
          >
            <div
              style={{
                textAlign: "center",
                marginTop: "24px",
              }}
            >
              <CustomText
                title="Remove User"
                fontSize={font.typography.h6.medium.fontSize}
                textColor={token.text.secondary}
                lineHeight={font.typography.h6.medium.lineHeight}
                fontWeight={font.typography.h6.medium.fontWeight}
                className="custom-text"
              />
              <CustomText
                title="Are you Sure you want to delete this User?"
                fontSize={font.typography.body.regular.fontSize}
                textColor={token.text.description_01}
                lineHeight={font.typography.body.regular.lineHeight}
                fontWeight={font.typography.body.regular.fontWeight}
                className="custom-text"
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "40px",
              }}
            >
              <PrimaryButton
                buttonType="default"
                // iconPosition="right"
                shape="default"
                size="large"
                customStyles={{
                  background: token.default.white,
                  color: token.accent.danger,
                  border: `1px solid ${token.accent.danger}`,
                }}
                onClick={() => setIsModalOpen(false)}
              >
                NO
              </PrimaryButton>
              <PrimaryButton
                buttonType="default"
                // iconPosition="right"
                shape="default"
                size="large"
                customStyles={{
                  background: token.accent.danger,
                  border: `1px solid ${token.accent.danger}`,
                  color: token.default.white,
                }}
                onClick={() => handleDelete}
              >
                YES
              </PrimaryButton>
            </div>
          </div>
        </Fragment>
      );
    default:
      return null;
  }
};
export default RegisterUserModalContent;
