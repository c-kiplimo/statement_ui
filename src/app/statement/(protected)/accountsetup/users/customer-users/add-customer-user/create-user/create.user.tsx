import React, { useState } from "react";
import styles from "./create.user.module.css";
import { Form, Input, Select, notification } from "antd";
import { useTokens } from "@/src/app/(context)/ColorContext";
import PrimaryButton from "@/src/components/atoms/button/primary-button/primary-button";
import Texter from "@/src/components/atoms/text/texter";
import { useRouter } from "next/navigation";
import { UserHandler } from "@/src/services/usermanagement/user.service";
import { REGISTER_PENDING_USER } from "@/src/constants/environment";
import { PendingUser } from "@/src/types/user.type";

const RegisterUser = () => {
  const router = useRouter();
  const { registerUser } = UserHandler();
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
    { label: 'System Analyst', value: 'System Analyst' },
    { label: 'Data Engineer', value: 'Data Engineer' },
    { label: 'Intern', value: 'Intern' },
    { label: 'UI Developer', value: 'UI Developer' },
    { label: 'Strategic planning', value: 'Strategic planning' },
    { label: 'Project Manager', value: 'Project Manager' },
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

  const onFinish = async (values: any) => {
    setSubmitted(true);
    try {
      const payload: PendingUser = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        mobileNumber: values.countryCode + values.phoneNumber,
      };
      const response = await registerUser(REGISTER_PENDING_USER, payload);
      console.log("User registered successfully:", response);
      notification.success({
        message: "Registration Successful!",
        description: "The user has been registered successfully!",
      });
      router.push("/statement/usermanagement");
    } catch (error) {
      console.error("User registration failed:", error);
      notification.error({
        message: "Registration Failed!",
        description: "An error occurred during registration. Please try again.",
      });
    } finally {
      setSubmitted(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Texter text="Register User" className="h5b" />
      </div>
      <Form
        style={{ width: "100%" }}
        layout={"vertical"}
        onFinish={onFinish}
      >
        <div className={styles.form}>
            <div className={styles.doubleRow}>
              <div style={{ flex: 1 }}>

                <Form.Item
                  name="firstName"
                  label={<span className={`${styles.inputLabel} bodyr`}>First Name</span>}
                  rules={[
                    { required: true, message: "Please enter your first name" },
                  ]}
                >
                  <Input className={`${styles.input} bodyr`} />
                </Form.Item>
              </div>
              <div style={{ flex: 1 }}>

                <Form.Item
                  name="lastName"
                  label={<span className={`${styles.inputLabel} bodyr`}>Last Name</span>}
                  rules={[
                    { required: true, message: "Please enter your last name" },
                  ]}
                >

                  <Input className={`${styles.input} bodyr`} />
                </Form.Item>
              </div>
            </div>


            <div className={styles.vertical}>
              <Form.Item
                name="email"
                label={<span className={`${styles.inputLabel} bodyr`}>Email address</span>}
                rules={[
                  { required: true, type: "email", message: "Please enter a valid email address" },
                ]}
              >
                <Input className={`${styles.rowInput} bodyr`} />
              </Form.Item>
            </div>


            <div className={styles.selector}>

            
              <Form.Item className={styles.here}
                label={<span className={`${styles.inputLabel} bodyr`}>Phone Number</span>}
                rules={[
                  { required: true, message: "Please enter your phone number" },
                ]}
              >
                <Input.Group compact className={styles.phoneContacts}>
                  <Form.Item className="countryCode" noStyle>
                    <select 
                      className={`${styles.customSelect} bodyr`}
                      value={user.countryCode}
                      onChange={(e) => handleCountry("countryCode", e.target.value)}
                      name="countryCode"
                    >
                      {countryOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </Form.Item>


                  <Form.Item className={styles.here2}
                    name="phoneNumber"
                    noStyle
                    rules={[
                      { required: true, message: "Please enter your phone number" },
                    ]}
                  >
                    <Input className={styles.selectInput} placeholder="Phone Number" />
                  </Form.Item>
                </Input.Group>
              </Form.Item>
            </div>



            <div className={styles.multiSelect}>
              <Form.Item
                style={{ width: "100%" }}
                label={<span className={`${styles.inputLabel} bodyr`}>Add group</span>}
                name="usergroup"
                rules={[
                  { required: true, message: "Please select a user group and role" },
                ]}
              >
                <Select
                  mode="multiple"
                  allowClear
                  className={styles.roleSelect}
                  placeholder="Please select"
                  onChange={handleChange}
                  options={options}
                />
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
            disabled={submitted}
          >
            {submitted ? "Creating User..." : "Create User"}
          </PrimaryButton>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterUser;
