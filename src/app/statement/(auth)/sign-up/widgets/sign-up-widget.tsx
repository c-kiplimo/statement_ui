import React, { useState } from "react";
import styles from "./sign-up.module.css";
import { Checkbox, Form, Input, notification } from "antd";
import CustomButton from "@/src/components/atoms/button/customButton";
import { Label } from "@/src/components/atoms/label/label";
import Texter from "@/src/components/atoms/text/texter";
import { AUTH_URL_REGISTER } from "@/src/constants/environment";
import { useRouter } from "next/navigation";
import { authServiceHandler } from "@/src/services/auth/auth.service";
import Link from "next/link";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

type RegisterProps = {
  password: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
};

const countryOptions = [
  { value: "+254", label: "+254" },
  { value: "+256", label: "+256" },
  { value: "+255", label: "+255" },
  { value: "+250", label: "+250" },
];

const SignUpWidget = () => {
  const router = useRouter();
  const { registerUserService } = authServiceHandler();
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    countryCode: countryOptions[0].value,
  });

  const handleChange = (field: string, value: string) => {
    setUser({ ...user, [field]: value });
    setSubmitted(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onFinish = async (values: RegisterProps) => {
    console.log("Register>>", values);
    try {
      const response = await registerUserService(AUTH_URL_REGISTER, {
        register: values,
      });
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

  const redirectToCreateAccount = (e: any) => {
    e.preventDefault();
    setTimeout(() => {
      router.replace("/statement/sign-in");
    }, 300);
  };

  return (
    <div className={styles.container}>
      <Form style={{ width: "100%" }} layout={"vertical"} onFinish={onFinish}>
        <div className={styles.formWrapper}>
          <div className={styles.form}>
            <div className={styles.header}>
              <Texter text="CREATE ACCOUNT" className="bodyb" />
            </div>
            <div className={styles.vertical}>
              <label htmlFor="email" className="bodyr">
                Email Address
              </label>
              <Form.Item
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
              >
                <Input
                  type="email"
                  className={`${styles.emailInput} bodyr`}
                  placeholder="janedoe@gmail.com"
                />
              </Form.Item>
            </div>
            <div className={styles.register}>
              <div className={styles.horizontal}>
                <div className={styles.flexOne}>
                  <label htmlFor="firstName" className="bodyr">
                    First Name
                  </label>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "Please enter your First Name",
                      },
                    ]}
                    name="firstName"
                  >
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
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "Please enter your Last Name",
                      },
                    ]}
                    name="lastName"
                  >
                    <Input
                      type="text"
                      className={`${styles.horizontalInput} bodyr`}
                      placeholder="Last Name"
                    />
                  </Form.Item>
                </div>
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
                      name="mobileNumber"
                      className={`${styles.selectorInput} bodyr`}
                      type="text"
                      placeholder="780000000"
                    />
                  </div>
                </Form.Item>
              </div>

              <div className={styles.vertical}>
                <label htmlFor="password" className="bodyr">
                  Password
                </label>
                <Form.Item name="password">
                  <Input
                    className={`${styles.input} bodyr`}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    suffix={
                      <span
                        onClick={togglePasswordVisibility}
                        className={styles.passwordToggleIcon}
                      >
                        {showPassword ? (
                          <AiOutlineEyeInvisible />
                        ) : (
                          <AiOutlineEye />
                        )}
                      </span>
                    }
                  />
                </Form.Item>
              </div>
            </div>
          </div>

          <div className={styles.consent}>
            <Form.Item
              valuePropName="checked"
              initialValue={false}
              name="confirm"
              rules={[
                {
                  required: true,
                  message: "Please fill the checkbox",
                },
              ]}
            >
              <Checkbox id="agreeCheckbox" type="checkbox" required />
            </Form.Item>
            <Label
              htmlFor="agreeCheckbox"
              className={styles.signupCheck}
              label="I consent to the collection and processing of my personal data in line with data regulations as described in"
              link="kcb privacy policy"
            />
          </div>
        </div>

        <CustomButton
          bgColor="var(--brand-brand-primary)"
          type="submit"
          className={styles.button}
          text="Create Account"
        />
      </Form>
      <div className={styles.footer}>
        <p className="captionr">
          Already have an account?
          <span>
            <Link
              href="/statement/sign-in"
              className="sign-up-link"
              onClick={redirectToCreateAccount}
            >
              Sign in.
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUpWidget;
