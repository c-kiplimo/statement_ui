import React, { useState } from "react";
import styles from "./create-account.module.css";
import CustomButton from "@/src/components/atoms/button/customButton";
import { Label } from "@/src/components/atoms/label/label";
import Texter from "@/src/components/atoms/text/texter";
import { useRouter } from "next/navigation";
import { authServiceHandler } from "@/src/services/auth/auth.service";
import { AUTH_URL_REGISTER } from "@/src/constants/environment";
import { Checkbox, Form, Input, notification } from "antd";
import {
  MyFormItemGroup,
  MyFormItem,
} from "@/src/components/molecules/shared-features/form_builder_component";

type RegisterProps = {
  register: {
    password: string;
    firstName: string;
    lastName: string;
    mobileNumber: string;
    email: string;
  };
};

const NewAccount = () => {
  const router = useRouter();
  const { registerUserService } = authServiceHandler();
  const [submitted, setSubmitted] = useState(false);
  const [user, setUser] = useState({
    countryCode: "",
  });

  const countryOptions = [
    { value: "+254", label: "+254" },
    { value: "+256", label: "+256" },
    { value: "+255", label: "+255" },
    { value: "+250", label: "+250" },
  ];

  const handleChange = (field: string, value: string) => {
    setUser({ ...user, [field]: value });
    setSubmitted(false);
  };

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

        router.push("/statement/sign-in");
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

  return (
    <div className={styles.formCont}>
      <Form style={{ width: "100%" }} layout={"vertical"} onFinish={onFinish}>
        <MyFormItemGroup prefix={["register"]}>
          <div className={styles.formBody}>
            <div className={styles.wrapper}>
              <div className={styles.header}>
                <Texter text="CREATE ACCOUNT" className="bodyb" />
              </div>
              <div className={styles.vertical}>
                <MyFormItem
                  rules={[
                    {
                      required: true,
                      message: "Please enter your Email address",
                    },
                    {
                      type: "email",
                      message: "Please enter a valid Email address",
                    },
                  ]}
                  name="email"
                  label="Email address"
                >
                  <Input type="email" className={`${styles.input} bodyr`} />
                </MyFormItem>
              </div>

              <div className={styles.register}>
                <div className={styles.horizontal}>
                  <div style={{ flex: 1 }}>
                    <MyFormItem
                      rules={[
                        {
                          required: true,
                          message: "Please enter your First Name",
                        },
                      ]}
                      name="firstName"
                      label="First Name"
                    >
                      <Input type="text" className={`${styles.input} bodyr`} />
                    </MyFormItem>
                  </div>
                  <div style={{ flex: 1 }}>
                    <MyFormItem
                      rules={[
                        {
                          required: true,
                          message: "Please enter your Last Name",
                        },
                      ]}
                      name="lastName"
                      label="Last Name"
                    >
                      <Input type="text" className={`${styles.input} bodyr`} />
                    </MyFormItem>
                  </div>
                </div>

                <div className={styles.vertical}>
                  <MyFormItem name="mobileNumber" label="Phone Number">
                    <div className={`${styles.selectorRow} bodyr`}>
                      <select
                        className={`${styles.selectionStandard} bodyr`}
                        value={user.countryCode}
                        onChange={(e) =>
                          handleChange("countryCode", e.target.value)
                        }
                        name="countryCode"
                      >
                        {countryOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <Input
                        name="phoneNumber"
                        className={`${styles.selectorInput} bodyr`}
                        type="text"
                        placeholder="780000000"
                      />
                    </div>
                  </MyFormItem>
                </div>

                <div className={styles.vertical}>
                  <MyFormItem name="password" label="Password">
                    <Input
                      type="password"
                      className={`${styles.input} bodyr`}
                    />
                  </MyFormItem>
                </div>
              </div>

              <div className={styles.consent}>
                <MyFormItem
                  valuePropName="checked"
                  initialValue={false}
                  name="confirm"
                >
                  <Checkbox id="agreeCheckbox" type="checkbox" />
                </MyFormItem>
                <Label
                  htmlFor="agreeCheckbox"
                  className={styles.signupCheck}
                  label="I consent to the collection and processing of my personal data in line with data regulations as described in"
                  link="kcb privacy policy"
                />
              </div>
            </div>
          </div>
        </MyFormItemGroup>
        <CustomButton
          bgColor="var(--brand-brand-primary)"
          type="submit"
          className={styles.button}
          text="Create Account"
        />
      </Form>
    </div>
  );
};

export default NewAccount;
